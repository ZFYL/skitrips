// Shared types for the live-data provider layer (/api/live/*).
// Providers are pluggable: implement these result shapes and register the
// provider in the route handler. Current providers: Amadeus Self-Service
// (free key, https://developers.amadeus.com) and a static reference fallback.

export interface LiveFlightOffer {
  id: string;
  carrier: string;          // e.g. "SWISS (LX)"
  stops: number;            // 0 = nonstop, per outbound leg
  outboundDuration: string; // e.g. "9h 35m"
  itinerary: string;        // "JFK → ZRH → GVA · return GVA → ZRH → JFK"
  pricePerPerson: number;
  currency: 'USD' | 'EUR';
  deepLink?: string;        // where to actually book/verify
}

export interface LiveHotelOffer {
  id: string;
  name: string;
  ratingHint?: string;      // stars or category if known
  roomDescription?: string;
  boardType?: string;
  totalStay: number;        // whole stay, all requested guests
  currency: 'USD' | 'EUR';
  perPersonPerNight: number;
  deepLink?: string;
}

export interface LiveResponse<T> {
  source: 'amadeus' | 'reference';
  fetchedAt: string;
  note?: string;
  error?: string;
  offers: T[];
}
