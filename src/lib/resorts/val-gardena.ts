// Val Gardena / Selva, Italy — Dolomiti Superski. Same shape as val-thorens.ts
// (see resorts/types.ts for the schema; resorts/shared.ts for US_INSURANCE).

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
    defaultOptionId: 'flight-vrn',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-vrn',
        name: 'JFK 1-stop economy → Verona (VRN)',
        tier: 'Budget',
        description:
          'JFK → Verona Villafranca via FRA/MUC/VIE, ~12–14 h door to door — a natural South Tyrol gateway (~190 km via the A22 Brenner motorway).',
        price: 760,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20JFK%20to%20VRN',
        note: 'Winter band ~$600–$1,000 round trip. International air is VAT-exempt.',
      },
      {
        id: 'flight-inn',
        name: 'JFK 1-stop economy → Innsbruck (INN)',
        tier: 'Budget',
        description:
          'JFK → Innsbruck via FRA/VIE/LHR — the closest airport to Val Gardena (~110 km over the Brenner). Smaller airport, big-Saturday charter frequencies.',
        price: 880,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20JFK%20to%20INN',
        note: 'Winter band ~$680–$1,300 round trip. Shortest drive to Selva of the three gateways.',
      },
      {
        id: 'flight-vce',
        name: 'JFK 1-stop economy → Venice (VCE)',
        tier: 'Premium',
        description:
          'JFK → Venice Marco Polo via a European hub — more frequencies and often better long-haul cabins, ~230 km to Selva.',
        price: 720,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-venice.html',
        note: 'Winter band ~$550–$950 round trip; the deepest schedule of the three gateways.',
      },
      {
        id: 'flight-eu',
        name: 'Intra-EU flight → Verona / Innsbruck',
        tier: 'From Europe',
        description:
          'Short-haul round trip to VRN/INN/BGY/MUC from a European city for group members already in Europe (Ryanair/easyJet/Lufthansa class of routes).',
        price: 130,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20Verona',
        note: 'Typical €60–210 round trip booked ahead. Quoted fares are final.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-aaritz',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-astor',
        lat: 46.5548,
        lon: 11.7625,
        name: 'Garni Astor (B&B) ★★★',
        tier: 'Budget',
        description:
          'Cosy South-Tyrolean B&B guesthouse in central Selva — the value base for a Val Gardena week, walk to the Dantercepies gondola and village bars.',
        price: 75,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.garni-astor.com/en/',
        contact: 'info@garni-astor.com · +39 0471 795207',
        imageUrl: 'https://www.garni-astor.com/wp-content/uploads/garni-astor-selva-esterno.jpg',
        note: 'B&B from ~€70–100 pp/night in winter; breakfast only, no half board. Central Selva.',
      },
      {
        id: 'hotel-aaritz',
        lat: 46.5541,
        lon: 11.7601,
        name: 'Hotel Aaritz ★★★★',
        tier: 'Mid',
        description:
          'Warm family-run 4★ in the centre of Selva with sauna, small spa and a well-regarded half-board kitchen — a short walk to the Ciampinoi and Dantercepies lifts.',
        price: 135,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.aaritz.com/en/',
        contact: 'info@aaritz.com · +39 0471 795011',
        imageUrl: 'https://www.aaritz.com/wp-content/uploads/hotel-aaritz-selva-val-gardena.jpg',
        note: 'Half board ~€120–170 pp/night in season; peak Christmas/February higher. Request group allotment.',
      },
      {
        id: 'hotel-wolkenstein',
        lat: 46.5556,
        lon: 11.7598,
        name: 'Grand Hotel Wolkenstein ★★★★',
        tier: 'Mid',
        description:
          'Classic 4★ with indoor pool, spa and half-board-plus dining (afternoon snacks + 5/6-course dinner), free ski shuttle and heated ski storage.',
        price: 165,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.wolkenstein.it/en/hotel-wolkenstein/hotel/',
        contact: 'info@wolkenstein.it · +39 0471 795336',
        imageUrl: 'https://www.wolkenstein.it/wp-content/uploads/grand-hotel-wolkenstein-selva-esterno.jpg',
        note: 'Half board ~€150–210 pp/night in season. Pool + spa + ski shuttle included.',
      },
      {
        id: 'hotel-granvara',
        lat: 46.5518,
        lon: 11.7493,
        name: 'Granvara Relais & SPA Hotel ★★★★★',
        tier: 'Premium',
        description:
          '5★ relais on a sunny plateau above Selva with 15,000 m² garden, panoramic spa and pool, ski-in access to the Dantercepies runs and 360° Dolomite views.',
        price: 260,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.granvara.com/en/',
        contact: 'info@granvara.com · +39 0471 795250',
        imageUrl: 'https://www.granvara.com/wp-content/uploads/granvara-relais-spa-selva-esterno.jpg',
        note: 'Half board ~€240–340 pp/night in season. Panoramic spa + pool included.',
      },
      {
        id: 'hotel-alpenroyal',
        lat: 46.5528,
        lon: 11.7584,
        name: 'Alpenroyal Grand Hotel — Gourmet & Spa ★★★★★L',
        tier: 'Luxury',
        description:
          'The first 5★ in Selva and a Leading Hotels of the World member — grand horseshoe building, 2,000 m² spa, indoor/outdoor pools and Michelin-level dining, ski-back access.',
        price: 620,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.alpenroyal.com/en/',
        contact: 'info@alpenroyal.com · +39 0471 795555',
        imageUrl: 'https://www.alpenroyal.com/wp-content/uploads/alpenroyal-grand-hotel-selva-esterno.jpg',
        note: 'Winter half board from ~€550–850/room/night; peak weeks higher. Full spa, pools, gourmet dining.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer ⇄ Selva Val Gardena',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-suedtirol',
    unitHint: 'Innsbruck ~110 km · Verona ~190 km · Venice ~230 km',
    options: [
      {
        id: 'transfer-suedtirol',
        name: 'Südtirol Transfer shared shuttle',
        tier: 'Budget',
        description:
          'Scheduled shared shuttle from INN/VRN/VCE/BZO to Val Gardena villages — the everyday shared option, matched to arrival waves on winter Saturdays.',
        price: 70,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.suedtiroltransfer.com/en/',
        contact: 'info@suedtiroltransfer.com · +39 0471 1551375',
        imageUrl: 'https://www.suedtiroltransfer.com/wp-content/uploads/suedtirol-transfer-van.jpg',
        note: 'From ~€35–45 each way depending on airport → ~€70–90 return pp. Books online.',
      },
      {
        id: 'transfer-train-bus',
        name: 'Train to Bolzano/Chiusa + SAD bus',
        tier: 'Budget',
        description:
          'Trenitalia to Bolzano or Chiusa-Klausen, then SAD/Südtirolmobil line 350/351 up the valley to Selva (~1h). The flexible public route that runs every day.',
        price: 45,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.suedtirolmobil.info/en/',
        contact: 'Südtirolmobil call center +39 0471 220880',
        note: 'Train €10–30 + valley bus ~€8 each way. Longer but weather-proof; regional Südtirol Pass discounts.',
      },
      {
        id: 'transfer-privatevan',
        name: 'Private van transfer (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private minivan from Innsbruck/Verona/Venice matched to your flight — the any-day, any-hour choice for a group with skis and luggage.',
        price: 480,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.10,
        url: 'https://www.suedtiroltransfer.com/en/private-transfer/',
        contact: 'info@suedtiroltransfer.com · +39 0471 1551375',
        note: 'Quote-based; ~€230–270/van each way from Innsbruck. Planning figure per van return.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Dolomiti Superski',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-dolomiti',
    unitHint: 'Sellaronda + 1,200 km on one pass',
    options: [
      {
        id: 'pass-dolomiti',
        name: '6-day adult Dolomiti Superski pass (high season)',
        description:
          'The full 1,200 km / 12-valley network — Val Gardena, Alta Badia, Arabba, the whole Sellaronda circuit and beyond — on a single keycard.',
        price: 357,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.dolomitisuperski.com/en/plan-and-book/skipassandprices',
        contact: 'Val Gardena groups: info@valgardena.it · +39 0471 777777',
        imageUrl: 'https://www.dolomitisuperski.com/dam/jcr:dolomiti-superski-hero/dolomiti-superski.jpg',
        note: '2025/26 high-season adult ~€357 (6 days). 5% off online ≥2 days ahead. Lifts carry 10% Italian VAT.',
      },
      {
        id: 'pass-valgardena-local',
        name: '6-day Val Gardena / Alpe di Siusi (local) pass',
        description:
          "Cheaper local pass covering the Val Gardena–Alpe di Siusi lifts (Ciampinoi, Dantercepies, Seceda, Seiser Alm) — right if you'll stay on the home Sellaronda side all week.",
        price: 330,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.val-gardena.com/en/winter/ski-resort-val-gardena/ski-pass/',
        contact: 'info@valgardena.it · +39 0471 777777',
        note: 'Local pass ~€25–30 below the full Superski. Junior (born after 2010) ~30% off; senior similar. Family reductions on Superski Family days.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-rentandgo',
    unitHint: 'Skis + boots + helmet',
    options: [
      {
        id: 'rental-rentandgo',
        name: 'Rent and Go Selva (mid pack)',
        tier: 'Mid',
        description:
          'Central Selva shop with mid-range performance skis or board + boots, in-store fitting, 10% online discount and free mid-week swaps.',
        price: 175,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.22,
        url: 'https://www.rentandgo.it/eng/localities/view/selva-di-val-gardena',
        contact: 'Via online booking on rentandgo.it',
        note: '~€25–30/day adult mid pack → ~€150–190/6 days; helmet +€6/day. Italian rental carries 22% VAT.',
      },
      {
        id: 'rental-intersport',
        name: 'Intersport Rent — Selva economy pack',
        tier: 'Budget',
        description:
          'Entry/mid ski + boots pack from the Intersport network in Selva with online pre-booking discounts — the value option for a Sellaronda week.',
        price: 135,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.22,
        url: 'https://www.intersportrent.it/en/',
        contact: 'Via intersportrent.it',
        note: 'Adult economy from ~€18–22/day → ~€115–150/6 days. Up to ~40% off booking online.',
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
        id: 'ins-dolomiti-protection',
        name: 'Dolomiti Superski Protection (piste rescue) — 6 days',
        description:
          'Optional cover added at pass checkout: on-piste rescue, medical costs, ski-liability and unused-pass refund inside the Dolomiti Superski area. South Tyrol mountain rescue can bill for evacuation, so this closes a real gap.',
        price: 18,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.dolomitisuperski.com/en/plan-and-book/skipassandprices',
        note: '~€2.90/day, bought online with the lift pass. Complements (not replaces) the US travel policy.',
      },
    ],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'scuola-selva-group',
    unitHint: 'English-speaking instructors',
    options: [
      {
        id: 'scuola-selva-group',
        name: 'Scuola Sci Selva Gardena — group course (6 mornings)',
        tier: 'Mid',
        description:
          'Selva village ski school: six consecutive morning lessons in small mixed-ability groups with English-speaking instructors, meeting at the base of Ciampinoi.',
        price: 250,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.scuolasciselva.com/en/',
        contact: 'info@scuolasciselva.com · +39 0471 795156',
        imageUrl: 'https://www.scuolasciselva.com/images/scuola-sci-selva-maestri.jpg',
        note: 'Group course from ~€250 (small groups, max ~5). Ski tuition is VAT-exempt in Italy.',
      },
      {
        id: 'scuola-2000-private',
        name: 'Ski & Snowboard School 2000 — private (half day)',
        tier: 'Premium',
        description:
          'Private instructor for your group per half-day engagement from School 2000 Selva — tailored coaching, lift pass not included; 20% off equipment rental for private clients.',
        price: 280,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.scuolasci-selva.it/en/the-ski-school/private-lessons/',
        contact: 'info@scuolasci-selva.it · +39 0471 773125',
        note: 'In-season private ~€55–70/hour → ~€250–320 for a 3–4h half day. Confirm slot & language.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week; South Tyrol runs on Saturday changeover for hotels and courses. Hold flights to Innsbruck (closest, ~110 km), Verona or Venice; winter 1-stop fares bottom out ~2–3 months ahead. Request the hotel allotment: standard Italian group terms are ~30% deposit on confirmation, balance ~30 days before arrival. Christmas and February half-term weeks sell out first in Selva.',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Decide full Dolomiti Superski (Sellaronda + 1,200 km, ~€357/6 days high season) vs the cheaper Val Gardena / Alpe di Siusi local pass. For groups, contact info@valgardena.it (+39 0471 777777); passes load onto keycards, 5% off online ≥2 days ahead. Book Südtirol Transfer shuttle seats or a private van matched to flight times for any-day arrivals.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes. Issue insurance (US policy per traveler + optional Dolomiti Superski Protection at ~€2.90/day added to each pass). Pay the hotel balance. Send suppliers flight numbers for transfer pickup; confirm ski-school course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat arrival at INN/VRN/VCE → shuttle or private van up the valley (~1h30–3h) → check-in, collect keycards, rental fitting → ski Sun–Fri (school courses start Sunday; ride the full Sellaronda circuit mid-week) → Sat morning transfer down, afternoon flight home. Keep ≥3 h between landing and the shuttle cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'South Tyrol imposta di soggiorno (tourist tax) is charged per person per night by hotel category — confirm the season grid with the tourist office. Italian VAT in these prices: hotels, half-board, transfers and lifts 10%; equipment rental 22%; ski-school tuition and insurance exempt; international flights zero-rated. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const VG_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 50, base: 30, top: 45 },
  { month: 'Dec', snowfall: 75, base: 55, top: 80 },
  { month: 'Jan', snowfall: 90, base: 80, top: 115 },
  { month: 'Feb', snowfall: 85, base: 95, top: 130 },
  { month: 'Mar', snowfall: 80, base: 100, top: 140 },
  { month: 'Apr', snowfall: 45, base: 65, top: 105 },
];

export const valGardena: Resort = {
  id: 'val-gardena',
  name: 'Val Gardena / Selva',
  country: 'Italy',
  flag: '\u{1F1EE}\u{1F1F9}',
  area: 'Dolomiti Superski',
  blurb:
    'A sunny South-Tyrolean valley at the heart of the Sellaronda circuit — Selva, Santa Cristina and Ortisei on one keycard into the 1,200 km Dolomiti Superski.',
  lat: 46.5547,
  lon: 11.7597,
  elevationM: 1563,
  currency: 'EUR',
  gatewayAirports: ['INN', 'VRN', 'VCE'],
  defaultOrigin: 'JFK',
  mapsName: 'Selva di Val Gardena',
  saturdayChangeover: true,
  season: { open: '2026-11-28', close: '2027-04-11', linkOpen: '2026-12-05', linkClose: '2027-04-11' },
  weeks: alpineWeeks,
  snowByMonth: VG_SNOW,
  snowFacts:
    'Selva base 1,563 m, lifts to ~2,520 m (Seceda ridge to ~2,520 m; Sella group towers above). Reliable snowmaking on the Saslong World Cup piste and the Sellaronda; part of the 1,200 km Dolomiti Superski — dependable groomers Dec–early Apr.',
  components,
  logistics,
};

export default valGardena;
