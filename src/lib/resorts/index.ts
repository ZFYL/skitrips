// Resort registry. To add a resort: create ./<id>.ts exporting a `Resort`,
// import it here, and add it to the `resorts` array below. Nothing else in the
// app needs to change — the builder, map, weather, season strip, live search
// and PDF all read from the selected resort.

import type { Resort } from './types';
import { valThorens } from './val-thorens';

export const resorts: Resort[] = [
  valThorens,
  // Additional resorts are appended here as their files land.
];

export const DEFAULT_RESORT_ID = 'val-thorens';

export function getResort(id: string): Resort {
  return resorts.find((r) => r.id === id) ?? resorts[0];
}

// Lightweight list for the picker (id, name, country, flag, area).
export interface ResortSummary {
  id: string;
  name: string;
  country: string;
  flag: string;
  area: string;
}

export const resortSummaries: ResortSummary[] = resorts.map((r) => ({
  id: r.id,
  name: r.name,
  country: r.country,
  flag: r.flag,
  area: r.area,
}));
