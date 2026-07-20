// Verbier, Switzerland — 4 Vallées. Shaped like val-thorens.ts (see
// resorts/types.ts for the schema; resorts/shared.ts for US_INSURANCE).
// Prices are researched gross figures; Swiss lodging VAT special rate is 3.8%,
// standard rate 8.1%. 2026/27 where published, else verified 2025/26.

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
    defaultOptionId: 'flight-jfk',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-jfk',
        name: 'JFK 1-stop economy (SWISS / Air France / KLM)',
        tier: 'Budget',
        description:
          'JFK → GVA via ZRH / CDG / AMS, ~10–12 h door to door. No year-round nonstop to Geneva; February school-holiday weeks are dearest.',
        price: 780,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-geneva.html',
        note: 'Estimated winter band $650–$1,000 round trip; peak Feb $1,000–$1,300. International air is VAT-exempt.',
      },
      {
        id: 'flight-ewr',
        name: 'EWR 1-stop / seasonal nonstop (United)',
        tier: 'Budget',
        description:
          'Newark → GVA on United hub connections; United has flown a seasonal winter EWR–GVA nonstop.',
        price: 820,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.kayak.com/flight-routes/Newark-EWR/Geneva-Geneve-Cointrin-GVA',
        note: 'Estimated 1-stop band $650–$1,050 round trip; seasonal nonstop ~$900–$1,400.',
      },
      {
        id: 'flight-bos',
        name: 'BOS 1-stop economy',
        tier: 'Budget',
        description: 'Boston → GVA via LHR / CDG / FRA / ZRH on BA, Air France, Lufthansa or SWISS.',
        price: 850,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.momondo.com/flights/boston/geneva',
        note: 'Estimated winter band $700–$1,100 round trip; no nonstop from Boston.',
      },
      {
        id: 'flight-eu',
        name: 'Intra-EU flight → Geneva',
        tier: 'From Europe',
        description:
          'Short-haul round trip to GVA (LHR/AMS/BER/MAD class of routes) for group members already in Europe.',
        price: 165,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20GVA',
        note: 'Typical €80–250 round trip booked ahead; EasyJet/BA/KLM/Lufthansa. Quoted fares are final.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-farinet',
    unitHint: 'Breakfast unless noted',
    options: [
      {
        id: 'hotel-map',
        lat: 46.0948877,
        lon: 7.2187818,
        name: 'MAP Verbier-Village (hostel / B&B)',
        tier: 'Hostel',
        description:
          'Family-run hostel in an old-village chalet, ~1 km from the Médran lifts with a free half-hourly ski shuttle at the door. Dorms and private ensuite rooms, shared kitchen.',
        price: 68,
        currency: 'CHF',
        unit: 'per_person_night',
        vatRate: 0.038,
        url: 'https://www.mapverbier.ch',
        contact: 'map@verbier.ch',
        imageUrl:
          'https://www.mapverbier.ch/image-294-5-Le-MAP-en-hiver-2019The-MAP-in-winter-2019Das-MAP-im-Winter-2019.jpg',
        note: 'Verified: CHF 60–75 pp/night dorm; private ensuite double CHF 150/room/night. 2–3 night minimum.',
      },
      {
        id: 'hotel-farinet',
        lat: 46.0960998,
        lon: 7.2288173,
        name: 'Hôtel Farinet ★★★',
        tier: 'Mid',
        description:
          'Lively 16-room hotel on Place Centrale — home of the famous Farinet Après-Ski Lounge and South restaurant, with south-facing balconies.',
        price: 375,
        currency: 'CHF',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.038,
        url: 'https://www.hotelfarinet.com',
        contact: 'reservations@lefarinet.com · +41 27 771 66 26',
        imageUrl: 'https://d38b7da4edvzl5.cloudfront.net/farinet/assets/images/2.jpg',
        note: 'Estimated CHF 300–450/room/night winter high season — official site prices by date.',
      },
      {
        id: 'hotel-experimental',
        lat: 46.0961944,
        lon: 7.2261173,
        name: 'Experimental Chalet ★★★★',
        tier: 'Premium',
        description:
          'Design-led 39-room boutique hotel and spa on Route de Verbier Station near Médran — restaurant and cocktail bar by the Experimental Group.',
        price: 520,
        currency: 'CHF',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.038,
        url: 'https://www.experimentalchalet.com',
        contact: 'info@experimentalchalet.com · +41 27 775 40 00',
        imageUrl:
          'https://cdn.prod.website-files.com/5ed582df4ad45be1816ec0da/5f0cb6f16af1cf755b28ad38_og-chalet.png',
        note: 'Estimated CHF 400–700/room/night winter high season — dynamic pricing.',
      },
      {
        id: 'hotel-cordee',
        lat: 46.0980726,
        lon: 7.2235534,
        name: 'La Cordée des Alpes ★★★★S',
        tier: 'Premium',
        description:
          'Refined alpine boutique near the Médran lifts (Small Luxury Hotels of the World) with spa, pool and a Michelin-recognised restaurant.',
        price: 640,
        currency: 'CHF',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.038,
        url: 'https://www.hotelcordee.com',
        contact: 'info@hotelcordee.com · +41 27 775 45 45',
        imageUrl: 'https://cms.kvhotels.com/wp-content/uploads/2024/11/CDA_Prestige-FP-day.jpg',
        note: 'Estimated CHF 500–900/room/night winter high season.',
      },
      {
        id: 'hotel-w',
        lat: 46.0923491,
        lon: 7.2332172,
        name: 'W Verbier ★★★★★',
        tier: 'Luxury',
        description:
          '123-room ski-in/ski-out design hotel at the Médran lift base (1,531 m) — Away Spa, in-room fireplaces and balconies, multiple restaurants and bars.',
        price: 950,
        currency: 'CHF',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.038,
        url: 'https://www.marriott.com/en-us/hotels/gvawh-w-verbier/overview/',
        contact: '+41 27 472 88 88',
        imageUrl:
          'https://mds-assets.marriott.com/cdn-cgi/image/f=auto/cms-platform-for-marriott/gvawh-w-kitchen/site-images/migrated-images/living-room.jpg',
        note: 'Estimated CHF 700–1,400/room/night winter high season — highly date-dependent.',
      },
      {
        id: 'hotel-adrien',
        lat: 46.1035112,
        lon: 7.2242159,
        name: "Le Chalet d'Adrien ★★★★★",
        tier: 'Luxury',
        description:
          'Intimate 29-room Relais & Châteaux mountain chalet by the Savoleyres lift above the village — spa, gourmet dining and Grand Combin views, often sold half-board.',
        price: 720,
        currency: 'CHF',
        unit: 'per_room_night',
        capacity: 2,
        vatRate: 0.038,
        url: 'https://www.chalet-adrien.com',
        contact: 'info@chalet-adrien.com · +41 27 771 62 00',
        imageUrl: 'https://chalet-adrien.com/wp-content/uploads/2020/12/chalet_adrien.jpg',
        note: 'Estimated CHF 500–950/room/night winter — request group / half-board quote.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer GVA ⇄ Verbier',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-alpinexpress',
    unitHint: '~160 km, ~2 h each way',
    options: [
      {
        id: 'transfer-alpybus-shared',
        name: 'Alpybus shared shuttle',
        tier: 'Budget',
        description:
          'Established Alps shuttle with a shared drop at central Parking Brunet, ~2 h 10 from Geneva.',
        price: 99,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0.081,
        url: 'https://www.alpybus.com/verbier',
        contact: 'info@alpybus.com · +41 24 539 10 17',
        note: 'Estimated ~CHF 49.50 pp one-way → ~CHF 99 return; site publishes mainly the private rate.',
      },
      {
        id: 'transfer-alpinexpress',
        name: 'AlpineXpress shared shuttle',
        tier: 'Budget',
        description:
          'Daily scheduled shared shuttle with central Verbier drop-off; return departures roughly every 2 h at peak.',
        price: 150,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0.081,
        url: 'https://booking.alpinexpress.com/page/shared-transfers',
        contact: 'bookings@alpinexpress.com · +41 27 771 96 00',
        note: 'Confirmed ~CHF 75 pp one-way → ~CHF 150 return.',
      },
      {
        id: 'transfer-train',
        name: 'Train + Verbier gondola (public transport)',
        tier: 'Budget',
        description:
          'SBB Geneva → Martigny → Le Châble (St-Bernard Express), then the gondola up to Verbier centre (~10 min). Runs every day — the flexible budget route.',
        price: 130,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0.081,
        url: 'https://www.sbb.ch',
        contact: 'SBB +41 848 44 66 88',
        note: 'Estimated ~CHF 60–75 pp one-way full fare → ~CHF 130 return; Half-Fare/Saver discounts apply. Total ~2h30–3h.',
      },
      {
        id: 'transfer-alpybus-private',
        name: 'Alpybus private van (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private van, any day — the option when flights do not match a shared shuttle time.',
        price: 950,
        currency: 'CHF',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.081,
        url: 'https://www.alpybus.com/verbier',
        contact: 'info@alpybus.com · +41 24 539 10 17',
        note: 'From CHF 475/vehicle one-way (confirmed) → ~CHF 950 return planning figure.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days 4 Vallées',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-4vallees',
    unitHint: '410 km marketed across the 4 Vallées',
    options: [
      {
        id: 'pass-4vallees',
        name: '6-day adult 4 Vallées pass (2026/27)',
        description:
          'Full-area pass across Verbier, La Tzoumaz, Nendaz, Veysonnaz and Thyon — up to the 3,330 m Mont-Fort glacier.',
        price: 425,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0.081,
        url: 'https://verbier4vallees.ch/en/online-shop',
        contact: 'Téléverbier groups: offres@televerbier.ch',
        imageUrl:
          'https://verbier4vallees.ch/wp-content/uploads/2023/01/ski-verbier-4-vallees.jpg',
        note: '2025/26 6-day 4 Vallées was CHF 409; 2026/27 6-day not yet published — estimated ~CHF 420–430. Swiss lift tickets carry 8.1% VAT.',
      },
      {
        id: 'pass-verbier-sector',
        name: '6-day adult Verbier / Mont-Fort sector pass',
        description:
          'Cheaper local-sector pass for those staying on the Verbier–Mont-Fort side rather than touring the whole 4 Vallées.',
        price: 400,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0.081,
        url: 'https://verbier4vallees.ch/en/online-shop',
        contact: 'offres@televerbier.ch',
        note: 'Verified 2025/26 Verbier-sector 6-day CHF 400.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-skiservice',
    unitHint: 'Skis + boots + helmet',
    options: [
      {
        id: 'rental-skiservice',
        name: 'Ski Service "Gold" pack',
        tier: 'Mid',
        description:
          'Long-established Verbier shop on Rue de Médran; 6-day mid-range skis + boots + helmet, fitted in resort.',
        price: 268,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0.081,
        url: 'https://www.skiservice.com',
        contact: 'skiservice@verbier.ch · +41 27 771 67 70',
        note: 'From 2025/26 pricelist: skis CHF 162 + boots CHF 68 + ~CHF 38 helmet.',
      },
      {
        id: 'rental-mountainair',
        name: 'Mountain Air "Gold" pack',
        tier: 'Premium',
        description:
          'Premium skis + boots + helmet with free exchanges and damage cover; 10% off booking online in advance.',
        price: 384,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0.081,
        url: 'https://www.mountainairverbier.com',
        contact: '+41 27 775 44 03',
        note: 'Rack CHF 384 (skis 255 + boots 91 + helmet 38); CHF 345.60 with 10% online pre-book.',
      },
      {
        id: 'rental-intersport',
        name: 'Intersport Rent mid pack',
        tier: 'Budget',
        description:
          'In-resort Intersport outlet; 6-day mid-range adult pack with online booking discounts.',
        price: 290,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0.081,
        url: 'https://www.intersportrent.com/skirent-verbier~3949541',
        note: 'Estimated CHF 250–320 for a 6-day mid pack — engine-priced.',
      },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: '🛡️',
    defaultEnabled: true,
    defaultOptionId: 'ins-us-policy',
    unitHint: 'Medical + cancellation + mountain rescue',
    options: [
      ...US_INSURANCE,
      {
        id: 'ins-rega',
        name: 'REGA patronage (Swiss Air-Rescue) — 1 year',
        tier: 'Add-on',
        description:
          'Swiss Air-Rescue patronage: Rega may waive helicopter rescue-mission costs for patrons when insurance does not cover them. A donation/goodwill scheme, not insurance — pair it with a travel-medical policy.',
        price: 40,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.rega.ch/en/become-a-patron',
        contact: 'Rega (from abroad) +41 44 654 32 22',
        note: 'CHF 40/adult/year; partnership/family tier ~CHF 80. Switzerland has no Carré Neige equivalent.',
      },
    ],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'ess-group',
    unitHint: 'English-speaking instructors',
    options: [
      {
        id: 'ess-group',
        name: 'Swiss Ski School (ESS) adult group — 5 mornings',
        description:
          'Blue-League adult group course, 5 consecutive mornings, max 8 per group, meeting near Médran.',
        price: 350,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.essverbier.ch/en/',
        contact: 'info@verbiersportplus.ch · +41 27 775 33 63',
        note: 'Verified: Blue League 5 mornings CHF 350 (Red/Black 3 mornings CHF 250).',
      },
      {
        id: 'ess-private',
        name: 'Swiss Ski School (ESS) private — half day',
        tier: 'Premium',
        description:
          'Private instructor 3 h (09:00–12:00) for 1–2 people; CHF 330 for 3–4. Lift pass not included.',
        price: 270,
        currency: 'CHF',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.essverbier.ch/en/',
        contact: 'info@verbiersportplus.ch · +41 27 775 33 63',
        note: 'Verified: 3 h morning private CHF 270 (1–2 pax); 2 h afternoon private from CHF 200.',
      },
      {
        id: 'altitude-group',
        name: 'Altitude Ski & Snowboard School group week',
        tier: 'Mid',
        description:
          'Independent English-run school; adult group course by the week, small groups.',
        price: 400,
        currency: 'CHF',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.altitudeskischool.com/verbier/',
        note: 'Estimated CHF 350–450/week; private half-day ~CHF 350–420.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week (Alpine changeover). Hold Geneva flights early — there is no year-round nonstop to GVA, so most itineraries are 1-stop; February school-holiday weeks are the dearest. Request the hotel allotment: standard Swiss group terms are a deposit on confirmation and the balance ~30 days before arrival. Negotiate the allotment release date (typically 60–90 days pre-arrival).',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Buy 6-day 4 Vallées passes online at verbier4vallees.ch (Téléverbier); email offres@televerbier.ch for group manifests. Book the shared shuttle (Alpybus / AlpineXpress) or reserve an Alpybus private van matched to flight times. Public-transport groups: hold SBB tickets Geneva → Le Châble + the Verbier gondola.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes (Ski Service / Mountain Air). Issue insurance (US policy per traveler; optional Rega patronage at CHF 40/adult/year — note it is goodwill, not insurance). Pay the hotel balance. Send suppliers flight numbers for transfer pickup; confirm ESS course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat morning GVA arrival → shuttle or van up (~2 h) → check-in, collect passes, rental fitting → ski Sun–Fri (ESS courses start Sunday/Monday) → Sat morning transfer down, afternoon flight home. Keep ≥4 h between GVA landing and any shared-shuttle cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Swiss VAT in these prices: accommodation at the special 3.8% lodging rate; lift passes, transfers, rental and most services at the 8.1% standard rate; ski tuition and insurance are exempt; international flights are zero-rated. A local visitor/guest tax is charged per person per night on top of room rates — confirm the season grid with Verbier Tourisme. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const VERBIER_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 40, base: 11, top: 63 },
  { month: 'Dec', snowfall: 70, base: 54, top: 118 },
  { month: 'Jan', snowfall: 90, base: 90, top: 141 },
  { month: 'Feb', snowfall: 85, base: 111, top: 192 },
  { month: 'Mar', snowfall: 80, base: 146, top: 220 },
  { month: 'Apr', snowfall: 50, base: 115, top: 233 },
];

export const verbier: Resort = {
  id: 'verbier',
  name: 'Verbier',
  country: 'Switzerland',
  flag: '🇨🇭',
  area: '4 Vallées',
  blurb:
    'Sun-terrace chalet town at 1,500 m and the freeride capital of the Alps — gateway to the 410 km 4 Vallées and the 3,330 m Mont-Fort glacier.',
  lat: 46.1,
  lon: 7.217,
  elevationM: 1500,
  currency: 'CHF',
  gatewayAirports: ['GVA'],
  defaultOrigin: 'JFK',
  mapsName: 'Verbier',
  saturdayChangeover: true,
  season: { open: '2026-11-27', close: '2027-04-25', linkOpen: '2026-11-01', linkClose: '2027-04-25' },
  weeks: alpineWeeks,
  snowByMonth: VERBIER_SNOW,
  snowFacts:
    'Village at 1,500 m, skiing to 3,330 m on the Mont-Fort glacier; high north-facing terrain holds snow well into spring. One of the more snow-sure Swiss resorts, ~410 km marketed across the 4 Vallées.',
  components,
  logistics,
};

export default verbier;
