// Amadeus Self-Service API adapter (server-side only).
// Free credentials: https://developers.amadeus.com → create app → put
// AMADEUS_CLIENT_ID / AMADEUS_CLIENT_SECRET in .env.local (and Vercel env).
// AMADEUS_ENV=production switches off the test sandbox (default: test).
//
// The test environment is free (~2k calls/month) and serves cached-but-real
// market data — fine for an internal costing tool; label it as indicative.

import type { LiveFlightOffer, LiveHotelOffer } from './types';

const BASE =
  process.env.AMADEUS_ENV === 'production'
    ? 'https://api.amadeus.com'
    : 'https://test.api.amadeus.com';

export function amadeusConfigured(): boolean {
  return Boolean(process.env.AMADEUS_CLIENT_ID && process.env.AMADEUS_CLIENT_SECRET);
}

/* ---- OAuth token with in-memory cache ---- */

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }
  const res = await fetch(`${BASE}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_CLIENT_ID!,
      client_secret: process.env.AMADEUS_CLIENT_SECRET!,
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Amadeus auth failed: ${res.status}`);
  const json = await res.json();
  cachedToken = {
    token: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000,
  };
  return cachedToken.token;
}

async function amadeusGet(path: string, params: Record<string, string>): Promise<unknown> {
  const token = await getToken();
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}${path}?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
    // Cache identical searches for 15 min to protect the free quota.
    next: { revalidate: 900 },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Amadeus ${path} → ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

/* ---- Flights ---- */

function isoDuration(d: string): string {
  // PT9H35M → 9h 35m
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(d);
  if (!m) return d;
  return [m[1] ? `${m[1]}h` : null, m[2] ? `${m[2]}m` : null].filter(Boolean).join(' ') || d;
}

interface AmadeusSegment {
  departure: { iataCode: string };
  arrival: { iataCode: string };
  carrierCode: string;
}
interface AmadeusItinerary {
  duration: string;
  segments: AmadeusSegment[];
}
interface AmadeusFlightOffer {
  id: string;
  itineraries: AmadeusItinerary[];
  price: { grandTotal: string; currency: string };
  validatingAirlineCodes?: string[];
}
interface AmadeusFlightResponse {
  data?: AmadeusFlightOffer[];
  dictionaries?: { carriers?: Record<string, string> };
}

export async function searchFlights(opts: {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  adults: number;
}): Promise<LiveFlightOffer[]> {
  const json = (await amadeusGet('/v2/shopping/flight-offers', {
    originLocationCode: opts.origin,
    destinationLocationCode: opts.destination,
    departureDate: opts.departDate,
    returnDate: opts.returnDate,
    adults: String(Math.min(opts.adults, 9)), // API max 9; price is per-adult anyway
    currencyCode: 'USD',
    max: '20',
  })) as AmadeusFlightResponse;

  const carriers = json.dictionaries?.carriers ?? {};
  const offers: LiveFlightOffer[] = (json.data ?? []).map((o) => {
    const out = o.itineraries[0];
    const ret = o.itineraries[1];
    const route = (it?: AmadeusItinerary) =>
      it
        ? [it.segments[0]?.departure.iataCode, ...it.segments.map((s) => s.arrival.iataCode)].join(' → ')
        : '';
    const code = o.validatingAirlineCodes?.[0] ?? out.segments[0]?.carrierCode ?? '??';
    const adults = Math.min(opts.adults, 9);
    return {
      id: o.id,
      carrier: `${carriers[code] ?? code} (${code})`,
      stops: Math.max(0, out.segments.length - 1),
      outboundDuration: isoDuration(out.duration),
      itinerary: `${route(out)}${ret ? ` · return ${route(ret)}` : ''}`,
      pricePerPerson: Math.round(parseFloat(o.price.grandTotal) / adults),
      currency: 'USD' as const,
      deepLink: `https://www.google.com/travel/flights?q=Flights%20from%20${opts.origin}%20to%20${opts.destination}%20on%20${opts.departDate}%20returning%20${opts.returnDate}`,
    };
  });

  // Cheapest first, dedupe by carrier+stops+price to keep the list readable.
  const seen = new Set<string>();
  return offers
    .sort((a, b) => a.pricePerPerson - b.pricePerPerson)
    .filter((o) => {
      const k = `${o.carrier}|${o.stops}|${o.pricePerPerson}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .slice(0, 8);
}

/* ---- Hotels ---- */

interface AmadeusHotelListItem {
  hotelId: string;
  name?: string;
}
interface AmadeusHotelOffer {
  hotel: { hotelId: string; name?: string; rating?: string };
  offers?: Array<{
    id: string;
    checkInDate: string;
    checkOutDate: string;
    room?: { typeEstimated?: { category?: string }; description?: { text?: string } };
    boardType?: string;
    price: { total?: string; currency?: string };
  }>;
}

export async function searchHotels(opts: {
  checkIn: string;
  checkOut: string;
  adults: number;
  lat: number;
  lon: number;
}): Promise<LiveHotelOffer[]> {
  const list = (await amadeusGet('/v1/reference-data/locations/hotels/by-geocode', {
    latitude: String(opts.lat),
    longitude: String(opts.lon),
    radius: '6',
    radiusUnit: 'KM',
  })) as { data?: AmadeusHotelListItem[] };

  const ids = (list.data ?? []).slice(0, 40).map((h) => h.hotelId);
  if (ids.length === 0) return [];

  const nights = Math.max(
    1,
    Math.round((Date.parse(opts.checkOut) - Date.parse(opts.checkIn)) / 86_400_000)
  );

  const offersJson = (await amadeusGet('/v3/shopping/hotel-offers', {
    hotelIds: ids.join(','),
    checkInDate: opts.checkIn,
    checkOutDate: opts.checkOut,
    adults: String(Math.min(opts.adults, 9)),
    roomQuantity: '1',
    currency: 'EUR',
    bestRateOnly: 'true',
  })) as { data?: AmadeusHotelOffer[] };

  const adults = Math.min(opts.adults, 9);
  return (offersJson.data ?? [])
    .filter((h) => h.offers?.[0]?.price?.total)
    .map((h) => {
      const offer = h.offers![0];
      const total = parseFloat(offer.price.total!);
      return {
        id: `${h.hotel.hotelId}-${offer.id}`,
        name: h.hotel.name ?? h.hotel.hotelId,
        ratingHint: h.hotel.rating ? `${h.hotel.rating}★` : undefined,
        roomDescription:
          offer.room?.typeEstimated?.category?.replaceAll('_', ' ').toLowerCase() ??
          offer.room?.description?.text?.slice(0, 80),
        boardType: offer.boardType?.replaceAll('_', ' ').toLowerCase(),
        totalStay: Math.round(total),
        currency: (offer.price.currency === 'USD' ? 'USD' : 'EUR') as 'USD' | 'EUR',
        perPersonPerNight: Math.round(total / adults / nights),
        deepLink: `https://www.google.com/travel/hotels?q=${encodeURIComponent(h.hotel.name ?? 'ski hotel')}`,
      };
    })
    .sort((a, b) => a.totalStay - b.totalStay)
    .slice(0, 10);
}
