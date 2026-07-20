// St. Anton am Arlberg, Austria — the "cradle of alpine skiing" and gateway to
// the 300 km Ski Arlberg network. Shaped like val-thorens.ts (see resorts/types.ts
// for the schema; resorts/shared.ts for reusable options like US_INSURANCE).

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
    defaultOptionId: 'flight-zrh',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-zrh',
        name: 'JFK → Zurich (ZRH), SWISS nonstop',
        tier: 'Budget',
        description:
          'SWISS/United nonstop JFK → ZRH (~8 h), then a ~2h20 drive (200 km) or a direct EuroCity train to St. Anton. Usually the best-value, best-connected gateway.',
        price: 820,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-zurich.html',
        note: 'Winter band ~$700–$1,050 round trip. International air is VAT-exempt.',
      },
      {
        id: 'flight-muc',
        name: 'JFK → Munich (MUC), Lufthansa nonstop',
        tier: 'Mid',
        description:
          'Lufthansa/United nonstop JFK → MUC, then ~2h30 drive (250 km) via the Fernpass or Arlberg. Good fares and frequent service.',
        price: 850,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-munich.html',
        note: 'Winter band ~$700–$1,000 round trip.',
      },
      {
        id: 'flight-inn',
        name: 'JFK → Innsbruck (INN), 1-stop',
        tier: 'Premium',
        description:
          'Austrian/Lufthansa via FRA, ZRH or VIE into Innsbruck — the nearest gateway, ~1 h drive (99 km). Shortest transfer, priciest air.',
        price: 1050,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-innsbruck.html',
        note: 'Winter band ~$900–$1,200 round trip; always connects (no JFK nonstop to INN).',
      },
      {
        id: 'flight-eu',
        name: 'Intra-EU flight → Zurich / Innsbruck',
        tier: 'From Europe',
        description:
          'Short-haul round trip to ZRH or INN for group members already in Europe (LHR/AMS/BER class of routes).',
        price: 160,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20ZRH',
        note: 'Typical €90–260 round trip booked ahead. Quoted fares are final.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-nassereinerhof',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-susanne',
        lat: 47.1345,
        lon: 10.2790,
        name: 'Pension Susanne',
        tier: 'Budget',
        description:
          'Traditional 3★ B&B pension in the quieter Nasserein quarter, a short walk from the Nassereinbahn gondola — good value with a hearty breakfast.',
        price: 85,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://pension-susanne-sankt-anton-am-arlberg.stantonamarlberghotels.com/en/',
        contact: 'Book direct via St. Anton tourism · +43 5446 22690',
        note: 'Estimate ~€85 pp/night B&B; peak weeks higher.',
      },
      {
        id: 'hotel-nassereinerhof',
        lat: 47.1345,
        lon: 10.2795,
        name: 'Hotel Nassereinerhof ★★★★',
        tier: 'Mid',
        description:
          '4★ with a panorama pool and spa, 150 m from the Nassereinbahn — a comfortable mid-tier base with quick access to the Ski Arlberg lifts.',
        price: 150,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.nassereinerhof.at/en/',
        contact: 'office@nassereinerhof.at · +43 5446 3366',
        imageUrl: 'https://www.nassereinerhof.at/uploads/tx_bh/776/hotel-nassereinerhof-urlaub-in-stanton_502-superior-doppelzimmer-mit-panoramapool_05.jpg',
        note: 'Estimate ~€150 pp/night half board mid-winter; dynamic pricing — check engine.',
      },
      {
        id: 'hotel-himmlhof',
        lat: 47.1305,
        lon: 10.2695,
        name: 'Himmlhof ★★★★ boutique',
        tier: 'Mid',
        description:
          'Characterful family-run 4★ boutique chalet-hotel a few minutes from the pedestrian centre — antique Tyrolean rooms, sauna and open fire.',
        price: 185,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.himmlhof.com/en/',
        contact: 'info@himmlhof.com · +43 5446 2322',
        imageUrl: 'https://www.himmlhof.com/uploads/tx_bh/62/himmlhof_bh_zimmer_081_christoph_schoech_2018.jpg',
        note: 'Estimate ~€185 pp/night half board; peak weeks higher.',
      },
      {
        id: 'hotel-karlschranz',
        lat: 47.1310,
        lon: 10.2600,
        name: 'Hotel Karl Schranz ★★★★',
        tier: 'Premium',
        description:
          '4★ run by the family of the legendary Arlberg racer, with an indoor pool and spa on the edge of the village centre.',
        price: 210,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.hotelkarlschranz.com/',
        contact: 'info@hotelkarlschranz.com · +43 5446 29770',
        imageUrl: 'https://www.hotelkarlschranz.com/files/hotelkarlschranz_hotel-arlberg-1.jpg',
        note: 'Estimate ~€210 pp/night half board; peak weeks higher.',
      },
      {
        id: 'hotel-schwarzeradler',
        lat: 47.1293,
        lon: 10.2660,
        name: 'Hotel Schwarzer Adler ★★★★S',
        tier: 'Premium',
        description:
          '4★ superior run by the Tschol family since 1570 in the heart of the pedestrian centre — frescoed façade, spa and celebrated restaurant.',
        price: 225,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.schwarzeradler.com/en/',
        contact: 'hotel@schwarzeradler.com · +43 5446 22440',
        imageUrl: 'https://www.schwarzeradler.com/uploads/tx_bh/82/cs_20160825_schwarzer_adler_0022.jpg',
        note: 'Estimate ~€225 pp/night half board; peak weeks higher.',
      },
      {
        id: 'hotel-antonerhof',
        lat: 47.1283,
        lon: 10.2625,
        name: "Raffl's St. Antoner Hof ★★★★★",
        tier: 'Luxury',
        description:
          '5★ Relais-style hotel by the Galzigbahn — the classic luxury address of St. Anton with a large spa, gourmet dining and ski-in convenience.',
        price: 380,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.antonerhof.at/en/',
        contact: 'info@raffls.com · +43 5446 2910',
        note: 'Estimate ~€380 pp/night half board; suites materially higher.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer ZRH/INN/MUC ⇄ St. Anton',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-train',
    unitHint: 'INN 99 km ~1h; ZRH ~2h20',
    options: [
      {
        id: 'transfer-train',
        name: 'ÖBB train to St. Anton station',
        tier: 'Budget',
        description:
          'St. Anton has a mainline ÖBB station in the village on the Arlberg railway — Railjet/EuroCity trains arrive right by the lifts. The easiest, greenest route. Runs every day.',
        price: 52,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.oebb.at/en',
        contact: 'tickets.oebb.at · ÖBB customer service +43 5 1717',
        note: 'Return estimate: Innsbruck–St. Anton ~€26 each way (Sparschiene from ~€10); Zürich–St. Anton EC direct ~€60–70 each way.',
      },
      {
        id: 'transfer-shuttle',
        name: 'Arlberg Express shared shuttle',
        tier: 'Mid',
        description:
          'Scheduled shared shuttle from Zurich or Innsbruck airport to St. Anton, matched to flight times — the value door-to-door option when not taking the train.',
        price: 140,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://arlbergexpress.com/en/',
        contact: 'info@arlbergexpress.com · +43 5583 2000',
        note: 'Estimate ~€60–70 pp each way from ZRH, ~€45–60 from INN. Return figure shown.',
      },
      {
        id: 'transfer-private',
        name: 'Arlberg Express private van (4–7 pax)',
        tier: 'Premium',
        description:
          'Private minivan door to door, any arrival time, price incl. tolls/parking and 2 h flight-delay waiting. Best for a group landing together.',
        price: 820,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 7,
        vatRate: 0.10,
        url: 'https://arlbergexpress.com/en/',
        contact: 'info@arlbergexpress.com · +43 5583 2000',
        note: 'Verified 2025/26 one-way: INN 4–7 pax €410 → ~€820 return; ZRH €620 one-way → ~€1,240 return.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Ski Arlberg',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-adult',
    unitHint: '~300 km pistes, 85 lifts, one pass',
    options: [
      {
        id: 'pass-adult',
        name: '6-day adult Ski Arlberg pass',
        description:
          'Full Arlberg pass: St. Anton, St. Christoph, Stuben, Lech, Zürs, Warth-Schröcken — the largest connected ski area in Austria, ~300 km of piste.',
        price: 450,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.13,
        url: 'https://www.skiarlberg.at/en/st-anton/tickets-season-times/prices-tickets-winter',
        contact: 'Arlberger Bergbahnen AG: +43 5446 2352-0 · info via skiarlberg.at',
        note: '2025/26 reference €450 (26/27 tariffs finalized ~Sept 2026, expect +3–6%). Austrian lift VAT 13%.',
      },
      {
        id: 'pass-shoulder',
        name: '6-day adult — early/late-season pass',
        description:
          'Same full-area Ski Arlberg pass at the discounted shoulder-season tariff (early December and mid-April weeks).',
        price: 380,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.13,
        url: 'https://www.skiarlberg.at/en/tickets-season-times/season-times-winter',
        contact: '+43 5446 2352-0',
        note: '2025/26 reference €380 for the shoulder weeks; children (born ≥ 2010) pay the child tariff.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-intersport',
    unitHint: 'Skis + boots + helmet',
    options: [
      {
        id: 'rental-intersport',
        name: 'Intersport Arlberg premium pack',
        tier: 'Mid',
        description:
          'Premium ski + boots fitted in the resort shop, pay 6 days / ski 7, online booking −10% if paid ≥48 h ahead. Kids ≤10 free with renting parents.',
        price: 301,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.intersport-arlberg.com/en/rent/rates/',
        contact: 'rent@intersport-arlberg.at · +43 5446 34533',
        note: 'Verified: premium skis €209 + boots €92 = €301/6–7 days (~€271 online). Rental carries 20% Austrian VAT.',
      },
      {
        id: 'rental-sport2000',
        name: 'SPORT 2000 St. Anton mid pack',
        tier: 'Budget',
        description:
          'Mid-range ski + boots package from the SPORT 2000 rental network, bookable online in advance at a discount.',
        price: 200,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.sport2000rent.com/en/',
        contact: 'Via sport2000rent.com St. Anton branch',
        note: 'Estimate ~€180–220/6-day ski+boots mid class; engine-priced.',
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
        id: 'ins-arlberg-safety',
        name: 'Arlberg Safety Card (mountain rescue) — up to 8 days',
        description:
          'Local add-on sold with the lift pass: covers search, mountain-rescue and helicopter recovery costs on the Arlberg, plus repatriation assistance.',
        price: 20,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skiarlberg.at/en/st-anton/tickets-season-times/prices-tickets-winter',
        note: '€20 flat, added at lift-pass checkout — a cheap top-up to a US travel policy for rescue/heli costs.',
      },
    ],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'school-arlberg-group',
    unitHint: 'English-speaking instructors',
    options: [
      {
        id: 'school-arlberg-group',
        name: 'Skischule Arlberg — adult group, 6 mornings',
        description:
          'The historic Arlberg school (birthplace of the Arlberg technique): 6 consecutive mornings in a graded adult group, meeting at Kandaharweg.',
        price: 555,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skischule-arlberg.com/en/',
        contact: 'info@skischule-arlberg.com · +43 5446 3411',
        note: 'Verified peak list €555 (online-discount €499.50). Tuition is VAT-exempt.',
      },
      {
        id: 'school-stanton-group',
        name: 'Skischule St. Anton — adult group, 6 days',
        tier: 'Mid',
        description:
          'The village’s second big school — small graded groups, English-speaking instructors, 6 consecutive days.',
        price: 555,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skistanton.com/en/',
        contact: 'info@skischule-stanton.com · +43 5446 3563',
        note: 'List ~€555 / ~€499.50 discounted (2025/26).',
      },
      {
        id: 'school-arlberg-private',
        name: 'Skischule Arlberg — private instructor, half day',
        tier: 'Premium',
        description:
          'Private instructor for your group per half-day (3 h) engagement; lift pass not included. The fast track for mixed-ability groups.',
        price: 330,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.skischule-arlberg.com/en/',
        contact: 'info@skischule-arlberg.com · +43 5446 3411',
        note: 'Estimate ~€300–360 half day; ~€90–100/hour. Confirm slot on booking.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week: St. Anton hotels and ski-school courses run on Saturday changeover. Hold flights early — ZRH is usually the best value and rail-connected (~$700–1,050 round trip), INN the nearest but priciest. Request the hotel allotment: standard Austrian group terms are a ~30% deposit on confirmation and the balance ~30 days before arrival. Negotiate the allotment release date (typically 60–90 days pre-arrival).',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Order Ski Arlberg pass manifests from Arlberger Bergbahnen AG (+43 5446 2352-0); 2026/27 tariffs finalize ~September 2026, budget +3–6% over the €450 6-day reference and add the €20 Arlberg Safety Card per skier. Reserve Arlberg Express shuttle seats or a private van matched to flight times, or brief the group on the direct ÖBB EuroCity trains that stop in the village.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes (Intersport Arlberg / SPORT 2000 take online pre-bookings at a discount). Issue insurance (US policy per traveler + Arlberg Safety Card on each pass). Pay the hotel balance. Send suppliers flight numbers or train times for pickup; confirm Skischule Arlberg course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat arrival at ZRH/INN/MUC → EuroCity train or shuttle into St. Anton (~1–2h20) → check-in, collect passes and rental → ski Sun–Fri (the Valluga, Rendl and the White Ring circuit over to Lech/Zürs) → Sat morning transfer/train out, afternoon flight home. Keep ≥4 h between landing and any transfer cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Austrian VAT in these prices: hotels/half-board 10%, transfers 10%, lift passes 13%, equipment rental 20%; ski-school tuition and the Safety Card are exempt; international flights zero-rated. A local tourist tax (Ortstaxe) is added per adult per night on top of room rates — confirm the season grid with the hotel. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const ST_ANTON_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 40, base: 6, top: 37 },
  { month: 'Dec', snowfall: 70, base: 38, top: 122 },
  { month: 'Jan', snowfall: 85, base: 50, top: 161 },
  { month: 'Feb', snowfall: 80, base: 91, top: 276 },
  { month: 'Mar', snowfall: 75, base: 95, top: 304 },
  { month: 'Apr', snowfall: 45, base: 72, top: 297 },
];

export const stAnton: Resort = {
  id: 'st-anton',
  name: 'St. Anton am Arlberg',
  country: 'Austria',
  flag: '\u{1F1E6}\u{1F1F9}',
  area: 'Ski Arlberg',
  blurb:
    'The cradle of alpine skiing — high, snow-sure and steep, with legendary off-piste and 300 km of linked runs across the Arlberg to Lech and Zürs.',
  lat: 47.1300,
  lon: 10.2639,
  elevationM: 1304,
  currency: 'EUR',
  gatewayAirports: ['INN', 'ZRH', 'MUC'],
  defaultOrigin: 'JFK',
  mapsName: 'St. Anton am Arlberg',
  saturdayChangeover: true,
  season: { open: '2026-12-04', close: '2027-04-18' },
  weeks: alpineWeeks,
  snowByMonth: ST_ANTON_SNOW,
  snowFacts:
    'High-alpine and famously snowy: village at 1,304 m, Valluga summit 2,811 m (1,507 m vertical). Deepest average base in March; heavy natural snowfall and vast off-piste make it one of the Alps’ powder benchmarks.',
  components,
  logistics,
};

export default stAnton;
