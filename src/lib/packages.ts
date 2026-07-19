// Central trip/package data. All numbers are USD per person unless noted.
// Cost build-up and margin math behind every headline price lives in
// docs/margin-analysis.md — update that file whenever these change.

export const flagship = {
  slug: 'val-thorens',
  resort: 'Val Thorens',
  area: 'Les 3 Vallées, France',
  nights: 7,
  skiDays: 6,
  priceFrom: 4490,
  signaturePriceFrom: 6990,
  familyPriceFrom: 13990,
  season: 'January – March 2027',
};

export const landingPrices = {
  retreatFrom: 3790,
  familyFrom: flagship.familyPriceFrom,
  groupFrom: 4190,
};

// US vs Bonvo comparison shown on /trips. US figures from published
// 2025/26-season sources (SnowBrains, NSAA, Time Out/Casino.org, Park Record);
// Bonvo figures are package components at our quoted rates.
export const comparisonRows = [
  {
    label: 'Lift tickets, 6 days',
    us: '$1,100 – $2,100 (window rates $305–$356/day at Vail, Park City, Beaver Creek)',
    europe: '≈ $450 — 6-day Les 3 Vallées pass, 600 km of pistes',
  },
  {
    label: 'Lodging, 7 nights',
    us: '$1,900 – $3,200 per person (peak-season 3–4★, room only)',
    europe: 'Included — half-board hotel, dinner every night',
  },
  {
    label: 'Airport transfer',
    us: 'Rental car + mountain driving + parking fees',
    europe: 'Included — a driver meets you at Geneva arrivals',
  },
  {
    label: 'Ski & medical insurance',
    us: 'Rarely bought, rescue billed separately',
    europe: 'Included — winter-sports policy + on-piste rescue cover',
  },
  {
    label: 'Food on the mountain',
    us: '$100 – $150 per day resort pricing',
    europe: 'Dinner included; mountain-hut lunch from ~$20',
  },
  {
    label: 'All-in week, per person',
    us: '≈ $5,500 – $9,400 (published estimates, flights included)',
    europe: `From $${flagship.priceFrom.toLocaleString()} — transatlantic flights included`,
  },
];

export const comparisonFootnote =
  'US figures: 2025/26-season published window rates and trip-cost studies (SnowBrains, NSAA, Time Out, Park Record). Bonvo figure: from-price for the Val Thorens Classic package, January & March departures, double occupancy. Every trip is quoted individually before you commit.';
