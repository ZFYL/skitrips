// Aspen Snowmass, Colorado, USA. Shape copied from val-thorens.ts (the reference
// resort); see resorts/types.ts for the schema and resorts/shared.ts for US_INSURANCE.

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
    defaultOptionId: 'flight-ase',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-ase',
        name: 'JFK → Aspen (ASE) 1-stop',
        tier: 'Mid',
        description:
          'Aspen/Pitkin County is a 10-minute drive from town — the most convenient gateway. Winter service connects via DEN/DFW/ORD on United/American; small regional jets, weather-sensitive.',
        price: 620,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-aspen.html',
        note: 'Winter round-trip band ~$450–$900. ASE closes in heavy snow — build a buffer and know the DEN backup.',
      },
      {
        id: 'flight-den',
        name: 'JFK → Denver (DEN) nonstop, then transfer',
        tier: 'Budget',
        description:
          'Nonstop JFK → DEN (~4 h 30), then a ~3 h 45 shuttle/drive over Independence Pass–avoiding I-70 route to Aspen. The reliable, cheapest gateway when ASE fares or weather bite.',
        price: 340,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-denver.html',
        note: 'Winter round-trip band ~$220–$480; many daily nonstops. Add the CME/Epic Mountain Express Aspen shuttle in the transfer component (~4 h).',
      },
      {
        id: 'flight-eagle',
        name: 'JFK → Eagle County (EGE) 1-stop',
        tier: 'Mid',
        description:
          'Eagle County Regional is ~70 mi / ~1 h 40 from Aspen — a lower-altitude, less weather-prone alternative to ASE when connections line up.',
        price: 560,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.flyvail.com/',
        note: 'Winter round-trip band ~$430–$780. Longer transfer than ASE but far more reliable in storms.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-limelight',
    unitHint: 'Room-only unless noted; add ~11.3% lodging tax',
    options: [
      {
        id: 'hotel-mountainchalet',
        lat: 39.1866,
        lon: -106.8213,
        name: 'Mountain Chalet Aspen',
        tier: 'Budget',
        description:
          'Family-run lodge a block from the Silver Queen gondola — hearty breakfast, hot tub, sauna and pool. The rare value bed in downtown Aspen.',
        price: 289,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.mountainchaletaspen.com/',
        contact: '+1 970-925-7797',
        imageUrl: 'https://www.mountainchaletaspen.com/wp-content/uploads/2019/10/mountain-chalet-aspen-exterior.jpg',
        note: 'Winter from ~$249–$399/room/night incl. breakfast; peak weeks higher. Add ~11.3% Aspen lodging tax.',
      },
      {
        id: 'hotel-limelight',
        lat: 39.1878,
        lon: -106.8206,
        name: 'Limelight Hotel Aspen ★★★★',
        tier: 'Mid',
        description:
          'Contemporary 4★ in the heart of Aspen with a huge après lounge, indoor-outdoor pool, free breakfast and a ski shuttle — the social, family-friendly base.',
        price: 559,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.limelighthotels.com/aspen',
        contact: '+1 970-925-3025',
        imageUrl: 'https://www.limelighthotels.com/-/media/limelight/aspen/homepage/limelight-aspen-exterior-winter.jpg',
        note: 'Winter from ~$450–$750/room/night; peak weeks $900+. Add ~11.3% Aspen lodging tax.',
      },
      {
        id: 'hotel-viceroy',
        lat: 39.2077,
        lon: -106.9490,
        name: 'Viceroy Snowmass ★★★★★',
        tier: 'Premium',
        description:
          'Ski-in/ski-out 5★ at Snowmass Base Village — three heated pools, full spa and slope-side lounge. The best luxury value across the four mountains, and closest to the biggest terrain.',
        price: 720,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.viceroyhotelsandresorts.com/snowmass',
        contact: '+1 970-923-8000',
        imageUrl: 'https://www.viceroyhotelsandresorts.com/-/media/viceroy/snowmass/exterior-winter.jpg',
        note: 'Winter from ~$550–$1,000/room/night; peak weeks $1,200+. Snowmass, ~20 min from Aspen town. Add ~11.3% lodging tax.',
      },
      {
        id: 'hotel-stregis',
        lat: 39.1869,
        lon: -106.8189,
        name: 'The St. Regis Aspen Resort ★★★★★',
        tier: 'Luxury',
        description:
          'Redstone-brick 5★ landmark at the base of Aspen Mountain — Remède spa, heated pool, signature butler service and ski valet steps from the gondola.',
        price: 1100,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.marriott.com/en-us/hotels/asexr-the-st-regis-aspen-resort/overview/',
        contact: '+1 970-920-3300',
        imageUrl: 'https://cache.marriott.com/content/dam/marriott-renderings/ASEXR/asexr-exterior-0001-hor-feat.jpg',
        note: 'Winter from ~$800–$1,600/room/night; peak weeks $2,000+. Add ~11.3% Aspen lodging tax.',
      },
      {
        id: 'hotel-littlenell',
        lat: 39.1872,
        lon: -106.8175,
        name: 'The Little Nell ★★★★★',
        tier: 'Luxury',
        description:
          'Aspen’s only Forbes Five-Star, five-diamond ski-in/ski-out hotel at the foot of the Silver Queen gondola — legendary service, Element 47 wine cellar and slope-side Ajax Tavern.',
        price: 1650,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.thelittlenell.com/',
        contact: '+1 970-920-4600',
        imageUrl: 'https://www.thelittlenell.com/-/media/hotels/little-nell/exterior-winter.jpg',
        note: 'Winter from ~$1,200; peak-week rooms/suites $2,000–$4,000+/room/night. The definitive Aspen splurge. Add ~11.3% lodging tax.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer ASE/DEN ⇄ Aspen',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-ase-shuttle',
    unitHint: 'ASE ~5 km / ~10 min; DEN ~360 km / ~4 h',
    options: [
      {
        id: 'transfer-ase-shuttle',
        name: 'ASE airport shuttle / taxi to town',
        tier: 'Budget',
        description:
          'From Aspen/Pitkin County it is a 10-minute hop into town — shared airport shuttle, taxi or your hotel’s courtesy van. The reason to pay up for an ASE flight.',
        price: 40,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.aspenairport.com/ground-transportation/',
        contact: 'High Mountain Taxi +1 970-925-8294',
        note: 'Shared shuttle ~$15–$30 pp each way; many hotels run free ASE pickups. Round-trip planning figure per person.',
      },
      {
        id: 'transfer-eme-den',
        name: 'Epic Mountain Express shared shuttle (DEN ⇄ Aspen)',
        tier: 'Mid',
        description:
          'Door-to-door shared van from Denver International to Aspen/Snowmass lodging (~4 h) — the standard budget-gateway transfer when you fly into DEN.',
        price: 258,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.epicmountainexpress.com/aspen-shuttles',
        contact: '+1 970-754-7433',
        imageUrl: 'https://www.epicmountainexpress.com/images/eme-van.jpg',
        note: 'DEN⇄Aspen shared ~$109–$159 pp each way; round-trip planning figure. Long ride — an ASE or EGE flight is faster.',
      },
      {
        id: 'transfer-private-suv',
        name: 'Private SUV (ASE/EGE ⇄ Aspen, up to 6)',
        tier: 'Premium',
        description:
          'Private door-to-door SUV — flexible pickup, ski/luggage room, no shared stops. Priced per vehicle round trip; splits well across a family or small group.',
        price: 450,
        currency: 'USD',
        unit: 'per_vehicle_return',
        capacity: 6,
        vatRate: 0,
        url: 'https://www.epicmountainexpress.com/private-transportation',
        contact: '+1 970-754-7433',
        note: 'Private EGE⇄Aspen SUV ~$200–$300 each way; ASE⇄town far less; DEN⇄Aspen ~$700+ each way. Planning figure for an EGE transfer.',
      },
      {
        id: 'transfer-rentalcar',
        name: 'Rental car from ASE/EGE (self-drive)',
        tier: 'Mid',
        description:
          'Pick up an AWD/4WD SUV and drive in. Useful for lapping all four mountains (Aspen, Snowmass, Highlands, Buttermilk) on your own schedule — a free ski shuttle also links them.',
        price: 560,
        currency: 'USD',
        unit: 'per_vehicle_return',
        capacity: 5,
        vatRate: 0,
        url: 'https://www.aspenairport.com/ground-transportation/',
        note: '~$70–$110/day winter SUV incl. Colorado taxes/fees → ~$560/week. Town parking is limited/paid; the free RFTA/ski shuttle covers all four mountains, so a car is optional.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Lift ticket — 6 days, four mountains',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-advance',
    unitHint: 'One ticket rides Aspen, Snowmass, Highlands & Buttermilk',
    options: [
      {
        id: 'pass-advance',
        name: '6-day advance lift ticket, all 4 mountains (2025/26)',
        description:
          'One ticket covering Aspen Mountain, Snowmass, Aspen Highlands and Buttermilk. Bought online 30+ days ahead earns up to 25% off the window rate — the value play for a full week.',
        price: 1050,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.aspensnowmass.com/visit/tickets-and-passes/lift-tickets',
        contact: '+1 800-525-6200',
        imageUrl: 'https://www.aspensnowmass.com/-/media/aspensnowmass/homepage/skiing-hero.jpg',
        note: 'Advance 4+ day tickets ~25% off → ~$175/day for a 6-day adult ticket. Prices are date-driven; book 30+ days out for the discount.',
      },
      {
        id: 'pass-window',
        name: '6-day window lift ticket (walk-up)',
        description:
          'Same four-mountain ticket bought at the window on arrival. For 2025/26 online and window prices match, but skipping the 30-day advance discount is the expensive part.',
        price: 1400,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.aspensnowmass.com/visit/tickets-and-passes/lift-tickets',
        note: 'Window/day-of adult tickets ~$189–$259/day → ~$1,150–$1,550 for six days. Ikon Pass holders get 5–7 days free — see note below.',
      },
      {
        id: 'pass-ikon',
        name: 'Ikon Pass credit (bring-your-own)',
        description:
          'Aspen Snowmass is an Ikon Pass destination: the full Ikon Pass includes 7 days and Ikon Base 5 days across all four mountains, with no reservations for 2025/26. If travelers already hold an Ikon Pass, skip the lift-ticket line item.',
        price: 0,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.ikonpass.com/en/destinations/aspen-snowmass',
        note: 'Ikon Pass ~$1,329 full / ~$929 Base for the season — worth it only for multi-trip skiers. Blackout dates apply to Base around Christmas/MLK/Presidents’ week.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-fourmountain',
    unitHint: 'Skis + boots + poles; helmet extra',
    options: [
      {
        id: 'rental-fourmountain',
        name: 'Four Mountain Sports — 6-day performance pack',
        tier: 'Mid',
        description:
          'The resort’s own shops at every mountain base — book online for a discount, store gear overnight and return ski-in at any of the four hills.',
        price: 270,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.aspensnowmass.com/plan/rentals',
        contact: '+1 970-923-1227',
        note: 'Performance ski+boots ~$45–$60/day → ~$270/6 days online; sport packs cheaper, premium demos higher. Add ~$10/day helmet.',
      },
      {
        id: 'rental-skibutlers',
        name: 'Ski Butlers — delivered 6-day rental',
        tier: 'Premium',
        description:
          'Equipment delivered and custom-fitted in your Aspen/Snowmass lodging with in-resort support and free swaps — no shop queues. Priced per person for the week.',
        price: 330,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skibutlers.com/aspen',
        contact: '+1 970-710-2695',
        note: 'Delivered performance package ~$50–$60/day → ~$310–$360/6 days incl. delivery. The convenience option for groups.',
      },
      {
        id: 'rental-hamilton',
        name: 'Hamilton Sports — town shop 6-day pack',
        tier: 'Budget',
        description:
          'Long-standing independent shop in downtown Aspen — friendly boot-fitting and mid-priced sport/performance packs a notch below the resort-run shops.',
        price: 230,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.hamiltonsports.com/',
        contact: '+1 970-925-1971',
        note: 'Sport/performance packs ~$35–$50/day → ~$230/6 days. Book online ahead in peak weeks.',
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
    defaultOptionId: 'ass-group',
    unitHint: 'PSIA-certified instructors',
    options: [
      {
        id: 'ass-group',
        name: 'Aspen Snowmass Ski & Snowboard School — group (per day)',
        description:
          'Full-day adult group lesson with the resort school, meeting at Snowmass, Buttermilk or Aspen Mountain. Lift ticket not included. Book per day and stack across the week.',
        price: 279,
        currency: 'USD',
        unit: 'per_person_day',
        vatRate: 0,
        url: 'https://www.aspensnowmass.com/plan/lessons-and-camps',
        contact: '+1 970-923-1227',
        imageUrl: 'https://www.aspensnowmass.com/-/media/aspensnowmass/lessons/group-lesson.jpg',
        note: 'Adult full-day group ~$239–$329 by date. Multi-day and advance-online rates lower. Buttermilk is the beginner mountain.',
      },
      {
        id: 'ass-private',
        name: 'Aspen Snowmass — private instructor (full day)',
        tier: 'Premium',
        description:
          'Private instructor for one to six people (same group) for a full day across any of the four mountains — the fastest route to progress and to ski Highlands Bowl with a pro. Priced per group.',
        price: 1250,
        currency: 'USD',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.aspensnowmass.com/plan/lessons-and-camps/private-lessons',
        contact: '+1 970-923-1227',
        note: 'Full-day private ~$1,050–$1,500 by date, up to 6 guests. Half-day options ~$750+. Peak weeks sell out — book weeks ahead.',
      },
    ],
  },
];

// Operational playbook shown on the page and in the internal PDF.
const logistics = [
  {
    step: 'T-5 to T-3 months — flights & lodging',
    detail:
      'No Saturday changeover — check in any day, though weekend starts price highest. Decide the gateway: ASE (10 min from town, weather-sensitive, pricier fares), DEN (cheapest nonstops but a ~4 h transfer) or EGE (~1 h 40, a reliable middle ground). Book lodging directly; typical US resort terms are a 1-night or ~25% deposit with free cancellation 30–60 days out. Hold Christmas and Presidents’ week as early as possible.',
  },
  {
    step: 'T-2 months — the pass strategy (critical)',
    detail:
      'Aspen is an Ikon Pass destination, NOT Epic. If travelers already hold an Ikon Pass they get 5–7 days across all four mountains free — skip the ticket line item. Otherwise buy the 4-mountain lift ticket ONLINE 30+ days ahead for up to 25% off (~$175/day vs ~$259 window). One ticket rides Aspen Mountain, Snowmass, Highlands and Buttermilk; a free ski shuttle links them.',
  },
  {
    step: 'T-1 month — transfer, rental, lessons',
    detail:
      'Book the ASE shuttle/hotel pickup, or the Epic Mountain Express DEN/EGE shuttle, or a private SUV matched to flight times. Pre-book Four Mountain Sports / Ski Butlers rentals online and collect boot sizes. Reserve group or private lessons — peak-week slots sell out. Keep a DEN backup plan in case ASE closes for snow.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Fly to ASE (short hop to town) or DEN/EGE (shuttle in) → check in any day, collect tickets and fitted rentals → ski all four mountains on one ticket, using the free inter-mountain shuttle; Buttermilk for beginners, Highlands Bowl and Aspen Mountain for experts → depart any day. Downtown Aspen is walkable; Snowmass Base Village is ski-in/ski-out.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Colorado charges no VAT; add ~11.3% Aspen/Pitkin lodging tax on room rates (city + county + sales) — quoted room prices exclude it. Lift tickets, rentals and lessons carry standard sales tax (~9.3% in Aspen), usually in the online price. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const ASPEN_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 51, base: 36, top: 46 },
  { month: 'Dec', snowfall: 102, base: 76, top: 94 },
  { month: 'Jan', snowfall: 114, base: 112, top: 135 },
  { month: 'Feb', snowfall: 102, base: 137, top: 160 },
  { month: 'Mar', snowfall: 114, base: 150, top: 175 },
  { month: 'Apr', snowfall: 64, base: 122, top: 145 },
];

export const aspen: Resort = {
  id: 'aspen',
  name: 'Aspen Snowmass',
  country: 'United States',
  flag: '\u{1F1FA}\u{1F1F8}',
  area: 'Colorado',
  blurb:
    'Four mountains on one ticket — Aspen Mountain, Snowmass, Highlands and Buttermilk — around America’s most storied ski town.',
  lat: 39.1911,
  lon: -106.8175,
  elevationM: 2422,
  currency: 'USD',
  gatewayAirports: ['ASE', 'EGE', 'DEN'],
  defaultOrigin: 'JFK',
  mapsName: 'Aspen Colorado',
  saturdayChangeover: false,
  season: { open: '2026-11-26', close: '2027-04-18' },
  weeks: usWeeks,
  snowByMonth: ASPEN_SNOW,
  snowFacts:
    'Town elevation 7,945 ft (2,422 m); Snowmass tops out at 12,510 ft (3,813 m) with 3,100+ acres. Averages ~300 in (~760 cm) of dry Colorado snow a year across the four mountains; Jan–Mar is prime.',
  components,
  logistics,
};

export default aspen;
