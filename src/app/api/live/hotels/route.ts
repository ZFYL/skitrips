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
  const lat = parseFloat(p.get('lat') ?? '');
  const lon = parseFloat(p.get('lon') ?? '');
  const name = p.get('name') ?? 'this resort';

  const dateOk = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateOk.test(checkIn) || !dateOk.test(checkOut) || Number.isNaN(lat) || Number.isNaN(lon)) {
    return NextResponse.json(
      { error: 'checkIn/checkOut (YYYY-MM-DD) and lat/lon are required' },
      { status: 400 }
    );
  }

  const fetchedAt = new Date().toISOString();

  if (amadeusConfigured()) {
    try {
      const offers = await searchHotels({ checkIn, checkOut, adults, lat, lon });
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
        note: `Live call failed — use the priced catalog below for ${name}.`,
        offers: referenceHotels(),
      };
      return NextResponse.json(body);
    }
  }

  const body: LiveResponse<LiveHotelOffer> = {
    source: 'reference',
    fetchedAt,
    note:
      `No live provider configured (add free Amadeus keys to enable). The priced catalog below is your researched inventory for ${name}.`,
    offers: referenceHotels(),
  };
  return NextResponse.json(body);
}
