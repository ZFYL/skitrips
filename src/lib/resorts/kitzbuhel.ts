// Kitzbühel, Austria — the medieval "Gamsstadt" and home of the Hahnenkamm,
// on the KitzSki area. Shaped like val-thorens.ts (see resorts/types.ts for the
// schema; resorts/shared.ts for reusable options like US_INSURANCE).

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
    defaultOptionId: 'flight-muc',
    unitHint: 'Round trip per traveler — mixable per person',
    options: [
      {
        id: 'flight-muc',
        name: 'JFK → Munich (MUC), Lufthansa nonstop',
        tier: 'Budget',
        description:
          'Lufthansa/United nonstop JFK → MUC, then ~1h30 drive (150 km) over the German border. Best connectivity and usually the best fares.',
        price: 820,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-munich.html',
        note: 'Winter band ~$700–$950 round trip. International air is VAT-exempt.',
      },
      {
        id: 'flight-szg',
        name: 'JFK → Salzburg (SZG), 1-stop',
        tier: 'Mid',
        description:
          'Lufthansa/Austrian via FRA, MUC or VIE into Salzburg — the nearest airport, ~1h15 drive (80 km). Winter charters run on Saturdays.',
        price: 900,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-salzburg.html',
        note: 'Winter band ~$800–$1,050 round trip; always connects.',
      },
      {
        id: 'flight-inn',
        name: 'JFK → Innsbruck (INN), 1-stop',
        tier: 'Premium',
        description:
          'Austrian/Lufthansa via FRA or VIE into Innsbruck, ~1h30 drive (95 km). A scenic Tyrol alternative to Munich.',
        price: 1000,
        currency: 'USD',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights/flights-from-new-york-to-innsbruck.html',
        note: 'Winter band ~$850–$1,150 round trip; always connects (no JFK nonstop to INN).',
      },
      {
        id: 'flight-eu',
        name: 'Intra-EU flight → Munich / Salzburg',
        tier: 'From Europe',
        description:
          'Short-haul round trip to MUC or SZG for group members already in Europe (LHR/AMS/BER class of routes).',
        price: 160,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.google.com/travel/flights?q=flights%20to%20MUC',
        note: 'Typical €90–260 round trip booked ahead. Quoted fares are final.',
      },
    ],
  },
  {
    id: 'hotel',
    label: 'Accommodation — 7 nights',
    icon: '🏨',
    defaultEnabled: true,
    defaultOptionId: 'hotel-tiefenbrunner',
    unitHint: 'Half board unless noted',
    options: [
      {
        id: 'hotel-eggerwirt',
        lat: 47.4460,
        lon: 12.3928,
        name: 'Hotel Eggerwirt ★★★S',
        tier: 'Budget',
        description:
          'Historic family-run 3★ superior gasthof a two-minute walk from the pedestrian old town — cosy Tyrolean rooms and a well-regarded kitchen.',
        price: 110,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.eggerwirt-kitzbuehel.at/en/',
        contact: 'info@eggerwirt-kitzbuehel.at · +43 5356 62455',
        note: 'Estimate ~€110 pp/night half board; peak weeks higher.',
      },
      {
        id: 'hotel-tiefenbrunner',
        lat: 47.4463,
        lon: 12.3919,
        name: 'Hotel Tiefenbrunner ★★★★',
        tier: 'Mid',
        description:
          'Central 4★ on the Vorderstadt in the heart of the old town, with a spa and indoor pool — a comfortable mid-tier base steps from the shops and lifts bus.',
        price: 135,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.hoteltiefenbrunner.at/en/',
        contact: 'info@hoteltiefenbrunner.at · +43 5356 66600',
        note: 'Estimate ~€135 pp/night half board mid-winter; dynamic pricing — check engine.',
      },
      {
        id: 'hotel-kitzhof',
        lat: 47.44837727,
        lon: 12.38530935,
        name: 'Hotel Kitzhof Mountain Design Resort ★★★★S',
        tier: 'Premium',
        description:
          '4★ superior design resort above the town with a large panorama spa, near the Hahnenkamm and Kitzbüheler Horn gondolas.',
        price: 220,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.hotel-kitzhof.com/en/',
        contact: 'info@hotel-kitzhof.com · +43 5356 632110',
        imageUrl: 'https://www.hotel-kitzhof.com/media/facebook/elegantes_hotel_alpen.jpg',
        note: 'Estimate ~€220 pp/night half board; peak weeks higher.',
      },
      {
        id: 'hotel-tennerhof',
        lat: 47.45412,
        lon: 12.396761,
        name: 'Tennerhof Gourmet & Spa de Charme ★★★★★',
        tier: 'Luxury',
        description:
          '5★ Relais & Châteaux country-house hotel above Kitzbühel — antique-panelled rooms, a Michelin-starred restaurant and a large garden spa.',
        price: 380,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.tennerhof.com/en/',
        contact: 'office@tennerhof.com · +43 5356 63181',
        imageUrl: 'https://www.tennerhof.com/xstorage/1/_cache/Hotel-Tennerhof-Kitzbuehel-Sommer_7348_1_057a8336dda1e34d64f2737b7deb7eb3.jpg',
        note: 'Estimate ~€380 pp/night half board; suites materially higher.',
      },
      {
        id: 'hotel-schlosshotel',
        lat: 47.44362674,
        lon: 12.40388692,
        name: 'Schlosshotel Kitzbühel ★★★★★',
        tier: 'Luxury',
        description:
          '5★ resort at the Eichenheim golf estate on the edge of town — panoramic spa, fine dining and expansive grounds (formerly A-ROSA Kitzbühel).',
        price: 350,
        currency: 'EUR',
        unit: 'per_person_night',
        vatRate: 0.10,
        url: 'https://www.schlosshotel-kitzbuehel.com/en',
        contact: 'info@schlosshotel-kitzbuehel.com · +43 5356 656600',
        imageUrl: 'https://www.schlosshotel-kitzbuehel.com/fileadmin/files/Bilder/Hotel_Au%C3%9Fen/Sommer/ARO_KIZ_egr_Haus_41_bearb.jpg',
        note: 'Estimate ~€350 pp/night half board; suites higher.',
      },
    ],
  },
  {
    id: 'transfer',
    label: 'Airport transfer MUC/SZG/INN ⇄ Kitzbühel',
    icon: '🚐',
    defaultEnabled: true,
    defaultOptionId: 'transfer-fourseasons',
    unitHint: 'SZG ~1h15; INN/MUC ~1h30',
    options: [
      {
        id: 'transfer-train',
        name: 'ÖBB train to Kitzbühel station',
        tier: 'Budget',
        description:
          'Kitzbühel has its own ÖBB station on the Innsbruck–Wörgl–Salzburg line — a short walk or hotel-shuttle from the centre. Runs every day; the flexible budget route.',
        price: 60,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.oebb.at/en',
        contact: 'tickets.oebb.at · ÖBB customer service +43 5 1717',
        note: 'Return estimate: Innsbruck–Kitzbühel ~€26 each way (Sparschiene from ~€13); Salzburg–Kitzbühel ~€32 each way via Wörgl.',
      },
      {
        id: 'transfer-fourseasons',
        name: 'Four Seasons Travel shared shuttle',
        tier: 'Mid',
        description:
          'The big Tyrol airport-shuttle operator: shared "Economy Class" seats from INN, MUC or SZG to Kitzbühel, matched to flight times.',
        price: 130,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.10,
        url: 'https://www.tirol-taxi.at/en-kitzski',
        contact: 'office@airport-transfer.com · +43 512 58 41 57',
        note: 'Estimate ~€55–70 pp each way from INN (dynamic quote engine). Return figure shown.',
      },
      {
        id: 'transfer-private',
        name: 'Four Seasons private van (1–8 pax)',
        tier: 'Premium',
        description:
          'Door-to-door private "Private Class" van from INN, SZG or MUC, any arrival time. Best for a group landing together.',
        price: 400,
        currency: 'EUR',
        unit: 'per_vehicle_return',
        capacity: 8,
        vatRate: 0.10,
        url: 'https://www.tirol-taxi.at/en-kitzski',
        contact: 'office@airport-transfer.com · +43 512 58 41 57',
        note: 'Estimate ~€350–420/van return from INN; ~€450–520 from MUC.',
      },
    ],
  },
  {
    id: 'skipass',
    label: 'Ski pass — 6 days KitzSki',
    icon: '🎿',
    defaultEnabled: true,
    defaultOptionId: 'pass-adult',
    unitHint: '188 km pistes, 57 lifts, one pass',
    options: [
      {
        id: 'pass-adult',
        name: '6-day adult KitzSki pass (main season)',
        description:
          'Full KitzSki pass: Kitzbühel, Kirchberg, Jochberg and the Pass Thurn / Resterhöhe sector — 188 km of piste including the Hahnenkamm.',
        price: 405,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.13,
        url: 'https://www.kitzski.at/en/tickets-vouchers/ski-ticket.html',
        contact: 'info@kitzski.at · +43 5356 6951',
        note: '2025/26 verified Premium tariff €405 (26/27 ~+4%). Austrian lift VAT 13%.',
      },
      {
        id: 'pass-saver',
        name: '6-day adult — Super Saver / early-late season',
        description:
          'Same full KitzSki pass at the discounted Super Saver tariff for the season-opening and late-spring weeks.',
        price: 370.5,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.13,
        url: 'https://www.kitzski.at/en/tickets-vouchers/ski-ticket.html',
        contact: 'info@kitzski.at · +43 5356 6951',
        note: '2025/26 verified Super Saver €370.50; Saver (early Dec / mid-March) €336.',
      },
    ],
  },
  {
    id: 'rental',
    label: 'Ski / snowboard rental — 6 days',
    icon: '🏂',
    defaultEnabled: false,
    defaultOptionId: 'rental-kitzsport',
    unitHint: 'Skis + boots + helmet',
    options: [
      {
        id: 'rental-kitzsport',
        name: 'INTERSPORT Kitzsport premium pack',
        tier: 'Mid',
        description:
          'Premium ski + boots fitted in town, free daily ski service, 7-days-for-6 promo and free daily ski storage on the mountain. Kids to age 10 free with a renting parent.',
        price: 292,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.kitzsport.at/en/ski-rental/',
        contact: 'office@kitzsport.at · +43 5356 62504',
        note: 'Verified: premium skis+boots ≈ €292/6–7 days. Rental carries 20% Austrian VAT.',
      },
      {
        id: 'rental-snowberg',
        name: 'SPORT 2000 / Snowberg mid pack',
        tier: 'Budget',
        description:
          'Mid-range ski + boots package from the SPORT 2000 network, bookable online in advance at a discount.',
        price: 270,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0.20,
        url: 'https://www.snowberg.at/',
        contact: 'Via snowberg.at / sport2000rent.com',
        note: 'Estimate ~€250–300/6-day mid ski+boots; engine-priced.',
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
    defaultOptionId: 'school-roteteufel-group',
    unitHint: 'English-speaking instructors',
    options: [
      {
        id: 'school-roteteufel-group',
        name: 'Skischule Rote Teufel — adult group, 6 mornings',
        description:
          'The famous "Red Devils" (est. 1926): 6 consecutive mornings in a graded adult group with English-speaking instructors.',
        price: 350,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://en.rote-teufel.at/',
        contact: 'info@rote-teufel.at · +43 5356 62500',
        note: 'Estimate ~€330–370/6 mornings (1 day €85, 3 days €245 verified). Tuition is VAT-exempt.',
      },
      {
        id: 'school-element3-group',
        name: 'Element3 Ski School — adult group',
        tier: 'Mid',
        description:
          'Modern independent school with small English-speaking groups and freeride options — day and multi-day group courses.',
        price: 340,
        currency: 'EUR',
        unit: 'per_person',
        vatRate: 0,
        url: 'https://www.element3.at/',
        contact: 'Via element3.at',
        note: 'Estimate ~€65–75/day group → ~€340/6 days.',
      },
      {
        id: 'school-roteteufel-private',
        name: 'Skischule Rote Teufel — private instructor, half day',
        tier: 'Premium',
        description:
          'Private instructor for your group per half-day (4 h) engagement; +€30 per extra person, lift pass not included.',
        price: 370,
        currency: 'EUR',
        unit: 'per_group',
        vatRate: 0,
        url: 'https://en.rote-teufel.at/',
        contact: 'info@rote-teufel.at · +43 5356 62500',
        note: 'Verified high-season: €150/hour, half-day (4 h) €370, full day (6 h) €470.',
      },
    ],
  },
];

const logistics = [
  {
    step: 'T-6 to T-4 months — lock the frame',
    detail:
      'Fix a Saturday-to-Saturday week: Kitzbühel hotels and ski-school courses run on Saturday changeover. Avoid the Hahnenkamm race weekend (mid-to-late January) unless that is the draw — the town sells out and rates spike. Hold flights early — MUC is the value gateway (~$700–950 round trip). Request the hotel allotment: standard Austrian group terms are a ~30% deposit on confirmation and the balance ~30 days before arrival.',
  },
  {
    step: 'T-3 months — passes & transfer',
    detail:
      'Order KitzSki pass manifests (info@kitzski.at, +43 5356 6951); note the season tiers — Premium main-season €405, Super Saver €370.50, Saver €336 (2025/26 reference; 26/27 ~+4%). Reserve Four Seasons shuttle seats or a private van matched to flight times, or brief the group on the direct ÖBB trains into Kitzbühel station.',
  },
  {
    step: 'T-1 month — paper & money',
    detail:
      'Collect the final rooming list and rental sizes (INTERSPORT Kitzsport / SPORT 2000 take online pre-bookings at a discount). Issue insurance (US policy per traveler). Pay the hotel balance. Send suppliers flight numbers or train times for pickup; confirm Rote Teufel course groups and languages.',
  },
  {
    step: 'Trip week — run of show',
    detail:
      'Overnight flight Fri → Sat arrival at MUC/SZG/INN → shuttle, van or train into Kitzbühel (~1h15–1h30) → check-in, collect passes and rental → ski Sun–Fri (Hahnenkamm, Kitzbüheler Horn, and the Resterhöhe/Pass Thurn snow-sure sector) → Sat morning transfer out, afternoon flight home. Keep ≥4 h between landing and any transfer cutoff.',
  },
  {
    step: 'Taxes & compliance',
    detail:
      'Kitzbühel’s base is low (~800 m), so the season leans on one of the Alps’ largest snowmaking systems (~90% of pistes) — the higher Resterhöhe/Horn sectors hold snow best early and late. Austrian VAT in these prices: hotels/half-board 10%, transfers 10%, lift passes 13%, equipment rental 20%; ski-school tuition and insurance exempt; international flights zero-rated. A local tourist tax (Ortstaxe) is added per adult per night. Selling packaged trips to US consumers may require Seller of Travel registration (CA/FL/WA/HI).',
  },
];

const KITZBUHEL_SNOW: SnowMonth[] = [
  { month: 'Nov', snowfall: 20, base: 15, top: 40 },
  { month: 'Dec', snowfall: 40, base: 35, top: 85 },
  { month: 'Jan', snowfall: 50, base: 45, top: 115 },
  { month: 'Feb', snowfall: 45, base: 50, top: 135 },
  { month: 'Mar', snowfall: 40, base: 45, top: 130 },
  { month: 'Apr', snowfall: 20, base: 25, top: 90 },
];

export const kitzbuhel: Resort = {
  id: 'kitzbuhel',
  name: 'Kitzbühel',
  country: 'Austria',
  flag: '\u{1F1E6}\u{1F1F9}',
  area: 'KitzSki',
  blurb:
    'The glamorous medieval "Gamsstadt" and home of the Hahnenkamm — 188 km of gentle-to-legendary pistes wrapped around a genuine Tyrolean town.',
  lat: 47.4467,
  lon: 12.3924,
  elevationM: 800,
  currency: 'EUR',
  gatewayAirports: ['SZG', 'INN', 'MUC'],
  defaultOrigin: 'JFK',
  mapsName: 'Kitzbühel',
  saturdayChangeover: true,
  season: { open: '2026-10-24', close: '2027-04-11' },
  weeks: alpineWeeks,
  snowByMonth: KITZBUHEL_SNOW,
  snowFacts:
    'A low base (~800 m) offset by one of the Alps’ biggest snowmaking systems (~1,300 guns, ~90% of pistes). Top lift ~2,000 m (Kitzbüheler Horn / Resterhöhe); the higher sectors hold cover far better than the valley runs.',
  components,
  logistics,
};

export default kitzbuhel;
