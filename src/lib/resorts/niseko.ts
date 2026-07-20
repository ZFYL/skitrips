// Niseko United, Japan (Hokkaido). Same shape as val-thorens.ts, but supplier
// currency is JPY (values in yen) and the season table is japanWeeks.
// (see resorts/types.ts for the schema; resorts/shared.ts for US_INSURANCE).

import type { Resort, SnowMonth } from './types';
import type { TripComponent } from '../tripBuilderData';
import { japanWeeks } from '../seasonData';
import { US_INSURANCE } from './shared';

const components: TripComponent[] = [
  {
    id: 'flights',
    label: 'Getting there',
    icon: '✈️',
    defaultEnabled: true,
    defaultOptionId: 'flight-lax-cts',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-lax-cts',
        name: 'LAX 1-stop economy → New Chitose (CTS)',
        tier: 'Budget',
        description:
          'LAX → Sapporo New Chitose via Tokyo (HND/NRT) on JAL/ANA/ZIPAIR, ~14–16 h door to door. CTS is the gateway to Hokkaido, ~2–3 h from Niseko.',
        price: 1050,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20LAX%20to%20Sapporo%20CTS',
        note: 'Verified winter band ~$850–$1,500 round trip; ZIPAIR/economy lows from ~$800. International air is VAT-exempt.',
      },
      {
        id: 'flight-sfo-cts',
        name: 'SFO 1-stop economy → New Chitose (CTS)',
        tier: 'Budget',
        description:
          'SFO → Sapporo via Tokyo or Seoul (JAL/ANA/United/Korean). Comparable timing to LAX with strong Bay Area frequencies.',
        price: 1100,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20SFO%20to%20Sapporo%20CTS',
        note: 'Winter band ~$900–$1,600 round trip.',
      },
      {
        id: 'flight-nonstop-hnd',
        name: 'Nonstop US → Tokyo + domestic to CTS',
        tier: 'Premium',
        description:
          'Nonstop LAX/SFO → Tokyo (HND/NRT), overnight, then a 1h35 domestic hop to New Chitose — the comfortable long-haul routing for a Saturday-agnostic arrival.',
        price: 1500,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20Tokyo%20HND',
        note: 'Nonstop trans-Pacific band ~$1,100–$2,200 round trip; add ~$90–150 for the CTS domestic leg (JAL/ANA/Pe5).',
      },
      {
        id: 'flight-intra-asia',
        name: 'Intra-Asia flight → New Chitose (CTS)',
        tier: 'From Asia',
        description:
          'Short/medium-haul round trip to CTS from an Asian hub (HKG/SIN/ICN/TPE) for group members already in the region.',
        price: 350,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20Sapporo%20CTS',
        note: 'Typical $200–500 round trip booked ahead. Quoted fares are final.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-kiniseko',
    unitHint: 'Room only unless noted — yen',
    options: [
      {
        id: 'hotel-owashi',
        lat: 42.8631,
        lon: 140.6875,
        name: 'Owashi Lodge (pension) — Hirafu',
        tier: 'Lodge',
        description:
          'Long-running budget pension/lodge in Hirafu village: simple Japanese-Western rooms, communal lounge and easy walk to the Ace Family lifts. The value base for Niseko.',
        price: 12000,
        currency: 'JPY',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.owashi-lodge.com/',
        contact: 'info@owashi-lodge.com · +81 136 22 1708',
        imageUrl: 'https://www.owashi-lodge.com/images/owashi-lodge-hirafu-exterior.jpg',
        note: 'From ~¥10,000–16,000 pp/night in peak January; breakfast optional. Walk to Hirafu base.',
      },
      {
        id: 'hotel-kiniseko',
        lat: 42.8607,
        lon: 140.6889,
        name: 'Ki Niseko ★★★★ — ski-in/ski-out Hirafu',
        tier: 'Mid',
        description:
          'Modern ski-in/ski-out hotel at the Hirafu Gondola base with natural onsen, restaurant and hotel/apartment rooms — the reliable mid-tier for a Niseko week.',
        price: 42000,
        currency: 'JPY',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.kiniseko.com/',
        contact: 'reservations@kiniseko.com · +81 136 21 2565',
        imageUrl: 'https://www.kiniseko.com/img/ki-niseko-exterior-winter.jpg',
        note: 'Peak January hotel rooms ~¥38,000–60,000/room/night; onsen included. Apartments for groups.',
      },
      {
        id: 'hotel-setsu',
        lat: 42.8618,
        lon: 140.6902,
        name: 'Setsu Niseko ★★★★★ — Hirafu',
        tier: 'Premium',
        description:
          'Newer luxury property in central Hirafu with suites/residences, Hirafu’s largest wellness centre, multiple restaurants and onsen — walk to the lifts.',
        price: 75000,
        currency: 'JPY',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://setsuniseko.com/en/',
        contact: 'stay@setsuniseko.com · +81 136 55 8899',
        imageUrl: 'https://setsuniseko.com/wp-content/uploads/setsu-niseko-exterior.jpg',
        note: 'Peak-season suites ~¥65,000–120,000/room/night. Wellness centre + onsen; larger residences for groups.',
      },
      {
        id: 'hotel-parkhyatt',
        lat: 42.9143,
        lon: 140.7361,
        name: 'Park Hyatt Niseko Hanazono ★★★★★L',
        tier: 'Luxury',
        description:
          'Ski-in/ski-out 5★ at the Hanazono base — the top address in Niseko, with spa, indoor pool, onsen, several restaurants and direct access to the quieter Hanazono lifts.',
        price: 110000,
        currency: 'JPY',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.hyatt.com/park-hyatt/en-US/spkph-park-hyatt-niseko-hanazono',
        contact: '+81 136 27 1234',
        imageUrl: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2020/01/22/1147/Park-Hyatt-Niseko-Hanazono-Exterior-Winter.jpg',
        note: 'Peak January from ~¥90,000–200,000/room/night; low/shoulder from ~¥38,000. Full spa, pool, onsen included.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer New Chitose (CTS) ⇄ Niseko',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-resortliner',
    unitHint: '~100 km, ~2.5–3.5 h each way',
    options: [
      {
        id: 'transfer-resortliner',
        name: 'Hokkaido Resort Liner shared coach',
        tier: 'Budget',
        description:
          'Scheduled shared coach CTS → Hirafu Welcome Centre / Niseko Village / Annupuri, reserved seat with ski storage. The everyday shared option, multiple daily departures in winter.',
        price: 8000,
        currency: 'JPY',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.access-n.jp/en/',
        contact: 'Booking via access-n.jp / hotel concierge',
        imageUrl: 'https://www.access-n.jp/images/resort-liner-coach.jpg',
        note: '~¥4,000 each way (winter) → ~¥8,000 return pp. Reserve ahead; White Liner is a comparable operator.',
      },
      {
        id: 'transfer-whiteliner',
        name: 'White Liner shared shuttle',
        tier: 'Budget',
        description:
          'Alternative reserved-seat shared shuttle CTS ⇄ Niseko villages — the option when Resort Liner times don’t suit your flight.',
        price: 12000,
        currency: 'JPY',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.nisekoareaguide.com/listings/white-liner',
        contact: 'Booking via operator site',
        note: '~¥7,000 adult / ¥5,000 child each way → ~¥12,000 return pp. Ski storage included.',
      },
      {
        id: 'transfer-privatevan',
        name: 'Private charter van (1–9 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private van from CTS matched to your flight time — the any-hour choice for a group with luggage and skis, incl. late-night arrivals.',
        price: 96000,
        currency: 'JPY',
        unit: 'per_vehicle_return',
        capacity: 9,
        vatRate: 0.10,
        url: 'https://holidayniseko.com/niseko-airport-transfers',
        contact: 'Via Niseko concierge operators',
        note: 'Private charter from ~¥48,000 each way → ~¥96,000 return per van; surcharges for early-morning/late-night runs.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Niseko United',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-allmountain',
    unitHint: 'All four resorts on one all-mountain pass',
    options: [
      {
        id: 'pass-allmountain',
        name: '6-day Niseko United All Mountain pass (peak season)',
        description:
          'One pass covering all four connected resorts — Grand Hirafu, Hanazono, Niseko Village and Annupuri — ~50 km of pistes plus the legendary tree runs and gates.',
        price: 78500,
        currency: 'JPY',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.niseko.ne.jp/en/lift/',
        contact: 'Niseko United: info@niseko.ne.jp',
        imageUrl: 'https://www.niseko.ne.jp/wp-content/uploads/niseko-united-all-mountain.jpg',
        note: '2026/27 published: 6-day adult peak (24 Dec–28 Feb) ¥78,500; youth 13–15 / senior 65+ ¥66,700; child 4–12 ¥47,100. Japan consumption tax 10% included.',
      },
      {
        id: 'pass-allmountain-regular',
        name: '6-day All Mountain pass (regular season)',
        description:
          'Same all-four-resort pass at the cheaper regular-season rate (12–23 Dec 2026 & 1–22 Mar 2027) — best value for an early-December or March powder week.',
        price: 73100,
        currency: 'JPY',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.niseko.ne.jp/en/lift/',
        contact: 'info@niseko.ne.jp',
        note: '2026/27 published: 6-day adult regular ¥73,100; youth 13–15 / senior 65+ ¥62,100; child 4–12 ¥43,900.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-rhythm',
    unitHint: 'Skis/board + boots + helmet — yen',
    options: [
      {
        id: 'rental-rhythm',
        name: 'Rhythm Japan — Niseko (mid pack, 6 days)',
        tier: 'Mid',
        description:
          'The big Hirafu rental flagship: quality ski or snowboard + boots + poles, expert boot fitting, free swaps and demo upgrades. Book online for the early-bird discount.',
        price: 43500,
        currency: 'JPY',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://rhythmjapan.com/winter-rentals-services',
        contact: 'Via rhythmjapan.com',
        imageUrl: 'https://rhythmjapan.com/img/rhythm-hirafu-rental-store.jpg',
        note: '2025/26 published: 6-day adult ski/board + boots + poles ¥43,500 (¥41,000 without boots). ~20% early-bird online. Tax included.',
      },
      {
        id: 'rental-nisekosports',
        name: 'Niseko Sports economy pack (6 days)',
        tier: 'Budget',
        description:
          'Established multi-store rental with an entry/mid ski or board + boots pack and online pre-booking discounts — the value option for a powder week.',
        price: 30000,
        currency: 'JPY',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.niseko-sports.com/en/',
        contact: 'Via niseko-sports.com',
        note: 'Adult economy ~¥5,000–6,000/day → ~¥28,000–36,000/6 days; performance packs higher. Tax included.',
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: '🛡️',
    defaultEnabled: true,
    defaultOptionId: 'ins-us-policy',
    unitHint: 'Medical + cancellation + off-piste rescue',
    options: [
      ...US_INSURANCE,
      {
        id: 'ins-niseko-backcountry',
        name: 'Off-piste / backcountry note — check your policy',
        description:
          "Niseko's gate system opens onto genuine backcountry. Many standard travel policies exclude off-piste or require a rider — confirm your plan covers the gates and helicopter evacuation before riding them.",
        price: 0,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.niseko.ne.jp/en/safety/',
        note: 'No add-on to buy from the resort — this flags a coverage check. World Nomads Explorer / Travelex riders can extend to off-piste with a guide.',
      },
    ],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'gosnow-group',
    unitHint: 'English-speaking instructors — yen',
    options: [
      {
        id: 'gosnow-group',
        name: 'GoSnow — adult group lesson (per day)',
        tier: 'Mid',
        description:
          "Niseko's official international ski & snowboard school: small English-language adult groups, full or half-day sessions from the Hirafu Welcome Centre.",
        price: 18000,
        currency: 'JPY',
        unit: 'per_person_day',
        vatRate: 0.10,
        url: 'https://www.gosnowniseko.com/',
        contact: 'Via gosnowniseko.com / hotel concierge',
        imageUrl: 'https://www.gosnowniseko.com/img/gosnow-niseko-group-lesson.jpg',
        note: 'Adult group ~¥16,000–20,000/day peak (half-day ~¥11,000). Book a 4–6 day block for a full course. Tax included.',
      },
      {
        id: 'niss-private',
        name: 'NISS — private instructor (half day)',
        tier: 'Premium',
        description:
          "Niseko International Snowsports School: private English-speaking instructor for your group per half-day — tailored coaching and powder guiding, lift pass not included.",
        price: 45000,
        currency: 'JPY',
        unit: 'per_group',
        vatRate: 0.10,
        url: 'https://www.niss.co.jp/en/',
        contact: 'info@niss.co.jp · +81 136 55 5522',
        note: 'Half-day private ~¥40,000–55,000 peak (up to ~2–3 guests); full day higher. Confirm slot & language.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Niseko has no Saturday-changeover rule — pick any check-in day, but January (the powder peak) and Japanese New Year sell out first. Hold flights LAX/SFO → Tokyo → New Chitose (CTS); trans-Pacific fares are steadiest booked ~3–4 months out. Request the accommodation block early: Hirafu apartments and hotels move fast for prime-January weeks and often want a deposit on confirmation.',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Buy Niseko United All Mountain passes (6-day adult peak ¥78,500 / regular ¥73,100) via niseko.ne.jp; passes load onto a rechargeable keycard. Reserve Hokkaido Resort Liner or White Liner shared coach seats from CTS (~¥8–12k return), or a private charter van (~¥96k/van return) matched to flight times — winter road times run 2.5–3.5 h.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes. Issue insurance (US policy per traveler) and CHECK the off-piste/backcountry clause before anyone uses the gates — many policies exclude it or need a rider. Book GoSnow/NISS lessons and confirm English-language groups. Pay accommodation balances; send transfer operators the flight numbers.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Fly Day 1 US → arrive Tokyo → domestic hop or same-day connection to CTS → shared coach or private van to Hirafu (~3 h) → check-in, collect keycards, rental + boot fitting → ski 6 days of Japow (night skiing at Hirafu, tree runs through the gates, an onsen soak every evening) → transfer back to CTS for the flight home. Leave a Tokyo buffer if self-connecting to a separate international ticket.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Japan consumption tax (10%) is already included in these yen prices; a small per-night accommodation/bathing tax may apply in Kutchan/Niseko — confirm at booking. International flights are zero-rated. Backcountry gates are avalanche terrain: check the daily Niseko avalanche bulletin and only ride the gates with the right kit and, ideally, a guide. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const NISEKO_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 55, base: 25, top: 45 },
  { month: 'Dec', snowfall: 245, base: 130, top: 170 },
  { month: 'Jan', snowfall: 310, base: 210, top: 280 },
  { month: 'Feb', snowfall: 250, base: 260, top: 340 },
  { month: 'Mar', snowfall: 150, base: 240, top: 320 },
  { month: 'Apr', snowfall: 50, base: 130, top: 210 },
];

export const niseko: Resort = {
  id: 'niseko',
  name: 'Niseko United',
  country: 'Japan',
  flag: '\u{1F1EF}\u{1F1F5}',
  area: 'Niseko United (Hokkaido)',
  blurb:
    'Hokkaido’s powder capital — four linked resorts on Mt Niseko Annupuri buried under ~14 m of the lightest, driest "Japow" on Earth, with an onsen at the end of every run.',
  lat: 42.8583,
  lon: 140.6874,
  elevationM: 255,
  currency: 'JPY',
  gatewayAirports: ['CTS'],
  defaultOrigin: 'LAX',
  mapsName: 'Niseko Hirafu',
  saturdayChangeover: false,
  season: { open: '2026-11-28', close: '2027-05-06', linkOpen: '2026-12-05', linkClose: '2027-04-04' },
  weeks: japanWeeks,
  snowByMonth: NISEKO_SNOW,
  snowFacts:
    'Hirafu base ~255 m, summit Annupuri ~1,188 m. One of the snowiest lift-served resorts on the planet: ~14 m (≈1,400 cm) of famously dry powder a season, Siberian storms reloading the trees nightly Dec–Feb; night skiing at Grand Hirafu.',
  components,
  logistics,
};

export default niseko;
