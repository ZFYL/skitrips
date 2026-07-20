// Resort registry. To add a resort: create ./<id>.ts exporting a `Resort`
// (default export), import it here, and add it to the `resorts` array below.
// Nothing else in the app needs to change — the builder, map, weather, season
// strip, live search and PDF all read from the selected resort.

import type { Resort } from './types';

// France
import valThorens from './val-thorens';
import courchevel from './courchevel';
import valDisere from './val-disere';
import chamonix from './chamonix';
// Switzerland
import verbier from './verbier';
import zermatt from './zermatt';
import stMoritz from './st-moritz';
// Austria
import stAnton from './st-anton';
import kitzbuhel from './kitzbuhel';
import ischgl from './ischgl';
import solden from './solden';
// Italy
import cortina from './cortina';
import valGardena from './val-gardena';
// USA
import vail from './vail';
import aspen from './aspen';
import parkCity from './park-city';
import breckenridge from './breckenridge';
import jacksonHole from './jackson-hole';
// Canada
import whistler from './whistler';
// Japan
import niseko from './niseko';

export const resorts: Resort[] = [
  valThorens, courchevel, valDisere, chamonix,
  verbier, zermatt, stMoritz,
  stAnton, kitzbuhel, ischgl, solden,
  cortina, valGardena,
  vail, aspen, parkCity, breckenridge, jacksonHole,
  whistler,
  niseko,
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
