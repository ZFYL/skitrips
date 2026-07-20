// Vail, Colorado, USA. Shape copied from val-thorens.ts (the reference resort);
// see resorts/types.ts for the schema and resorts/shared.ts for US_INSURANCE.

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
    defaultOptionId: 'flight-den',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-den',
        name: 'JFK → Denver (DEN) nonstop economy',
        tier: 'Budget',
        description:
          'Nonstop JFK → DEN (~4 h 30) on United/Delta/JetBlue, then a ~2 h drive or shuttle west on I-70 to Vail. The cheapest and most frequent gateway.',
        price: 340,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-denver.html',
        note: 'Winter round-trip band ~$220–$480; dozens of daily nonstops. Pair with the Epic Mountain Express shuttle in the transfer component.',
      },
      {
        id: 'flight-ege',
        name: 'JFK → Eagle County (EGE) 1-stop',
        tier: 'Mid',
        description:
          'Eagle County Regional is only ~35 min from Vail — skip the long I-70 drive. Winter service connects via DEN/ORD/DFW; a handful of seasonal nonstops from other hubs.',
        price: 560,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.flyvail.com/',
        note: 'Winter round-trip band ~$430–$780; EGE fares run higher than DEN but save ~4 h of transfer time each way.',
      },
      {
        id: 'flight-ege-nonstop',
        name: 'JFK → EGE seasonal nonstop (premium)',
        tier: 'Premium',
        description:
          'Seasonal Saturday nonstop JFK → EGE (~4 h 45) — the comfortable choice for a peak ski week, landing 35 min from Vail Village.',
        price: 850,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.flyvail.com/flights/',
        note: 'Peak-week nonstop band ~$650–$1,200 round trip. Books out early for Presidents/Christmas weeks.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-arrabelle',
    unitHint: 'Room-only unless noted; add ~11.4% Vail lodging tax',
    options: [
      {
        id: 'hotel-evergreen',
        lat: 39.6449,
        lon: -106.3826,
        name: 'Evergreen Lodge at Vail',
        tier: 'Budget',
        description:
          'Comfortable Vail Village-adjacent lodge on Gore Creek with an indoor pool, hot tubs and a free in-town shuttle stop — the value base for a Vail week.',
        price: 199,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.evergreenvail.com/',
        contact: '+1 970-476-7810',
        imageUrl: 'https://www.evergreenvail.com/wp-content/uploads/2019/09/evergreen-lodge-vail-exterior.jpg',
        note: 'Winter from ~$179–$260/room/night; peak weeks higher. Add ~11.4% Vail lodging tax (not in price).',
      },
      {
        id: 'hotel-marriott',
        lat: 39.6416,
        lon: -106.3861,
        name: 'Vail Marriott Mountainside Resort',
        tier: 'Mid',
        description:
          '4★ resort in Lionshead steps from the Eagle Bahn gondola — heated outdoor pool, spa and slope-side access. Solid mid-tier ski-in convenience.',
        price: 379,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.marriott.com/en-us/hotels/eglmc-vail-marriott-mountainside-resort/overview/',
        contact: '+1 970-476-4444',
        imageUrl: 'https://cache.marriott.com/content/dam/marriott-renderings/EGLMC/eglmc-exterior-0001-hor-feat.jpg',
        note: 'Winter from ~$320–$520/room/night; peak weeks $600+. Add ~11.4% Vail lodging tax.',
      },
      {
        id: 'hotel-sonnenalp',
        lat: 39.6404,
        lon: -106.3745,
        name: 'Sonnenalp Hotel ★★★★★',
        tier: 'Premium',
        description:
          'Bavarian-style 5★ family-owned landmark in the heart of Vail Village on Gore Creek — spa, indoor-outdoor pool and ski concierge.',
        price: 675,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://sonnenalp.com/',
        contact: '+1 970-476-5656',
        imageUrl: 'https://sonnenalp.com/wp-content/uploads/2021/09/Sonnenalp-Hotel-Vail-Exterior-Winter.jpg',
        note: 'Winter from ~$404; in-season doubles ~$600–$900/room/night. Add ~11.4% Vail lodging tax.',
      },
      {
        id: 'hotel-arrabelle',
        lat: 39.6432,
        lon: -106.3821,
        name: 'The Arrabelle at Vail Square ★★★★',
        tier: 'Premium',
        description:
          'RockResorts 4★ landmark at the base of the Eagle Bahn gondola in Lionshead — ski valet, slope-side pool and an ice rink at the door. True ski-in/ski-out.',
        price: 620,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.arrabelle.com/',
        contact: '+1 970-754-7777',
        imageUrl: 'https://www.arrabelle.com/-/media/vailresorts/arrabelle/homepage/arrabelle-exterior-winter.jpg',
        note: 'Winter from ~$500–$900/room/night; peak weeks $1,000+. Add ~11.4% Vail lodging tax.',
      },
      {
        id: 'hotel-fourseasons',
        lat: 39.6438,
        lon: -106.3808,
        name: 'Four Seasons Resort Vail ★★★★★',
        tier: 'Luxury',
        description:
          'Contemporary 5★ landmark at the edge of Vail Village — heated outdoor pool, full spa, ski concierge and slope-side lounge. The top luxury address in town.',
        price: 1250,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.fourseasons.com/vail/',
        contact: '+1 970-477-8600',
        imageUrl: 'https://www.fourseasons.com/alt/img-opt/~85.1540.0,0000-133,3340-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/VAL/VAL_040_original.jpg',
        note: 'Winter from ~$715; peak-week doubles/suites $1,400–$2,500/room/night. Add ~11.4% Vail lodging tax.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer DEN/EGE ⇄ Vail',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-eme-shared',
    unitHint: 'DEN ~180 km / ~2 h; EGE ~55 km / ~40 min',
    options: [
      {
        id: 'transfer-eme-shared',
        name: 'Epic Mountain Express shared shuttle (DEN ⇄ Vail)',
        tier: 'Budget',
        description:
          'Door-to-door shared van from Denver International to Vail lodging (~2 h 15) — the standard budget transfer, running year-round with frequent winter departures.',
        price: 218,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.epicmountainexpress.com/vail-shuttles',
        contact: '+1 970-754-7433',
        imageUrl: 'https://www.epicmountainexpress.com/images/eme-van.jpg',
        note: 'Winter shared door-to-door ~$99–$169 pp each way; Epic Pass holders save 20%. Round-trip planning figure. $3/pp airport fee.',
      },
      {
        id: 'transfer-eme-ege',
        name: 'Epic Mountain Express shared shuttle (EGE ⇄ Vail)',
        tier: 'Budget',
        description:
          'Short shared van from Eagle County Regional to Vail (~40 min) — pair with an EGE flight to skip the I-70 drive entirely.',
        price: 118,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.epicmountainexpress.com/vail-shuttles',
        contact: '+1 970-754-7433',
        note: 'EGE shared ~$49–$69 pp each way; round-trip planning figure. Epic Pass 20% discount applies.',
      },
      {
        id: 'transfer-private-suv',
        name: 'Private SUV (DEN ⇄ Vail, up to 6)',
        tier: 'Premium',
        description:
          'Private door-to-door SUV from Denver for a family or small group — flexible pickup, luggage/ski room, no shared stops. Priced per vehicle round trip.',
        price: 900,
        currency: 'USD',
        unit: 'per_vehicle_return',
        capacity: 6,
        vatRate: 0,
        url: 'https://www.epicmountainexpress.com/private-transportation',
        contact: '+1 970-754-7433',
        note: 'Private DEN⇄Vail SUV ~$400–$550 each way; peak-week rates top of band. Splits well across 4–6 people.',
      },
      {
        id: 'transfer-rentalcar',
        name: 'Rental car from DEN (self-drive)',
        tier: 'Mid',
        description:
          'Pick up an AWD/4WD SUV at Denver and drive I-70 west (~2 h). Best if you plan day trips (Breckenridge, Beaver Creek) or want in-town flexibility. Vail Village is pedestrianized — use structured parking.',
        price: 560,
        currency: 'USD',
        unit: 'per_vehicle_return',
        capacity: 5,
        vatRate: 0,
        url: 'https://www.flydenver.com/parking_transportation/rental_cars/',
        note: '~$70–$110/day winter SUV incl. Colorado taxes/fees → ~$560/week per vehicle. Traction-law tires/chains required on I-70 in storms; Vail parking ~$30–$45/day.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Lift ticket — 6 days Vail Mountain',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-epic-day',
    unitHint: '5,317 acres — the largest single ski mountain in the US',
    options: [
      {
        id: 'pass-epic-day',
        name: 'Epic Day Pass — 6 days, All Resorts (2025/26)',
        description:
          'Buy-ahead 6-day Epic Day Pass covering Vail plus Beaver Creek, Breckenridge, Keystone and more. Bought online in advance this is by far the cheapest way onto Vail Mountain — a fraction of the lift-ticket window price.',
        price: 570,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.epicpass.com/passes/epic-day-pass.aspx',
        contact: 'Epic Pass support +1 970-754-0005',
        imageUrl: 'https://www.vail.com/-/media/vail/homepage/vail-skiing-hero.jpg',
        note: 'Epic Day Pass ~$47–$100/day depending on days/peak-date inclusion → ~$95/day for a 6-day All-Resorts adult pass. Must be bought BEFORE arrival — see logistics.',
      },
      {
        id: 'pass-window',
        name: '6-day window lift ticket (walk-up)',
        description:
          'Single-resort Vail lift ticket bought at the ticket window on arrival — the fallback if you did not buy an Epic Day Pass ahead. Punishingly expensive in peak weeks.',
        price: 1650,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.vail.com/plan-your-trip/lift-access/tickets.aspx',
        note: 'Peak-window Vail day tickets run $300+/day (~$354 with fees at sister resorts) → $1,500–$2,000 for six days. Always cheaper to pre-buy an Epic Day Pass.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-christy',
    unitHint: 'Skis + boots + poles; helmet extra',
    options: [
      {
        id: 'rental-christy',
        name: 'Christy Sports — 6-day performance pack',
        tier: 'Mid',
        description:
          'Colorado’s biggest rental chain with multiple Vail/Lionshead shops — book online for ~20% off, overnight ski storage and free swaps mid-week.',
        price: 245,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.christysports.com/',
        contact: '+1 303-237-6321',
        note: 'Performance ski+boots ~$40–$55/day → ~$245/6 days online; economy packs cheaper, demo/premium higher. Add ~$10/day helmet.',
      },
      {
        id: 'rental-skibutlers',
        name: 'Ski Butlers — delivered 6-day rental',
        tier: 'Premium',
        description:
          'Equipment delivered and custom-fitted in your Vail lodging, with in-resort support and free size swaps — no shop queues. Priced per person for the week.',
        price: 320,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skibutlers.com/vail-beaver-creek',
        contact: '+1 970-754-9909',
        note: 'Delivered performance package ~$50–$60/day → ~$300–$360/6 days incl. delivery. The convenience option for groups.',
      },
      {
        id: 'rental-vailsports',
        name: 'Vail Sports — slope-side 6-day pack',
        tier: 'Premium',
        description:
          'Resort-operated shops at the Vail/Lionshead lift bases — ski-in return, boot-fitting and premium demo skis right where you ride.',
        price: 300,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.vailsports.com/',
        note: 'Sport/performance packs ~$45–$60/day online → ~$270–$360/6 days. Most convenient, priced at the top of the market.',
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: '🛡️',
    defaultEnabled: true,
    defaultOptionId: 'ins-us-policy',
    unitHint: 'Medical + cancellation (US domestic trip)',
    options: [...US_INSURANCE],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'vss-group',
    unitHint: 'PSIA-certified instructors',
    options: [
      {
        id: 'vss-group',
        name: 'Vail Ski & Snowboard School — group lesson (per day)',
        description:
          'Full-day adult group lesson with the resort’s official school, meeting at Golden Peak or Lionshead. Lift ticket not included. Book per day and stack across the week.',
        price: 269,
        currency: 'USD',
        unit: 'per_person_day',
        vatRate: 0,
        url: 'https://www.vail.com/plan-your-trip/ski-and-ride-lessons/lessons.aspx',
        contact: '+1 970-754-8245',
        imageUrl: 'https://www.vail.com/-/media/vail/ski-school/lesson.jpg',
        note: 'Adult full-day group ~$229–$309 depending on date. Multi-day and online-advance rates lower. Reserve early for peak weeks.',
      },
      {
        id: 'vss-private',
        name: 'Vail Ski & Snowboard School — private instructor (full day)',
        tier: 'Premium',
        description:
          'Private instructor for one to six people (same family/group) for a full day — the fastest way to progress and to lap the mountain with a local. Priced per group.',
        price: 1150,
        currency: 'USD',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.vail.com/plan-your-trip/ski-and-ride-lessons/private-lessons.aspx',
        contact: '+1 970-754-8245',
        note: 'Full-day private ~$999–$1,400 depending on date, up to 6 guests. Half-day options ~$700+. Peak weeks sell out — book weeks ahead.',
      },
    ],
  },
];

// Operational playbook shown on the page and in the internal PDF.
const logistics = [
  {
    step: 'T-5 to T-3 months — flights & lodging',
    detail:
      'US resorts have no Saturday changeover — pick any check-in day, though Sat/Sun starts still price highest. Book DEN nonstops early (cheapest, most frequent) or pay up for EGE to save ~4 h each way. Reserve lodging directly; typical US resort terms are a 1-night or ~25% deposit with free cancellation 30–60 days out. Hold peak weeks (Christmas, Presidents’ week) as early as possible.',
  },
  {
    step: 'T-2 months — the pass strategy (critical)',
    detail:
      'Vail is an Epic Pass mountain: buy a 6-day Epic Day Pass ONLINE BEFORE the trip (~$95/day) rather than a window ticket ($300+/day). All Resorts tier also covers Beaver Creek, Breckenridge and Keystone for day trips. Passes are loaded to a reusable Epic media card mailed to you or picked up in resort — order ~3 weeks ahead so cards arrive.',
  },
  {
    step: 'T-1 month — transfer, rental, lessons',
    detail:
      'Book the Epic Mountain Express shuttle (Epic Pass holders save 20%) or a private SUV matched to flight times; reserve a rental car if you want day-trip flexibility. Pre-book Christy Sports / Ski Butlers rentals online for ~20% off and collect boot sizes. Reserve any group or private lessons — peak-week slots sell out.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Fly to DEN or EGE → shuttle/drive to Vail → check in (flexible day), collect Epic cards and fitted rentals → ski Vail’s Back Bowls and Blue Sky Basin, day-trip to Beaver Creek/Breckenridge on the All-Resorts pass → depart any day. Vail Village and Lionshead are pedestrian; use the free in-town bus between the two bases.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Colorado charges no VAT; instead add ~11.4% Vail lodging tax on room rates (sales + local marketing/lodging tax) — quoted room prices exclude it. Lift tickets, rentals and lessons carry standard Colorado sales tax (~8.4% in Vail), usually shown in the online price. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const VAIL_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 64, base: 41, top: 51 },
  { month: 'Dec', snowfall: 114, base: 84, top: 102 },
  { month: 'Jan', snowfall: 114, base: 119, top: 140 },
  { month: 'Feb', snowfall: 114, base: 145, top: 168 },
  { month: 'Mar', snowfall: 127, base: 158, top: 183 },
  { month: 'Apr', snowfall: 76, base: 130, top: 152 },
];

export const vail: Resort = {
  id: 'vail',
  name: 'Vail',
  country: 'United States',
  flag: '\u{1F1FA}\u{1F1F8}',
  area: 'Colorado',
  blurb:
    'The largest single ski mountain in the US — 5,317 acres front-side groomers plus seven legendary Back Bowls and Blue Sky Basin.',
  lat: 39.6403,
  lon: -106.3742,
  elevationM: 2476,
  currency: 'USD',
  gatewayAirports: ['EGE', 'DEN'],
  defaultOrigin: 'JFK',
  mapsName: 'Vail Village Colorado',
  saturdayChangeover: false,
  season: { open: '2026-11-20', close: '2027-04-18' },
  weeks: usWeeks,
  snowByMonth: VAIL_SNOW,
  snowFacts:
    'Base 8,120 ft (2,476 m), summit 11,570 ft (3,527 m). Averages ~354 in (~900 cm) of snow a year across 5,317 acres; the Back Bowls need storms to fill, so mid-Jan–Mar is the sweet spot.',
  components,
  logistics,
};

export default vail;
