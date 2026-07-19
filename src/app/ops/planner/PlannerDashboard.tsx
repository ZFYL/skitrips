'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { components, logistics, type SupplierOption } from '@/lib/tripBuilderData';

/* =========================================================================
   Bonvo enterprise trip planner — scenario comparison dashboard.
   Every profile (solo → corporate) is priced through the same real supplier
   catalog as /ops/trip-builder, across three scenarios, with a validated
   categorical palette (dataviz reference palette, adjacent-pairs safe).
   ========================================================================= */

/* ---------- fixed component color assignment (identity, never rank) ---------- */

const SERIES: Record<string, { color: string; label: string }> = {
  flights:   { color: '#2a78d6', label: 'Flights' },
  hotel:     { color: '#008300', label: 'Accommodation' },
  transfer:  { color: '#e87ba4', label: 'Transfers' },
  skipass:   { color: '#eda100', label: 'Ski pass' },
  rental:    { color: '#1baf7a', label: 'Rental' },
  insurance: { color: '#eb6834', label: 'Insurance' },
  skischool: { color: '#4a3aa7', label: 'Ski school' },
};
const SERIES_ORDER = Object.keys(SERIES);

/* ---------- profiles ---------- */

interface Profile {
  id: string;
  icon: string;
  name: string;
  adults: number;
  children: number;
  tagline: string;
  needs: string[];
}

const PROFILES: Profile[] = [
  {
    id: 'solo', icon: '🏂', name: 'Solo rider', adults: 1, children: 0,
    tagline: 'One board, zero compromises. UCPA bunks or a small double — and every lift day maxed.',
    needs: ['Shared transfer aligns with Saturday flights', 'UCPA all-in is unbeatable solo value', 'Solo room supplements apply in hotels'],
  },
  {
    id: 'couple', icon: '💞', name: 'Couple escape', adults: 2, children: 0,
    tagline: 'A double room with a view, long lunches at altitude, spa before dinner.',
    needs: ['Half-board hotels remove every dinner decision', 'Private transfer worth it from 2 pax on comfort', 'Book F7 / Marielle early — doubles sell out first'],
  },
  {
    id: 'family', icon: '👨‍👩‍👧‍👦', name: 'Family 2+2', adults: 2, children: 2,
    tagline: 'Family Flex pricing, kids in English-speaking ski school every morning, connecting rooms.',
    needs: ['Family Flex: EVERYONE pays the child pass rate (€345)', 'Kids ski school 6 mornings while parents ride', 'Van transfer with child seats — no coach changes'],
  },
  {
    id: 'crew', icon: '🤙', name: 'Friends crew', adults: 8, children: 0,
    tagline: 'Eight riders, one apartment floor or a room block, one coach, one group chat finally quiet.',
    needs: ['Apartments (Montana Plein Sud) drop per-head cost sharply', "Ben's Bus group rate from ~10 seats", 'Mixed abilities → 600 km means nobody is bored'],
  },
  {
    id: 'club', icon: '⛷️', name: 'Ski club', adults: 20, children: 0,
    tagline: 'Twenty-plus skiers: negotiated group passes, allotment contract, one manifest.',
    needs: ['SETAM group pass quote via manifest (2–3 wks lead)', 'Hotel allotment: 30% deposit, balance T-30d', 'Dolomiti-style 21st-free logic: ask SETAM for gratuities'],
  },
  {
    id: 'corporate', icon: '💼', name: 'Corporate retreat', adults: 24, children: 0,
    tagline: 'A January offsite that costs less per head than a city conference hotel — with better mornings.',
    needs: ['One invoice, per-cost-center splits available', 'Meeting room + non-ski spa track for colleagues', 'January weeks: empty pistes, lowest rates'],
  },
];

/* ---------- scenarios ---------- */

interface Scenario {
  id: string;
  name: string;
  blurb: string;
  picks: Record<string, string | null>; // componentId -> optionId | null (excluded)
}

const SCENARIOS: Scenario[] = [
  {
    id: 'budget',
    name: 'Budget',
    blurb: 'UCPA all-in village (pass & gear included), train + Altibus up the valley, 1-stop fares.',
    picks: {
      flights: 'flight-onestop',
      hotel: 'hotel-ucpa',
      transfer: 'transfer-train',
      skipass: null,   // included in UCPA
      rental: null,    // included in UCPA
      insurance: 'ins-us-policy',
      skischool: null,
    },
  },
  {
    id: 'comfort',
    name: 'Comfort',
    blurb: 'Le Sherpa half board, Saturday shared coach, full-area pass, Intersport gear.',
    picks: {
      flights: 'flight-onestop',
      hotel: 'hotel-sherpa',
      transfer: 'transfer-bensbus',
      skipass: 'pass-adult',
      rental: 'rental-intersport',
      insurance: 'ins-us-policy',
      skischool: null,
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    blurb: 'Fahrenheit Seven ski-in/ski-out, nonstop JFK flight, private vans, Prosneige gear.',
    picks: {
      flights: 'flight-nonstop',
      hotel: 'hotel-f7',
      transfer: 'transfer-alpybus',
      skipass: 'pass-adult',
      rental: 'rental-prosneige',
      insurance: 'ins-travelex',
      skischool: null,
    },
  },
];

/* ---------- costing engine ---------- */

const FX = 1.1; // EUR → USD
const NIGHTS = 7;
const SKI_DAYS = 6;

function findOption(componentId: string, optionId: string): SupplierOption | undefined {
  return components.find((c) => c.id === componentId)?.options.find((o) => o.id === optionId);
}

function usd(option: SupplierOption, qty: number): number {
  return option.price * qty * (option.currency === 'EUR' ? FX : 1);
}

function quantityFor(option: SupplierOption, people: number): number {
  switch (option.unit) {
    case 'per_person': return people;
    case 'per_person_night': return people * NIGHTS;
    case 'per_person_day': return people * SKI_DAYS;
    case 'per_room_night': return Math.max(1, Math.ceil(people / (option.capacity ?? 2))) * NIGHTS;
    case 'per_unit_week': return Math.max(1, Math.ceil(people / (option.capacity ?? 4)));
    case 'per_vehicle_return': return Math.max(1, Math.ceil(people / (option.capacity ?? 8)));
    case 'per_group': return 1;
  }
}

interface CostLine { componentId: string; label: string; usd: number; }

function priceScenario(s: Scenario, profile: Profile): CostLine[] {
  const people = profile.adults + profile.children;
  const lines: CostLine[] = [];

  for (const componentId of SERIES_ORDER) {
    let optionId = s.picks[componentId];

    // Family Flex: 1–6 kids with ≤2 adults → everyone at child rate.
    if (componentId === 'skipass' && optionId === 'pass-adult' &&
        profile.children >= 1 && profile.children <= 6 && profile.adults <= 2) {
      optionId = 'pass-family';
    }

    if (!optionId) continue;
    const option = findOption(componentId, optionId);
    if (!option) continue;
    lines.push({ componentId, label: option.name, usd: usd(option, quantityFor(option, people)) });

    // Carré Neige rides along whenever a pass is bought.
    if (componentId === 'skipass') {
      const cn = findOption('insurance', 'ins-carre-neige');
      if (cn) lines.push({ componentId: 'insurance', label: cn.name, usd: usd(cn, people) });
    }
  }

  // Family profile: kids ski school (ESF 6 mornings) for the children.
  if (profile.id === 'family' && profile.children > 0 && s.id !== 'budget') {
    const school = findOption('skischool', 'esf-group');
    if (school) {
      lines.push({ componentId: 'skischool', label: `${school.name} × ${profile.children} kids`, usd: usd(school, profile.children) });
    }
  }

  return lines;
}

function sumByComponent(lines: CostLine[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const l of lines) out[l.componentId] = (out[l.componentId] ?? 0) + l.usd;
  return out;
}

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/* US benchmark, published estimates (see /trips sources). Per person. */
const US_BENCH = { lo: 5500, hi: 9400 };

/* ---------- concrete US reference packages (every line sourced) ---------- */

interface UsLine { label: string; usd: number; source: string; url: string; }
interface UsPackage {
  id: string;
  name: string;
  blurb: string;
  perPersonNote?: string;
  lines: UsLine[]; // per person
}

const US_PACKAGES: UsPackage[] = [
  {
    id: 'vail-peak',
    name: 'Vail, CO — peak week at window rates',
    blurb: '7 nights mid-tier lodging, 6 ski days bought at the ticket window in peak season.',
    lines: [
      { label: 'Domestic round-trip flight (to Eagle/Denver)', usd: 400, source: 'Dollar Flight Club 25/26 ski-season report', url: 'https://dollarflightclub.com/articles/2025-26-ski-season-flight-deals/' },
      { label: 'Lodging 7 nights, mid-tier ~$700/room ÷ 2', usd: 2450, source: 'VailVacay price comparison ($600–800/night Lionshead)', url: 'https://www.vailvacay.com/blog/which-is-more-expensive-vail-or-aspen' },
      { label: 'Lift tickets 6 days × $356 window', usd: 2136, source: 'SnowBrains — record $356 window price', url: 'https://snowbrains.com/vail-resorts-peak-lift-ticket-prices-hit-record-356-with-six-mountains-now-overs-300/' },
      { label: 'Rental 6 days × $72 resort shop', usd: 432, source: 'Alpine Base & Edge 2026 cost stats', url: 'https://skiboulder.com/blogs/news/how-much-does-skiing-cost-in-2026-50-data-points-on-lift-tickets-gear-rentals-the-real-price-of-a-day-on-the-mountain-1' },
      { label: 'Food & incidentals 7 days × $150', usd: 1050, source: 'Time Out / Casino.org all-in daily analysis', url: 'https://www.timeout.com/usa/news/here-are-the-top-20-most-expensive-ski-resorts-in-the-u-s-123125' },
    ],
  },
  {
    id: 'parkcity-feb',
    name: 'Park City, UT — February week',
    blurb: '7 nights at the official February average daily rate, 6 window lift days.',
    lines: [
      { label: 'Domestic round-trip flight (SLC)', usd: 350, source: 'Dollar Flight Club 25/26 ski-season report', url: 'https://dollarflightclub.com/articles/2025-26-ski-season-flight-deals/' },
      { label: 'Lodging 7 nights × $915 Feb ADR ÷ 2', usd: 3203, source: 'Park Record — Chamber lodging data ($915 Feb ADR)', url: 'https://www.parkrecord.com/2025/12/19/most-expensive-in-united-states-park-city-lodging-data-says-otherwise/' },
      { label: 'Lift tickets 6 days × $351 window', usd: 2106, source: 'SnowBrains — 2025/26 window prices', url: 'https://snowbrains.com/vail-resorts-peak-lift-ticket-prices-hit-record-356-with-six-mountains-now-overs-300/' },
      { label: 'Rental 6 days × $48 town shop', usd: 288, source: 'Alpine Base & Edge 2026 cost stats', url: 'https://skiboulder.com/blogs/news/how-much-does-skiing-cost-in-2026-50-data-points-on-lift-tickets-gear-rentals-the-real-price-of-a-day-on-the-mountain-1' },
      { label: 'Food & incidentals 7 days × $125', usd: 875, source: 'Time Out / Casino.org ($1,225/day all-in Park City)', url: 'https://www.timeout.com/usa/news/here-are-the-top-20-most-expensive-ski-resorts-in-the-u-s-123125' },
    ],
  },
  {
    id: 'breck-family',
    name: 'Breckenridge — published family study (per person)',
    blurb: 'SnowBrains family-of-four case study (6 nights / 5 ski days), shown per person, indexed +11% per NSAA since 2022/23.',
    perPersonNote: 'Study total $9,968 for 2 adults + kids 14 & 10 → ÷4, ×1.11 NSAA trip-cost inflation.',
    lines: [
      { label: 'Airfare (family $1,200 ÷ 4, ×1.11)', usd: 333, source: 'SnowBrains family ski vacation study', url: 'https://snowbrains.com/will-a-family-ski-vacation-cost-over-10000-this-season/' },
      { label: 'Rental car ($900 ÷ 4, ×1.11)', usd: 250, source: 'SnowBrains family ski vacation study', url: 'https://snowbrains.com/will-a-family-ski-vacation-cost-over-10000-this-season/' },
      { label: 'Lift tickets ($1,640 ÷ 4, ×1.11)', usd: 455, source: 'SnowBrains family ski vacation study', url: 'https://snowbrains.com/will-a-family-ski-vacation-cost-over-10000-this-season/' },
      { label: 'Equipment rentals ($1,375 ÷ 4, ×1.11)', usd: 382, source: 'SnowBrains family ski vacation study', url: 'https://snowbrains.com/will-a-family-ski-vacation-cost-over-10000-this-season/' },
      { label: 'Lodging 6 nights ($2,874 ÷ 4, ×1.11)', usd: 798, source: 'SnowBrains family ski vacation study', url: 'https://snowbrains.com/will-a-family-ski-vacation-cost-over-10000-this-season/' },
      { label: 'Ski school 3 days ($975 ÷ 4, ×1.11)', usd: 271, source: 'SnowBrains family ski vacation study', url: 'https://snowbrains.com/will-a-family-ski-vacation-cost-over-10000-this-season/' },
      { label: 'Dining + misc ($1,004 ÷ 4, ×1.11)', usd: 279, source: 'SnowBrains family ski vacation study', url: 'https://snowbrains.com/will-a-family-ski-vacation-cost-over-10000-this-season/' },
    ],
  },
  {
    id: 'saver',
    name: 'Colorado saver — Epic Day Pass, booked early',
    blurb: 'The honest low anchor: advance Epic Day Pass, online rental, cheaper lodging.',
    lines: [
      { label: 'Domestic round-trip flight (Denver)', usd: 350, source: 'Dollar Flight Club 25/26 ski-season report', url: 'https://dollarflightclub.com/articles/2025-26-ski-season-flight-deals/' },
      { label: 'Lodging 7 nights × $500/room ÷ 2', usd: 1750, source: 'Budget Your Trip / Park Record mid-range band', url: 'https://www.budgetyourtrip.com/hotels/united-states-of-america/park-city-utah-5779451' },
      { label: 'Epic Day Pass 6 days × ~$100 (pre-season)', usd: 600, source: 'SKI Magazine — 2025/26 Epic Pass pricing', url: 'https://www.skimag.com/news/epic-pass-2025-26/' },
      { label: 'Rental 6 days × $42 booked online', usd: 252, source: 'Alpine Base & Edge 2026 cost stats', url: 'https://skiboulder.com/blogs/news/how-much-does-skiing-cost-in-2026-50-data-points-on-lift-tickets-gear-rentals-the-real-price-of-a-day-on-the-mountain-1' },
      { label: 'Food & incidentals 7 days × $100', usd: 700, source: 'Time Out / Casino.org all-in daily analysis', url: 'https://www.timeout.com/usa/news/here-are-the-top-20-most-expensive-ski-resorts-in-the-u-s-123125' },
    ],
  },
];

/* ---------- component ---------- */

export default function PlannerDashboard() {
  const [profileId, setProfileId] = useState('family');
  const [usPackageId, setUsPackageId] = useState('vail-peak');
  const [compareScenarioId, setCompareScenarioId] = useState('comfort');
  const [adultsOverride, setAdultsOverride] = useState<number | null>(null);
  const [childrenOverride, setChildrenOverride] = useState<number | null>(null);
  const [profitPct, setProfitPct] = useState(25);
  const [buffer, setBuffer] = useState(1.15);

  const baseProfile = PROFILES.find((p) => p.id === profileId)!;
  const profile: Profile = {
    ...baseProfile,
    adults: adultsOverride ?? baseProfile.adults,
    children: childrenOverride ?? baseProfile.children,
  };
  const people = profile.adults + profile.children;

  const scenarios = useMemo(
    () =>
      SCENARIOS.map((s) => {
        const lines = priceScenario(s, profile);
        const total = lines.reduce((a, l) => a + l.usd, 0);
        const perPerson = people > 0 ? total / people : 0;
        const sell = Math.ceil((perPerson * buffer * (1 + profitPct / 100)) / 10) * 10;
        return { ...s, lines, byComponent: sumByComponent(lines), total, perPerson, sell };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profileId, profile.adults, profile.children, profitPct, buffer]
  );

  const maxTotal = Math.max(...scenarios.map((s) => s.total), 1);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f]">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold tracking-tight">BONVO.SKI</span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Internal — Trip Planner
            </span>
          </div>
          <Link
            href="/ops/trip-builder"
            className="rounded-full bg-[#1d1d1f] px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            Open cost builder →
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Scenario planner.</h1>
        <p className="mt-2 max-w-2xl text-[0.95rem] text-[#6e6e73]">
          Pick who is traveling — every scenario below is priced live from the same real
          supplier catalog as the cost builder, with Family Flex, room, apartment and vehicle
          math applied automatically. Fine-tune any line in the cost builder afterwards.
        </p>

        {/* profile selector */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => { setProfileId(p.id); setAdultsOverride(null); setChildrenOverride(null); }}
              className={cn(
                'rounded-2xl border p-4 text-left transition-all',
                p.id === profileId
                  ? 'border-indigo-400 bg-white shadow-[0_14px_34px_-10px_rgba(99,102,241,0.35)] ring-2 ring-indigo-400'
                  : 'border-black/10 bg-white hover:border-black/25'
              )}
            >
              <span className="text-2xl">{p.icon}</span>
              <span className="mt-1 block text-sm font-semibold">{p.name}</span>
              <span className="text-xs text-[#a1a1a6]">
                {p.adults} adult{p.adults > 1 ? 's' : ''}{p.children > 0 ? ` + ${p.children} kids` : ''}
              </span>
            </button>
          ))}
        </div>

        {/* party + commercial controls */}
        <div className="mt-6 flex flex-wrap items-end gap-6 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_14px_34px_-14px_rgba(29,29,31,0.09)]">
          <p className="mr-auto max-w-md text-sm text-[#6e6e73]">
            <span className="font-semibold text-[#1d1d1f]">{profile.name}.</span> {profile.tagline}
          </p>
          {[
            { label: 'Adults', value: profile.adults, set: (v: number) => setAdultsOverride(Math.max(1, v)) },
            { label: 'Children 5–17', value: profile.children, set: (v: number) => setChildrenOverride(Math.max(0, v)) },
            { label: 'Profit %', value: profitPct, set: (v: number) => setProfitPct(Math.max(0, v)) },
          ].map((f) => (
            <label key={f.label} className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
              {f.label}
              <input
                type="number"
                value={f.value}
                onChange={(e) => f.set(Number(e.target.value))}
                className="w-24 rounded-xl border border-black/10 px-3 py-2 text-sm font-medium text-[#1d1d1f] focus:border-indigo-400 focus:outline-none"
              />
            </label>
          ))}
          <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
            Buffer ×
            <input
              type="number" step={0.05} value={buffer}
              onChange={(e) => setBuffer(Math.max(1, Number(e.target.value)))}
              className="w-24 rounded-xl border border-black/10 px-3 py-2 text-sm font-medium text-[#1d1d1f] focus:border-indigo-400 focus:outline-none"
            />
          </label>
        </div>

        {/* scenario stat tiles */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {scenarios.map((s) => {
            const vsUs = US_BENCH.lo - s.perPerson;
            return (
              <div key={s.id} className="rounded-[1.75rem] border border-black/5 bg-white p-7 shadow-[0_20px_50px_-18px_rgba(29,29,31,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#a1a1a6]">{s.name}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">{fmt(s.perPerson)}<span className="text-sm font-medium text-[#a1a1a6]"> /person real cost</span></p>
                <p className="mt-1 text-sm text-[#6e6e73]">{fmt(s.total)} total · {people} traveler{people > 1 ? 's' : ''}</p>
                <p className="mt-3 text-sm">
                  <span className="font-semibold text-indigo-600">Sell at {fmt(s.sell)}/person</span>
                  <span className="text-[#a1a1a6]"> · buffer ×{buffer.toFixed(2)} + {profitPct}%</span>
                </p>
                <p className={cn('mt-1 text-xs font-medium', vsUs > 0 ? 'text-emerald-600' : 'text-amber-600')}>
                  {vsUs > 0
                    ? `${fmt(vsUs)} under the cheapest published US week`
                    : `${fmt(-vsUs)} above the cheapest published US week`}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-[#6e6e73]">{s.blurb}</p>
              </div>
            );
          })}
        </div>

        {/* stacked comparison chart */}
        <section className="mt-10 rounded-[1.75rem] border border-black/5 bg-white p-7 shadow-[0_20px_50px_-18px_rgba(29,29,31,0.12)]">
          <h2 className="text-lg font-bold tracking-tight">Where the money goes — {people} traveler{people > 1 ? 's' : ''}, whole trip</h2>

          {/* legend (fixed order, fixed hues) */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {SERIES_ORDER.map((k) => (
              <span key={k} className="flex items-center gap-1.5 text-xs text-[#52514e]">
                <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: SERIES[k].color }} />
                {SERIES[k].label}
              </span>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            {scenarios.map((s) => (
              <div key={s.id}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <p className="text-sm font-semibold">{fmt(s.total)}<span className="ml-1 text-xs font-normal text-[#a1a1a6]">({fmt(s.perPerson)}/pp)</span></p>
                </div>
                <div className="flex h-7 w-full overflow-hidden rounded-[6px]" style={{ width: `${(s.total / maxTotal) * 100}%`, minWidth: '30%' }}>
                  {SERIES_ORDER.filter((k) => (s.byComponent[k] ?? 0) > 0).map((k) => (
                    <div
                      key={k}
                      title={`${SERIES[k].label}: ${fmt(s.byComponent[k])}`}
                      className="h-full transition-opacity hover:opacity-80"
                      style={{
                        background: SERIES[k].color,
                        width: `${(s.byComponent[k] / s.total) * 100}%`,
                        boxShadow: 'inset -2px 0 0 #ffffff', // 2px surface gap between segments
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* US benchmark band (neutral, not a series) */}
            <div>
              <div className="mb-1.5 flex items-baseline justify-between">
                <p className="text-sm font-semibold text-[#52514e]">Typical US week (published)</p>
                <p className="text-sm text-[#52514e]">{fmt(US_BENCH.lo * people)} – {fmt(US_BENCH.hi * people)}</p>
              </div>
              <div className="relative h-7 w-full overflow-hidden rounded-[6px]">
                <div
                  className="absolute h-full rounded-[6px] bg-[#e8e8ed]"
                  title={`Published US estimates: ${fmt(US_BENCH.lo)}–${fmt(US_BENCH.hi)} per person, flights included`}
                  style={{
                    left: `${Math.min(95, (US_BENCH.lo * people / maxTotal) * 100)}%`,
                    width: `${Math.max(4, ((US_BENCH.hi - US_BENCH.lo) * people / maxTotal) * 100)}%`,
                    maxWidth: '100%',
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] text-[#a1a1a6]">
                Gray band: published all-in estimates for a comparable US ski week (SnowBrains, NSAA, Time Out; per-person $5,500–$9,400, scaled to your party).
              </p>
            </div>
          </div>

          {/* table view */}
          <details className="mt-6">
            <summary className="cursor-pointer text-sm font-semibold text-indigo-600">Table view (all figures)</summary>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-black/10 text-left">
                    <th className="py-2 pr-4 font-semibold">Component</th>
                    {scenarios.map((s) => (
                      <th key={s.id} className="py-2 pr-4 text-right font-semibold">{s.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SERIES_ORDER.map((k) => (
                    <tr key={k} className="border-b border-black/5">
                      <td className="py-2 pr-4">
                        <span className="mr-2 inline-block h-2.5 w-2.5 rounded-[3px] align-middle" style={{ background: SERIES[k].color }} />
                        {SERIES[k].label}
                      </td>
                      {scenarios.map((s) => (
                        <td key={s.id} className="py-2 pr-4 text-right tabular-nums">
                          {s.byComponent[k] ? fmt(s.byComponent[k]) : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 pr-4 font-semibold">Total ({people} pax)</td>
                    {scenarios.map((s) => (
                      <td key={s.id} className="py-2 pr-4 text-right font-semibold tabular-nums">{fmt(s.total)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-semibold">Proposed sell / person</td>
                    {scenarios.map((s) => (
                      <td key={s.id} className="py-2 pr-4 text-right font-semibold tabular-nums text-indigo-600">{fmt(s.sell)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </section>

        {/* one-to-one: Bonvo scenario vs a sourced US reference week */}
        <section className="mt-10 rounded-[1.75rem] border border-black/5 bg-white p-7 shadow-[0_20px_50px_-18px_rgba(29,29,31,0.12)]">
          <h2 className="text-lg font-bold tracking-tight">One-to-one: your package vs a real US week</h2>
          <p className="mt-1 text-sm text-[#6e6e73]">
            Each US reference package is built line by line from published 2025/26-season sources —
            every line links to where the number came from. Pick one and compare per-person.
          </p>

          {/* US package selector */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {US_PACKAGES.map((p) => {
              const total = p.lines.reduce((a, l) => a + l.usd, 0);
              return (
                <button
                  key={p.id}
                  onClick={() => setUsPackageId(p.id)}
                  className={cn(
                    'rounded-2xl border p-4 text-left transition-all',
                    p.id === usPackageId
                      ? 'border-indigo-400 bg-white shadow-[0_14px_34px_-10px_rgba(99,102,241,0.35)] ring-2 ring-indigo-400'
                      : 'border-black/10 bg-white hover:border-black/25'
                  )}
                >
                  <span className="block text-sm font-semibold leading-snug">{p.name}</span>
                  <span className="mt-1 block text-lg font-bold tabular-nums">{fmt(total)}<span className="text-xs font-medium text-[#a1a1a6]"> /person</span></span>
                  <span className="mt-1 block text-[11px] leading-snug text-[#a1a1a6]">{p.blurb}</span>
                </button>
              );
            })}
          </div>

          {(() => {
            const usPkg = US_PACKAGES.find((p) => p.id === usPackageId)!;
            const usTotal = usPkg.lines.reduce((a, l) => a + l.usd, 0);
            const scenario = scenarios.find((s) => s.id === compareScenarioId)!;
            const delta = usTotal - scenario.perPerson;
            return (
              <div className="mt-8">
                {/* delta headline + scenario picker */}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 px-5 py-4">
                  <p className="text-sm">
                    <span className="font-bold">{usPkg.name}</span>
                    <span className="text-[#6e6e73]"> vs </span>
                    <select
                      value={compareScenarioId}
                      onChange={(e) => setCompareScenarioId(e.target.value)}
                      className="rounded-lg border border-black/10 bg-white px-2 py-1 text-sm font-semibold"
                    >
                      {scenarios.map((s) => (
                        <option key={s.id} value={s.id}>Bonvo {s.name}</option>
                      ))}
                    </select>
                  </p>
                  <p className={cn('text-sm font-bold', delta > 0 ? 'text-emerald-600' : 'text-amber-600')}>
                    {delta > 0
                      ? `Bonvo is ${fmt(delta)} cheaper per person — and includes transatlantic flights`
                      : `Bonvo is ${fmt(-delta)} more per person on this pairing`}
                  </p>
                </div>

                <div className="mt-6 grid gap-8 md:grid-cols-2">
                  {/* US column */}
                  <div>
                    <div className="flex items-baseline justify-between border-b-2 border-[#1d1d1f] pb-2">
                      <p className="text-sm font-bold">{usPkg.name}</p>
                      <p className="text-sm font-bold tabular-nums">{fmt(usTotal)} /pp</p>
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {usPkg.lines.map((l) => (
                        <li key={l.label} className="text-xs">
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="text-[#494949]">{l.label}</span>
                            <span className="whitespace-nowrap font-medium tabular-nums">{fmt(l.usd)}</span>
                          </span>
                          <a href={l.url} target="_blank" rel="noreferrer"
                            className="text-[11px] text-indigo-600 underline underline-offset-2 hover:text-indigo-800">
                            {l.source} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                    {usPkg.perPersonNote && (
                      <p className="mt-3 text-[11px] text-[#a1a1a6]">{usPkg.perPersonNote}</p>
                    )}
                  </div>

                  {/* Bonvo column */}
                  <div>
                    <div className="flex items-baseline justify-between border-b-2 border-indigo-500 pb-2">
                      <p className="text-sm font-bold">Bonvo {scenario.name} — Val Thorens ({people} pax party)</p>
                      <p className="text-sm font-bold tabular-nums text-indigo-600">{fmt(scenario.perPerson)} /pp</p>
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {scenario.lines.map((l, i) => (
                        <li key={i} className="flex items-baseline justify-between gap-3 text-xs">
                          <span className="flex items-center gap-1.5 text-[#494949]">
                            <span className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: SERIES[l.componentId].color }} />
                            {l.label}
                          </span>
                          <span className="whitespace-nowrap font-medium tabular-nums">{fmt(l.usd / people)} /pp</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[11px] text-[#a1a1a6]">
                      Includes round-trip transatlantic flights, transfers, half-board dinners and
                      insurance — lines the US reference prices separately or not at all. Supplier
                      links live in the <Link href="/ops/trip-builder" className="underline">cost builder</Link>.
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* line detail per scenario */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {scenarios.map((s) => (
            <div key={s.id} className="rounded-[1.75rem] border border-black/5 bg-white p-6 shadow-[0_20px_50px_-18px_rgba(29,29,31,0.1)]">
              <p className="text-sm font-bold">{s.name} — supplier lines</p>
              <ul className="mt-3 space-y-2 text-xs">
                {s.lines.map((l, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-3">
                    <span className="flex items-center gap-1.5 text-[#52514e]">
                      <span className="h-2 w-2 shrink-0 rounded-[2px]" style={{ background: SERIES[l.componentId].color }} />
                      {l.label}
                    </span>
                    <span className="whitespace-nowrap font-medium tabular-nums">{fmt(l.usd)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* profile playbook + booking timeline */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-black/5 bg-white p-7 shadow-[0_20px_50px_-18px_rgba(29,29,31,0.1)]">
            <h2 className="text-lg font-bold tracking-tight">What {profile.name.toLowerCase()} trips need</h2>
            <ul className="mt-4 space-y-3">
              {profile.needs.map((n) => (
                <li key={n} className="flex gap-3 text-sm text-[#494949]">
                  <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] text-indigo-700">✓</span>
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-[#a1a1a6]">
              Week frame: Sat–Sat, {NIGHTS} nights, {SKI_DAYS} ski days. FX €1 = ${FX.toFixed(2)}.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-black/5 bg-white p-7 shadow-[0_20px_50px_-18px_rgba(29,29,31,0.1)]">
            <h2 className="text-lg font-bold tracking-tight">Booking timeline</h2>
            <ol className="mt-4 space-y-4">
              {logistics.slice(0, 4).map((l, i) => (
                <li key={l.step} className="relative pl-8">
                  <span aria-hidden className="absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-[10px] font-bold text-white">{i + 1}</span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{l.step}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#6e6e73]">{l.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <p className="mt-10 text-center text-sm text-[#6e6e73]">
          Ready to turn a scenario into a quote?{' '}
          <Link href="/ops/trip-builder" className="font-semibold text-indigo-600 underline underline-offset-4">
            Open the cost builder
          </Link>{' '}
          to swap suppliers line by line, pull live fares and export the PDF offer.
        </p>
      </div>
    </div>
  );
}
