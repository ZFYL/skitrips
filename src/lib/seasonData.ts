// Val Thorens 2026/27 season intelligence — researched July 2026.
// Sources: education.gouv.fr calendar (via vacances-scolaires-gouv.com), UK council
// term dates, valthorensguide.co.uk (season 21 Nov 2026 – 2 May 2027; 3V link
// 5 Dec – 17 Apr), Top Snow Travel & valthorens-chalets-apartments.com value
// guidance, OnTheSnow/SNO snow history, skiresort.info reliability 5/5.

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

export const seasonWeeks: SeasonWeek[] = [
  { start: '2026-11-21', band: 'low', flags: [], note: 'Resort opens — VT-only area, discounted passes' },
  { start: '2026-11-28', band: 'low', flags: [], note: 'Early season' },
  { start: '2026-12-05', band: 'low', flags: [], note: '3 Vallées link opens; statistically the snowiest week' },
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
  { start: '2027-03-13', band: 'low', flags: [], note: 'Deepest average base of the season; UCPA cheap week' },
  { start: '2027-03-20', band: 'low', flags: [], note: 'Week before Easter — often the cheapest of winter' },
  { start: '2027-03-27', band: 'high', flags: ['Easter', 'UK Easter'], note: 'Early Easter (Sun 28 Mar)' },
  { start: '2027-04-03', band: 'high', flags: ['FR-C spring', 'UK Easter'], note: 'French spring holidays begin' },
  { start: '2027-04-10', band: 'mid', flags: ['FR spring'], note: 'April pass discounts begin' },
  { start: '2027-04-17', band: 'low', flags: ['FR spring'], note: '3V links close 17 Apr — VT-only after' },
  { start: '2027-04-24', band: 'low', flags: ['FR spring'], note: 'Final week — resort closes 2 May' },
];

export function weekFor(dateISO: string): SeasonWeek | undefined {
  const t = Date.parse(dateISO);
  return seasonWeeks.find((w) => {
    const s = Date.parse(w.start);
    return t >= s && t < s + 7 * 86_400_000;
  });
}

// Monthly snow averages (OnTheSnow snowfall/base; SNO top depth). cm.
export const snowByMonth = [
  { month: 'Nov', snowfall: 82, base: 56, top: 47 },
  { month: 'Dec', snowfall: 135, base: 90, top: 116 },
  { month: 'Jan', snowfall: 163, base: 208, top: 130 },
  { month: 'Feb', snowfall: 107, base: 156, top: 190 },
  { month: 'Mar', snowfall: 99, base: 167, top: 210 },
  { month: 'Apr', snowfall: 65, base: 155, top: 193 },
];

export const snowFacts =
  'Highest resort in Europe (2,300 m base, 3,230 m top, glacier sector ~3,200 m). skiresort.info snow reliability 5/5; ~643 cm average annual snowfall; skiing reliable late Nov – early May.';
