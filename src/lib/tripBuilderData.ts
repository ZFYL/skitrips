// Shared supplier/catalog types + currency helpers for the trip configurator.
// Per-resort catalogs now live in src/lib/resorts/<id>.ts (see resorts/index.ts).
// `components` / `logistics` are re-exported from Val Thorens for the legacy
// scenario planner (which remains Val-Thorens-scoped).

export type Currency = 'USD' | 'EUR' | 'GBP' | 'CHF' | 'CAD' | 'JPY';

export type Unit =
  | 'per_person'          // once per traveler
  | 'per_person_night'    // per traveler per hotel night
  | 'per_person_day'      // per traveler per ski day
  | 'per_room_night'      // per room per night (capacity = occupancy, default 2)
  | 'per_unit_week'       // per apartment/chalet per week (capacity = sleeps)
  | 'per_vehicle_return'  // per vehicle, round trip (uses capacity)
  | 'per_group';          // flat for the whole group

export interface SupplierOption {
  id: string;
  name: string;
  tier?: string;
  description: string;
  price: number;
  currency: Currency;
  unit: Unit;
  vatRate: number;        // VAT rate already contained in price (0 if n/a)
  url?: string;
  contact?: string;
  imageUrl?: string;
  images?: string[];      // extra gallery images (room photos etc.)
  capacity?: number;      // occupancy/sleeps/vehicle seats depending on unit
  lat?: number;           // map position (hotels)
  lon?: number;
  /** For all-inclusive stays: which components this option already bundles,
      so the builder can warn about double-counting. */
  allInclusive?: Array<'skipass' | 'rental' | 'skischool'>;
  note?: string;
}

export interface TripComponent {
  id: string;
  label: string;
  icon: string;
  defaultEnabled: boolean;
  defaultOptionId: string;
  unitHint: string;
  options: SupplierOption[];
}

export const UNIT_LABEL: Record<Unit, string> = {
  per_person: 'per person',
  per_person_night: 'per person / night',
  per_person_day: 'per person / ski day',
  per_room_night: 'per room / night',
  per_unit_week: 'per apartment / week',
  per_vehicle_return: 'per vehicle, return',
  per_group: 'flat, whole group',
};

/* ---------- currency ---------- */

export type FxRates = Record<Currency, number>; // local currency → USD

// Indicative July-2026 rates; the UI lets the operator tweak the resort's local rate.
export const DEFAULT_FX: FxRates = {
  USD: 1,
  EUR: 1.1,
  GBP: 1.27,
  CHF: 1.13,
  CAD: 0.73,
  JPY: 0.0067,
};

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: '$', EUR: '€', GBP: '£', CHF: 'CHF ', CAD: 'C$', JPY: '¥',
};

export function curSymbol(c: Currency): string {
  return CURRENCY_SYMBOL[c];
}

export function toUsd(amount: number, currency: Currency, fx: FxRates): number {
  return amount * (fx[currency] ?? 1);
}

// Legacy re-exports for the Val-Thorens scenario planner and live reference data.
export { components, logistics } from './resorts/val-thorens';
