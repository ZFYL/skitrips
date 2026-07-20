// The Resort schema. To add a resort, create src/lib/resorts/<id>.ts exporting
// a `Resort` object shaped like this, then register it in resorts/index.ts.
// See val-thorens.ts as the fully-worked reference example.

import type { Currency, TripComponent } from '../tripBuilderData';
import type { SeasonWeek } from '../seasonData';

export interface SnowMonth {
  month: string;    // 'Nov', 'Dec', ...
  snowfall: number; // average monthly snowfall, cm
  base: number;     // average base depth, cm
  top: number;      // average top/upper-mountain depth, cm
}

export interface ResortSeason {
  open: string;       // ISO date the resort opens, e.g. '2026-11-21'
  close: string;      // ISO date it closes
  linkOpen?: string;  // when a wider linked area opens (optional)
  linkClose?: string;
}

export interface Resort {
  id: string;               // kebab-case, matches filename: 'val-thorens'
  name: string;             // 'Val Thorens'
  country: string;          // 'France'
  flag: string;             // '🇫🇷'
  area: string;             // ski area, e.g. 'Les 3 Vallées'
  blurb: string;            // one-sentence positioning line

  lat: number;              // resort centre (map + weather)
  lon: number;
  elevationM: number;       // base elevation, metres (weather realism)

  currency: Currency;       // local supplier currency
  gatewayAirports: string[]; // IATA codes, nearest first: ['GVA','LYS','CMF']
  defaultOrigin: string;    // suggested traveler origin IATA for live fares
  mapsName: string;         // query string for Google Maps hotel deep-links

  saturdayChangeover: boolean; // Alps = true; many US resorts = false

  season: ResortSeason;
  weeks: SeasonWeek[];      // season price/crowd bands (shared regional table ok)
  snowByMonth: SnowMonth[]; // researched monthly averages
  snowFacts: string;        // one-line altitude/reliability summary

  components: TripComponent[]; // the resort's supplier catalog
  logistics: { step: string; detail: string }[]; // booking playbook (~4-5 steps)
}
