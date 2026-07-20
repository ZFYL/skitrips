// Whistler Blackcomb, British Columbia, Canada — North-American resort. Shape
// mirrors val-thorens.ts (see resorts/types.ts for the schema; resorts/shared.ts
// for US_INSURANCE). Local supplier currency is CAD (flights + US insurance stay
// USD); researched winter 2025/26.

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
    defaultOptionId: 'flight-alaska',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-alaska',
        name: 'EWR/JFK 1-stop economy via Seattle (Alaska)',
        tier: 'Budget',
        description:
          'New York → YVR one-stop via Seattle on Alaska Airlines — often the cheapest US-East routing into Vancouver.',
        price: 410,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.alaskaair.com',
        note: 'Winter band ~$380–$650 round trip; international air is VAT-exempt. Then the ~2 h Sea-to-Sky drive to Whistler.',
      },
      {
        id: 'flight-delta',
        name: 'JFK/EWR 1-stop economy via SEA/SLC (Delta)',
        tier: 'Value',
        description:
          'Connecting economy via Seattle or Salt Lake on Delta — reliable winter frequencies into YVR.',
        price: 460,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.delta.com',
        note: 'Winter band ~$420–$700 round trip.',
      },
      {
        id: 'flight-aircanada',
        name: 'JFK ⇄ YVR (Air Canada)',
        tier: 'Premium',
        description:
          'Nonstop / one-stop transcontinental on Canada\'s flag carrier — frequent winter service to Vancouver.',
        price: 520,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.aircanada.com',
        note: 'Fares run higher over Christmas/New Year and Presidents\' week.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-crystal',
    unitHint: 'Room only unless noted',
    options: [
      {
        id: 'hotel-hi',
        lat: 50.0965,
        lon: -123.1130,
        name: 'HI Whistler (hostel)',
        tier: 'Hostel',
        description:
          'Modern 188-bed HI hostel in the former 2010 Olympic Athletes\' Village at Cheakamus Crossing, ~7 km south of the village on the free transit line.',
        price: 150,
        currency: 'CAD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.hihostels.ca/en/destinations/british-columbia/hi-whistler',
        contact: 'reservations +1 866 762 4122 · +1 604 962 0025',
        imageUrl: 'https://www.hihostels.ca/sites/default/files/styles/hostel_gallery/public/hostels/gallery/hi-whistler-exterior.jpg',
        note: 'Dorm beds from ~C$55; private ensuite rooms ~C$150. Add ~13–16% BC taxes (5% GST + 8% PST + up to 3% MRDT). 1035 Legacy Way.',
      },
      {
        id: 'hotel-pangea',
        lat: 50.1136,
        lon: -122.9553,
        name: 'Pangea Pod Hotel',
        tier: 'Hostel',
        description:
          'Designer 18+ "pod" hotel blending hostel affordability with private hotel-style pods, central in Whistler Village with a rooftop bar.',
        price: 110,
        currency: 'CAD',
        unit: 'per_room_night',
        capacity: 1,
        vatRate: 0,
        url: 'https://www.pangeapod.com',
        contact: '+1 604 962 1011 · 4333 Sunrise Alley',
        imageUrl: 'https://www.pangeapod.com/wp-content/uploads/2018/07/Pangea-Pod-Hotel-The-Pod.jpg',
        note: 'Single pod ~C$110/night. Add ~13–16% BC taxes.',
      },
      {
        id: 'hotel-aava',
        lat: 50.1148,
        lon: -122.9548,
        name: 'Aava Whistler Hotel',
        tier: 'Mid',
        description:
          'Laid-back boutique hotel on the edge of Whistler Village with a heated outdoor pool and hot tubs, walkable to the gondolas.',
        price: 260,
        currency: 'CAD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.paradoxhotels.com/aava-whistler/',
        contact: '+1 800 663 5644 · +1 604 932 2522',
        imageUrl: 'https://www.paradoxhotels.com/wp-content/uploads/2021/09/Aava-Whistler-Hotel-Exterior.jpg',
        note: 'Winter ~C$230–C$320/night. Add ~13–16% BC taxes. 4005 Whistler Way.',
      },
      {
        id: 'hotel-crystal',
        lat: 50.1150,
        lon: -122.9558,
        name: 'Crystal Lodge',
        tier: 'Mid',
        description:
          'Village-centre lodge with 30+ years of Whistler character, a heated outdoor pool and hot tub, steps from the Village Stroll.',
        price: 290,
        currency: 'CAD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://crystal-lodge.com',
        contact: '+1 800 667 3363 · 4154 Village Green',
        imageUrl: 'https://crystal-lodge.com/wp-content/uploads/2019/09/crystal-lodge-whistler-exterior.jpg',
        note: 'Winter ~C$250–C$360/night. Add ~13–16% BC taxes.',
      },
      {
        id: 'hotel-panpacific',
        lat: 50.1139,
        lon: -122.9545,
        name: 'Pan Pacific Whistler Village Centre ★★★★',
        tier: 'Premium',
        description:
          'All-suite ski-in/ski-out property at the base of the gondolas with full kitchens, fireplaces, a saltwater lap pool and hot tubs, plus breakfast.',
        price: 480,
        currency: 'CAD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.panpacific.com/en/hotels-and-resorts/pp-whistler-village-centre.html',
        contact: '+1 888 905 9995 · +1 604 966 5500',
        imageUrl: 'https://www.panpacific.com/content/dam/pphg-revamp/en/ppwhv/pphg2-0/homepage/PPWHV_Property_Introduction_Image_1.jpg',
        note: 'Winter ~C$420–C$600/night. Add ~13–16% BC taxes. 4299 Blackcomb Way.',
      },
      {
        id: 'hotel-fairmont',
        lat: 50.1169,
        lon: -122.9462,
        name: 'Fairmont Chateau Whistler ★★★★★',
        tier: 'Luxury',
        description:
          'Landmark castle-style resort in the Upper Village with ski-in/ski-out access to Blackcomb, spa and multiple restaurants — repeatedly rated among Canada\'s top resorts.',
        price: 750,
        currency: 'CAD',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0,
        url: 'https://www.fairmont.com/whistler/',
        contact: '+1 866 540 4424 · +1 604 938 8000',
        imageUrl: 'https://m.ahstatic.com/is/image/accorhotels/HCM_P_8734414:8by10?fmt=jpg&wid=1200&hei=800&qlt=80',
        note: 'Winter ~C$650–C$1,000/night. Add ~13–16% BC taxes. 4599 Chateau Boulevard.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer YVR ⇄ resort',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-skylynx',
    unitHint: 'Sea-to-Sky Highway, ~120 km / ~2 h each way',
    options: [
      {
        id: 'transfer-skylynx',
        name: 'YVR Skylynx shared motorcoach',
        tier: 'Budget',
        description:
          'Scheduled motorcoach YVR → Whistler with Wi-Fi, washroom and reclining seats up the scenic Sea-to-Sky Highway — the value option.',
        price: 42,
        currency: 'CAD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://yvrskylynx.com',
        contact: '+1 604 326 1616',
        note: 'C$32 one-way / C$42 round-trip per person. Books online.',
      },
      {
        id: 'transfer-whistlershuttle',
        name: 'Whistler Shuttle (Epic Rides) — hotel drop-off',
        tier: 'Mid',
        description:
          'Shared shuttle van / coach YVR → Whistler with door-to-door hotel drop-off — the convenient shared option.',
        price: 130,
        currency: 'CAD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://whistlershuttle.com',
        contact: '+1 866 923 0516',
        note: '~C$65 one-way / ~C$130 round-trip per person; 15% early-book discount before mid-November.',
      },
      {
        id: 'transfer-privatesuv',
        name: 'Private SUV transfer (Whistler Platinum)',
        tier: 'Premium',
        description:
          'Private chauffeured SUV door-to-door YVR ⇄ Whistler for the group, with ski-gear space — matched to your flight over the Sea-to-Sky.',
        price: 600,
        currency: 'CAD',
        unit: 'per_vehicle_return',
        capacity: 6,
        vatRate: 0,
        url: 'https://whistlerplatinum.com',
        contact: '+1 604 698 9432',
        note: '~C$550–C$650/vehicle return. Winter conditions on the Sea-to-Sky can extend the drive — allow buffer.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Whistler Blackcomb',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-epic',
    unitHint: '8,171 acres across two mountains',
    options: [
      {
        id: 'pass-epic',
        name: 'Epic Pass (season pass, multi-resort)',
        description:
          'Whistler Blackcomb is on Vail Resorts\' Epic Pass. A full Epic Pass or Epic Local covers unlimited/near-unlimited Whistler days plus dozens of resorts — for 6+ days it beats window tickets outright.',
        price: 1500,
        currency: 'CAD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.epicpass.com',
        note: 'Full Epic Pass ~US$1,100 / ~C$1,500 for 2025/26. Epic Day Passes (advance, resort-specific) also undercut walk-up rates significantly.',
      },
      {
        id: 'pass-window',
        name: '6-day window lift ticket (walk-up)',
        description:
          'Six individual days at the Whistler Blackcomb ticket window — priced at a steep premium. Included as the comparison baseline; a pass or advance ticket beats it.',
        price: 1600,
        currency: 'CAD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.whistlerblackcomb.com/plan-your-trip/lift-access/lift-tickets.aspx',
        note: 'Single-day walk-up peaks around C$280–C$320/day — window rates are notoriously high. Buy in advance or use the Epic Pass.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-villagesports',
    unitHint: 'Skis + boots + poles',
    options: [
      {
        id: 'rental-villagesports',
        name: 'Whistler Village Sports 6-day pack',
        tier: 'Mid',
        description:
          'Central village shop with sport, performance and demo/premium tiers; multi-day and online-advance discounts.',
        price: 300,
        currency: 'CAD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.whistlervillagesports.com',
        note: 'Sport ~C$210 / Performance ~C$300 / Demo ~C$380 for 6 days. Add BC taxes.',
      },
      {
        id: 'rental-summitsport',
        name: 'Summit Sport 6-day pack',
        tier: 'Budget',
        description:
          'Village rental shop with keenly priced sport-to-premium packages and slopeside pickup.',
        price: 290,
        currency: 'CAD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.summitsport.com',
        note: 'Sport ~C$200 / Performance ~C$290 / Premium ~C$370 for 6 days. Add BC taxes.',
      },
      {
        id: 'rental-spicy',
        name: 'Spicy Sports (Affinity network) 6-day pack',
        tier: 'Budget',
        description:
          'Part of the Affinity Sports rental network across the village with online-advance discounts.',
        price: 285,
        currency: 'CAD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.spicysports.com',
        note: 'Sport ~C$195 / Performance ~C$285 / Premium ~C$360 for 6 days. Add BC taxes.',
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
    defaultOptionId: 'wbss-group',
    unitHint: 'Whistler Blackcomb Snow School',
    options: [
      {
        id: 'wbss-group',
        name: 'Snow School group lesson — full day',
        description:
          'Full-day adult group lesson (all levels) with the Whistler Blackcomb Snow School; lift ticket usually separate.',
        price: 270,
        currency: 'CAD',
        unit: 'per_person_day',
        vatRate: 0,
        url: 'https://www.whistlerblackcomb.com/plan-your-trip/ski-and-ride-lessons/lessons.aspx',
        contact: '+1 800 766 0449',
        note: '~C$230–C$270/day. Book ahead on holiday weeks.',
      },
      {
        id: 'wbss-private',
        name: 'Snow School private — full day (1–5)',
        tier: 'Premium',
        description:
          'Private instructor for your group for a full day (1–up to ~5 people, one price), with lift-line priority; tickets extra.',
        price: 900,
        currency: 'CAD',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.whistlerblackcomb.com/plan-your-trip/ski-and-ride-lessons/lessons.aspx',
        contact: '+1 800 766 0449',
        note: 'Full day ~C$800–C$900; half day ~C$650. Confirm slot in the resort engine.',
      },
    ],
  },
];

// Operational playbook shown on the page and in the internal PDF.
const logistics = [
  {
    step: 'T-5 to T-3 months — lock the frame',
    detail:
      'Whistler runs on flexible dates (no Saturday changeover) with one of North America\'s longest seasons — target January value weeks or spring skiing and avoid Christmas/NY and Presidents\' week. Book YVR flights early. Request the hotel allotment with a deposit; ski-in/ski-out village beds (Pan Pacific, Fairmont) go first.',
  },
  {
    step: 'T-2 months — passes & transfer',
    detail:
      'For a 6-day trip the Epic Pass / Epic Local or advance Epic Day Passes beat window tickets outright — buy online early. Reserve the YVR Skylynx coach or Whistler Shuttle (15% early-book discount) up the Sea-to-Sky, or a private SUV matched to flight times.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the rooming list and rental sizes. Issue US travel insurance per traveler (works for Canada). Pay hotel balances in CAD. Send transfer suppliers flight numbers; confirm Snow School group levels.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Fly into YVR → ~2 h Sea-to-Sky transfer to Whistler Village → check-in, load Epic Pass / collect tickets, rental fitting → ski two mountains linked by the record-setting PEAK 2 PEAK Gondola across 6 days → transfer back to YVR. Blackcomb\'s Horstman Glacier extends spring skiing into late May.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'BC lodging carries ~13–16% (5% federal GST + 8% provincial PST + up to 3% municipal MRDT/tourism tax) on top of room rates. Lift tickets, rentals and lessons carry GST (+PST on goods); Canada uses GST/PST, not VAT. Flights and the US traveler insurance are priced in USD. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const WB_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 130, base: 60, top: 100 },
  { month: 'Dec', snowfall: 205, base: 130, top: 190 },
  { month: 'Jan', snowfall: 230, base: 180, top: 250 },
  { month: 'Feb', snowfall: 170, base: 200, top: 280 },
  { month: 'Mar', snowfall: 165, base: 210, top: 290 },
  { month: 'Apr', snowfall: 110, base: 180, top: 260 },
];

export const whistler: Resort = {
  id: 'whistler',
  name: 'Whistler Blackcomb',
  country: 'Canada',
  flag: '\u{1F1E8}\u{1F1E6}',
  area: 'British Columbia',
  blurb:
    'The largest ski resort in North America — two massive mountains linked by the record-setting PEAK 2 PEAK Gondola, 8,171 acres, 200+ runs and a legendary après village at the base.',
  lat: 50.1163,
  lon: -122.9574,
  elevationM: 675,
  currency: 'CAD',
  gatewayAirports: ['YVR'],
  defaultOrigin: 'JFK',
  mapsName: 'Whistler Village BC',
  saturdayChangeover: false,
  season: { open: '2026-11-26', close: '2027-05-24' },
  weeks: usWeeks,
  snowByMonth: WB_SNOW,
  snowFacts:
    'Village base 675 m, Whistler Peak 2,182 m, Blackcomb 2,284 m — ~1,600 m vertical. Averages ~1,170 cm (≈460 in) of snow a year; Blackcomb\'s Horstman Glacier extends lift-served skiing into late May.',
  components,
  logistics,
};

export default whistler;
