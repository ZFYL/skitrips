// Shared data contract for the exported PDF (print view) sections.
// PrintOffer composes: header → personal note → PrintItinerary →
// PrintBreakdown → PrintExtras → price/payment box → internal sheet.

export interface PrintLine {
  componentId: string;
  componentLabel: string;
  icon: string;
  label: string;        // option / group label, e.g. "Ben's Bus shared coach × 5"
  detail: string;
  totalUSD: number;
  url?: string;
  description?: string;
}

export interface PrintServiceGroup {
  label: string;          // option name, or "Own arrangement"
  memberNames: string[];  // traveler names sharing it (all travelers when not split)
  url?: string;
  contact?: string;
}

export interface PrintComponentGroups {
  componentId: string;
  componentLabel: string;
  icon: string;
  groups: PrintServiceGroup[];
}

export interface PrintTravelerCost {
  name: string;
  totalUSD: number;
  picks: string[];        // short labels of their split-service choices
}

export interface PrintPaySchedule {
  departure: string;
  deposit: number;
  depositPP: number;
  balance: number;
  balancePP: number;
  balanceDue: string;
}

export interface OfferPrintData {
  offerRef: string;
  validUntil: string;
  todayStr: string;
  offerTitle: string;
  clientName: string;
  personalNote: string;
  tripStart: string;      // ISO Saturday
  nights: number;
  skiDays: number;
  people: number;
  travelerNames: string[];
  seasonNote?: string;    // band/flags context for the chosen week
  lines: PrintLine[];
  componentGroups: PrintComponentGroups[];
  perTraveler: PrintTravelerCost[];
  anySplit: boolean;
  pay: PrintPaySchedule | null;
  perPersonFinal: number;
  offeredTotal: number;
  // selected core suppliers for the itinerary (undefined if component disabled)
  hotel?: { name: string; url?: string; contact?: string; lat?: number; lon?: number };
  transferGroups: PrintServiceGroup[];
  arrivalGroups: PrintServiceGroup[]; // "Getting there" groups
  skiSchool?: { name: string; url?: string };
  skiPass?: { name: string; url?: string };
  internal?: {
    realTotal: number;
    vatTotal: number;
    buffer: number;
    bufferedTotal: number;
    profitPct: number;
    finalTotal: number;
    profitAbs: number;
    marginOnOffer: number;
  };
}

export function pFmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export function pFmt2(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}
