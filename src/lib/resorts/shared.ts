// Cross-resort supplier options a resort file can spread into its catalog,
// so common items aren't re-typed 20 times. Country-specific rescue insurance
// (Carré Neige in France, etc.) is added per resort alongside these.

import type { SupplierOption } from '../tripBuilderData';

// US-resident travel insurance — works for any destination resort.
export const US_INSURANCE: SupplierOption[] = [
  {
    id: 'ins-us-policy',
    name: 'World Nomads Standard (US resident)',
    tier: 'Budget',
    description:
      '10-day policy with skiing included on all plans: emergency medical, evacuation, trip protection.',
    price: 85,
    currency: 'USD',
    unit: 'per_person',
    vatRate: 0,
    url: 'https://www.worldnomads.com/usa/travel-insurance-for-skiing-and-snowboarding',
    note: 'Verified band ~$50–100 for 10 days (age- and trip-cost-dependent).',
  },
  {
    id: 'ins-travelex',
    name: 'Travelex Ultimate',
    tier: 'Premium',
    description:
      'Comprehensive single-trip plan: up to $50k cancellation, $250k primary emergency medical, $2k baggage/delay.',
    price: 150,
    currency: 'USD',
    unit: 'per_person',
    vatRate: 0,
    url: 'https://www.travelexinsurance.com/travel-insurance/plans/ultimate',
    note: 'Starts ~$46; typically ~5–8% of insured trip cost by age.',
  },
  {
    id: 'ins-img',
    name: 'IMG iTravelInsured Travel SE',
    tier: 'Mid',
    description:
      'Mid-tier comprehensive plan with cancellation/interruption, missed connection and travel delay benefits.',
    price: 130,
    currency: 'USD',
    unit: 'per_person',
    vatRate: 0,
    url: 'https://www.imglobal.com/travel-insurance/itravelinsured-travel-se',
    note: 'Alt: Allianz OneTrip Prime from ~$98.',
  },
];
