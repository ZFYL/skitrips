// Ischgl, Austria (Silvretta Arena) — cross-border Tirol/Samnaun ski area.
// Shaped like val-thorens.ts (see resorts/types.ts for the schema;
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
    defaultOptionId: 'flight-muc',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-muc',
        name: 'JFK → Munich (MUC), 1-stop or nonstop',
        tier: 'Budget',
        description:
          'JFK → MUC on Lufthansa/United, then ~2h30 drive (230 km) via the Arlberg. The value gateway — best fares of the three.',
        price: 850,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-munich.html',
        note: 'Winter band ~$780–$950 round trip. International air is VAT-exempt.',
      },
      {
        id: 'flight-zrh',
        name: 'JFK → Zurich (ZRH), SWISS nonstop',
        tier: 'Mid',
        description:
          'SWISS/United nonstop JFK → ZRH (~8 h), then ~2h30 drive (235 km) up the Paznaun valley. Slick single-connection option.',
        price: 950,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-zurich.html',
        note: 'Winter band ~$820–$1,050 round trip.',
      },
      {
        id: 'flight-inn',
        name: 'JFK → Innsbruck (INN), 1-stop',
        tier: 'Premium',
        description:
          'Austrian/Lufthansa via VIE or FRA into Innsbruck — the nearest gateway, ~1h20 drive (100 km). Shortest transfer, priciest air.',
        price: 1050,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-innsbruck.html',
        note: 'Winter band ~$900–$1,150 round trip; always connects (no JFK nonstop to INN).',
      },
      {
        id: 'flight-eu',
        name: 'Intra-EU flight → Innsbruck / Zurich',
        tier: 'From Europe',
        description:
          'Short-haul round trip to INN or ZRH for group members already in Europe (LHR/AMS/BER class of routes).',
        price: 160,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20INN',
        note: 'Typical €90–260 round trip booked ahead. Quoted fares are final.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-trofana-alpin',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-alt-paznaun',
        lat: 47.0111386,
        lon: 10.2904279,
        name: 'Gasthof Alt Paznaun',
        tier: 'Budget',
        description:
          'Traditional family guesthouse in the village centre — simple, good-value doubles with breakfast, a short walk from the Silvrettabahn.',
        price: 120,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.alt-paznaun.at/',
        contact: 'gasthof@alt-paznaun.at · +43 5444 5380',
        imageUrl: 'https://www.alt-paznaun.at/images/D9.jpg',
        note: 'Estimate ~€120/double/night B&B; peak weeks higher. Confirm on request.',
      },
      {
        id: 'hotel-trofana-alpin',
        lat: 47.0119914,
        lon: 10.2902462,
        name: 'Hotel Trofana Alpin ★★★★',
        tier: 'Mid',
        description:
          '4★ in the heart of Ischgl with spa, indoor pool and half-board — a reliable mid-tier base minutes from the Silvrettabahn and Pardatschgratbahn.',
        price: 210,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.trofana-alpin.com/en',
        contact: 'info@trofana-alpin.com · +43 5444 601',
        imageUrl: 'https://www.trofana-alpin.com/img/startslider_trofana_1-de0964a4-1920-1920.jpg',
        note: 'Estimate ~€210 pp/night half board mid-winter; dynamic pricing — check engine.',
      },
      {
        id: 'hotel-madlein',
        lat: 47.0137570,
        lon: 10.2932640,
        name: 'Design Hotel Madlein ★★★★S',
        tier: 'Premium',
        description:
          '4★ superior design-and-wellness hotel — minimalist Zen spa, a legendary après/club scene and central location.',
        price: 270,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.madlein.com/en/',
        contact: 'info@madlein.com · +43 5444 5226',
        imageUrl: 'https://www.madlein.com/uploads/tx_bh/273/madlein-hotel-aussenansicht-2024-0038.jpg',
        note: 'Estimate ~€270 pp/night half board; peak weeks higher.',
      },
      {
        id: 'hotel-yscla',
        lat: 47.0095619,
        lon: 10.2893763,
        name: 'Hotel Yscla ★★★★',
        tier: 'Premium',
        description:
          '4★ boutique hotel and home of the two-Michelin-star restaurant Stüva — refined rooms, spa and one of the best tables in the Alps.',
        price: 290,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.yscla.at/en/',
        contact: 'info@yscla.at · +43 5444 5275',
        imageUrl: 'https://yscla.at/wp-content/uploads/2025/10/sommer-in-iscghl-1-1.jpg',
        note: 'Estimate ~€290 pp/night half board; gourmet packages higher.',
      },
      {
        id: 'hotel-elizabeth',
        lat: 47.0131225,
        lon: 10.2936803,
        name: 'Elizabeth Arthotel ★★★★★',
        tier: 'Luxury',
        description:
          '5★ adults-only ski-in/ski-out hotel at the foot of the Fimbabahn with a rooftop infinity spa — the direct-to-slopes luxury address.',
        price: 420,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.elizabeth.at/en/',
        contact: 'info@elizabeth.at · +43 5444 5411',
        imageUrl: 'https://www.elizabeth.at/uploads/tx_bh/1430/elizabetharthotel_art_galerie_2023_west_542.jpg',
        note: 'Estimate ~€420 pp/night half board; suites higher.',
      },
      {
        id: 'hotel-trofana-royal',
        lat: 47.0085176,
        lon: 10.2865323,
        name: 'Hotel Trofana Royal ★★★★★S',
        tier: 'Luxury',
        description:
          '5★ superior flagship of Ischgl — a 3,000 m² spa, gourmet Paznaunerstube (Michelin) and grand suites. The resort’s definitive luxury stay.',
        price: 500,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.trofana-royal.at/en/',
        contact: 'office@trofana.at · +43 5444 600',
        imageUrl: 'https://www.trofana-royal.at/uploads/tx_bh/2430/tr-royal-eingang-wappen-2025.jpg',
        note: 'Estimate ~€500 pp/night half board; suites materially higher.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer INN/ZRH/MUC ⇄ Ischgl',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-fourseasons',
    unitHint: 'INN 100 km ~1h20; ZRH/MUC ~2h30',
    options: [
      {
        id: 'transfer-fourseasons',
        name: 'Four Seasons Travel shared shuttle',
        tier: 'Budget',
        description:
          'The big Tyrol airport-shuttle operator: shared "Economy Class" seats INN → Ischgl, matched to flight times. The value door-to-door option.',
        price: 120,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.tirol-taxi.at/en-innsbruck-airport',
        contact: 'office@tirol-taxi.at · +43 512 58 41 57',
        note: 'Estimate ~€60 pp each way from INN (dynamic quote engine). Return figure shown.',
      },
      {
        id: 'transfer-train',
        name: 'Train to Landeck-Zams + Postbus 260',
        tier: 'Budget',
        description:
          'ÖBB Arlberg-line train to Landeck-Zams, then VVT/Postbus line 260 up the Paznaun valley to Ischgl (~40–50 min, every 30 min). The flexible any-day public route.',
        price: 70,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.ischgl.com/en/plan-your-trip/arrival-mobility',
        contact: 'ÖBB oebb.at · VVT +43 512 56 16 16 · info@vvt.at',
        note: 'Return estimate: Innsbruck–Landeck ~€20–27 each way (Sparschiene from ~€10) + bus 260 ~€8–9 each way.',
      },
      {
        id: 'transfer-private',
        name: 'Private van (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private van from INN, ZRH or MUC — Four Seasons "Private Class" or Ski-Lifts, any arrival time. Best for a group landing together.',
        price: 420,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.10,
        url: 'https://www.ski-lifts.com/transfers/ischgl/',
        contact: 'Four Seasons +43 512 58 41 57 · Ski-Lifts via site',
        note: 'From ~€190–225/van one-way INN → Ischgl → ~€420 return planning figure. Longer ZRH/MUC legs more.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Silvretta Arena',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-vip',
    unitHint: '239 km Ischgl–Samnaun, one pass',
    options: [
      {
        id: 'pass-vip',
        name: 'VIP Skipass Ischgl–Samnaun — 6 days adult (2026/27)',
        description:
          'Full Silvretta Arena pass: 239 km, 46 lifts across Ischgl (AT) and duty-free Samnaun (CH). Valid 26 Nov 2026 – 2 May 2027.',
        price: 385,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.13,
        url: 'https://www.ischgl.com/en/winter/operating-times-prices/skipass-prices-vip',
        contact: 'Silvrettaseilbahn AG: info@paznaun-ischgl.com · +43 50990 100',
        imageUrl: 'https://www.trofana-royal.at/uploads/tx_bh/2430/tr-royal-eingang-wappen-2025.jpg',
        note: '2026/27 published €385. START (26 Nov–18 Dec) & FIRN (3 Apr–2 May) specials: 6-day €325. Austrian lift VAT 13%.',
      },
      {
        id: 'pass-silvretta',
        name: 'Silvretta Ski Pass — 6 days adult (2026/27)',
        description:
          'Wider valley pass: 75 lifts across Ischgl, Galtür, Kappl, See and Samnaun — one card for the whole Paznaun.',
        price: 451,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.13,
        url: 'https://www.ischgl.com/en/winter/operating-times-prices/skipass-prices-silvretta',
        contact: 'info@paznaun-ischgl.com · +43 50990 100',
        note: '2026/27 published €451.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-silvretta',
    unitHint: 'Skis + boots + helmet',
    options: [
      {
        id: 'rental-silvretta',
        name: 'Silvretta Sports (Sport 2000) mid pack',
        tier: 'Mid',
        description:
          'Central Sport 2000 shop with online-booking discounts and free mid-week swaps — "TOP" ski + boots for a 6-day week.',
        price: 245,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://silvrettasports.com/ischgl-verleih-preise/',
        contact: 'info@silvrettasports.com · +43 5444 20125',
        note: 'Verified: TOP ski €156 + boots €89 = €245/6 days. VIP pack ~€287. Rental carries 20% Austrian VAT.',
      },
      {
        id: 'rental-zangerl',
        name: 'Sport Zangerl comfort pack',
        tier: 'Budget',
        description:
          'Village rental shop advertising up to 20% off online — comfort/performance ski + boots for the week.',
        price: 235,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.sport-zangerl.at',
        contact: 'ischgl@sport-zangerl.at · +43 5444 20032',
        note: 'Estimate ~€235/6-day ski+boots; online discount applies.',
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
    options: [...US_INSURANCE],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'school-group',
    unitHint: 'English-speaking instructors',
    options: [
      {
        id: 'school-group',
        name: 'Skischule Ischgl — adult group, 6 mornings',
        description:
          'The main village school (Skischule Silvretta Ischgl): 6 consecutive mornings in a graded adult group, meeting at Silvrettaplatz.',
        price: 354,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skischule-ischgl.at/preise/',
        contact: 'info@skischule-ischgl.at · +43 5444 5257',
        note: 'Published: 5 mornings €302 + €52/extra day → 6 mornings €354. Tuition VAT-exempt.',
      },
      {
        id: 'school-private',
        name: 'Skischule Ischgl — private instructor, half day',
        tier: 'Premium',
        description:
          'Private instructor for your group per half-day block (3 h); extra-person surcharge applies. Lift pass not included.',
        price: 305,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.skischule-ischgl.at/preise/',
        contact: 'info@skischule-ischgl.at · +43 5444 5257',
        note: 'Published: 1.5 h €163 · 3 h half-day €305 · 4.5 h €390.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week: Ischgl hotels and ski-school courses run on Saturday changeover. Hold flights early — MUC and ZRH are the value gateways (~$800–1,050 round trip), INN the convenience gateway (~$900–1,150). Request the hotel allotment: standard Austrian group terms are a ~30% deposit on confirmation and the balance ~30 days before arrival. Negotiate the allotment release date (typically 60–90 days pre-arrival).',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Order VIP Skipass Ischgl–Samnaun manifests from Silvrettaseilbahn AG (info@paznaun-ischgl.com, +43 50990 100); note the START (to 18 Dec) and FIRN (from 3 Apr) 6-day specials at €325. Book Four Seasons shared shuttle seats or a private van from INN matched to flight times, or brief the group on the Landeck-Zams train + Postbus 260 public route.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes (Silvretta Sports / Sport Zangerl take online pre-bookings at a discount). Issue insurance (US policy per traveler). Pay the hotel balance. Send suppliers flight numbers for transfer pickup; confirm Skischule Ischgl course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat arrival at INN/ZRH/MUC → shuttle, van or train up (~1h20–2h30) → check-in, collect passes and rental → ski Sun–Fri (the Idalp hub at 2,320 m; day trip down to duty-free Samnaun) → Sat morning transfer back, afternoon flight home. Keep ≥4 h between landing and the transfer cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Austrian VAT in these prices: hotels/half-board 10%, transfers 10%, lift passes 13%, equipment rental 20%; ski-school tuition and insurance are exempt; international flights zero-rated. A local tourist tax (Ortstaxe) is added per adult per night on top of room rates — confirm the season grid with the hotel. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const ISCHGL_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 45, base: 40, top: 90 },
  { month: 'Dec', snowfall: 130, base: 60, top: 140 },
  { month: 'Jan', snowfall: 160, base: 75, top: 190 },
  { month: 'Feb', snowfall: 130, base: 85, top: 220 },
  { month: 'Mar', snowfall: 130, base: 90, top: 240 },
  { month: 'Apr', snowfall: 95, base: 60, top: 210 },
];

export const ischgl: Resort = {
  id: 'ischgl',
  name: 'Ischgl',
  country: 'Austria',
  flag: '\u{1F1E6}\u{1F1F9}',
  area: 'Silvretta Arena',
  blurb:
    'High-altitude Paznaun party-and-powder resort — 239 km of snow-sure pistes linking Tirol with duty-free Samnaun in Switzerland.',
  lat: 47.01306,
  lon: 10.28806,
  elevationM: 1377,
  currency: 'EUR',
  gatewayAirports: ['INN', 'ZRH', 'MUC'],
  defaultOrigin: 'JFK',
  mapsName: 'Ischgl',
  saturdayChangeover: true,
  season: { open: '2026-11-26', close: '2027-05-02' },
  weeks: alpineWeeks,
  snowByMonth: ISCHGL_SNOW,
  snowFacts:
    'Snow-sure Nov–early May: village at 1,377 m but nearly all skiing above 2,000 m, hub at Idalp 2,320 m, top at Palinkopf 2,864 m, plus heavy snowmaking. skiresort.info rates it among the most reliable in the Alps.',
  components,
  logistics,
};

export default ischgl;
