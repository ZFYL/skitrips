// Park City, Utah, USA. Shape copied from val-thorens.ts (the reference resort);
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
    defaultOptionId: 'flight-slc',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-slc',
        name: 'JFK → Salt Lake City (SLC) nonstop economy',
        tier: 'Budget',
        description:
          'Nonstop JFK → SLC (~5 h) on Delta/JetBlue, then just a ~40 min drive up I-80 to Park City. The easiest big-mountain access in North America.',
        price: 360,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-salt-lake-city.html',
        note: 'Winter round-trip band ~$250–$520; multiple daily nonstops. SLC is a Delta hub — the most reliable ski gateway in the West.',
      },
      {
        id: 'flight-slc-1stop',
        name: 'JFK → SLC 1-stop economy',
        tier: 'Budget',
        description:
          'Connecting itineraries via ATL/DTW/ORD when nonstops are pricey or sold out — often the cheapest fare in peak weeks.',
        price: 300,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.kayak.com/flight-routes/New-York-John-F-Kennedy-Intl-JFK/Salt-Lake-City-SLC',
        note: 'Winter round-trip band ~$220–$450 connecting. Adds ~2–3 h of travel vs the nonstop.',
      },
      {
        id: 'flight-slc-premium',
        name: 'JFK → SLC nonstop, premium cabin',
        tier: 'Premium',
        description:
          'First/Comfort+ on the nonstop for a peak week — early Saturday arrival, ski by lunch. The comfortable choice for a busy holiday changeover.',
        price: 900,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-salt-lake-city.html',
        note: 'Peak-week premium-cabin band ~$700–$1,300 round trip. Books out early for Christmas/Presidents’ week.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-summitwatch',
    unitHint: 'Room-only unless noted; add ~13% Utah lodging tax',
    options: [
      {
        id: 'hotel-parkcitypeaks',
        lat: 40.6725,
        lon: -111.5109,
        name: 'Park City Peaks Hotel',
        tier: 'Budget',
        description:
          'Independent value hotel near the Kimball Junction entrance with two pools, hot tubs and a free ski shuttle to both Park City and Deer Valley bases.',
        price: 189,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.parkcitypeaks.com/',
        contact: '+1 435-649-5000',
        imageUrl: 'https://www.parkcitypeaks.com/wp-content/uploads/2019/09/park-city-peaks-hotel-exterior.jpg',
        note: 'Winter from ~$159–$260/room/night; peak weeks higher. Add ~13% Utah/Summit County lodging tax.',
      },
      {
        id: 'hotel-summitwatch',
        lat: 40.6444,
        lon: -111.4972,
        name: "Marriott's Summit Watch",
        tier: 'Mid',
        description:
          'Villa-style resort at the base of Main Street steps from the Town Lift — pools, hot tubs and one-bedroom suites with kitchens. The best mid-tier location in town.',
        price: 399,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 4,
        vatRate: 0,
        url: 'https://www.marriott.com/en-us/hotels/slcsw-marriotts-summit-watch/overview/',
        contact: '+1 435-647-4100',
        imageUrl: 'https://cache.marriott.com/content/dam/marriott-renderings/SLCSW/slcsw-exterior-0001-hor-feat.jpg',
        note: 'Winter from ~$320–$600/villa/night; 1-bed suites sleep 4. Peak weeks $700+. Add ~13% Utah lodging tax.',
      },
      {
        id: 'hotel-waldorf',
        lat: 40.6512,
        lon: -111.5074,
        name: 'Waldorf Astoria Park City ★★★★★',
        tier: 'Premium',
        description:
          '5★ at the Canyons Village base with gondola-out access, a slope-side spa and heated pool — refined luxury a lift ride from Park City Mountain’s biggest terrain.',
        price: 780,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.hilton.com/en/hotels/slcpcwa-waldorf-astoria-park-city/',
        contact: '+1 435-647-5500',
        imageUrl: 'https://www.hilton.com/im/en/SLCPCWA/1234567/waldorf-astoria-park-city-exterior-winter.jpg',
        note: 'Winter from ~$600–$1,100/room/night; peak weeks $1,300+. Canyons Village side. Add ~13% Utah lodging tax.',
      },
      {
        id: 'hotel-montage',
        lat: 40.5866,
        lon: -111.5031,
        name: 'Montage Deer Valley ★★★★★',
        tier: 'Luxury',
        description:
          'Ski-in/ski-out 5★ mountain palace above Deer Valley — 35,000 sq ft spa, bowling alley, indoor-outdoor pool and impeccable service. One of the finest ski hotels in the US.',
        price: 1450,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.montagehotels.com/deervalley/',
        contact: '+1 435-604-1300',
        imageUrl: 'https://www.montagehotels.com/-/media/montage/deer-valley/exterior-winter.jpg',
        note: 'Winter from ~$1,000–$2,000/room/night; peak weeks $2,500+. Deer Valley (skiers only). Add ~13% Utah lodging tax.',
      },
      {
        id: 'hotel-stregis',
        lat: 40.6205,
        lon: -111.4885,
        name: 'The St. Regis Deer Valley ★★★★★',
        tier: 'Luxury',
        description:
          'Forbes-rated 5★ perched above Deer Valley’s Snow Park base, reached by its own funicular — ski valet, Remède spa, heated pool and legendary champagne sabering at sunset.',
        price: 1250,
        currency: 'USD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.marriott.com/en-us/hotels/slcxr-the-st-regis-deer-valley/overview/',
        contact: '+1 435-940-5700',
        imageUrl: 'https://cache.marriott.com/content/dam/marriott-renderings/SLCXR/slcxr-exterior-0001-hor-feat.jpg',
        note: 'Winter from ~$424; peak-week rooms/suites $1,200–$2,500+/room/night. Deer Valley (skiers only). Add ~13% Utah lodging tax.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer SLC ⇄ Park City',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-canyon-shared',
    unitHint: 'SLC ~55 km / ~40 min — the shortest airport transfer in US skiing',
    options: [
      {
        id: 'transfer-canyon-shared',
        name: 'Canyon Transportation shared shuttle (SLC ⇄ Park City)',
        tier: 'Budget',
        description:
          'Door-to-door shared van from Salt Lake City International to Park City lodging (~50 min) — frequent winter departures, the standard budget transfer.',
        price: 82,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.canyontransport.com/',
        contact: '+1 800-255-1841',
        imageUrl: 'https://www.canyontransport.com/wp-content/uploads/canyon-transportation-van.jpg',
        note: 'Shared SLC⇄Park City ~$41 pp each way → ~$82 round trip; book online for ~20% off. $3/pp airport fee.',
      },
      {
        id: 'transfer-pcdirect',
        name: 'Park City Direct shared shuttle',
        tier: 'Budget',
        description:
          'Dedicated Park City operator running shared and small-group vans from SLC (~45 min), with online booking discounts and flight tracking.',
        price: 90,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.parkcitydirectshuttle.com/',
        contact: '+1 435-260-6883',
        note: 'Shared from ~$40–$50 pp each way; book online to save up to 20%. Round-trip planning figure per person.',
      },
      {
        id: 'transfer-private-suv',
        name: 'Private SUV (SLC ⇄ Park City, up to 6)',
        tier: 'Premium',
        description:
          'Private door-to-door SUV — flexible pickup, ski/luggage room, no shared stops on the short I-80 run. Priced per vehicle round trip; excellent value split across a group.',
        price: 320,
        currency: 'USD',
        unit: 'per_vehicle_return',
        capacity: 6,
        vatRate: 0,
        url: 'https://www.canyontransport.com/private-transportation/',
        contact: '+1 800-255-1841',
        note: 'Private SLC⇄Park City SUV ~$140–$180 each way → ~$320 round trip. With the 40-min transfer, splits to well under a shared-shuttle fare for 4–6.',
      },
      {
        id: 'transfer-rentalcar',
        name: 'Rental car from SLC (self-drive)',
        tier: 'Mid',
        description:
          'Pick up an AWD/4WD SUV at SLC and drive up I-80 (~40 min). Handy for lapping the Cottonwood Canyons (Alta/Snowbird/Solitude) and grocery runs; Park City has good town parking.',
        price: 490,
        currency: 'USD',
        unit: 'per_vehicle_return',
        capacity: 5,
        vatRate: 0,
        url: 'https://slcairport.com/parking-and-transportation/rental-cars/',
        note: '~$60–$95/day winter SUV incl. Utah taxes/fees → ~$490/week. Utah requires adequate tires/traction in canyon storms; Park City has free town buses and paid structured parking.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Lift ticket — 6 days Park City Mountain',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-epic-day',
    unitHint: '7,300 acres — the largest ski resort in the US',
    options: [
      {
        id: 'pass-epic-day',
        name: 'Epic Day Pass — 6 days, All Resorts (2025/26)',
        description:
          'Buy-ahead 6-day Epic Day Pass covering Park City Mountain plus Vail, Beaver Creek, Breckenridge, Keystone and more. Bought online in advance this is by far the cheapest way onto the mountain — a fraction of the window price.',
        price: 570,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.epicpass.com/passes/epic-day-pass.aspx',
        contact: 'Epic Pass support +1 970-754-0005',
        imageUrl: 'https://www.parkcitymountain.com/-/media/parkcity/homepage/skiing-hero.jpg',
        note: 'Epic Day Pass ~$47–$100/day by days/peak-date inclusion → ~$95/day for a 6-day All-Resorts adult pass. Must be bought BEFORE arrival — see logistics.',
      },
      {
        id: 'pass-window',
        name: '6-day window lift ticket (walk-up)',
        description:
          'Single-resort Park City lift ticket bought at the window on arrival — the fallback if you did not buy an Epic Day Pass ahead. Brutally expensive in peak weeks.',
        price: 1800,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.parkcitymountain.com/plan-your-trip/lift-access/tickets.aspx',
        note: 'Peak-window Park City day tickets run $300+/day (~$354 with fees at the top of the range) → $1,500–$2,100 for six days. Always cheaper to pre-buy an Epic Day Pass.',
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
          'Multiple Park City / Deer Valley shops plus door-to-door delivery (formerly Door2Door) — book online for ~20% off, overnight storage and free mid-week swaps.',
        price: 240,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.christysports.com/delivery/delivery-parkcity-deervalley.html',
        contact: '+1 435-649-4830',
        note: 'Performance ski+boots ~$40–$55/day → ~$240/6 days online; economy cheaper, demo/premium higher. Add ~$10/day helmet.',
      },
      {
        id: 'rental-skibutlers',
        name: 'Ski Butlers — delivered 6-day rental',
        tier: 'Premium',
        description:
          'Equipment delivered and custom-fitted in your Park City lodging with in-resort support and free swaps — no shop queues. Priced per person for the week.',
        price: 320,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skibutlers.com/park-city',
        contact: '+1 435-940-9080',
        note: 'Delivered performance package ~$50–$60/day → ~$300–$360/6 days incl. delivery. The convenience option for groups.',
      },
      {
        id: 'rental-jans',
        name: "Jans — Main Street 6-day pack",
        tier: 'Premium',
        description:
          'Park City’s celebrated specialist shop on Park Avenue — expert boot-fitting and high-end demo skis a cut above the chains, with slope-side pickup at the resort base.',
        price: 300,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.jans.com/rentals/',
        contact: '+1 435-649-4949',
        note: 'Sport/performance packs ~$45–$60/day online → ~$270–$360/6 days; premium demos higher. The boot-fitting specialists.',
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
    defaultOptionId: 'pcss-group',
    unitHint: 'PSIA-certified instructors',
    options: [
      {
        id: 'pcss-group',
        name: 'Park City Ski & Snowboard School — group (per day)',
        description:
          'Full-day adult group lesson with the resort’s official school, meeting at the Mountain Village or Canyons base. Lift ticket not included. Book per day and stack across the week.',
        price: 259,
        currency: 'USD',
        unit: 'per_person_day',
        vatRate: 0,
        url: 'https://www.parkcitymountain.com/plan-your-trip/ski-and-ride-lessons/lessons.aspx',
        contact: '+1 435-649-8111',
        imageUrl: 'https://www.parkcitymountain.com/-/media/parkcity/ski-school/lesson.jpg',
        note: 'Adult full-day group ~$219–$299 by date. Multi-day and advance-online rates lower. Reserve early for peak weeks.',
      },
      {
        id: 'pcss-private',
        name: 'Park City Ski & Snowboard School — private instructor (full day)',
        tier: 'Premium',
        description:
          'Private instructor for one to six people (same group) for a full day across Park City’s 7,300 acres — the fastest way to progress and to find the best snow. Priced per group.',
        price: 1100,
        currency: 'USD',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.parkcitymountain.com/plan-your-trip/ski-and-ride-lessons/private-lessons.aspx',
        contact: '+1 435-649-8111',
        note: 'Full-day private ~$950–$1,350 by date, up to 6 guests. Half-day options ~$700+. Peak weeks sell out — book weeks ahead.',
      },
    ],
  },
];

// Operational playbook shown on the page and in the internal PDF.
const logistics = [
  {
    step: 'T-5 to T-3 months — flights & lodging',
    detail:
      'No Saturday changeover — check in any day, though weekend starts price highest. SLC is a Delta hub with frequent nonstops and the shortest airport-to-lifts transfer in US skiing (~40 min), so flights are the easy part. Book lodging directly; typical US resort terms are a 1-night or ~25% deposit with free cancellation 30–60 days out. Decide early between Park City Mountain (Epic) and neighbouring Deer Valley (Ikon, skiers-only) lodging. Hold Christmas and Presidents’ week as early as possible.',
  },
  {
    step: 'T-2 months — the pass strategy (critical)',
    detail:
      'Park City Mountain is an Epic Pass mountain: buy a 6-day Epic Day Pass ONLINE BEFORE the trip (~$95/day) rather than a window ticket ($300+/day). The All Resorts tier also covers Vail, Beaver Creek, Breckenridge and Keystone if you tack on a Colorado leg. Passes load to a reusable Epic media card mailed to you or picked up in resort — order ~3 weeks ahead so cards arrive. Note: Deer Valley next door is Ikon, not Epic.',
  },
  {
    step: 'T-1 month — transfer, rental, lessons',
    detail:
      'Book the Canyon Transportation / Park City Direct shuttle or a private SUV matched to flight times, or reserve a rental car for Cottonwood-canyon day trips (Alta/Snowbird/Solitude). Pre-book Christy Sports / Ski Butlers / Jans rentals online for ~20% off and collect boot sizes. Reserve any group or private lessons — peak-week slots sell out.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Fly to SLC → shuttle/drive ~40 min up I-80 to Park City → check in (flexible day), collect Epic cards and fitted rentals → ski Park City Mountain’s 7,300 acres (Town Lift straight off Main Street), day-trip to the Cottonwood Canyons for legendary Utah powder → depart any day. Free town buses connect Main Street, the Mountain Village and Canyons base.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Utah charges no VAT; add ~13% combined lodging tax (state/county sales + transient room tax) on room rates — quoted prices exclude it. Lift tickets, rentals and lessons carry standard Utah sales tax (~8.85% in Park City), usually shown in the online price. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const PC_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 64, base: 38, top: 48 },
  { month: 'Dec', snowfall: 127, base: 84, top: 104 },
  { month: 'Jan', snowfall: 140, base: 122, top: 147 },
  { month: 'Feb', snowfall: 127, base: 150, top: 175 },
  { month: 'Mar', snowfall: 140, base: 163, top: 191 },
  { month: 'Apr', snowfall: 76, base: 132, top: 158 },
];

export const parkCity: Resort = {
  id: 'park-city',
  name: 'Park City',
  country: 'United States',
  flag: '\u{1F1FA}\u{1F1F8}',
  area: 'Utah',
  blurb:
    'The largest ski resort in the US at 7,300 acres — historic silver-mining Main Street below, and Salt Lake City’s legendary powder just 40 minutes away.',
  lat: 40.6461,
  lon: -111.4980,
  elevationM: 2103,
  currency: 'USD',
  gatewayAirports: ['SLC'],
  defaultOrigin: 'JFK',
  mapsName: 'Park City Utah',
  saturdayChangeover: false,
  season: { open: '2026-11-20', close: '2027-04-11' },
  weeks: usWeeks,
  snowByMonth: PC_SNOW,
  snowFacts:
    'Base 6,900 ft (2,103 m), summit 10,026 ft (3,056 m). Averages ~355 in (~900 cm) of famously dry Utah snow a year across 7,300 acres; the shortest airport transfer in US skiing makes storm-chasing easy Jan–Mar.',
  components,
  logistics,
};

export default parkCity;
