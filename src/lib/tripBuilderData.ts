// Supplier data for the internal trip configurator (/ops/trip-builder).
// Prices are consumer (gross, VAT-included where applicable) rates researched
// from public supplier sites, verified July 2026. 2026/27 rates used where the
// supplier has published them (lift pass, Ben's Bus, Fahrenheit Seven);
// otherwise 2025/26 reference rates — expect +2–5% indexation.

export type Unit =
  | 'per_person'          // once per traveler
  | 'per_person_night'    // per traveler per hotel night
  | 'per_person_day'      // per traveler per ski day
  | 'per_vehicle_return'  // per vehicle, round trip (uses capacity)
  | 'per_group';          // flat for the whole group

export type Currency = 'EUR' | 'USD';

export interface SupplierOption {
  id: string;
  name: string;
  tier?: string;
  description: string;
  price: number;
  currency: Currency;
  unit: Unit;
  vatRate: number;        // VAT rate already contained in price (0 if n/a)
  url?: string;
  contact?: string;
  imageUrl?: string;
  capacity?: number;      // per_vehicle_return only
  note?: string;
}

export interface TripComponent {
  id: string;
  label: string;
  icon: string;
  defaultEnabled: boolean;
  defaultOptionId: string;
  unitHint: string;
  options: SupplierOption[];
}

export const UNIT_LABEL: Record<Unit, string> = {
  per_person: 'per person',
  per_person_night: 'per person / night',
  per_person_day: 'per person / ski day',
  per_vehicle_return: 'per vehicle, return',
  per_group: 'flat, whole group',
};

export const components: TripComponent[] = [
  {
    id: 'flights',
    label: 'Flights NYC ⇄ Geneva',
    icon: '✈️',
    defaultEnabled: true,
    defaultOptionId: 'flight-onestop',
    unitHint: 'Round trip, economy',
    options: [
      {
        id: 'flight-onestop',
        name: '1-stop economy (SWISS / Air France)',
        tier: 'Budget',
        description:
          'JFK/EWR → GVA via ZRH or CDG, ~10–12 h door to door. February is usually the cheapest month.',
        price: 550,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-geneva.html',
        note: 'Verified Jan–Mar range $430–$670 round trip; lows ~$420. International air is VAT-exempt.',
      },
      {
        id: 'flight-nonstop',
        name: 'United nonstop JFK → GVA',
        tier: 'Premium',
        description:
          'Seasonal daily nonstop, ~7.5 h eastbound. The comfortable choice for a Saturday-changeover week.',
        price: 1150,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.kayak.com/flight-routes/New-York-John-F-Kennedy-Intl-JFK/Geneva-Geneve-Cointrin-GVA',
        note: 'Winter nonstop band $900–$1,600 round trip.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Hotel — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-sherpa',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-ucpa',
        name: 'UCPA Val Thorens (sports village)',
        tier: 'Budget',
        description:
          'Non-profit all-inclusive sports hostel: 2–4 person rooms, full board, AND 6-day lift pass, equipment and group coaching bundled in one weekly price.',
        price: 530,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.ucpa.com/destinations/val-thorens',
        contact: 'Booking via ucpa.com; UK agent action-outdoors.co.uk',
        note: 'Verified band €380–€680 pp/WEEK all-in. If selected, disable ski pass + rental — they are included. Price shown is the mid band, per person for the whole week.',
      },
      {
        id: 'hotel-sherpa',
        name: 'Hôtel Le Sherpa ★★★S',
        tier: 'Mid',
        description:
          'Family-run since 1976, ski-in/ski-out with panoramic 3 Vallées view, restaurant, Nordic bath, jacuzzi and sauna.',
        price: 89,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.lesherpa.com/en/',
        contact: 'courrier@lesherpa.com · +33 4 79 00 00 70',
        imageUrl: 'https://www.lesherpa.com/uploads/media/le-sherpa-val-thorens-photo-169668.png',
        note: 'From ~€625 pp/week half board (low-season baseline; peak weeks materially higher — check live engine).',
      },
      {
        id: 'hotel-chaviere',
        name: 'Le Val Chavière ★★★',
        tier: 'Mid',
        description:
          'Friendly 3-star in the resort center, ~5 min walk to the lifts, restaurant with half-board dinner. Backup if Le Sherpa allotment is gone.',
        price: 130,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.hotelvalchaviere.com',
        note: 'Estimate — request live group quote; double occupancy, half board.',
      },
      {
        id: 'hotel-f7',
        name: 'Fahrenheit Seven ★★★★',
        tier: 'Premium',
        description:
          '4★ lifestyle ski-in/ski-out hotel at 2,300 m — La Rotisserie & Le Zinc restaurants, Nordic bath, live music. Reopens 27 Nov 2026; winter 2026/27 bookable now.',
        price: 275,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.fahrenheitseven.com/en/destinations/hotel-val-thorens.html',
        contact: 'valtho@fahrenheitseven.com · +33 4 79 00 04 04',
        note: 'Rooms ~€480–599/double/night in season → ≈€250–300 pp HB for 2 sharing. Taxe de séjour and child HB supplements at hotel.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer GVA ⇄ resort',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-bensbus',
    unitHint: '155 km, ~3 h 20 each way',
    options: [
      {
        id: 'transfer-bensbus',
        name: "Ben's Bus shared coach",
        tier: 'Budget',
        description:
          'Low-cost shared coach GVA → Val Thorens, weekends only — built for the Saturday changeover. Operating 2026/27: Sat 5 Dec–24 Apr, Sun 13 Dec–4 Apr.',
        price: 110,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.bensbus.co.uk/ski-transfer/geneva-val-thorens/',
        contact: 'Email via bensbus.co.uk/contact · in-resort emergency +44 7870 941004',
        imageUrl: 'https://www.bensbus.co.uk/wp-content/uploads/2015/08/Geneva-Airport-to-Val-Thorens.jpg',
        note: '2026/27 published: £94 return pp (group rate from £80 return). No weekday services.',
      },
      {
        id: 'transfer-alpybus',
        name: 'Alpybus private van (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private van with a desk in the GVA arrivals hall. Works any day — the option when flights don\'t land on a coach day.',
        price: 700,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        vatRate: 0.10,
        capacity: 8,
        url: 'https://www.alpybus.com/transfers/geneva-val-thorens',
        contact: 'info@alpybus.com · +41 24 539 10 17 · +44 1582 377 197',
        note: 'From ~€330/vehicle one-way off-peak; €600–900 return planning band, peak Saturdays top of band.',
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
          'Full-area pass: Val Thorens, Méribel, Courchevel — "6 days for the price of 5". Valid from 19 Dec 2026.',
        price: 421,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.les3vallees.com/en/skipass',
        contact: 'Val Thorens groups (SETAM): setam@valthorens.com · +33 4 79 00 07 08 · other sectors: contact@s3v.com',
        imageUrl: 'https://www.les3vallees.com/media/cache/hero_single/hiver-ski-alpin-addict-famille-val-thorens-1920x1080-davidandre-051.jpg',
        note: '2026/27 published price. Group manifests: allow 2–3 weeks lead. Ski lifts carry 10% French VAT.',
      },
      {
        id: 'pass-family',
        name: 'Family Flex — everyone at child rate (2026/27)',
        description:
          'Min 3 people: max 2 adults (18–74) + 1–6 children (5–17), same area and duration, one payment — every member pays the child rate.',
        price: 345,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.les3vallees.com/en/skipass/family-flex',
        contact: 'setam@valthorens.com · +33 4 79 00 07 08',
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
        id: 'rental-prosneige',
        name: 'Prosneige 3★ "Sensation" pack',
        description:
          'Mid-tier skis or board + boots, fitted in the resort shop (open 9:00–19:00 daily), online booking discounts, free mid-week swaps.',
        price: 245,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://en.prosneige.fr/info-val-thorens-equipment-rental-prices/',
        contact: 'Form: en.prosneige.fr/info-contact-us',
        note: '€226 skis+boots (verified) + ~€15–20 helmet in the engine. Rental carries 20% French VAT.',
      },
      {
        id: 'rental-skiset',
        name: 'Skiset economy pack',
        tier: 'Budget',
        description:
          'Entry/mid pack from the biggest rental network in the Alps; up to 50% off booking online in advance.',
        price: 200,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.skiset.co.uk/ski-resort/val-thorens',
        note: 'Engine-priced; estimate for a mid-January week.',
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
      {
        id: 'ins-us-policy',
        name: 'World Nomads Standard (US resident)',
        description:
          '10-day Europe policy with skiing included on all plans: emergency medical, evacuation, trip protection.',
        price: 85,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.worldnomads.com/usa/travel-insurance-for-skiing-and-snowboarding',
        note: 'Verified band ~$50–100 for 10 days (age- and trip-cost-dependent; ~$37/7 days at age 30).',
      },
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
          '2h45 sessions, 6 consecutive mornings (ages 13+, 3–12 per group), meeting at the Pionniers lift.',
        price: 235,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://booking.valthorens.com/aesf-aesfadam/group-ski-lessons-5-or-6-mornings-from-13-years-old.html',
        contact: '+33 4 79 00 02 86 · bookings +33 4 79 00 01 06 · WhatsApp +33 6 13 88 55 92',
        imageUrl: 'https://ublo-file-manager.valraiso.net/assets/esfvalthorens/1500_750/IMG_8325.jpg',
        note: 'Verified €230–240 (2025/26). ESF tuition is VAT-exempt (sports education).',
      },
      {
        id: 'esf-private',
        name: 'ESF private instructor — half day',
        tier: 'Premium',
        description:
          'Private instructor or guide for your group per half-day engagement; lift pass not included.',
        price: 590,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.esf-valthorens.com/cours-prives/ski/',
        contact: '+33 4 79 00 01 06',
        note: 'In-season half-day band €540–645; short privates (1h30–2h) €220–297. Confirm slot in engine.',
      },
    ],
  },
];

// Operational playbook shown on the page and in the internal PDF.
export const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week: the whole Tarentaise (hotels, ESF Sunday course starts, Ben\'s Bus weekend rotations) runs on Saturday changeover. Hold flights (1-stop fares bottom out ~2–3 months ahead; February is the cheapest month). Request the hotel allotment: standard French Alps group terms are a 30% deposit on confirmation and the balance ~30 days before arrival; cancellation inside 30 days forfeits the full amount. Negotiate the allotment release date (typically 60–90 days pre-arrival).',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Val Thorens lifts are run by SETAM (not S3V): email the group manifest to setam@valthorens.com (+33 4 79 00 07 08) for batch pass quotes — allow 2–3 weeks; passes are issued for pickup or hotel delivery. Book Ben\'s Bus seats (2026/27: Saturdays 5 Dec–24 Apr, Sundays 13 Dec–4 Apr; group rate from £80 return) or reserve Alpybus vans matched to flight times for any-day arrivals.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes. Issue insurance (US policy per traveler + Carré Neige added to each pass at €3.50/day). Pay the hotel balance. Send suppliers flight numbers for transfer pickup; confirm ESF course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat morning GVA arrival → coach or van up (~3 h 20) → check-in, passes at the desk, rental fitting in the hotel ski room → ski Sun–Fri (ESF courses start Sunday) → Sat morning transfer down, afternoon flight home. Keep ≥4 h between GVA landing and the transfer cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Taxe de séjour (Les Belleville commune) is charged per adult per night on top of room rates: ≈€1.65 (3★) to ≈€2.50 (4★) including the 10% Savoie surcharge — confirm the season grid with the tourist office. French VAT in these prices: hotels, half-board, transfers and lifts 10%; equipment rental 20%; ESF tuition and insurance exempt; international flights zero-rated. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];
