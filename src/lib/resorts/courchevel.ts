// Courchevel, France — the luxury flagship of Les 3 Vallées, added to the
// catalog. Shape mirrors val-thorens.ts (see resorts/types.ts for the schema;
// resorts/shared.ts for reusable options like US_INSURANCE).

import type { Resort, SnowMonth } from './types';
import type { TripComponent } from '../tripBuilderData';
import { alpineWeeks } from '../seasonData';
import { US_INSURANCE } from './shared';

const components: TripComponent[] = [
  {
    id: 'flights',
    label: 'Getting there',
    icon: '✈️',
    defaultEnabled: true,
    defaultOptionId: 'flight-onestop',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-onestop',
        name: 'JFK 1-stop economy (Air France / Lufthansa)',
        tier: 'Budget',
        description:
          'JFK → GVA via CDG, FRA, AMS or LHR, ~10–12 h door to door. Geneva is Courchevel’s primary international gateway (~190 km).',
        price: 580,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.kayak.com/flight-routes/New-York-John-F-Kennedy-Intl-JFK/Geneva-Geneve-Cointrin-GVA',
        note: 'Winter 1-stop band ~$450–$700 round trip; off-peak fares from ~$540. International air is VAT-exempt.',
      },
      {
        id: 'flight-nonstop',
        name: 'SWISS nonstop JFK → GVA',
        tier: 'Premium',
        description:
          'Seasonal ~6×/week nonstop, ~7h50 eastbound — the comfortable choice for a Saturday-changeover week.',
        price: 850,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.swiss.com/lhg/us/en/o-d/cy-cy/new-york-geneva',
        note: 'Winter nonstop band ~$700–$1,000 round trip; Christmas/New Year and February half-term push over $1,000.',
      },
      {
        id: 'flight-eu',
        name: 'Intra-EU flight → Geneva',
        tier: 'From Europe',
        description:
          'Short-haul round trip to GVA from a European city (LHR/AMS/BER/MAD class of routes) for group members already in Europe.',
        price: 165,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20GVA',
        note: 'Typical €80–250 round trip booked ahead; EasyJet/BA/KLM/Lufthansa. Quoted fares are final.',
      },
      {
        id: 'train-eu',
        name: 'Rail from Europe → Moûtiers',
        tier: 'From Europe',
        description:
          'High-speed rail to Moûtiers (TGV from Paris ~4h30; connections from most EU capitals) — combine with the Altibus S65 coach up to Courchevel.',
        price: 130,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.sncf-connect.com/en-en/train/route/paris/moutiers',
        note: 'Paris–Moûtiers TGV from ~€50 each way booked early; winter Saturday Eurostar Ski Train alternatives exist. Add Altibus in the transfer component.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-loze',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-flocons',
        lat: 45.423881,
        lon: 6.640645,
        name: 'Hôtel Les Flocons ★★★ (Courchevel Village 1550)',
        tier: 'Budget',
        description:
          'Family-run ski-in/ski-out 3★ with spa in Courchevel Village — rare good value in an expensive resort.',
        price: 465,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.courchevel-hotel-flocons.com/en/',
        contact: 'info@courchevel-hotel-flocons.com · +33 4 79 08 02 70',
        imageUrl: 'https://www.courchevel-hotel-flocons.com/wp-content/uploads/2019/02/hotel-les-flocons-courchevel-3vallees-2.jpg',
        note: 'Official 2026/27 rate card: standard double half-board €465 (low) / €495 (high); B&B from €350.',
      },
      {
        id: 'hotel-loze',
        lat: 45.41523,
        lon: 6.63136,
        name: 'Hôtel de la Loze ★★★ (Courchevel 1850)',
        tier: 'Mid',
        description:
          'Cosy Savoyard chalet 3★ at the foot of the slopes in Courchevel 1850, on a bed-and-breakfast basis.',
        price: 285,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.la-loze.com/',
        contact: '+33 4 79 08 28 25 · WhatsApp +33 7 49 07 83 39',
        imageUrl: 'https://www.la-loze.com/cdn-cgi/image/quality=70,format=auto,onerror=redirect,metadata=none/wp-content/uploads/2025/10/experiences-a-la-loze-1.webp',
        note: 'Winter B&B estimate ~€230–340/room/night (not officially published) — request a group quote. Position approximate.',
      },
      {
        id: 'hotel-peupliers',
        lat: 45.431985,
        lon: 6.622005,
        name: 'Hôtel Les Peupliers ★★★★ (Le Praz 1300)',
        tier: 'Premium',
        description:
          'Warm 4★ hotel-restaurant with spa beside the lake in quiet Le Praz — Courchevel’s traditional lower village.',
        price: 320,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.lespeupliers.com/en/',
        contact: 'infos@lespeupliers.com · +33 4 79 08 41 47',
        imageUrl: 'https://www.lespeupliers.com/_novaimg/5170643-1606272_0_0_3556_2668_1200_900.jpg',
        note: 'Winter estimate ~€250–400/room/night B&B (half-board on supplement) — engine-priced.',
      },
      {
        id: 'hotel-annapurna',
        lat: 45.4012022,
        lon: 6.6373917,
        name: 'Hôtel Annapurna ★★★★★ (Courchevel 1850)',
        tier: 'Luxury',
        description:
          'Large family-run 5★ with spa and pool in a panoramic slope-side setting near the altiport — the highest hotel in the resort.',
        price: 650,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.annapurna-courchevel.com/en/',
        contact: '+33 4 79 08 04 60',
        imageUrl: 'https://www.annapurna-courchevel.com/_novaimg/4818242-1542274_0_148_4793_3052_2200_1400.jpg',
        note: 'Quote-on-request; winter high-season estimate ~€500–950 pp/night half-board (≈€900–1,700/room for 2).',
      },
      {
        id: 'hotel-aman',
        lat: 45.412922,
        lon: 6.636318,
        name: 'Aman Le Mélézin ★★★★★ (Courchevel 1850)',
        tier: 'Palace',
        description:
          'Serene, understated Aman ski retreat on the Bellecôte piste with direct piste access, spa and pool. Reopens ~10 Dec 2026.',
        price: 3500,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.aman.com/resorts/aman-le-melezin',
        contact: 'melezin@aman.com · +33 4 79 08 01 33',
        imageUrl: 'https://www.aman.com/sites/default/files/2025-11/Aman%20Le%20Melezin%2C%20France%20-%20Resort%2C%20Exterior%20%285%29.jpg',
        note: 'Aman does not publish rates; press/aggregator band ~€3,350 (low) to €6,200 (high)/room/night incl. breakfast + a meal. Planning figure.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer GVA ⇄ Courchevel',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-bensbus',
    unitHint: '190 km, ~2 h 25 each way',
    options: [
      {
        id: 'transfer-bensbus',
        name: "Ben's Bus shared coach",
        tier: 'Budget',
        description:
          'Low-cost shared coach GVA → Moûtiers/Courchevel, weekends only — built for the Saturday changeover.',
        price: 100,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.bensbus.co.uk/shared-airport-ski-transfers/geneva/',
        contact: 'Email via bensbus.co.uk/contact',
        note: 'Return from under £80 pp with group rate (~€90); other shared operators ~€100–120 return.',
      },
      {
        id: 'transfer-train',
        name: 'Train + Altibus S65 (public transport)',
        tier: 'Budget',
        description:
          'TGV/TER to Moûtiers, then Altibus line S65 coach Moûtiers → Courchevel (~40 min; luggage + skis included). Runs daily — the flexible budget route.',
        price: 90,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.altibus.com/en/top-destinations/courchevel/',
        contact: 'Altibus booking: booking.altibus.com',
        note: 'S65 ~€12 one-way (~€24 return; 10% online discount, reduced under-26) + rail Geneva → Moûtiers €20–45 each way.',
      },
      {
        id: 'transfer-alpinbus',
        name: 'AlpinBus private van (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private van from Geneva matched to flight times, any day — the option when flights don’t land on a coach day.',
        price: 600,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.10,
        url: 'https://www.alpinbus.com/transfers-in-france/geneva-airport-to-courchevel/',
        contact: 'Via alpinbus.com',
        note: 'From ~€250–400/van one-way → ~€500–700 return; peak Saturdays top of band. Quote-based.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Les 3 Vallées',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-adult',
    unitHint: '600 km of pistes, one pass',
    options: [
      {
        id: 'pass-adult',
        name: '6-day adult 3 Vallées pass (2026/27)',
        description:
          'Full-area pass: Courchevel, Méribel, Val Thorens — the world’s largest linked ski area. Priced as the 5-day; the extra day is free.',
        price: 421,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.les3vallees.com/en/skipass/adult-week-solo-pass',
        contact: 'Courchevel lifts run by S3V: contact@s3v.com · via les3vallees.com contacts',
        imageUrl: 'https://www.les3vallees.com/media/cache/hero_single/hiver-ski-alpin-addict-famille-val-thorens-1920x1080-davidandre-051.jpg',
        note: '2026/27 published price. Group manifests: allow 2–3 weeks lead. Ski lifts carry 10% French VAT.',
      },
      {
        id: 'pass-family',
        name: 'Family Flex — everyone at child rate (2026/27)',
        description:
          'Min 3 people: max 2 adults (18–74) + 1–6 children (5–17), same area and duration, one payment — every member pays the child rate.',
        price: 335,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.les3vallees.com/en/guide/all-skipasses/week-passes',
        contact: 'contact@s3v.com',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-prosneige',
    unitHint: 'Skis + boots + helmet',
    options: [
      {
        id: 'rental-skiset',
        name: 'Skiset economy pack',
        tier: 'Budget',
        description:
          'Entry/mid pack from the biggest rental network in the Alps; up to 50% off booking online in advance, resort pickup.',
        price: 160,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.skiset.co.uk/ski-hire/courchevel',
        note: 'Mid-range 6-day adult ski+boots ~€130–190; engine-priced. Rental carries 20% French VAT.',
      },
      {
        id: 'rental-intersport',
        name: 'Intersport medium pack',
        tier: 'Budget',
        description:
          'Multiple village outlets (1850 / 1650 / 1550 / Le Praz); 6-day medium-range adult rentals with online discounts.',
        price: 180,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.intersport-rent.fr/en/',
        note: 'Medium-range 6-day adult ~€150–210; engine-priced.',
      },
      {
        id: 'rental-prosneige',
        name: 'Prosneige mid "Sensation" pack',
        tier: 'Mid',
        description:
          'Quality mid-range skis or board + boots fitted in the Courchevel 1850 / Moriond shop, with free mid-week swaps.',
        price: 195,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.prosneige.com',
        note: '6-day mid pack ~€160–220; online booking cheaper. Rental carries 20% French VAT.',
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: '🛡️',
    defaultEnabled: true,
    defaultOptionId: 'ins-us-policy',
    unitHint: 'Medical + cancellation + piste rescue',
    options: [
      ...US_INSURANCE,
      {
        id: 'ins-carre-neige',
        name: 'Carré Neige (piste rescue) — 7 days',
        description:
          'French resort insurance sold with the lift pass: piste rescue & helicopter with no upfront payment, medical top-up, repatriation, unused-pass refund. €50,000 limit, max €50 excess.',
        price: 24.5,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://carreneige.com/en/nos-offres/carre-neige/',
        note: '€3.50/day, bought at lift-pass checkout. Insurance-premium tax included; VAT-exempt.',
      },
    ],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'esf-group',
    unitHint: 'English-speaking instructors',
    options: [
      {
        id: 'esf-group',
        name: 'ESF adult group course — 6 mornings',
        description:
          '6 consecutive mornings with the resort’s biggest school (branches in 1850 / 1650 / 1550), English-speaking instructors.',
        price: 255,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.esfcourchevel.com',
        contact: 'Via esfcourchevel.com branch booking',
        note: 'Adult group estimate ~€230–280 — confirm on the booking page. ESF tuition is VAT-exempt (sports education).',
      },
      {
        id: 'esf-private',
        name: 'ESF private instructor — half day',
        tier: 'Premium',
        description:
          'Private instructor for your group per half-day (~3 h) engagement; lift pass not included.',
        price: 360,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.esfcourchevel.com',
        contact: 'Via esfcourchevel.com',
        note: 'Half-day estimate ~€300–420 in season. Confirm slot in the engine.',
      },
      {
        id: 'newgen-group',
        name: 'New Generation group / private',
        tier: 'Mid',
        description:
          'English-run school with small adult groups and private lessons across Courchevel; the popular anglophone alternative to ESF.',
        price: 300,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skinewgen.com/resorts/courchevel/',
        contact: 'Via skinewgen.com',
        note: 'Group course estimate; private half-day ~€350–450. Confirm the exact package on the booking page.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week: the whole Tarentaise (hotels, ESF Sunday course starts, Ben\'s Bus weekend rotations) runs on Saturday changeover. Choose the village — 1850 for glamour and altiport, Le Praz/Moriond/1550 for value. Hold GVA flights (1-stop fares bottom out ~2–3 months ahead; February is the cheapest long-haul month). Request the hotel allotment: standard French Alps group terms are a 30% deposit on confirmation and the balance ~30 days before arrival.',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Courchevel lifts are run by S3V within the 3 Vallées network: buy the 6-day adult pass (€421) or Family Flex (€335) at les3vallees.com — home delivery or in-resort click & collect, free refund if no lift is used. Book Ben\'s Bus weekend seats or reserve an AlpinBus van matched to flight times for any-day arrivals; the Altibus S65 from Moûtiers is the daily public alternative.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes. Issue insurance (US policy per traveler + Carré Neige added to each pass at €3.50/day). Pay the hotel balance. Send suppliers flight numbers for transfer pickup; confirm ESF or New Generation course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat morning GVA arrival → coach or van up (~2 h 25) → check-in, passes at the desk, rental fitting → ski Sun–Fri (ESF courses start Sunday) → Sat morning transfer down, afternoon flight home. Keep ≥4 h between GVA landing and the transfer cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Taxe de séjour (commune Saint-Bon-Tarentaise / Courchevel) is charged per adult per night on top of room rates, banded by hotel classification (palaces at the top band; unclassified capped ~€5.28/adult/night; new rates from 1 Jan 2026) — confirm the grid with the mairie (taxedesejour@mairie-courchevel.com). French VAT in these prices: hotels, half-board, transfers and lifts 10%; equipment rental 20%; ESF tuition and insurance exempt; international flights zero-rated. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const COURCHEVEL_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 37, base: 26, top: 26 },
  { month: 'Dec', snowfall: 103, base: 56, top: 87 },
  { month: 'Jan', snowfall: 116, base: 91, top: 96 },
  { month: 'Feb', snowfall: 96, base: 123, top: 147 },
  { month: 'Mar', snowfall: 66, base: 132, top: 160 },
  { month: 'Apr', snowfall: 33, base: 126, top: 150 },
];

export const courchevel: Resort = {
  id: 'courchevel',
  name: 'Courchevel',
  country: 'France',
  flag: '\u{1F1EB}\u{1F1F7}',
  area: 'Les 3 Vallées',
  blurb:
    'The glamorous, luxury flagship of Les 3 Vallées — the world’s largest linked ski area (~600 km) — famous for palaces, Michelin dining and its own altiport.',
  lat: 45.4159,
  lon: 6.6347,
  elevationM: 1850,
  currency: 'EUR',
  gatewayAirports: ['GVA', 'LYS', 'CMF', 'GNB'],
  defaultOrigin: 'JFK',
  mapsName: 'Courchevel 1850',
  saturdayChangeover: true,
  season: { open: '2026-12-05', close: '2027-04-19', linkOpen: '2026-12-05', linkClose: '2027-04-19' },
  weeks: alpineWeeks,
  snowByMonth: COURCHEVEL_SNOW,
  snowFacts:
    'High-altitude, largely north-facing terrain from Le Praz (1,300 m) to La Saulire (2,740 m) with extensive snowmaking makes Courchevel very snow-sure across the Dec–Apr core season. ~418–540 cm average annual snowfall.',
  components,
  logistics,
};

export default courchevel;
