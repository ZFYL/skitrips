// Reference fallback provider — serves the researched July-2026 market bands
// when no Amadeus credentials are configured or the live call fails, so the
// configurator always works. Clearly labeled `source: 'reference'` in the UI.

import type { LiveFlightOffer, LiveHotelOffer } from './types';

export function referenceFlights(adults: number): LiveFlightOffer[] {
  void adults; // per-person pricing; kept for interface symmetry
  return [
    {
      id: 'ref-lx',
      carrier: 'SWISS (LX)',
      stops: 1,
      outboundDuration: '10h 05m',
      itinerary: 'JFK → ZRH → GVA · return GVA → ZRH → JFK',
      pricePerPerson: 550,
      currency: 'USD',
      deepLink: 'https://www.google.com/travel/flights/flights-from-new-york-to-geneva.html',
    },
    {
      id: 'ref-af',
      carrier: 'Air France (AF)',
      stops: 1,
      outboundDuration: '10h 45m',
      itinerary: 'JFK → CDG → GVA · return GVA → CDG → JFK',
      pricePerPerson: 590,
      currency: 'USD',
      deepLink: 'https://www.google.com/travel/flights/flights-from-new-york-to-geneva.html',
    },
    {
      id: 'ref-ua',
      carrier: 'United (UA)',
      stops: 0,
      outboundDuration: '7h 30m',
      itinerary: 'JFK → GVA nonstop · return GVA → JFK',
      pricePerPerson: 1150,
      currency: 'USD',
      deepLink: 'https://www.kayak.com/flight-routes/New-York-John-F-Kennedy-Intl-JFK/Geneva-Geneve-Cointrin-GVA',
    },
  ];
}

export function referenceHotels(checkIn: string, checkOut: string, adults: number): LiveHotelOffer[] {
  const nights = Math.max(
    1,
    Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000)
  );
  const mk = (
    id: string,
    name: string,
    ratingHint: string,
    perPersonPerNight: number,
    boardType: string,
    deepLink: string
  ): LiveHotelOffer => ({
    id,
    name,
    ratingHint,
    boardType,
    perPersonPerNight,
    totalStay: perPersonPerNight * nights * adults,
    currency: 'EUR',
    deepLink,
  });
  return [
    mk('ref-ucpa', 'UCPA Val Thorens (all-in sports village)', 'hostel', 76, 'full board + pass + gear', 'https://www.ucpa.com/destinations/val-thorens'),
    mk('ref-sherpa', 'Hôtel Le Sherpa', '3★S', 89, 'half board', 'https://www.lesherpa.com/en/'),
    mk('ref-chaviere', 'Le Val Chavière', '3★', 130, 'half board', 'https://www.hotelvalchaviere.com'),
    mk('ref-f7', 'Fahrenheit Seven', '4★', 275, 'half board', 'https://www.fahrenheitseven.com/en/destinations/hotel-val-thorens.html'),
  ];
}
