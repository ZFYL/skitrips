// Cortina d'Ampezzo, Italy — Dolomiti Superski. Same shape as val-thorens.ts
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
    defaultOptionId: 'flight-vce',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-vce',
        name: 'JFK 1-stop economy → Venice (VCE)',
        tier: 'Budget',
        description:
          'JFK → Venice Marco Polo via a European hub (LHR/CDG/FRA/MUC), ~11–13 h door to door. Venice is the closest big gateway to Cortina (~160 km).',
        price: 720,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-venice.html',
        note: 'Verified winter band ~$550–$950 round trip; deals from ~$520. International air is VAT-exempt.',
      },
      {
        id: 'flight-vrn',
        name: 'JFK 1-stop economy → Verona (VRN)',
        tier: 'Budget',
        description:
          'JFK → Verona Villafranca via FRA/MUC/VIE — an alternative Dolomites gateway (~200 km, motorway most of the way).',
        price: 780,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20JFK%20to%20VRN',
        note: 'Winter band ~$600–$1,000 round trip. Good when Venice fares spike.',
      },
      {
        id: 'flight-inn',
        name: 'JFK 1-stop economy → Innsbruck (INN)',
        tier: 'Premium',
        description:
          'JFK → Innsbruck via FRA/VIE/LHR — the scenic Austrian gateway, ~160 km over the Brenner. Smaller airport, fewer frequencies.',
        price: 900,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20JFK%20to%20INN',
        note: 'Winter band ~$700–$1,300 round trip; Saturday INN charters fill fast in season.',
      },
      {
        id: 'flight-eu',
        name: 'Intra-EU flight → Venice / Verona',
        tier: 'From Europe',
        description:
          'Short-haul round trip to VCE/VRN/TSF from a European city for group members already in Europe (easyJet/Ryanair/ITA/Lufthansa class of routes).',
        price: 140,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20Venice',
        note: 'Typical €70–220 round trip booked ahead. Quoted fares are final.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-montana',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-villaalpina',
        lat: 46.5372,
        lon: 12.1361,
        name: 'Hotel Villa Alpina ★★★',
        tier: 'Budget',
        description:
          'Simple, friendly 3★ a few steps off Corso Italia in the pedestrian centre — the value base for a Cortina week, walk to the Faloria cable car.',
        price: 85,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.hotelvillaalpina.it/en/',
        contact: 'info@hotelvillaalpina.it · +39 0436 2418',
        imageUrl: 'https://www.hotelvillaalpina.it/wp-content/uploads/2019/09/hotel-villa-alpina-cortina-esterno.jpg',
        note: 'B&B from ~€80–110 pp/night in winter; half board add-on ~€25. Central, no spa.',
      },
      {
        id: 'hotel-montana',
        lat: 46.5389,
        lon: 12.1383,
        name: 'Hotel Montana ★★★',
        tier: 'Mid',
        description:
          'Historic 1920s townhouse hotel right on Corso Italia — the most central address in Cortina, walkable to shops, bars and the Faloria/Freccia lifts.',
        price: 105,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.cortina-hotel.com/en/',
        contact: 'info@cortina-hotel.com · +39 0436 862126',
        imageUrl: 'https://www.cortina-hotel.com/wp-content/uploads/2020/06/hotel-montana-cortina-facciata.jpg',
        note: 'B&B ~€95–140 pp/night in season; central location, no on-site spa. Half board via nearby partner restaurants.',
      },
      {
        id: 'hotel-ancora',
        lat: 46.5378,
        lon: 12.1373,
        name: 'Hotel Ancora ★★★★',
        tier: 'Mid',
        description:
          'Grand, art-filled 4★ on Corso Italia — a Cortina institution since the 1800s with restaurant, bar and terrace overlooking the Corso.',
        price: 190,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.hotelancoracortina.com/en/',
        contact: 'info@hotelancoracortina.com · +39 0436 3261',
        imageUrl: 'https://www.hotelancoracortina.com/wp-content/uploads/2021/01/hotel-ancora-cortina-esterno-inverno.jpg',
        note: 'Half board ~€180–260 pp/night in high season; peak Christmas/February materially higher — request group allotment.',
      },
      {
        id: 'hotel-savoia',
        lat: 46.5334,
        lon: 12.1326,
        name: 'Grand Hotel Savoia, Radisson Collection ★★★★★',
        tier: 'Premium',
        description:
          '5★ Radisson Collection landmark with spa, indoor pool, two restaurants and ski shuttle — polished comfort a short walk south of the centre.',
        price: 320,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.grandhotelsavoiacortina.it/en/',
        contact: 'info@grandhotelsavoiacortina.it · +39 0436 3201',
        imageUrl: 'https://www.grandhotelsavoiacortina.it/wp-content/uploads/2020/01/grand-hotel-savoia-cortina-esterno.jpg',
        note: 'Half board ~€300–450 pp/night in season (Radisson Collection). Spa + pool included.',
      },
      {
        id: 'hotel-cristallo',
        lat: 46.5446,
        lon: 12.1447,
        name: 'Cristallo, a Luxury Collection Resort & Spa ★★★★★L',
        tier: 'Luxury',
        description:
          "Cortina's palace hotel above town — a Marriott Luxury Collection resort with grand spa, Ulisse pool, gourmet dining and legendary Dolomite views.",
        price: 720,
        currency: 'EUR',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.10,
        url: 'https://www.marriott.com/en-us/hotels/vceld-cristallo-a-luxury-collection-resort-and-spa-cortina-d-ampezzo/overview/',
        contact: '+39 0436 881111',
        imageUrl: 'https://cache.marriott.com/is/image/marriotts7prod/vceld-exterior-0001-hor-clsc:Classic-Hor',
        note: 'Winter B&B from ~€650–1,000/room/night; peak weeks higher. Full palace-grade spa and pool.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer Venice ⇄ Cortina',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-cortinaexpress',
    unitHint: '~160 km, ~2 h each way',
    options: [
      {
        id: 'transfer-cortinaexpress',
        name: 'Cortina Express shared coach (VCE ⇄ Cortina)',
        tier: 'Budget',
        description:
          'Scheduled coach from Venice Marco Polo airport / Mestre station straight to Cortina bus terminal (~2h). The everyday shared option, several departures a day in winter.',
        price: 58,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.cortinaexpress.it/en/',
        contact: 'info@cortinaexpress.it · +39 0436 867350',
        imageUrl: 'https://www.cortinaexpress.it/wp-content/uploads/2019/11/cortina-express-bus.jpg',
        note: '~€29 each way from Venice airport (2025/26); books online. Return ~€52–58 pp.',
      },
      {
        id: 'transfer-atvo',
        name: 'ATVO / Flixbus scheduled bus',
        tier: 'Budget',
        description:
          'Public scheduled coach Venice ⇄ Cortina via Belluno on selected routes — the cheapest wheels when the timetable suits your flight.',
        price: 44,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.atvo.it/en/',
        contact: 'call center +39 0421 594671',
        note: 'From ~€20 each way advance. Fewer daily departures than Cortina Express; check Saturday times.',
      },
      {
        id: 'transfer-train',
        name: 'Train to Calalzo + Dolomitibus',
        tier: 'Budget',
        description:
          'Trenitalia to Calalzo-Pieve di Cadore-Cortina station, then Dolomitibus line 30 up to Cortina (~1h). The flexible public-transport route that runs every day.',
        price: 40,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.trenitalia.com/en.html',
        contact: 'Dolomitibus: +39 0437 217111',
        note: 'Train €15–30 + bus ~€6 each way. Longer but weather-proof; good from Venice/Verona rail.',
      },
      {
        id: 'transfer-privatevan',
        name: 'Private van transfer (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private minivan from VCE/VRN/TSF matched to your flight time — the any-day, any-hour choice for a group with luggage and skis.',
        price: 520,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.10,
        url: 'https://www.cortinaexpress.it/en/private-transfer/',
        contact: 'info@cortinaexpress.it · +39 0436 867350',
        note: 'Quote-based; ~€250–290/van each way from Venice airport. Planning figure per van return.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Dolomiti Superski',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-dolomiti',
    unitHint: '1,200 km of pistes, 12 areas, one pass',
    options: [
      {
        id: 'pass-dolomiti',
        name: '6-day adult Dolomiti Superski pass (high season)',
        description:
          'The whole 1,200 km / 12-valley Dolomiti Superski network on one pass — Cortina, Alta Badia, Val Gardena, Arabba/Marmolada, the Sellaronda and more.',
        price: 357,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.dolomitisuperski.com/en/plan-and-book/skipassandprices',
        contact: 'Cortina groups: skipass@dolomiti.org · +39 0436 862171',
        imageUrl: 'https://www.dolomitisuperski.com/dam/jcr:dolomiti-superski-hero/dolomiti-superski.jpg',
        note: '2025/26 high-season adult ~€357 (6 days). 5% off buying online ≥2 days ahead. Ski lifts carry 10% Italian VAT.',
      },
      {
        id: 'pass-cortina-local',
        name: '6-day Cortina Dolomiti (local valley) pass',
        description:
          "Cheaper local pass covering just Cortina d'Ampezzo's own lifts (Faloria, Tofana, Cinque Torri, Lagazuoi) — right if you'll stay in the home valley all week.",
        price: 315,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.dolomitisuperski.com/en/experience/ski-resorts/cortina',
        contact: 'skipass@dolomiti.org · +39 0436 862171',
        note: 'Local valley pass ~10–15% below the full Superski pass. Junior (born after 2010) ~30% off; senior (before 1961) similar.',
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
        name: 'Rent and Go — Ski System Cortina (mid pack)',
        tier: 'Mid',
        description:
          'Well-run shop in the centre; mid-range performance skis or board + boots, fitted in store, with 10% off online booking and free mid-week swaps.',
        price: 175,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.22,
        url: 'https://www.rentandgo.it/eng/ski-bike-rental-hire/cortina-d-ampezzo-dolomiti-superski/ski-system-cortina',
        contact: 'Via online booking on rentandgo.it',
        note: '~€25–30/day adult mid pack → ~€150–190/6 days; helmet +€6/day. Italian rental carries 22% VAT.',
      },
      {
        id: 'rental-prosport',
        name: 'Cortina Pro Sport economy pack',
        tier: 'Budget',
        description:
          'Local rental with an entry/mid ski + boots pack and online pre-booking discounts — the value option for a week on Cortina pistes.',
        price: 130,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.22,
        url: 'https://cortinaprosport.com/en/ski/rental-pricelist.html',
        contact: 'Via cortinaprosport.com',
        note: 'Adult economy from ~€18–22/day → ~€110–150/6 days. Published price list on site.',
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
          'Optional cover added at pass checkout: on-piste rescue, medical costs, ski-liability and unused-pass refund inside the Dolomiti Superski area. Italian mountain rescue can bill for evacuation, so this closes a real gap.',
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
    defaultOptionId: 'scuola-cortina-group',
    unitHint: 'English-speaking instructors',
    options: [
      {
        id: 'scuola-cortina-group',
        name: 'Scuola Sci Cortina — group course (6 mornings)',
        tier: 'Mid',
        description:
          "Cortina's historic ski school: six consecutive 3-hour morning lessons (10:00–13:00), small mixed-ability groups, English-speaking instructors.",
        price: 400,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://scuolascicortina.com/en/classic-course/',
        contact: 'info@scuolascicortina.it · +39 0436 2911',
        imageUrl: 'https://scuolascicortina.com/wp-content/uploads/2020/01/scuola-sci-cortina-maestri.jpg',
        note: 'Published classic 6-lesson course ~€400 (2025/26). Ski tuition is VAT-exempt in Italy.',
      },
      {
        id: 'scuola-azzurra-private',
        name: 'Scuola Sci Azzurra — private instructor (half day)',
        tier: 'Premium',
        description:
          'Private instructor for your group per half-day engagement from the Azzurra school — tailored coaching, lift pass not included.',
        price: 280,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.azzurracortina.com/en/winter-activities/rates/',
        contact: 'info@azzurracortina.com · +39 0436 2694',
        note: 'In-season private ~€55–70/hour → ~€250–320 for a 3–4h half day. Confirm slot & language.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week; the Dolomites run on Saturday changeover for hotels and courses. Hold flights to Venice (VCE, closest big gateway ~160 km) or Verona/Innsbruck; winter 1-stop fares bottom out ~2–3 months ahead. Request the hotel allotment: standard Italian group terms are ~30% deposit on confirmation, balance ~30 days before arrival. Note the 2026 Winter Olympics are in Milan–Cortina — book early, expect firmer rates and limited availability.',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Decide full Dolomiti Superski (1,200 km, ~€357/6 days high season) vs the cheaper Cortina local valley pass. For groups, email skipass@dolomiti.org (+39 0436 862171); passes load onto keycards, 5% off online ≥2 days ahead. Book Cortina Express coach seats from VCE (~€29 each way) or reserve a private van matched to flight times for any-day arrivals.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes. Issue insurance (US policy per traveler + optional Dolomiti Superski Protection at ~€2.90/day added to each pass). Pay the hotel balance. Send suppliers flight numbers for transfer pickup; confirm ski-school course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat morning Venice arrival → Cortina Express or private van up (~2 h) → check-in, collect keycards, rental fitting → ski Sun–Fri (school courses start Sunday, Sellaronda tour a mid-week highlight) → Sat morning transfer down, afternoon flight home. Keep ≥3 h between VCE landing and the coach cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      "Cortina's imposta di soggiorno (tourist tax) is charged per person per night by hotel category — confirm the season grid with the tourist office. Italian VAT in these prices: hotels, half-board, transfers and lifts 10%; equipment rental 22%; ski-school tuition and insurance exempt; international flights zero-rated. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).",
  },
];

const CORTINA_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 45, base: 25, top: 40 },
  { month: 'Dec', snowfall: 70, base: 50, top: 75 },
  { month: 'Jan', snowfall: 85, base: 75, top: 105 },
  { month: 'Feb', snowfall: 80, base: 90, top: 120 },
  { month: 'Mar', snowfall: 75, base: 95, top: 130 },
  { month: 'Apr', snowfall: 40, base: 60, top: 100 },
];

export const cortina: Resort = {
  id: 'cortina',
  name: "Cortina d'Ampezzo",
  country: 'Italy',
  flag: '\u{1F1EE}\u{1F1F9}',
  area: 'Dolomiti Superski',
  blurb:
    'The "Queen of the Dolomites" — a chic UNESCO-framed resort and 2026 Winter Olympics co-host, plugged into the 1,200 km Dolomiti Superski network.',
  lat: 46.5369,
  lon: 12.1357,
  elevationM: 1224,
  currency: 'EUR',
  gatewayAirports: ['VCE', 'VRN', 'INN'],
  defaultOrigin: 'JFK',
  mapsName: "Cortina d'Ampezzo",
  saturdayChangeover: true,
  season: { open: '2026-11-28', close: '2027-04-06', linkOpen: '2026-12-05', linkClose: '2027-04-06' },
  weeks: alpineWeeks,
  snowByMonth: CORTINA_SNOW,
  snowFacts:
    'Base 1,224 m, lifts to ~2,930 m (Tofana). Sunny Dolomite microclimate with excellent snowmaking; part of the 1,200 km Dolomiti Superski. Co-hosts the Milano-Cortina 2026 Olympics — reliable groomers Dec–early Apr.',
  components,
  logistics,
};

export default cortina;
