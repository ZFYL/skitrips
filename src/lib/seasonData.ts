// Season price/crowd band tables, keyed to school-holiday calendars.
// Alpine resorts share the European calendar (French zones A/B/C, UK half-term);
// North-American resorts share the US calendar; Japan its own. A resort file
// points `weeks` at the matching table (see resorts/types.ts). Researched Jul 2026:
// education.gouv.fr, UK council term dates, US federal/school break norms.

export type Band = 'low' | 'mid' | 'high' | 'peak';

export interface SeasonWeek {
  start: string; // Saturday, YYYY-MM-DD
  band: Band;
  flags: string[];
  note?: string;
}

export const BAND_LABEL: Record<Band, string> = {
  low: 'Low — best value',
  mid: 'Mid',
  high: 'High — holiday shoulder',
  peak: 'Peak — school holidays',
};

// European Alps 2026/27 — French zone A/B/C + UK half-term + Easter.
export const alpineWeeks: SeasonWeek[] = [
  { start: '2026-11-21', band: 'low', flags: [], note: 'Season opens — top-resort snow, discounted passes' },
  { start: '2026-11-28', band: 'low', flags: [], note: 'Early season' },
  { start: '2026-12-05', band: 'low', flags: [], note: 'Linked areas open; statistically among the snowiest weeks' },
  { start: '2026-12-12', band: 'low', flags: [], note: 'Last quiet pre-holiday week' },
  { start: '2026-12-19', band: 'peak', flags: ['Xmas', 'FR hols'], note: 'French Noël + Christmas week' },
  { start: '2026-12-26', band: 'peak', flags: ['NY', 'FR hols'], note: 'New Year week' },
  { start: '2027-01-02', band: 'low', flags: [], note: 'Post-NY — historically the cheapest week of the season' },
  { start: '2027-01-09', band: 'low', flags: [], note: 'January empty weeks — snowfall peak month' },
  { start: '2027-01-16', band: 'low', flags: [], note: 'January empty weeks' },
  { start: '2027-01-23', band: 'low', flags: [], note: 'January empty weeks' },
  { start: '2027-01-30', band: 'low', flags: [], note: 'Last quiet week before French holidays' },
  { start: '2027-02-06', band: 'high', flags: ['FR-C'], note: 'Paris zone holidays start' },
  { start: '2027-02-13', band: 'peak', flags: ['FR-A', 'FR-C', 'UK half-term'], note: 'Maximum crowd overlap' },
  { start: '2027-02-20', band: 'peak', flags: ['FR-A', 'FR-B'], note: 'French peak continues' },
  { start: '2027-02-27', band: 'high', flags: ['FR-B'], note: 'Zone B full week' },
  { start: '2027-03-06', band: 'mid', flags: ['FR-B tail'], note: 'Holidays wind down' },
  { start: '2027-03-13', band: 'low', flags: [], note: 'Deepest average base of the season' },
  { start: '2027-03-20', band: 'low', flags: [], note: 'Week before Easter — often the cheapest of winter' },
  { start: '2027-03-27', band: 'high', flags: ['Easter', 'UK Easter'], note: 'Early Easter (Sun 28 Mar)' },
  { start: '2027-04-03', band: 'high', flags: ['FR-C spring', 'UK Easter'], note: 'French spring holidays begin' },
  { start: '2027-04-10', band: 'mid', flags: ['FR spring'], note: 'April pass discounts begin' },
  { start: '2027-04-17', band: 'low', flags: ['FR spring'], note: 'Linked areas begin to close' },
  { start: '2027-04-24', band: 'low', flags: ['FR spring'], note: 'Final weeks — spring skiing' },
];

// North America 2026/27 — Thanksgiving, Christmas/NY, MLK, Presidents' week, Spring Break.
export const usWeeks: SeasonWeek[] = [
  { start: '2026-11-21', band: 'low', flags: [], note: 'Opening — early-season terrain' },
  { start: '2026-11-28', band: 'high', flags: ['Thanksgiving'], note: 'US Thanksgiving week' },
  { start: '2026-12-05', band: 'low', flags: [], note: 'Quiet pre-holiday weeks' },
  { start: '2026-12-12', band: 'low', flags: [], note: 'Last quiet week before the holidays' },
  { start: '2026-12-19', band: 'peak', flags: ['Xmas'], note: 'Christmas week — highest rates of the year' },
  { start: '2026-12-26', band: 'peak', flags: ['NY'], note: 'New Year week' },
  { start: '2027-01-02', band: 'mid', flags: [], note: 'Post-holiday wind-down' },
  { start: '2027-01-09', band: 'low', flags: [], note: 'January value weeks' },
  { start: '2027-01-16', band: 'high', flags: ['MLK'], note: 'MLK long weekend' },
  { start: '2027-01-23', band: 'low', flags: [], note: 'Quiet late-January' },
  { start: '2027-01-30', band: 'low', flags: [], note: 'Quiet late-January' },
  { start: '2027-02-06', band: 'mid', flags: [], note: 'Building toward Presidents week' },
  { start: '2027-02-13', band: 'peak', flags: ["Presidents' week"], note: "Presidents' Day week — US peak" },
  { start: '2027-02-20', band: 'high', flags: [], note: 'Half-terms tailing off' },
  { start: '2027-02-27', band: 'mid', flags: [], note: 'Late February' },
  { start: '2027-03-06', band: 'high', flags: ['Spring break'], note: 'Spring break weeks begin' },
  { start: '2027-03-13', band: 'high', flags: ['Spring break'], note: 'Peak spring-break demand' },
  { start: '2027-03-20', band: 'mid', flags: ['Spring break'], note: 'Spring break tails off' },
  { start: '2027-03-27', band: 'mid', flags: ['Easter'], note: 'Easter weekend' },
  { start: '2027-04-03', band: 'low', flags: [], note: 'Spring skiing, best value' },
  { start: '2027-04-10', band: 'low', flags: [], note: 'Late season — sunshine & deals' },
  { start: '2027-04-17', band: 'low', flags: [], note: 'Closing weeks (resort-dependent)' },
];

// Japan 2026/27 — powder peaks January, NY and Chinese New Year busy.
export const japanWeeks: SeasonWeek[] = [
  { start: '2026-12-05', band: 'low', flags: [], note: 'Early season building' },
  { start: '2026-12-12', band: 'low', flags: [], note: 'Base building' },
  { start: '2026-12-19', band: 'high', flags: ['Xmas'], note: 'Christmas week' },
  { start: '2026-12-26', band: 'peak', flags: ['NY'], note: 'Japanese New Year — busiest week' },
  { start: '2027-01-02', band: 'high', flags: ['NY'], note: 'New Year holiday tail' },
  { start: '2027-01-09', band: 'peak', flags: ['Powder peak'], note: 'Deep January powder — prime season' },
  { start: '2027-01-16', band: 'peak', flags: ['Powder peak'], note: 'Peak powder' },
  { start: '2027-01-23', band: 'peak', flags: ['Powder peak'], note: 'Peak powder' },
  { start: '2027-01-30', band: 'high', flags: [], note: 'Still excellent snow' },
  { start: '2027-02-06', band: 'high', flags: ['Chinese NY'], note: 'Chinese New Year around mid-Feb' },
  { start: '2027-02-13', band: 'peak', flags: ['Chinese NY'], note: 'Chinese New Year peak' },
  { start: '2027-02-20', band: 'high', flags: [], note: 'Late powder season' },
  { start: '2027-02-27', band: 'mid', flags: [], note: 'Season easing' },
  { start: '2027-03-06', band: 'mid', flags: [], note: 'Spring transition' },
  { start: '2027-03-13', band: 'low', flags: [], note: 'Spring skiing, value weeks' },
  { start: '2027-03-20', band: 'low', flags: [], note: 'Late season' },
];

export function weekFor(weeks: SeasonWeek[], dateISO: string): SeasonWeek | undefined {
  const t = Date.parse(dateISO);
  return weeks.find((w) => {
    const s = Date.parse(w.start);
    return t >= s && t < s + 7 * 86_400_000;
  });
}
