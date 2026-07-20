// Breckenridge, Colorado — North-American resort. Shape mirrors val-thorens.ts
// (see resorts/types.ts for the schema; resorts/shared.ts for US_INSURANCE).
// Prices USD; researched winter 2025/26.

import type { Resort, SnowMonth } from './types';
import type { TripComponent } from '../tripBuilderData';
import { usWeeks } from '../seasonData';
import { US_INSURANCE } from './shared';

const components: TripComponent[] = [
  {
    id: 'flights',
    label: 'Getting there',
    icon: '✈️',
    defaultEnabled: true,
    defaultOptionId: 'flight-jfk',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-jfk',
        name: 'JFK nonstop economy → Denver',
        tier: 'Budget',
        description:
          'New York JFK → DEN nonstop on JetBlue / Delta, ~4 h 25 m — then the ~2 h drive to Breckenridge.',
        price: 228,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=JFK%20to%20DEN',
        note: 'DEN is a major hub; sub-$260 round-trip nonstops are routine in winter when booked ahead. International/domestic air is VAT-exempt.',
      },
      {
        id: 'flight-ewr',
        name: 'EWR nonstop economy → Denver',
        tier: 'Budget',
        description:
          'Newark → DEN nonstop on United (Denver is a United hub), ~4 h 20 m.',
        price: 255,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.united.com',
        note: 'Winter band ~$220–$400 round trip.',
      },
      {
        id: 'flight-lax',
        name: 'LAX nonstop economy → Denver',
        tier: 'Value',
        description:
          'Los Angeles → DEN nonstop (United / Southwest / Frontier), ~2 h 30 m — the cheapest gateway for West-Coast group members.',
        price: 158,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.southwest.com',
        note: 'Frequent low-cost nonstops; band ~$120–$280 round trip.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-gravityhaus',
    unitHint: 'Room only unless noted',
    options: [
      {
        id: 'hotel-bivvi',
        lat: 39.5058,
        lon: -106.0385,
        name: 'The Bivvi Hostel',
        tier: 'Hostel',
        description:
          'Social mountain hostel with dorm bunks and a few private rooms, hot tub and a free shuttle to the slopes.',
        price: 189,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://thebivvi.com',
        contact: 'info@thebivvi.com',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/5eefecb5688f4a710de40265/breckenridge-bivvi-hostel.jpg',
        note: 'Bunk from ~$79/night; private rooms ~$189. Add ~15% Colorado + Breckenridge lodging tax at checkout.',
      },
      {
        id: 'hotel-fireside',
        lat: 39.4818,
        lon: -106.0387,
        name: 'Fireside Inn',
        tier: 'Budget',
        description:
          'Classic English-style B&B/hostel hybrid on Main Street\'s east side, mixing private rooms with shared bunk rooms and an afternoon-tea tradition.',
        price: 209,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.firesideinn.com',
        contact: '+1 970 453 6456',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/5eefecb5688f4a710de40265/6831354b-6e3e-4d3a-afc1-db69f74e244b/B8F7FA1D-FF48-4D4B-8C4A-A30E5EC7BCF1.jpg',
        note: 'Dorm bunks from ~$45; private rooms ~$209. Add ~15% lodging tax.',
      },
      {
        id: 'hotel-beaverrun',
        lat: 39.4739,
        lon: -106.0513,
        name: 'Beaver Run Resort & Conference Center',
        tier: 'Mid',
        description:
          'Large ski-in/ski-out resort on Peak 9 with on-site restaurants, indoor/outdoor pools and hot tubs, walkable to Main Street.',
        price: 259,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.beaverrun.com',
        contact: 'reservations@beaverrun.com · +1 800 541 0609',
        imageUrl: 'https://www.beaverrun.com/wp-content/uploads/2019/09/beaver-run-resort-breckenridge-exterior.jpg',
        note: 'Winter ~$220–$320/night. Add ~15% lodging tax.',
      },
      {
        id: 'hotel-gravityhaus',
        lat: 39.4808,
        lon: -106.0455,
        name: 'Gravity Haus Breckenridge',
        tier: 'Premium',
        description:
          'Design-forward adventure lodge steps from the BreckConnect gondola with a co-working lounge, sauna, hot tub and dog-friendly rooms.',
        price: 329,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://gravityhaus.com/locations/breckenridge/',
        contact: 'breckenridge@gravityhaus.com · +1 970 453 5125',
        imageUrl: 'https://cdn.prod.website-files.com/667e8d17e2ad6db7f17d156c/6a4d1aaf8140dea787a78916_ATWL6167.jpg',
        note: 'Winter ~$300–$420/night. Add ~15% lodging tax.',
      },
      {
        id: 'hotel-oneskihill',
        lat: 39.4795,
        lon: -106.0715,
        name: 'One Ski Hill Place, A RockResort',
        tier: 'Premium',
        description:
          'Slopeside luxury condo-hotel at the base of Peak 8 with a bowling alley, pools and ski-in/ski-out access next to the BreckConnect gondola.',
        price: 449,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.breckenridge.com/plan-your-trip/stay/lodging.aspx',
        contact: '+1 970 547 8724',
        imageUrl: 'https://www.breckenridge.com/-/aemasset/breckenridge/1ohp-exterior.jpg',
        note: 'Winter studios from ~$449/night; larger condos higher. Add ~15% lodging tax.',
      },
      {
        id: 'hotel-grandcolorado',
        lat: 39.4802,
        lon: -106.0716,
        name: 'Grand Colorado on Peak 8 ★★★★',
        tier: 'Luxury',
        description:
          'Ski-in/ski-out flagship at the Peak 8 base with the Infinity Spa, five pools/hot tubs, movie theaters and heated underground parking.',
        price: 549,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.grandcolorado.com',
        contact: 'reservations +1 866 539 2102 · +1 970 547 8788',
        imageUrl: 'https://s32246.pcdn.co/wp-content/uploads/2025/06/summer-gc8.jpg',
        note: 'Winter suites from ~$549/night; peak weeks higher. Add ~15% lodging tax.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer DEN ⇄ resort',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-epicshared',
    unitHint: '~100 mi / ~2 h each way',
    options: [
      {
        id: 'transfer-epicshared',
        name: 'Epic Mountain Express — shared shuttle',
        tier: 'Budget',
        description:
          'Door-to-door shared van DEN → Breckenridge, the standard mountain-transfer operator; drops at lodging across town.',
        price: 198,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.epicmountainexpress.com',
        contact: '+1 970 754 7433',
        note: '~$99/person each way; 20% off for Epic Pass holders, up to ~40% early-bird. Books online.',
      },
      {
        id: 'transfer-epicsuv',
        name: 'Epic Mountain Express — private SUV',
        tier: 'Mid',
        description:
          'Private 4WD SUV DEN ⇄ Breckenridge for the group, direct with ski-gear space — no other stops.',
        price: 650,
        currency: 'USD',
        unit: 'per_vehicle_return',
        capacity: 6,
        vatRate: 0,
        url: 'https://www.epicmountainexpress.com',
        contact: '+1 970 754 7433',
        note: 'Quote-based; ~$325/vehicle each way planning figure. Faster than the shared van.',
      },
      {
        id: 'transfer-peak6',
        name: 'Peak 6 Transportation — private luxury SUV',
        tier: 'Premium',
        description:
          'Chauffeured luxury SUV with meet-and-greet at DEN, matched to your flight time — the any-arrival option over the mountain passes.',
        price: 700,
        currency: 'USD',
        unit: 'per_vehicle_return',
        capacity: 6,
        vatRate: 0,
        url: 'https://www.peak6transportation.com',
        contact: '+1 970 368 0007',
        note: '~$600–$700/vehicle return. Winter I-70 traffic can extend the drive — allow buffer.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Breckenridge',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-epiclocal',
    unitHint: 'Five peaks, 2,900+ acres',
    options: [
      {
        id: 'pass-epiclocal',
        name: 'Epic Local Pass (season pass, multi-resort)',
        description:
          'Breckenridge is on Vail Resorts\' Epic Pass. The Epic Local Pass covers unlimited Breckenridge days plus dozens of other resorts — for a 6-day trip it is far cheaper than window tickets.',
        price: 783,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.epicpass.com',
        note: '2025/26 season-pass price; cheaper than a single 6-day window ticket. Full Epic Pass ~$1,050 if adding more resorts.',
      },
      {
        id: 'pass-window',
        name: '6-day window lift ticket (walk-up)',
        description:
          'Buying six individual days at the ticket window — priced at a steep premium. Included only as the comparison baseline; a pass or advance online ticket beats it.',
        price: 1600,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.breckenridge.com/plan-your-trip/lift-access/tickets.aspx',
        note: 'Walk-up ~$260–$290/day — Vail Resorts deliberately prices window tickets high. Buy online in advance or use the Epic Pass instead.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-christy',
    unitHint: 'Skis + boots + poles',
    options: [
      {
        id: 'rental-christy',
        name: 'Christy Sports 6-day package',
        tier: 'Budget',
        description:
          'Multiple Breckenridge locations; sport, premium and demo tiers with a ~20% advance-booking discount online.',
        price: 276,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.christysports.com/learn/rental-help/rental-home.html',
        note: 'Sport ~$276 / Premium ~$336 / Demo ~$396 before advance discount. Add Colorado sales tax.',
      },
      {
        id: 'rental-skibutlers',
        name: 'Ski Butlers — delivery to your lodging',
        tier: 'Mid',
        description:
          'Door-to-door fitting delivered to your lodging with slopeside swap support during the week — no shop queues.',
        price: 400,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skibutlers.com/snowboard-ski-rentals/breckenridge',
        contact: '1806 Airport Rd, Breckenridge · +1 970 624 0020',
        note: '~$330–$480 for 6 days (Performance → High Performance), delivered. Add Colorado sales tax.',
      },
      {
        id: 'rental-brecksports',
        name: 'Breck Sports (resort rental)',
        tier: 'Mid',
        description:
          'Official on-mountain rental at the base areas — bundle discounts when booked with lift or lesson.',
        price: 375,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.breckenridge.com/plan-your-trip/ski-and-ride-rentals/rentals.aspx',
        note: '~$300–$450 for 6 days depending on tier. Add Colorado sales tax.',
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: '🛡️',
    defaultEnabled: true,
    defaultOptionId: 'ins-us-policy',
    unitHint: 'Medical + cancellation + evacuation',
    options: [...US_INSURANCE],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'brss-group',
    unitHint: 'Breckenridge Ski & Ride School',
    options: [
      {
        id: 'brss-group',
        name: 'Ski & Ride School group lesson — full day',
        description:
          'Full-day adult group lesson with the resort Ski & Ride School; lift ticket and rentals not included.',
        price: 279,
        currency: 'USD',
        unit: 'per_person_day',
        vatRate: 0,
        url: 'https://www.breckenridge.com/plan-your-trip/ski-and-ride-lessons/lessons.aspx',
        contact: '+1 800 842 8062',
        note: '~$229–$279/day; book online ahead, holiday weeks sell out.',
      },
      {
        id: 'brss-private',
        name: 'Ski & Ride School private — full day (up to 6)',
        tier: 'Premium',
        description:
          'Private instructor for your group for a full day (up to 6 people, one price) with lift-line priority; tickets extra.',
        price: 1099,
        currency: 'USD',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.breckenridge.com/plan-your-trip/ski-and-ride-lessons/lessons.aspx',
        contact: '+1 800 842 8062',
        note: 'Full day ~$999–$1,199; half day ~$699. Confirm slot in the resort engine.',
      },
    ],
  },
];

// Operational playbook shown on the page and in the internal PDF.
const logistics = [
  {
    step: 'T-5 to T-3 months — lock the frame',
    detail:
      'Breckenridge runs on flexible dates (no Saturday changeover), so target January value weeks or spring and avoid Christmas/NY, MLK, Presidents\' week and spring break. Book DEN flights early for the best nonstop fares. Request the hotel allotment with a deposit; slopeside Peak 8 beds (Grand Colorado, One Ski Hill Place) are limited.',
  },
  {
    step: 'T-2 months — passes & transfer',
    detail:
      'For a 6-day trip the Epic Local Pass ($783) or full Epic Pass beats window tickets outright — buy passes online early. Reserve Epic Mountain Express shared vans (20% Epic-holder discount, up to 40% early-bird) or a private SUV matched to flight times over the ~2 h I-70 drive.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the rooming list and rental sizes. Issue US travel insurance per traveler. Pay hotel balances. Send transfer suppliers flight numbers; confirm Ski & Ride School group levels. Order Ski Butlers delivery to the lodging if skipping shop queues.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Fly into DEN → ~2 h transfer over the passes to Breckenridge → check-in, load Epic Pass / collect tickets, rental fitting or Ski Butlers delivery → ski the five peaks and the Imperial Express (highest chairlift in North America) → transfer back to DEN, allowing buffer for winter I-70 traffic.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Colorado state + Breckenridge lodging taxes total roughly 14–16% (≈8.875% combined sales tax + 3.4% town accommodation/marketing tax + short-term-rental excise) added to room rates. Lift tickets and rentals carry Colorado sales tax; there is no VAT. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const BR_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 86, base: 38, top: 64 },
  { month: 'Dec', snowfall: 140, base: 89, top: 127 },
  { month: 'Jan', snowfall: 137, base: 114, top: 152 },
  { month: 'Feb', snowfall: 127, base: 127, top: 178 },
  { month: 'Mar', snowfall: 157, base: 140, top: 203 },
  { month: 'Apr', snowfall: 114, base: 127, top: 190 },
];

export const breckenridge: Resort = {
  id: 'breckenridge',
  name: 'Breckenridge',
  country: 'United States',
  flag: '\u{1F1FA}\u{1F1F8}',
  area: 'Colorado',
  blurb:
    'One of North America\'s most popular resorts — five high-alpine peaks of the Tenmile Range dropping straight into a lively Victorian mining town on Main Street.',
  lat: 39.4817,
  lon: -106.0384,
  elevationM: 2926,
  currency: 'USD',
  gatewayAirports: ['DEN'],
  defaultOrigin: 'JFK',
  mapsName: 'Breckenridge Colorado',
  saturdayChangeover: false,
  season: { open: '2026-11-13', close: '2027-05-30' },
  weeks: usWeeks,
  snowByMonth: BR_SNOW,
  snowFacts:
    'Base 9,600 ft (2,926 m), summit 12,840 ft (3,914 m) at the Imperial Express — the highest chairlift in North America. Averages ~350 in (≈890 cm) of snow a season; one of Colorado\'s longest seasons (mid-Nov to late May).',
  components,
  logistics,
};

export default breckenridge;
