import { NextRequest, NextResponse } from 'next/server';
import { amadeusConfigured, searchHotels } from '@/lib/live/amadeus';
import { referenceHotels } from '@/lib/live/reference';
import type { LiveHotelOffer, LiveResponse } from '@/lib/live/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const checkIn = p.get('checkIn') ?? '';
  const checkOut = p.get('checkOut') ?? '';
  const adults = Math.max(1, parseInt(p.get('adults') ?? '2', 10) || 2);

  const dateOk = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateOk.test(checkIn) || !dateOk.test(checkOut)) {
    return NextResponse.json(
      { error: 'checkIn and checkOut must be YYYY-MM-DD' },
      { status: 400 }
    );
  }

  const fetchedAt = new Date().toISOString();

  if (amadeusConfigured()) {
    try {
      const offers = await searchHotels({ checkIn, checkOut, adults });
      const body: LiveResponse<LiveHotelOffer> = {
        source: 'amadeus',
        fetchedAt,
        note:
          (process.env.AMADEUS_ENV === 'production'
            ? 'Live Amadeus production rates.'
            : 'Amadeus test environment — indicative rates, verify before quoting.') +
          ' Room rates are converted to per-person/night across the whole party.',
        offers,
      };
      return NextResponse.json(body);
    } catch (e) {
      const body: LiveResponse<LiveHotelOffer> = {
        source: 'reference',
        fetchedAt,
        error: e instanceof Error ? e.message : 'Amadeus call failed',
        note: 'Live call failed — showing researched reference rates (July 2026).',
        offers: referenceHotels(checkIn, checkOut, adults),
      };
      return NextResponse.json(body);
    }
  }

  const body: LiveResponse<LiveHotelOffer> = {
    source: 'reference',
    fetchedAt,
    note:
      'No Amadeus credentials configured (free at developers.amadeus.com — set AMADEUS_CLIENT_ID / AMADEUS_CLIENT_SECRET). Showing researched reference rates.',
    offers: referenceHotels(checkIn, checkOut, adults),
  };
  return NextResponse.json(body);
}
