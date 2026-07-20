import { NextRequest, NextResponse } from 'next/server';
import { amadeusConfigured, searchFlights } from '@/lib/live/amadeus';
import { referenceFlights } from '@/lib/live/reference';
import type { LiveFlightOffer, LiveResponse } from '@/lib/live/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const origin = (p.get('origin') ?? 'JFK').toUpperCase().slice(0, 3);
  const destination = (p.get('destination') ?? 'GVA').toUpperCase().slice(0, 3);
  const departDate = p.get('depart') ?? '';
  const returnDate = p.get('return') ?? '';
  const adults = Math.max(1, parseInt(p.get('adults') ?? '2', 10) || 2);

  const dateOk = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateOk.test(departDate) || !dateOk.test(returnDate)) {
    return NextResponse.json(
      { error: 'depart and return must be YYYY-MM-DD' },
      { status: 400 }
    );
  }

  const fetchedAt = new Date().toISOString();

  if (amadeusConfigured()) {
    try {
      const offers = await searchFlights({ origin, destination, departDate, returnDate, adults });
      const body: LiveResponse<LiveFlightOffer> = {
        source: 'amadeus',
        fetchedAt,
        note:
          process.env.AMADEUS_ENV === 'production'
            ? 'Live Amadeus production fares.'
            : 'Amadeus test environment — indicative market fares, verify before quoting.',
        offers,
      };
      return NextResponse.json(body);
    } catch (e) {
      const body: LiveResponse<LiveFlightOffer> = {
        source: 'reference',
        fetchedAt,
        error: e instanceof Error ? e.message : 'Amadeus call failed',
        note: 'Live call failed — showing researched reference fares (July 2026).',
        offers: referenceFlights(origin, destination),
      };
      return NextResponse.json(body);
    }
  }

  const body: LiveResponse<LiveFlightOffer> = {
    source: 'reference',
    fetchedAt,
    note:
      'No Amadeus credentials configured (free at developers.amadeus.com — set AMADEUS_CLIENT_ID / AMADEUS_CLIENT_SECRET). Showing researched reference fares.',
    offers: referenceFlights(origin, destination),
  };
  return NextResponse.json(body);
}
