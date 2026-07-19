// Supplier data for the internal trip configurator (/ops/trip-builder).
// Prices are consumer (gross, VAT-included where applicable) rates researched
// from public supplier sites, verified July 2026. 2026/27 rates used where the
// supplier has published them (lift pass, Ben's Bus, Fahrenheit Seven);
// otherwise 2025/26 reference rates — expect +2–5% indexation.

export type Unit =
  | 'per_person'          // once per traveler
  | 'per_person_night'    // per traveler per hotel night
  | 'per_person_day'      // per traveler per ski day
  | 'per_room_night'      // per room per night (capacity = occupancy, default 2)
  | 'per_unit_week'       // per apartment/chalet per week (capacity = sleeps)
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
  images?: string[];      // extra gallery images (room photos etc.)
  capacity?: number;      // occupancy/sleeps/vehicle seats depending on unit
  lat?: number;           // map position (hotels)
  lon?: number;
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
  per_room_night: 'per room / night',
  per_unit_week: 'per apartment / week',
  per_vehicle_return: 'per vehicle, return',
  per_group: 'flat, whole group',
};

export const components: TripComponent[] = [
  {
    id: 'flights',
    label: 'Flights US ⇄ Geneva',
    icon: '✈️',
    defaultEnabled: true,
    defaultOptionId: 'flight-onestop',
    unitHint: 'Round trip, economy',
    options: [
      {
        id: 'flight-onestop',
        name: 'JFK 1-stop economy (SWISS / Air France)',
        tier: 'Budget',
        description:
          'JFK → GVA via ZRH or CDG, ~10–12 h door to door. February is usually the cheapest month.',
        price: 550,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-geneva.html',
        note: 'Verified Jan–Mar range $430–$670 round trip; lows ~$420. International air is VAT-exempt.',
      },
      {
        id: 'flight-ewr',
        name: 'EWR 1-stop economy',
        tier: 'Budget',
        description: 'Newark → GVA connecting itineraries (e.g. via CPH); February cheapest.',
        price: 650,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.kayak.com/flight-routes/Newark-EWR/Geneva-Geneve-Cointrin-GVA',
        note: 'Winter band ~$500–$800 round trip; deals from ~$590.',
      },
      {
        id: 'flight-bos',
        name: 'BOS 1-stop economy',
        tier: 'Budget',
        description: 'Boston → GVA on Finnair / Air Canada connections.',
        price: 600,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.momondo.com/flights/boston/geneva',
        note: 'Winter band ~$540–$670 round trip; Jan average ~$536.',
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
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-sherpa',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-ucpa',
        lat: 45.2984,
        lon: 6.5698,
        name: 'UCPA Val Thorens (sports village)',
        tier: 'Hostel',
        description:
          'Non-profit all-inclusive sports residence: 2–4 person rooms, full board, AND 6-day lift pass, equipment and coaching bundled in one weekly price. Ages 18–55.',
        price: 515,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.ucpa.co.uk/resorts-in-france/snow/val-thorens/',
        contact: 'Booking via ucpa.com / UK agent action-outdoors.co.uk',
        imageUrl: 'https://www.ucpa.co.uk/media/3vjmscor/val-thorens-5-images1.jpg',
        note: '2026/27 published £422–£462 pp/WEEK all-in (26 Dec–10 Apr). If selected, disable ski pass + rental — included.',
      },
      {
        id: 'hotel-clubmed',
        lat: 45.2991,
        lon: 6.5785,
        name: 'Club Med Val Thorens Sensations',
        tier: 'Club',
        description:
          '4-Trident ski-in/ski-out all-inclusive: lift pass, group lessons, all meals, open bar and entertainment in one weekly price.',
        price: 1700,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.clubmed.us/r/val-thorens-sensations/y',
        contact: 'US +1 888 932 2582 · UK 03453 676767',
        imageUrl: 'https://assets.dream.clubmed/pm_7531_414_414721-5ejk5pfxl4-swhr.jpg',
        note: 'From-rate ≈ £1,850 pp/week incl. UK flights+transfers (Iglu); US quotes via engine. Pass + lessons included — disable those components.',
      },
      {
        id: 'hotel-sherpa',
        lat: 45.2981,
        lon: 6.5853,
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
        images: [
          'https://www.lesherpa.com/uploads/media/le-sherpa-val-thorens-photo-169612.jpg',
          'https://www.lesherpa.com/uploads/media/le-sherpa-val-thorens-photo-193976.jpg',
        ],
        note: 'From ~€625 pp/week half board (low-season baseline; peak weeks materially higher — check live engine).',
      },
      {
        id: 'hotel-chaviere',
        lat: 45.2966,
        lon: 6.5831,
        name: 'Le Val Chavière ★★★',
        tier: 'Mid',
        description:
          'Family-run 49-room ski-in/ski-out 3★ near the Pionniers chairlift — buffet breakfast, five-course half-board dinners.',
        price: 130,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.valthorens.com/en/hotel/hotel-val-chaviere/',
        contact: 'Via Val Thorens Réservation +33 4 79 00 01 06',
        imageUrl: 'https://static1.sno.co.uk/images/accom/v7/wlc/b38fac60-1a35-49e9-913e-269ca2a0ef79.jpg',
        note: 'Operator ref: from £1,289 pp/week HB incl. UK flights (Jan 2027, 3 sharing). Estimate pp/night for direct allotment — request group quote.',
      },
      {
        id: 'hotel-marielle',
        lat: 45.2962,
        lon: 6.5801,
        name: 'Hôtel Marielle ★★★★',
        tier: 'Premium',
        description:
          '4★ MMV hotel in the resort centre at the foot of the slopes with spa, indoor pool and half-board options.',
        price: 245,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.hotelmarielle.com/en',
        contact: 'reservation@hotelmarielle.com · +33 4 58 24 00 80',
        imageUrl: 'https://cdn.prod.website-files.com/65ae7cf6afbedc03c5c995d9/65cba882a5a9ed81794bc91c_hotel-marielle%20(1).webp',
        note: 'From ~$267/room/night third-party reference; date-driven engine on official site.',
      },
      {
        id: 'hotel-f7',
        lat: 45.2953,
        lon: 6.5839,
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
        imageUrl: 'https://www.fahrenheitseven.com/images/val-thorens/chambres/chambre-double/farenheit-seven-hotel-val-thorens-chambre-2-personnes-19.jpg',
        note: 'Rooms ~€480–599/double/night in season → ≈€250–300 pp HB for 2 sharing. Dynamic pricing — check engine.',
      },
      {
        id: 'hotel-altapura',
        lat: 45.2973,
        lon: 6.5744,
        name: 'Altapura Hôtel & Spa ★★★★★',
        tier: 'Luxury',
        description:
          '88-room 5★ ski-in/ski-out with 1,000 m² spa, three restaurants and slope-side terrace at the foot of the Péclet glacier runs.',
        price: 520,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://en.altapura.fr/',
        contact: 'contact@altapura.fr · +33 4 30 05 03 40',
        imageUrl: 'https://cdn.prod.website-files.com/5fac4fd4860ce86803c6289b/639e0217a7cb3c102002639f_2212-01_107_chambre_altapura_2500px_srgb_bd.jpg',
        note: 'From ~€330/room/night low season (verified); peak winter substantially higher — €520 is a mid-winter planning figure.',
      },
      {
        id: 'hotel-fitzroy',
        lat: 45.2983,
        lon: 6.5830,
        name: 'Le Fitz Roy (Beaumier) ★★★★★',
        tier: 'Luxury',
        description:
          'Beaumier-group 5★ hotel above Place Caron — the classic luxury address of Val Thorens.',
        price: 900,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.beaumier.com/en/properties/le-fitz-roy-hotel/',
        contact: 'lefitzroy@beaumier.com',
        imageUrl: 'https://www.beaumier.com/media/z4onfxml/l1030506.jpg',
        note: 'Winter average ~$900/room/night; from ~$346 low season.',
      },
      {
        id: 'hotel-montana',
        lat: 45.2972,
        lon: 6.5848,
        name: 'Résidence Montana Plein Sud (apartments)',
        tier: 'Apartment',
        description:
          'South-facing slope-side apartment residence with spa/pool access: 2-bed 55 m² (4 pax), 3-bed 75 m² (6 pax), 4-bed 100 m² (8 pax). Self-catered.',
        price: 2600,
        currency: 'EUR',
        unit: 'per_unit_week',
        capacity: 4,
        vatRate: 0.10,
        url: 'https://www.village-montana.com/en/val-thorens/residence-montana-plein-sud',
        contact: '+33 4 26 78 26 78 (Mon–Thu 9–18, Fri 9–17)',
        imageUrl: 'https://www.village-montana.com/sites/default/files/image/le%20plein%20sud-28.jpg',
        note: 'Estimate for a 2-bed/4-pax week — engine-priced (UK operator from ~£904 pp/week). WINTER27 code: −10% early booking on 7-night stays. Position approximate.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer GVA ⇄ resort',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-bensbus',
    unitHint: '155 km, ~3 h each way',
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
        id: 'transfer-snowbus',
        name: 'Snowbus shared coach',
        tier: 'Budget',
        description:
          'UK-run shared transfer GVA → Val Thorens (~2h45–3h30), weekend departures plus a reduced weekday timetable — the shared option when Ben\'s Bus doesn\'t run.',
        price: 128,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.snowbus.co.uk/Val-Thorens.html',
        contact: 'info@snowbus.co.uk',
        imageUrl: 'https://www.snowbus.co.uk/Media/contentimages/26_thumb.jpg',
        note: 'From £55 single pp (2025/26) → ~€128 return. Books via snowcompare.com.',
      },
      {
        id: 'transfer-train',
        name: 'Train + Altibus (public transport)',
        tier: 'Budget',
        description:
          'TER Geneva → Moûtiers via Chambéry (~3h15–3h45), then Trans-Savoie line S63 coach Moûtiers → Val Thorens (~1h; luggage + skis included). Runs every day — the flexible budget route.',
        price: 90,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.sncf-connect.com/en-en/train/route/geneva/moutiers',
        contact: 'Altibus booking: booking.altibus.com · altibus.com/en/contact',
        note: 'Return estimate: train €20–45 each way advance + S63 ~€24 return (−10% online ≥48h ahead; child −30%).',
      },
      {
        id: 'transfer-coolrunnings',
        name: 'Cool Runnings private van (1–8 pax)',
        tier: 'Mid',
        description:
          'Val Thorens-based operator with Renault Trafic / Mercedes V-Class vans from Geneva, Lyon, Chambéry and Moûtiers; shared seats sometimes available at a discount.',
        price: 640,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.10,
        url: 'https://www.coolrunnings.eu/',
        contact: 'info@coolrunnings.eu · +33 9 70 01 94 45 · +44 20 8089 4323',
        imageUrl: 'https://www.coolrunnings.eu/wp-content/uploads/2017/08/transfers-to-val-thorens.jpg',
        note: 'Quote-based; comparable 3-Valleys vans ~€290/van one way. Planning figure per van return.',
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
        capacity: 8,
        vatRate: 0.10,
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
        id: 'rental-intersport',
        name: 'Intersport economy pack',
        tier: 'Budget',
        description:
          '5 shops in resort; 6-day rentals include the 7th day free and Saturday early pickup at no charge. Up to 30–50% off online.',
        price: 85,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.valthorens-intersport.com/en/',
        contact: '+33 4 79 00 01 72',
        note: 'Adult economy ski+boots from ~€10/day online → ~€60–100/6-day pack; engine-priced.',
      },
      {
        id: 'rental-skirepublic',
        name: 'Ski Republic adult pack',
        tier: 'Budget',
        description:
          'Discount chain (Chamois Sport / Péclet shops) advertising up to 60% off online; 6-or-7-day adult full packs.',
        price: 95,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.ski-republic.com/en/ski-stations/val-thorens',
        contact: 'Via Val Thorens Réservation +33 4 79 00 01 06',
        imageUrl: 'https://www.ski-republic.com/sites/default/files/styles/listing_image_magasin_465x250/public/2025-01/Ski%20Republic%20Chamois%20Sport%20-%20Val%20Thorens.jpg',
        note: 'From ~€15/day adult pack online; 6/7-day priced via engine.',
      },
      {
        id: 'rental-prosneige',
        name: 'Prosneige 3★ "Sensation" pack',
        tier: 'Mid',
        description:
          'Quality mid-range skis or board + boots, fitted in the resort shop (open 9:00–19:00 daily), online booking discounts, free mid-week swaps.',
        price: 245,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://en.prosneige.fr/info-val-thorens-equipment-rental-prices/',
        contact: 'info@prosneige.fr · +33 4 79 01 07 00',
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
        tier: 'Budget',
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
        id: 'ins-travelex',
        name: 'Travelex Ultimate',
        tier: 'Premium',
        description:
          'Comprehensive single-trip plan: up to $50k cancellation, $250k primary emergency medical, $2k baggage/delay.',
        price: 150,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.travelexinsurance.com/travel-insurance/plans/ultimate',
        note: 'Starts ~$46; typically ~5–8% of insured trip cost by age. Quote per traveler.',
      },
      {
        id: 'ins-img',
        name: 'IMG iTravelInsured Travel SE',
        tier: 'Mid',
        description:
          'Mid-tier comprehensive plan with cancellation/interruption, missed connection and travel delay benefits.',
        price: 130,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.imglobal.com/travel-insurance/itravelinsured-travel-se',
        note: '~$102 for a 45-y-o on a $2,000 7-day trip; scales with trip cost/length. Alt: Allianz OneTrip Prime from ~$98.',
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
        id: 'prosneige-group',
        name: 'Prosneige group course — 6 mornings',
        tier: 'Mid',
        description:
          'Independent English-speaking school, small groups of 4–10. Published tariff: €298 mid / €388 high / €437 very-high season.',
        price: 298,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://en.prosneige.fr/info-prices-and-lesson-times-val-thorens/',
        contact: 'info@prosneige.fr · +33 4 79 01 07 00',
        imageUrl: 'https://en.prosneige.fr/wp-content/uploads/2020/07/snowboard-lessons-prosneige.jpg',
        note: '2025/26 published tariff. Full days 6× from €459.',
      },
      {
        id: 'skicool-daily',
        name: 'Ski Cool group lesson (per day)',
        tier: 'Budget',
        description:
          'Val Thorens school since 1981, certified multilingual instructors, adult groups capped at 8. Pay per 3-hour day.',
        price: 43,
        currency: 'EUR',
        unit: 'per_person_day',
        vatRate: 0,
        url: 'https://www.ski-cool.com/en/',
        contact: 'commandes@ski-cool.fr · +33 4 79 00 04 92',
        note: 'From ~€43/day (CheckYeti 2025/26). Alt: Oxygène from ~€47/day.',
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
