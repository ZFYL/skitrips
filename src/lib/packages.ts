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

// US vs Bonvo comparison. Apple-spec style: values stay SHORT — the detail
// lives in the footnote. US figures from published 2025/26-season sources
// (SnowBrains, NSAA, Time Out/Casino.org, Park Record).
export const comparisonRows = [
  { label: 'Lift pass, 6 days', us: '$1,100 – $2,100', europe: '≈ $450' },
  { label: 'Hotel, 7 nights', us: '$1,900 – $3,200', europe: 'Included' },
  { label: 'Dinner every night', us: '$100+ / day', europe: 'Included' },
  { label: 'Airport transfer', us: 'Rental car', europe: 'Included' },
  { label: 'Ski & rescue insurance', us: 'Extra', europe: 'Included' },
  {
    label: 'The week, all-in',
    us: '$5,500 – $9,400',
    europe: `From $${flagship.priceFrom.toLocaleString()}`,
  },
];

export const comparisonFootnote =
  'Per person, 6 ski days. US column: peak-season window rates and published trip-cost estimates for Vail/Park City-class resorts, flights included. Bonvo column: Val Thorens Classic package — transatlantic flights, half-board hotel, transfers, 6-day Les 3 Vallées pass, and insurance included; January & March departures, double occupancy. Every trip is quoted individually.';
