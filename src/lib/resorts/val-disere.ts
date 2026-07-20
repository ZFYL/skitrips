// Val d'Isère, France — a high, snow-sure Savoie resort linked with Tignes to
// form the Tignes–Val d'Isère (Espace Killy) domain. Added to the catalog;
// shape mirrors val-thorens.ts (see resorts/types.ts for the schema).

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
        name: 'JFK 1-stop economy (TAP / United)',
        tier: 'Budget',
        description:
          'JFK → GVA via Lisbon (TAP) or a European hub, ~11–13 h door to door. Geneva is the usual gateway for the ~3 h drive up the Tarentaise.',
        price: 700,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.kayak.com/flight-routes/New-York-John-F-Kennedy-Intl-JFK/Geneva-Geneve-Cointrin-GVA',
        note: 'Sampled 1-stop ~$704–$707 round trip; winter actuals run somewhat higher. International air is VAT-exempt.',
      },
      {
        id: 'flight-nonstop',
        name: 'SWISS nonstop JFK → GVA',
        tier: 'Premium',
        description:
          'The only nonstop JFK–GVA service (~7×/week, ~7h50 eastbound) — the comfortable choice for a Saturday-changeover week.',
        price: 820,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.swiss.com/',
        note: 'Off-peak nonstop ~$750–$900; February half-term and Christmas/New Year push toward $1,000–$1,400.',
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
        name: 'Rail from Europe → Bourg-Saint-Maurice',
        tier: 'From Europe',
        description:
          'High-speed rail to Bourg-Saint-Maurice (TGV from Paris ~4h30; winter Eurostar Ski Train), then the Autocars Martin / Altibus coach up to Val d\'Isère (~45 min).',
        price: 140,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.sncf-connect.com/en-en/train/route/paris/bourg-saint-maurice',
        note: 'Paris–Bourg TGV from ~€55 each way booked early; add the bus in the transfer component.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-valdisere',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-valdisere',
        lat: 45.4488,
        lon: 6.9800,
        name: 'Hôtel Le Val d\'Isère ★★★',
        tier: 'Mid',
        description:
          'Renovated 47-room central 3★ on Place Jacques Mouflier — the most affordable hotel in the resort core.',
        price: 280,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://en.hotel-valdisere.com/',
        contact: 'info@hotel-valdisere.com · +33 4 79 06 08 30',
        imageUrl: 'https://cdn.prod.website-files.com/618240e77c8e74bf1eb5dbe9/66f28e47c66d0f443109c6f9__AP86234enfuse_%C2%A9andyparant.com.jpg',
        note: 'High-season B&B estimate ~€280/room/night (rates not published) — request a group quote. Position approximate.',
      },
      {
        id: 'hotel-bellevarde',
        lat: 45.4622,
        lon: 6.9650,
        name: 'P&V Les Balcons de Bellevarde ★★★★ (apartments)',
        tier: 'Apartment',
        description:
          '4★ self-catered aparthotel in La Daille facing the slopes with pool and spa — for families and groups. Self-catered.',
        price: 1900,
        currency: 'EUR',
        unit: 'per_unit_week',
        capacity: 4,
        vatRate: 0.10,
        url: 'https://www.pierreetvacances.com/gb-en/fp_IDS_self-catering-val-isere-bellevarde',
        contact: 'Pierre & Vacances reservations +33 8 92 70 21 80',
        note: 'From ~€156/apartment/night low season; high-season 4–6-person apartment ~€1,600–2,400/week. Estimate — engine-priced. Position approximate.',
      },
      {
        id: 'hotel-blizzard',
        lat: 45.4490013,
        lon: 6.9790346,
        name: 'Hôtel Le Blizzard ★★★★★',
        tier: 'Premium',
        description:
          'Landmark 5★ chalet-style hotel in the centre at the foot of the runs — heated outdoor pool, spa and two restaurants.',
        price: 700,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.hotelblizzard.com/en/',
        contact: 'information@hotelblizzard.com · +33 4 79 06 02 07',
        imageUrl: 'https://hotelblizzard.com/wp-content/uploads/hotelleblizzard-chambres-l-incontournable-3.webp',
        note: 'Rates on request; winter high-season estimate ~€700/room/night for a double.',
      },
      {
        id: 'hotel-barmes',
        lat: 45.447423,
        lon: 6.974528,
        name: 'Les Barmes de l\'Ours ★★★★★ (Relais & Châteaux)',
        tier: 'Luxury',
        description:
          'Flagship 5★ (76 rooms/suites) at the foot of the Face de Bellevarde, with a Michelin-level restaurant and a large spa.',
        price: 1000,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.hotellesbarmes.com/en/',
        contact: 'welcome@hotellesbarmes.com · +33 4 79 41 37 00',
        imageUrl: 'https://www.hotellesbarmes.com/wp-content/uploads/2024/11/img-contenu-1-accueil-barmes.jpg',
        note: 'Price on request; winter high-season estimate ~€1,000/room/night for a double.',
      },
      {
        id: 'hotel-clubmed',
        lat: 45.4422025,
        lon: 6.9769234,
        name: 'Club Med Val d\'Isère (Exclusive Collection)',
        tier: 'Club',
        description:
          '4-Trident all-inclusive: package covers meals with drinks, the lift pass AND group ski/snowboard lessons in one weekly price.',
        price: 2900,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.clubmed.co.uk/r/val-d-isere/w',
        contact: 'UK reservations 03453 676767',
        imageUrl: 'https://assets.dream.clubmed/pm_7531_449_449961-9xn70vno5b-swhr.jpg',
        allInclusive: ['skipass', 'skischool'],
        note: 'Resort-only ~€2,900 pp/week high season (peak Feb higher; UK from-rates incl. flights ~£2,384–4,926). Pass + lessons included — disable those components.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer GVA ⇄ Val d\'Isère',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-bensbus',
    unitHint: '180 km, ~3 h each way',
    options: [
      {
        id: 'transfer-bensbus',
        name: "Ben's Bus shared coach",
        tier: 'Budget',
        description:
          'Low-cost shared coach GVA → Val d\'Isère, weekends only — built for the Saturday changeover.',
        price: 113,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.bensbus.co.uk/ski-transfer/geneva-val-disere/',
        contact: 'Email via bensbus.co.uk/contact',
        note: '2026/27 published: £96 return pp standard (from £82 with group rate). Runs Sat 5 Dec–24 Apr and Sun 13 Dec–4 Apr.',
      },
      {
        id: 'transfer-train',
        name: 'Train + Altibus (public transport)',
        tier: 'Budget',
        description:
          'Rail Geneva → Bourg-Saint-Maurice, then the Altibus / Autocars Martin coach up to Val d\'Isère (~30–45 min; luggage + skis included). The flexible daily budget route.',
        price: 100,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://booking.altibus.com/minisiteEN/valdisere',
        contact: 'Altibus booking: booking.altibus.com',
        note: 'Bus Bourg → Val d\'Isère ~€16 one-way (~€30 return); rail Geneva → Bourg €30–60 each way (routing-dependent, no direct train).',
      },
      {
        id: 'transfer-3valley',
        name: '3Valley Transfers private van (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private van from Geneva matched to flight times, any day — the option when flights don’t land on a coach day.',
        price: 600,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.10,
        url: 'https://3valley-transfers.com/transfer/geneva-airport-gva/val-disere',
        contact: 'Via 3valley-transfers.com',
        note: 'From ~€300/van one-way → ~€600 return; weekends and premium vehicles €900–1,000+. Quote-based.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Tignes–Val d\'Isère',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-killy',
    unitHint: '~300 km of pistes, one pass',
    options: [
      {
        id: 'pass-killy',
        name: '6-day adult Tignes–Val d\'Isère pass (Espace Killy)',
        description:
          'Full combined-area pass across Val d\'Isère and Tignes — up to the 3,456 m Grande Motte glacier. Includes the "6 = 7" deal (7 days for the price of 6) plus 2 free pool entries.',
        price: 450,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.valdisere.ski/en/skipass-prices',
        contact: 'STVI: contact@valdisere.ski · +33 4 79 06 32 32',
        note: 'Verified 2025/26 (2026/27 tariffs not yet published). Group sales: €300 off for 4+ passes of equal duration; free under-8s and 75+. Ski lifts carry 10% French VAT.',
      },
      {
        id: 'pass-season',
        name: 'Val d\'Isère "2 days/week" season pass',
        description:
          'Adult season pass valid 2 days per week all winter — the value option for repeat visitors or a long stay. (No standard Val-only 6-day pass exists.)',
        price: 899,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.forfait2ski.com/valdisere/',
        contact: 'STVI: contact@valdisere.ski · +33 4 79 06 32 32',
        note: '2025/26 adult. Day pass €68 / 4-hour €61 for occasional skiers.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-skiset',
    unitHint: 'Skis + boots + helmet',
    options: [
      {
        id: 'rental-skiset',
        name: 'Skiset mid pack',
        tier: 'Mid',
        description:
          '7 shops across the resort with slope-side pickup; mid-range 6-day adult ski+boots, up to ~50% off booking online in advance.',
        price: 175,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.skiset.co.uk/ski-resort/val-d-isere',
        contact: '+33 1 41 12 97 97',
        note: 'Mid-range 6-day adult ~€175 indicative (budget ~€120 / premium ~€260). Rental carries 20% French VAT.',
      },
      {
        id: 'rental-intersport',
        name: 'Intersport Rent adult pack',
        tier: 'Budget',
        description:
          'Strong performance/premium range with "7th day free" promotions; 6-day adult ski+boots with online discounts.',
        price: 175,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.intersportrent.com/skirent-val-d-isiere',
        note: '6-day adult ~€170–180 indicative; online booking cheaper.',
      },
      {
        id: 'rental-precision',
        name: 'Precision Ski Rent adult pack',
        tier: 'Budget',
        description:
          'Local chain with up to ~60% online discount plus a free 7th day; mid-range 6-day adult pack.',
        price: 170,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.precisionski-rent.com',
        note: '6-day adult ~€170 indicative; engine-priced.',
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
          '6 consecutive mornings with Val d\'Isère’s biggest school, English-speaking instructors.',
        price: 322,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skischoolvaldisere.com',
        contact: 'ESF Centre +33 4 79 06 02 34 · reservations +33 4 79 06 74 32',
        note: '2025/26: 6-morning adult group €322. ESF tuition is VAT-exempt (sports education).',
      },
      {
        id: 'esf-private',
        name: 'ESF private instructor — half day',
        tier: 'Premium',
        description:
          'Private instructor for your group per half-day (2.5 h) engagement; lift pass not included.',
        price: 215,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.skischoolvaldisere.com',
        contact: '+33 4 79 06 74 32',
        note: '2025/26 private half-day (2.5 h) €215.',
      },
      {
        id: 'oxygene-group',
        name: 'Oxygène group course — 6 mornings',
        tier: 'Mid',
        description:
          'Independent English-speaking school with adult groups capped at 8; 6 consecutive mornings.',
        price: 343,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://oxygene.ski/val-d-isere-ski-school/',
        contact: 'valdisere@oxygene.ski · +33 4 79 41 99 58',
        note: '2025/26: 6-morning adult group €343; private lessons from ~€122/instructor.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week: hotels, ESF Sunday course starts and Ben\'s Bus weekend rotations run on Saturday changeover. Hold GVA flights (SWISS nonstop or 1-stop; February is the cheapest long-haul month, though a busy Alps week). Request the hotel allotment: standard French Alps group terms are a 30% deposit on confirmation and the balance ~30 days before arrival. Consider Club Med if you want lift pass + lessons bundled into one all-inclusive price.',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Val d\'Isère lifts are run by STVI and Tignes by STGM; the combined Tignes–Val d\'Isère pass is valid across both. Buy the 6-day adult pass (€450) at valdisere.ski, or send a group manifest to contact@valdisere.ski (+33 4 79 06 32 32) — €300 off for 4+ passes of equal duration. Book Ben\'s Bus weekend seats or reserve a 3Valley Transfers van matched to flight times; the rail + Altibus route via Bourg-Saint-Maurice is the daily public alternative.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes. Issue insurance (US policy per traveler + Carré Neige added to each pass at €3.50/day). Pay the hotel balance. Send suppliers flight numbers for transfer pickup; confirm ESF or Oxygène course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat morning GVA arrival → coach or van up (~3 h) → check-in, passes at the desk, rental fitting → ski Sun–Fri on the Grande Motte glacier and across Tignes (ESF courses start Sunday) → Sat morning transfer down, afternoon flight home. Keep ≥4 h between GVA landing and the transfer cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Taxe de séjour (commune Val-d\'Isère) is charged per adult per night on top of room rates — 5% of the nightly price + 10% departmental surcharge, capped €5.39/person/night from 1 Jan 2026 (under-18s exempt); confirm the classified-hotel grid via valdisere.taxesejour.fr. French VAT in these prices: hotels, half-board, transfers and lifts 10%; equipment rental 20%; ESF tuition and insurance exempt; international flights zero-rated. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const VAL_DISERE_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 82, base: 28, top: 45 },
  { month: 'Dec', snowfall: 131, base: 60, top: 95 },
  { month: 'Jan', snowfall: 135, base: 100, top: 150 },
  { month: 'Feb', snowfall: 96, base: 122, top: 195 },
  { month: 'Mar', snowfall: 78, base: 125, top: 220 },
  { month: 'Apr', snowfall: 71, base: 86, top: 200 },
];

export const valDisere: Resort = {
  id: 'val-disere',
  name: 'Val d\'Isère',
  country: 'France',
  flag: '\u{1F1EB}\u{1F1F7}',
  area: 'Espace Killy (Tignes–Val d\'Isère)',
  blurb:
    'A high, snow-sure Savoie resort with genuine Alpine-village charm that, linked with Tignes, forms the vast ~300 km Tignes–Val d\'Isère domain topping out on the 3,456 m Grande Motte glacier.',
  lat: 45.448032,
  lon: 6.980226,
  elevationM: 1850,
  currency: 'EUR',
  gatewayAirports: ['GVA', 'LYS', 'CMF', 'GNB'],
  defaultOrigin: 'JFK',
  mapsName: 'Val d\'Isère',
  saturdayChangeover: true,
  season: { open: '2026-11-28', close: '2027-05-02', linkOpen: '2026-11-28', linkClose: '2027-05-02' },
  weeks: alpineWeeks,
  snowByMonth: VAL_DISERE_SNOW,
  snowFacts:
    'One of Europe’s most snow-sure areas — high, largely north-facing terrain from 1,550 m to the 3,456 m Grande Motte glacier gives a reliable late-Nov–early-May season. ~571 cm average annual snowfall, ~48 snow days. Top-depth figures are estimated (monthly summit averages not published).',
  components,
  logistics,
};

export default valDisere;
