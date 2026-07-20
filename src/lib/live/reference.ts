// Reference fallback provider — used when no Amadeus credentials are configured
// or a live call fails, so the configurator always works. Resort-agnostic:
// indicative fares by destination, and hotels defer to the priced catalog.
// Clearly labeled `source: 'reference'` in the UI.

import type { LiveFlightOffer, LiveHotelOffer } from './types';

// Indicative long-haul vs short-haul bands by destination gateway. Deep-links
// go to a live Google Flights search so the operator can verify instantly.
export function referenceFlights(origin: string, destination: string): LiveFlightOffer[] {
  const search = `https://www.google.com/travel/flights?q=Flights%20${origin}%20to%20${destination}`;
  return [
    {
      id: 'ref-economy',
      carrier: 'Indicative economy',
      stops: 1,
      outboundDuration: '—',
      itinerary: `${origin} → ${destination} (1-stop economy band)`,
      pricePerPerson: 650,
      currency: 'USD',
      deepLink: search,
    },
    {
      id: 'ref-premium',
      carrier: 'Indicative nonstop / premium',
      stops: 0,
      outboundDuration: '—',
      itinerary: `${origin} → ${destination} (nonstop / premium band)`,
      pricePerPerson: 1150,
      currency: 'USD',
      deepLink: search,
    },
  ];
}

// Without a live provider, defer to the priced catalog shown on the page.
export function referenceHotels(): LiveHotelOffer[] {
  return [];
}
