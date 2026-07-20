// Sölden, Austria (Ötztal, Tyrol) — glacier-backed resort with two 3,000 m peaks
// and the Ski World Cup opener. Shaped like val-thorens.ts (see resorts/types.ts
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
    defaultOptionId: 'flight-inn',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-inn',
        name: 'JFK → Innsbruck (INN), 1-stop',
        tier: 'Mid',
        description:
          'Austrian/Lufthansa via FRA, ZRH or VIE into Innsbruck — the nearest gateway, ~1 h drive (85 km) up the Ötztal. Shortest transfer of the three.',
        price: 1000,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-innsbruck.html',
        note: 'Winter band ~$780–$1,150 round trip; always connects (no JFK nonstop to INN). International air is VAT-exempt.',
      },
      {
        id: 'flight-muc',
        name: 'JFK → Munich (MUC), Lufthansa nonstop',
        tier: 'Budget',
        description:
          'Lufthansa/United nonstop JFK → MUC, then ~2h30 drive (250 km) via the Fernpass. Often the best fares.',
        price: 780,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-munich.html',
        note: 'Winter band ~$620–$900 round trip.',
      },
      {
        id: 'flight-zrh',
        name: 'JFK → Zurich (ZRH), SWISS nonstop',
        tier: 'Mid',
        description:
          'SWISS/United nonstop JFK → ZRH (~8 h), then ~3 h drive (270 km) via the Arlberg. Slick single-connection option.',
        price: 850,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-zurich.html',
        note: 'Winter band ~$650–$950 round trip.',
      },
      {
        id: 'flight-eu',
        name: 'Intra-EU flight → Innsbruck / Munich',
        tier: 'From Europe',
        description:
          'Short-haul round trip to INN or MUC for group members already in Europe (LHR/AMS/BER class of routes).',
        price: 160,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20INN',
        note: 'Typical €90–260 round trip booked ahead. Quoted fares are final.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-regina',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-gruenerhof',
        lat: 46.9655,
        lon: 11.0072,
        name: 'Gasthof Grünerhof',
        tier: 'Budget',
        description:
          'Traditional family-run village guesthouse in central Sölden — simple, good-value rooms with a hearty breakfast, a short walk from the Giggijochbahn.',
        price: 85,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.gruenerhof-soelden.at/',
        contact: 'reservierung@gruenerhof-soelden.at · +43 5254 2477',
        imageUrl: 'https://www.gruenerhof-soelden.at/wp-content/uploads/2021/11/Gruenerhof-Soelden-0017.jpg',
        note: 'Estimate ~€85 pp/night B&B; peak weeks higher.',
      },
      {
        id: 'hotel-regina',
        lat: 46.9668,
        lon: 11.0080,
        name: 'Hotel Regina ★★★★',
        tier: 'Mid',
        description:
          'Central 4★ with spa and indoor pool close to both valley gondolas — a reliable mid-tier base in the heart of Sölden.',
        price: 130,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.regina-soelden.at/',
        contact: 'office@regina-soelden.at · +43 5254 2301',
        note: 'Estimate ~€130 pp/night half board mid-winter; dynamic pricing — check engine.',
      },
      {
        id: 'hotel-liebesonne',
        lat: 46.9628,
        lon: 11.0075,
        name: 'Hotel Liebe Sonne ★★★★S',
        tier: 'Premium',
        description:
          '4★ superior just 50 m from the Gaislachkoglbahn — big spa, rooftop pool and ski-in convenience to the 3,000 m peaks.',
        price: 190,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.liebesonne.at/en/',
        contact: 'hotel@liebesonne.at · +43 5254 2203',
        imageUrl: 'https://www.liebesonne.at/fileadmin/_processed_/5/4/csm_liebesonne-hotel-sommer-0900_84c50c815d.jpg',
        note: 'Estimate ~€190 pp/night half board; peak weeks higher.',
      },
      {
        id: 'hotel-crystal',
        lat: 46.9678,
        lon: 11.0052,
        name: 'The Crystal – VAYA ★★★★S',
        tier: 'Premium',
        description:
          '4★ superior design-and-spa hotel with a 3,000 m² wellness world by the Giggijochbahn — contemporary alpine luxury in the resort centre.',
        price: 200,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.thecrystal.at/en/',
        contact: 'welcome@vayaresorts.com · via thecrystal.at',
        imageUrl: 'https://www.vayaresorts.com/wp-content/uploads/2023/10/the-crystal-vaya-unique-sommer-2.jpg',
        note: 'Estimate ~€200 pp/night half board; peak weeks higher.',
      },
      {
        id: 'hotel-bergland',
        lat: 46.9650,
        lon: 11.0090,
        name: 'Design & Spa Hotel Bergland ★★★★★',
        tier: 'Luxury',
        description:
          '5★ design hotel in the village centre with a rooftop infinity pool, extensive spa and gourmet cuisine — a modern-alpine flagship.',
        price: 255,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.bergland-soelden.at/en',
        contact: 'info@bergland-soelden.at · +43 5254 2240',
        imageUrl: 'https://www.bergland-soelden.at/bilder/designhotel/aussenansicht-hotel/sommer/1065/image-thumb__1065__seoOgImage/bergland-aussenpool-6103.108e8d1a.jpg',
        note: 'Estimate ~€255 pp/night half board; suites higher.',
      },
      {
        id: 'hotel-central',
        lat: 46.9686,
        lon: 11.0056,
        name: 'Das Central – Alpine. Luxury. Life ★★★★★',
        tier: 'Luxury',
        description:
          '5★ superior with the 1,000 m² VenusSPA and a celebrated wine cellar — the definitive luxury address in Sölden.',
        price: 360,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.central-soelden.com/en/',
        contact: 'info@central-soelden.com · +43 5254 22600',
        imageUrl: 'https://www.central-soelden.com/mediatypes/seo/presidential_suite_hotel_das_central_by_rudi_wyhlidal_1.jpg',
        note: 'Estimate ~€360 pp/night half board; suites materially higher.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer INN/MUC/ZRH ⇄ Sölden',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-fourseasons',
    unitHint: 'INN 85 km ~1h; MUC/ZRH ~2h30–3h',
    options: [
      {
        id: 'transfer-fourseasons',
        name: 'Four Seasons Travel shared shuttle',
        tier: 'Budget',
        description:
          'The big Tyrol airport-shuttle operator: shared "Economy Class" seats INN → Sölden, matched to flight times. The value door-to-door option.',
        price: 108,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.tirol-taxi.at/en-innsbruck-airport',
        contact: 'office@tirol-taxi.at · +43 512 58 41 57',
        note: 'Estimate ~€54 pp each way from INN (dynamic quote engine). Return figure shown.',
      },
      {
        id: 'transfer-train',
        name: 'Train to Ötztal Bahnhof + Postbus 4194',
        tier: 'Budget',
        description:
          'ÖBB train to Ötztal Bahnhof on the main line, then VVT/Postbus line 4194 (Ötztaler) up the valley to Sölden (~1 h). Runs every day — the flexible public route.',
        price: 55,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.soelden.com/en/plan-your-holiday/arrival',
        contact: 'ÖBB oebb.at · VVT +43 512 56 16 16 · booking.oetztaler.at',
        note: 'Return estimate: Innsbruck–Ötztal Bahnhof ~€12–18 each way + Postbus 4194 ~€12–15 each way.',
      },
      {
        id: 'transfer-private',
        name: 'Private van (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private van from INN, MUC or ZRH — Four Seasons "Private Class" or AlpinBus, any arrival time. Best for a group landing together.',
        price: 450,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.10,
        url: 'https://www.alpinbus.com/transfers-in-austria/innsbruck-airport-to-solden/',
        contact: 'Four Seasons +43 512 58 41 57 · AlpinBus via site',
        note: 'From ~€260/van one-way INN → Sölden → ~€450–470 return planning figure. Longer MUC/ZRH legs more.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days Sölden',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-adult',
    unitHint: '144 km pistes, two glaciers, one pass',
    options: [
      {
        id: 'pass-adult',
        name: '6-day adult Sölden pass (main season)',
        description:
          'Full Sölden pass: 144 km of piste across the Giggijoch, Gaislachkogl and the Rettenbach/Tiefenbach glaciers, plus the BIG3 3,000 m viewpoints.',
        price: 469,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.13,
        url: 'https://www.soelden.com/en/activities/winter/skiing-snowboarding/skipasses-prices/winter',
        contact: 'soelden@oetztal.com · +43 57200 200',
        note: '2026/27 published main-season €469 (pre-season €450, peak €478.50). Cheaper online up to 5 days ahead. Austrian lift VAT 13%.',
      },
      {
        id: 'pass-oetztal',
        name: '6-day adult Ötztal Super Skipass',
        description:
          'Whole-valley pass: Sölden, Obergurgl-Hochgurgl, Gurgl, Vent, Niederthai and Hochoetz-Kühtai on one card — plus 007 ELEMENTS entry from 6 days.',
        price: 469,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.13,
        url: 'https://www.soelden.com/en/activities/winter/skiing-snowboarding/skipasses-prices/winter',
        contact: 'soelden@oetztal.com · +43 57200 200',
        note: '2026/27 published main-season €469; same tiers as the Sölden pass across all Ötztal areas.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-glanzer',
    unitHint: 'Skis + boots + helmet',
    options: [
      {
        id: 'rental-glanzer',
        name: 'INTERSPORT Glanzer premium pack',
        tier: 'Mid',
        description:
          'Premium ski + boots from the biggest rental network in Sölden (9 shops), with free daily service, mountain ski storage and −15% online early-bird.',
        price: 229,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.glanzer.at/en/intersport-rent/ski-snowboard-rental-soelden',
        contact: 'info@glanzer.at · +43 5254 2223201',
        note: 'Verified 6/7-day: Premium €229 (Economy €179, Superior €309). Rental carries 20% Austrian VAT.',
      },
      {
        id: 'rental-riml',
        name: 'SPORT 2000 Riml mid pack',
        tier: 'Budget',
        description:
          'Mid-range ski + boots from the Riml Sporthaus (SPORT 2000), bookable online in advance at a discount.',
        price: 175,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.rimlshop-soelden.at/en',
        contact: 'info@riml.com · +43 5254 501130',
        note: 'Estimate ~€150–200/6-day mid ski+boots; engine-priced.',
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
    options: [...US_INSURANCE],
  },
  {
    id: 'skischool',
    label: 'Ski school (optional)',
    icon: '🎓',
    defaultEnabled: false,
    defaultOptionId: 'school-soelden-group',
    unitHint: 'English-speaking instructors',
    options: [
      {
        id: 'school-soelden-group',
        name: 'Skischule Sölden-Hochsölden — adult group, 6 mornings',
        description:
          'The main village school: 6 consecutive mornings in a graded adult group (max 8), English-speaking instructors.',
        price: 210,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.skischule-soelden.com/en/',
        contact: 'Gemeindestrasse 1, 6450 Sölden · via skischule-soelden.com',
        note: 'Estimate ~€185–220/6 half-day mornings. Tuition is VAT-exempt.',
      },
      {
        id: 'school-vacancia-group',
        name: 'Skischule Vacancia — adult group, 6 days',
        tier: 'Mid',
        description:
          'Independent English-speaking school with small groups — morning and afternoon sessions (09:30–11:30 & 12:30–14:30).',
        price: 230,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.vacancia.at/en/',
        contact: 'info@vacancia.at · +43 5254 3100',
        note: 'Estimate ~€200–240/6 days (group "from €110"/day).',
      },
      {
        id: 'school-soelden-private',
        name: 'Skischule Sölden-Hochsölden — private instructor, half day',
        tier: 'Premium',
        description:
          'Private instructor for your group per half-day engagement; lift pass not included. The fast track for mixed-ability groups.',
        price: 280,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://www.skischule-soelden.com/en/',
        contact: 'via skischule-soelden.com',
        note: 'Estimate ~€260–300/half day; ~€75/hour.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week: Sölden hotels and ski-school courses run on Saturday changeover. The glacier and the Ski World Cup opener (late October on the Rettenbach) mean early-autumn skiing is possible, but group weeks sit in the Nov–Apr window. Hold flights early — INN is nearest (~1 h), MUC/ZRH the value gateways. Request the hotel allotment: standard Austrian group terms are a ~30% deposit on confirmation and the balance ~30 days before arrival.',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Order Sölden or Ötztal Super Skipass manifests via Ötztal Tourismus (soelden@oetztal.com, +43 57200 200); 2026/27 6-day main-season €469, cheaper online up to 5 days ahead (webshop reopens ~August). Reserve Four Seasons shuttle seats or a private van from INN matched to flight times, or brief the group on the Ötztal Bahnhof train + Postbus 4194 public route.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes (INTERSPORT Glanzer / SPORT 2000 Riml take online pre-bookings at a discount). Issue insurance (US policy per traveler). Pay the hotel balance. Send suppliers flight numbers or train times for pickup; confirm ski-school course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat arrival at INN/MUC/ZRH → shuttle, van or train up the Ötztal (~1h–3h) → check-in, collect passes and rental → ski Sun–Fri (Giggijoch, Gaislachkogl, the two glaciers and the BIG3 3,000 m viewpoints) → Sat morning transfer out, afternoon flight home. Keep ≥4 h between landing and the transfer cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Sölden’s two glaciers make it one of the most snow-sure resorts in the Alps. Austrian VAT in these prices: hotels/half-board 10%, transfers 10%, lift passes 13%, equipment rental 20%; ski-school tuition and insurance exempt; international flights zero-rated. A local tourist tax (Ortstaxe) is added per adult per night on top of room rates. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const SOLDEN_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 40, base: 40, top: 150 },
  { month: 'Dec', snowfall: 55, base: 55, top: 180 },
  { month: 'Jan', snowfall: 50, base: 65, top: 200 },
  { month: 'Feb', snowfall: 55, base: 75, top: 220 },
  { month: 'Mar', snowfall: 60, base: 80, top: 240 },
  { month: 'Apr', snowfall: 45, base: 60, top: 210 },
];

export const solden: Resort = {
  id: 'solden',
  name: 'Sölden',
  country: 'Austria',
  flag: '\u{1F1E6}\u{1F1F9}',
  area: 'Ötztal',
  blurb:
    'Glacier-backed Ötztal powerhouse with three 3,000 m peaks, the Ski World Cup opener and a big après scene — snow-sure from autumn to spring.',
  lat: 46.9663,
  lon: 11.0075,
  elevationM: 1368,
  currency: 'EUR',
  gatewayAirports: ['INN', 'MUC', 'ZRH'],
  defaultOrigin: 'JFK',
  mapsName: 'Sölden',
  saturdayChangeover: true,
  season: { open: '2026-09-19', close: '2027-05-02', linkOpen: '2026-11-12', linkClose: '2027-04-18' },
  weeks: alpineWeeks,
  snowByMonth: SOLDEN_SNOW,
  snowFacts:
    'Among the most snow-sure resorts in the Alps: the Rettenbach and Tiefenbach glaciers open in autumn (Ski World Cup opener late October) and top out near 3,250 m, with the Gaislachkogl at 3,058 m. The full winter area runs mid-November to spring.',
  components,
  logistics,
};

export default solden;
