'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import {
  components,
  logistics,
  UNIT_LABEL,
  type SupplierOption,
  type TripComponent,
} from '@/lib/tripBuilderData';
import type { LiveFlightOffer, LiveHotelOffer, LiveResponse } from '@/lib/live/types';

import SnowPanel from './SnowPanel';
import WhenToGo from './WhenToGo';
import PrintOffer from './PrintOffer';
import type { OfferPrintData, PrintServiceGroup } from './printTypes';
import { weekFor, BAND_LABEL } from '@/lib/seasonData';

// Leaflet touches `window` — client-only chunk.
const HotelMap = dynamic(() => import('./HotelMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-2xl border border-black/10 bg-white text-sm text-[#a1a1a6]">
      Loading map…
    </div>
  ),
});

/* ---------- pricing engine ---------- */

// A live offer selected from /api/live/*, normalized for the engine.
interface LiveSelection {
  label: string;
  detail: string;
  price: number;
  currency: 'EUR' | 'USD';
  unit: 'per_person' | 'per_person_night';
  deepLink?: string;
  source: 'amadeus' | 'reference';
}

interface Traveler {
  id: string;
  name: string;
}

// Per-traveler assignment inside a split component: a real option id,
// 'custom' (with per-person USD price), or 'none' (own arrangement, $0).
interface Assignment {
  optionId: string;
  customPrice?: string;
}

interface ComponentConfig {
  enabled: boolean;
  optionId: string; // option id, 'custom', or 'live'
  customLabel: string;
  customPrice: string; // USD, as typed
  customBasis: 'per_person' | 'total';
  live?: LiveSelection;
  liveId?: string;
  split: boolean;
  assignments: Record<string, Assignment>; // travelerId → assignment
}

interface Line {
  component: TripComponent;
  label: string;
  detail: string;
  totalUSD: number;
  vatUSD: number;
  option?: SupplierOption;
}

// One option-group inside a split component: the travelers sharing one choice.
interface SplitGroup {
  component: TripComponent;
  key: string; // option id | 'custom' | 'none'
  label: string;
  shortLabel: string;
  detail: string;
  members: Traveler[];
  totalUSD: number;
  vatUSD: number;
  memberShare: Record<string, number>; // travelerId → USD attributed
}

const CUSTOM = 'custom';
const LIVE = 'live';
const NONE = 'none';

function shortOptionLabel(name: string): string {
  const clean = name.replace(/ ★+S?/gu, '').trim();
  return clean.length > 22 ? `${clean.slice(0, 22)}…` : clean;
}

// The option a traveler falls back to when split mode has no explicit pick.
function fallbackAssignId(component: TripComponent, cfg: ComponentConfig): string {
  return component.options.some((o) => o.id === cfg.optionId)
    ? cfg.optionId
    : component.defaultOptionId;
}

function optionQuantity(
  option: SupplierOption,
  people: number,
  nights: number,
  skiDays: number
): { qty: number; detail: string } {
  switch (option.unit) {
    case 'per_person':
      return { qty: people, detail: `${people} × ${UNIT_LABEL[option.unit]}` };
    case 'per_person_night':
      return { qty: people * nights, detail: `${people} pax × ${nights} nights` };
    case 'per_person_day':
      return { qty: people * skiDays, detail: `${people} pax × ${skiDays} days` };
    case 'per_room_night': {
      const occupancy = option.capacity ?? 2;
      const rooms = Math.max(1, Math.ceil(people / occupancy));
      return { qty: rooms * nights, detail: `${rooms} room${rooms > 1 ? 's' : ''} × ${nights} nights` };
    }
    case 'per_unit_week': {
      const sleeps = option.capacity ?? 4;
      const units = Math.max(1, Math.ceil(people / sleeps));
      return { qty: units, detail: `${units} apartment${units > 1 ? 's' : ''} (sleeps ${sleeps})` };
    }
    case 'per_vehicle_return': {
      const vehicles = Math.max(1, Math.ceil(people / (option.capacity ?? 8)));
      return { qty: vehicles, detail: `${vehicles} vehicle${vehicles > 1 ? 's' : ''} (cap. ${option.capacity ?? 8})` };
    }
    case 'per_group':
      return { qty: 1, detail: 'whole group' };
  }
}

function fmtUSD(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function fmtUSD2(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}

/* ---------- small UI atoms ---------- */

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">{label}</span>
      <span className="flex items-center gap-2">
        <input
          type="number"
          value={Number.isFinite(value) ? value : ''}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-medium text-[#1d1d1f] shadow-inner focus:border-sky-400 focus:outline-none"
        />
        {suffix && <span className="text-sm text-[#6e6e73]">{suffix}</span>}
      </span>
    </label>
  );
}

/* ---------- live search panels ---------- */

function SourceBadge({ source }: { source: 'amadeus' | 'reference' }) {
  return source === 'amadeus' ? (
    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
      Live · Amadeus
    </span>
  ) : (
    <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-600">
      Reference data
    </span>
  );
}

function LiveFlightPanel({
  people,
  selectedId,
  onSelect,
}: {
  people: number;
  selectedId: string | null;
  onSelect: (offer: LiveFlightOffer, source: 'amadeus' | 'reference') => void;
}) {
  const [origin, setOrigin] = useState('JFK');
  const [depart, setDepart] = useState('2027-01-16');
  const [ret, setRet] = useState('2027-01-23');
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<LiveResponse<LiveFlightOffer> | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setErr(null);
    try {
      const qs = new URLSearchParams({
        origin,
        destination: 'GVA',
        depart,
        return: ret,
        adults: String(people),
      });
      const r = await fetch(`/api/live/flights?${qs}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setResp(await r.json());
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50/60 p-5">
      <div className="flex flex-wrap items-end gap-3">
        <p className="mr-auto text-sm font-semibold">✈️ Live fare search — NYC ⇄ Geneva</p>
        <label className="flex flex-col gap-1 text-xs font-medium text-[#6e6e73]">
          Origin (IATA)
          <input value={origin} onChange={(e) => setOrigin(e.target.value.toUpperCase())} maxLength={3}
            className="w-20 rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-[#6e6e73]">
          Depart
          <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-[#6e6e73]">
          Return
          <input type="date" value={ret} onChange={(e) => setRet(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm" />
        </label>
        <button
          onClick={run}
          disabled={loading}
          className="rounded-full bg-sky-600 px-5 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
        >
          {loading ? 'Searching…' : 'Pull live fares'}
        </button>
      </div>

      {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
      {resp && (
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6e6e73]">
            <SourceBadge source={resp.source} />
            {resp.note && <span>{resp.note}</span>}
          </div>
          <div className="mt-3 grid gap-2">
            {resp.offers.map((o) => {
              const isSel = selectedId === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => onSelect(o, resp.source)}
                  className={cn(
                    'flex items-center justify-between gap-4 rounded-xl border bg-white px-4 py-3 text-left text-sm transition-all',
                    isSel
                      ? 'border-sky-500 ring-2 ring-sky-400'
                      : 'border-black/10 hover:border-black/25'
                  )}
                >
                  <span>
                    <span className="font-semibold">{o.carrier}</span>{' '}
                    <span className="text-[#6e6e73]">
                      · {o.stops === 0 ? 'nonstop' : `${o.stops} stop`} · {o.outboundDuration}
                    </span>
                    <span className="block text-xs text-[#a1a1a6]">{o.itinerary}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    {o.deepLink && (
                      <a href={o.deepLink} target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-sky-700 underline underline-offset-2">
                        verify ↗
                      </a>
                    )}
                    <span className="text-base font-bold">${o.pricePerPerson.toLocaleString()}</span>
                  </span>
                </button>
              );
            })}
            {resp.offers.length === 0 && (
              <p className="text-sm text-[#6e6e73]">No offers returned for these dates.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function LiveHotelPanel({
  people,
  selectedId,
  onSelect,
}: {
  people: number;
  selectedId: string | null;
  onSelect: (offer: LiveHotelOffer, source: 'amadeus' | 'reference') => void;
}) {
  const [checkIn, setCheckIn] = useState('2027-01-16');
  const [checkOut, setCheckOut] = useState('2027-01-23');
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<LiveResponse<LiveHotelOffer> | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setErr(null);
    try {
      const qs = new URLSearchParams({ checkIn, checkOut, adults: String(people) });
      const r = await fetch(`/api/live/hotels?${qs}`);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setResp(await r.json());
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50/60 p-5">
      <div className="flex flex-wrap items-end gap-3">
        <p className="mr-auto text-sm font-semibold">🛎️ Live availability — Val Thorens</p>
        <label className="flex flex-col gap-1 text-xs font-medium text-[#6e6e73]">
          Check-in
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm" />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium text-[#6e6e73]">
          Check-out
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
            className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm" />
        </label>
        <button
          onClick={run}
          disabled={loading}
          className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50"
        >
          {loading ? 'Searching…' : 'Pull live rates'}
        </button>
      </div>

      {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
      {resp && (
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6e6e73]">
            <SourceBadge source={resp.source} />
            {resp.note && <span>{resp.note}</span>}
          </div>
          <div className="mt-3 grid gap-2">
            {resp.offers.map((o) => {
              const isSel = selectedId === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => onSelect(o, resp.source)}
                  className={cn(
                    'flex items-center justify-between gap-4 rounded-xl border bg-white px-4 py-3 text-left text-sm transition-all',
                    isSel
                      ? 'border-violet-500 ring-2 ring-violet-400'
                      : 'border-black/10 hover:border-black/25'
                  )}
                >
                  <span>
                    <span className="font-semibold">{o.name}</span>{' '}
                    {o.ratingHint && <span className="text-[#6e6e73]">· {o.ratingHint}</span>}
                    <span className="block text-xs text-[#a1a1a6]">
                      {[o.roomDescription, o.boardType].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    {o.deepLink && (
                      <a href={o.deepLink} target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-violet-700 underline underline-offset-2">
                        verify ↗
                      </a>
                    )}
                    <span className="text-right">
                      <span className="block text-base font-bold">
                        {o.currency === 'EUR' ? '€' : '$'}{o.perPersonPerNight.toLocaleString()}
                        <span className="text-xs font-medium text-[#a1a1a6]"> pp/night</span>
                      </span>
                      <span className="block text-xs text-[#a1a1a6]">
                        stay total {o.currency === 'EUR' ? '€' : '$'}{o.totalStay.toLocaleString()}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
            {resp.offers.length === 0 && (
              <p className="text-sm text-[#6e6e73]">No rates returned for these dates.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- main component ---------- */

export default function TripBuilder() {
  const [travelers, setTravelers] = useState<Traveler[]>([
    { id: 't1', name: 'Traveler 1' },
    { id: 't2', name: 'Traveler 2' },
  ]);
  const travelerIdRef = useRef(3);
  const people = travelers.length;

  const setPeopleCount = (n: number) => {
    const target = Math.max(1, Math.floor(n) || 1);
    setTravelers((prev) => {
      if (target === prev.length) return prev;
      if (target < prev.length) return prev.slice(0, target);
      const next = [...prev];
      while (next.length < target) {
        next.push({ id: `t${travelerIdRef.current++}`, name: `Traveler ${next.length + 1}` });
      }
      return next;
    });
  };

  const renameTraveler = (id: string, name: string) =>
    setTravelers((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)));

  const removeTraveler = (id: string) =>
    setTravelers((prev) => (prev.length <= 1 ? prev : prev.filter((t) => t.id !== id)));

  const [nights, setNights] = useState(7);
  const [skiDays, setSkiDays] = useState(6);
  const [fx, setFx] = useState(1.1); // EUR → USD
  const [buffer, setBuffer] = useState(1.0);
  const [profitPct, setProfitPct] = useState(25);
  const [clientName, setClientName] = useState('');
  const [offerTitle, setOfferTitle] = useState('Val Thorens Ski Week — Les 3 Vallées');
  const [includeInternal, setIncludeInternal] = useState(false);
  const [tripStart, setTripStart] = useState('2027-01-16'); // Saturday changeover
  const [personalNote, setPersonalNote] = useState('');

  const [showMap, setShowMap] = useState(true);
  const [galleries, setGalleries] = useState<Record<string, string[]>>({});
  const [galleryBusy, setGalleryBusy] = useState<Record<string, boolean>>({});

  /* ---------- saved offers & share links ---------- */

  interface OfferSnapshot {
    v: 1;
    savedAt: string;
    offerTitle: string;
    clientName: string;
    travelers: Traveler[];
    nights: number;
    skiDays: number;
    fx: number;
    buffer: number;
    profitPct: number;
    config: Record<string, ComponentConfig>;
    tripStart?: string;
    personalNote?: string;
  }

  const OFFERS_KEY = 'bonvo.offers.v1';
  const [printPreview, setPrintPreview] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [offerIndex, setOfferIndex] = useState<Record<string, OfferSnapshot>>({});
  const [saveName, setSaveName] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const snapshot = (): OfferSnapshot => ({
    v: 1,
    savedAt: new Date().toISOString(),
    offerTitle,
    clientName,
    travelers,
    nights,
    skiDays,
    fx,
    buffer,
    profitPct,
    config,
    tripStart,
    personalNote,
  });

  const applySnapshot = (s: OfferSnapshot) => {
    setOfferTitle(s.offerTitle);
    setClientName(s.clientName);
    setTravelers(s.travelers);
    // Keep the id counter ahead of any restored traveler id (t<N> convention).
    const maxId = Math.max(0, ...s.travelers.map((t) => parseInt(t.id.replace(/\D/g, ''), 10) || 0));
    travelerIdRef.current = maxId + 1;
    setNights(s.nights);
    setSkiDays(s.skiDays);
    setFx(s.fx);
    setBuffer(s.buffer);
    setProfitPct(s.profitPct);
    if (s.tripStart) setTripStart(s.tripStart);
    setPersonalNote(s.personalNote ?? '');
    // Merge over defaults so snapshots survive future catalog additions.
    setConfig((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(s.config)) {
        if (next[k]) next[k] = { ...next[k], ...v };
      }
      return next;
    });
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(OFFERS_KEY);
      if (raw) setOfferIndex(JSON.parse(raw));
    } catch { /* corrupted store — start fresh */ }
    if (window.location.search.includes('printPreview')) setPrintPreview(true);
    // Hydrate from a share link (#o=<base64url payload>).
    const m = /[#&]o=([A-Za-z0-9\-_]+)/.exec(window.location.hash);
    if (m) {
      try {
        const json = decodeURIComponent(escape(atob(m[1].replace(/-/g, '+').replace(/_/g, '/'))));
        applySnapshot(JSON.parse(json) as OfferSnapshot);
        flash('Offer loaded from link');
      } catch { flash('Could not read the shared offer link'); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistOffers = (next: Record<string, OfferSnapshot>) => {
    setOfferIndex(next);
    try { localStorage.setItem(OFFERS_KEY, JSON.stringify(next)); } catch { /* storage full */ }
  };

  const saveOffer = () => {
    const name = (saveName || offerTitle || 'Untitled offer').trim();
    persistOffers({ ...offerIndex, [name]: snapshot() });
    setSaveName('');
    flash(`Saved “${name}”`);
  };

  const copyShareLink = async () => {
    const json = JSON.stringify(snapshot());
    const b64 = btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const url = `${window.location.origin}${window.location.pathname}#o=${b64}`;
    try {
      await navigator.clipboard.writeText(url);
      flash('Share link copied — anyone with it sees this exact offer');
    } catch {
      window.location.hash = `o=${b64}`;
      flash('Link set in the address bar — copy it from there');
    }
  };

  const pullPhotos = async (optionId: string, url: string) => {
    setGalleryBusy((p) => ({ ...p, [optionId]: true }));
    try {
      const r = await fetch(`/api/live/hotel-photos?url=${encodeURIComponent(url)}`);
      const json = await r.json();
      if (Array.isArray(json.images)) {
        setGalleries((p) => ({ ...p, [optionId]: json.images }));
      }
    } catch {
      /* leave gallery empty */
    } finally {
      setGalleryBusy((p) => ({ ...p, [optionId]: false }));
    }
  };

  const [config, setConfig] = useState<Record<string, ComponentConfig>>(() =>
    Object.fromEntries(
      components.map((c) => [
        c.id,
        {
          enabled: c.defaultEnabled,
          optionId: c.defaultOptionId,
          customLabel: '',
          customPrice: '',
          customBasis: 'per_person' as const,
          split: false,
          assignments: {} as Record<string, Assignment>,
        },
      ])
    )
  );

  const patch = (id: string, p: Partial<ComponentConfig>) =>
    setConfig((prev) => ({ ...prev, [id]: { ...prev[id], ...p } }));

  const toggleSplit = (component: TripComponent) =>
    setConfig((prev) => {
      const cfg = prev[component.id];
      if (!cfg.split) {
        const def = fallbackAssignId(component, cfg);
        const assignments = { ...cfg.assignments };
        for (const t of travelers) {
          if (!assignments[t.id]) assignments[t.id] = { optionId: def };
        }
        return { ...prev, [component.id]: { ...cfg, split: true, assignments } };
      }
      return { ...prev, [component.id]: { ...cfg, split: false } };
    });

  const assign = (componentId: string, travelerId: string, a: Partial<Assignment>) =>
    setConfig((prev) => {
      const cfg = prev[componentId];
      const current = cfg.assignments[travelerId] ?? { optionId: NONE };
      return {
        ...prev,
        [componentId]: {
          ...cfg,
          assignments: { ...cfg.assignments, [travelerId]: { ...current, ...a } },
        },
      };
    });

  /* ---- split allocation: option-groups per split component ---- */
  const splitGroups: SplitGroup[] = useMemo(() => {
    const out: SplitGroup[] = [];
    for (const component of components) {
      const cfg = config[component.id];
      if (!cfg?.enabled || !cfg.split) continue;

      const byKey = new Map<string, Traveler[]>();
      for (const t of travelers) {
        const key = cfg.assignments[t.id]?.optionId ?? fallbackAssignId(component, cfg);
        const list = byKey.get(key);
        if (list) list.push(t);
        else byKey.set(key, [t]);
      }

      for (const [key, members] of byKey) {
        const k = members.length;
        if (key === NONE) {
          out.push({
            component, key,
            label: 'Own arrangement',
            shortLabel: 'Own',
            detail: `${k} traveler${k > 1 ? 's' : ''}, no package cost`,
            members, totalUSD: 0, vatUSD: 0,
            memberShare: Object.fromEntries(members.map((t) => [t.id, 0])),
          });
          continue;
        }
        if (key === CUSTOM) {
          const memberShare: Record<string, number> = {};
          let total = 0;
          for (const t of members) {
            const v = parseFloat(cfg.assignments[t.id]?.customPrice ?? '') || 0;
            memberShare[t.id] = v;
            total += v;
          }
          out.push({
            component, key,
            label: 'Custom price',
            shortLabel: 'Custom',
            detail: `${k} traveler${k > 1 ? 's' : ''}, manual per-person prices`,
            members, totalUSD: total, vatUSD: 0, memberShare,
          });
          continue;
        }
        const option = component.options.find((o) => o.id === key);
        if (!option) continue;
        const { qty, detail } = optionQuantity(option, k, nights, skiDays);
        const gross = option.price * qty * (option.currency === 'EUR' ? fx : 1);
        const vat = gross - gross / (1 + option.vatRate);
        const unitUSD = option.price * (option.currency === 'EUR' ? fx : 1);
        // Per-person units attribute exactly; pooled units (rooms, vans,
        // apartments, per-group) split evenly among the sharing travelers.
        const perMember =
          option.unit === 'per_person' ? unitUSD :
          option.unit === 'per_person_night' ? unitUSD * nights :
          option.unit === 'per_person_day' ? unitUSD * skiDays :
          gross / k;
        out.push({
          component, key,
          label: option.name,
          shortLabel: shortOptionLabel(option.name),
          detail,
          members, totalUSD: gross, vatUSD: vat,
          memberShare: Object.fromEntries(members.map((t) => [t.id, perMember])),
        });
      }
    }
    return out;
  }, [config, travelers, nights, skiDays, fx]);

  const anySplit = components.some((c) => config[c.id]?.enabled && config[c.id]?.split);

  const lines: Line[] = useMemo(() => {
    const out: Line[] = [];
    for (const component of components) {
      const cfg = config[component.id];
      if (!cfg?.enabled) continue;

      if (cfg.split) {
        for (const g of splitGroups.filter((g) => g.component.id === component.id)) {
          out.push({
            component,
            label: `${g.label} × ${g.members.length}`,
            detail: g.detail,
            totalUSD: g.totalUSD,
            vatUSD: g.vatUSD,
          });
        }
        continue;
      }

      if (cfg.optionId === CUSTOM) {
        const price = parseFloat(cfg.customPrice) || 0;
        const total = cfg.customBasis === 'per_person' ? price * people : price;
        out.push({
          component,
          label: cfg.customLabel || `${component.label} (custom)`,
          detail:
            cfg.customBasis === 'per_person'
              ? `${people} × ${fmtUSD2(price)} per person`
              : 'flat, whole group',
          totalUSD: total,
          vatUSD: 0,
        });
        continue;
      }

      if (cfg.optionId === LIVE && cfg.live) {
        const usd = cfg.live.price * (cfg.live.currency === 'EUR' ? fx : 1);
        const total =
          cfg.live.unit === 'per_person' ? usd * people : usd * people * nights;
        out.push({
          component,
          label: cfg.live.label,
          detail: `${cfg.live.detail} · ${cfg.live.source === 'amadeus' ? 'live' : 'reference'} pull`,
          totalUSD: total,
          vatUSD: 0,
        });
        continue;
      }

      const option = component.options.find((o) => o.id === cfg.optionId);
      if (!option) continue;
      const { qty, detail } = optionQuantity(option, people, nights, skiDays);
      const gross = option.price * qty * (option.currency === 'EUR' ? fx : 1);
      const vat = gross - gross / (1 + option.vatRate);
      out.push({ component, label: option.name, detail, totalUSD: gross, vatUSD: vat, option });
    }
    return out;
  }, [config, people, nights, skiDays, fx, splitGroups]);

  const realTotal = lines.reduce((s, l) => s + l.totalUSD, 0);

  /* ---- per-traveler attribution ----
     Split components: exact per-person units, pooled items split evenly among
     their sharing group. Non-split components: divided across all travelers. */
  const perTraveler = useMemo(() => {
    const nonSplitTotal = lines
      .filter((l) => !config[l.component.id]?.split)
      .reduce((s, l) => s + l.totalUSD, 0);
    const nonSplitShare = people > 0 ? nonSplitTotal / people : 0;
    return travelers.map((t) => {
      let total = nonSplitShare;
      const picks: string[] = [];
      for (const g of splitGroups) {
        if (t.id in g.memberShare) {
          total += g.memberShare[t.id];
          picks.push(g.shortLabel);
        }
      }
      return { traveler: t, total, picks };
    });
  }, [lines, splitGroups, travelers, people, config]);

  // travelerId → (componentId → shortLabel), for the print appendix.
  const assignmentTable = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    for (const g of splitGroups) {
      for (const t of g.members) {
        (map[t.id] ??= {})[g.component.id] = g.shortLabel;
      }
    }
    return map;
  }, [splitGroups]);

  const splitComponents = components.filter(
    (c) => config[c.id]?.enabled && config[c.id]?.split
  );
  const vatTotal = lines.reduce((s, l) => s + l.vatUSD, 0);
  const bufferedTotal = realTotal * buffer;
  const finalTotal = bufferedTotal * (1 + profitPct / 100);
  const perPersonReal = people > 0 ? realTotal / people : 0;
  const perPersonFinalRaw = people > 0 ? finalTotal / people : 0;
  const perPersonFinal = Math.ceil(perPersonFinalRaw / 10) * 10; // round up to $10
  const offeredTotal = perPersonFinal * people;
  const profitAbs = offeredTotal - realTotal;
  const marginOnOffer = offeredTotal > 0 ? (profitAbs / offeredTotal) * 100 : 0;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /* ---------- payment schedule (Crystal/WeSki-style: deposit + balance) ---------- */

  const paySchedule = useMemo(() => {
    const start = new Date(`${tripStart}T00:00:00`);
    if (Number.isNaN(start.getTime()) || offeredTotal <= 0) return null;
    const balanceDue = new Date(start);
    balanceDue.setDate(balanceDue.getDate() - 30);
    const deposit = Math.ceil((offeredTotal * 0.3) / 10) * 10;
    const balance = offeredTotal - deposit;
    const f = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return {
      departure: f(start),
      deposit,
      depositPP: Math.ceil(deposit / people),
      balance,
      balancePP: Math.floor(balance / people),
      balanceDue: f(balanceDue),
    };
  }, [tripStart, offeredTotal, people]);

  /* ---------- validation warnings (Tourplan-style omission catcher) ---------- */

  const warnings = useMemo(() => {
    const out: string[] = [];
    const allInStay =
      !config.hotel?.split && ['hotel-ucpa', 'hotel-clubmed'].includes(config.hotel?.optionId ?? '');
    if (allInStay && config.skipass?.enabled) {
      out.push('The selected stay already includes the lift pass — disable Ski pass to avoid double-counting.');
    }
    if (config.hotel?.optionId === 'hotel-ucpa' && !config.hotel?.split && config.rental?.enabled) {
      out.push('UCPA includes equipment — disable Rental to avoid double-counting.');
    }
    if (config.hotel?.optionId === 'hotel-clubmed' && !config.hotel?.split && config.skischool?.enabled) {
      out.push('Club Med includes group lessons — Ski school may be double-counted.');
    }
    const day = new Date(`${tripStart}T00:00:00`).getDay();
    if (day !== 6) {
      out.push(`Trip start ${tripStart} is not a Saturday — Val Thorens hotels and Ben's Bus run on Saturday changeovers.`);
    }
    if (people >= 10) {
      out.push("Group of 10+: request group rates (Ben's Bus from £80 return; SETAM group pass manifest).");
    }
    if (profitPct < 15) {
      out.push(`Profit is set to ${profitPct}% — below the 15% floor for a sustainable offer.`);
    }
    const wk = weekFor(tripStart);
    if (wk && (wk.band === 'peak' || wk.band === 'high')) {
      out.push(`${BAND_LABEL[wk.band]} week (${wk.flags.join(', ') || 'holiday period'}) — supplier baselines run well above the catalog reference prices; quote up or raise the buffer.`);
    }
    return out;
  }, [config, tripStart, people, profitPct]);

  /* ---------- print data assembly (contract for PrintOffer sections) ---------- */

  const printData: OfferPrintData = useMemo(() => {
    const wk = weekFor(tripStart);
    const groupsFor = (componentId: string): PrintServiceGroup[] => {
      const cfg = config[componentId];
      const component = components.find((c) => c.id === componentId);
      if (!component || !cfg?.enabled) return [];
      if (cfg.split) {
        return splitGroups
          .filter((g) => g.component.id === componentId)
          .map((g) => {
            const opt = component.options.find((o) => o.id === g.key);
            return {
              label: g.label,
              memberNames: g.members.map((m) => m.name),
              url: opt?.url,
              contact: opt?.contact,
            };
          });
      }
      const opt = component.options.find((o) => o.id === cfg.optionId);
      const label =
        cfg.optionId === CUSTOM
          ? cfg.customLabel || 'Custom arrangement'
          : cfg.optionId === LIVE && cfg.live
            ? cfg.live.label
            : opt?.name ?? '';
      return [{
        label,
        memberNames: travelers.map((t) => t.name),
        url: opt?.url,
        contact: opt?.contact,
      }];
    };

    const componentGroups = components
      .filter((c) => config[c.id]?.enabled)
      .map((c) => ({
        componentId: c.id,
        componentLabel: c.label,
        icon: c.icon,
        groups: groupsFor(c.id),
      }));

    const hotelCfg = config.hotel;
    const hotelOpt = hotelCfg?.enabled && !hotelCfg.split
      ? components.find((c) => c.id === 'hotel')?.options.find((o) => o.id === hotelCfg.optionId)
      : undefined;
    const passOpt = config.skipass?.enabled
      ? components.find((c) => c.id === 'skipass')?.options.find((o) => o.id === config.skipass.optionId)
      : undefined;
    const schoolOpt = config.skischool?.enabled
      ? components.find((c) => c.id === 'skischool')?.options.find((o) => o.id === config.skischool.optionId)
      : undefined;

    return {
      offerRef: `BV-${tripStart.replaceAll('-', '').slice(2)}-${people}P`,
      validUntil: new Date(Date.now() + 14 * 86_400_000).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      }),
      todayStr: today,
      offerTitle,
      clientName,
      personalNote,
      tripStart,
      nights,
      skiDays,
      people,
      travelerNames: travelers.map((t) => t.name),
      seasonNote: wk
        ? `${BAND_LABEL[wk.band]}${wk.flags.length ? ` · ${wk.flags.join(', ')}` : ''}${wk.note ? ` — ${wk.note}` : ''}`
        : undefined,
      lines: lines.map((l) => ({
        componentId: l.component.id,
        componentLabel: l.component.label,
        icon: l.component.icon,
        label: l.label,
        detail: l.detail,
        totalUSD: l.totalUSD,
        url: l.option?.url,
        description: l.option?.description,
      })),
      componentGroups,
      perTraveler: perTraveler.map((p) => ({
        name: p.traveler.name,
        totalUSD: p.total,
        picks: p.picks,
      })),
      anySplit: splitComponents.length > 0,
      pay: paySchedule,
      perPersonFinal,
      offeredTotal,
      hotel: hotelOpt
        ? { name: hotelOpt.name, url: hotelOpt.url, contact: hotelOpt.contact, lat: hotelOpt.lat, lon: hotelOpt.lon }
        : undefined,
      transferGroups: groupsFor('transfer'),
      arrivalGroups: groupsFor('flights'),
      skiSchool: schoolOpt ? { name: schoolOpt.name, url: schoolOpt.url } : undefined,
      skiPass: passOpt ? { name: passOpt.name, url: passOpt.url } : undefined,
      internal: {
        realTotal,
        vatTotal,
        buffer,
        bufferedTotal,
        profitPct,
        finalTotal,
        profitAbs,
        marginOnOffer,
      },
    };
  }, [
    tripStart, today, offerTitle, clientName, personalNote, nights, skiDays, people,
    travelers, lines, splitGroups, splitComponents, perTraveler, paySchedule,
    perPersonFinal, offeredTotal, config, realTotal, vatTotal, buffer, bufferedTotal,
    profitPct, finalTotal, profitAbs, marginOnOffer,
  ]);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f]">
      {/* ======== SCREEN UI ======== */}
      <div className={cn('print:hidden', printPreview && 'hidden')}>
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold tracking-tight">BONVO.SKI</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                Internal — Trip Builder
              </span>
              <a
                href="/ops/planner"
                className="hidden rounded-full bg-black/5 px-4 py-1.5 text-xs font-semibold text-[#494949] transition-colors hover:bg-black/10 sm:inline-block"
              >
                Scenario planner →
              </a>
            </div>
            <div className="relative flex items-center gap-3">
              <button
                onClick={() => setOffersOpen((v) => !v)}
                className="rounded-full bg-black/5 px-5 py-2.5 text-sm font-medium text-[#1d1d1f] transition-colors hover:bg-black/10"
              >
                💾 Offers{Object.keys(offerIndex).length > 0 ? ` (${Object.keys(offerIndex).length})` : ''}
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(99,102,241,0.35)] transition-transform hover:-translate-y-0.5"
              >
                Export offer as PDF
              </button>

              {offersOpen && (
                <div className="absolute right-0 top-14 z-50 w-96 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_60px_rgba(29,29,31,0.18)]">
                  <p className="text-sm font-bold">Saved offers</p>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder={offerTitle || 'Offer name'}
                      value={saveName}
                      onChange={(e) => setSaveName(e.target.value)}
                      className="min-w-0 flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
                    />
                    <button
                      onClick={saveOffer}
                      className="rounded-full bg-[#1d1d1f] px-4 py-2 text-sm font-medium text-white"
                    >
                      Save
                    </button>
                  </div>
                  <button
                    onClick={copyShareLink}
                    className="mt-2 w-full rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                  >
                    🔗 Copy share link for current offer
                  </button>
                  <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto">
                    {Object.entries(offerIndex)
                      .sort((a, b) => (a[1].savedAt < b[1].savedAt ? 1 : -1))
                      .map(([name, snap]) => (
                        <li key={name} className="flex items-center justify-between gap-2 rounded-xl border border-black/5 px-3 py-2">
                          <button
                            onClick={() => { applySnapshot(snap); setOffersOpen(false); flash(`Loaded “${name}”`); }}
                            className="min-w-0 flex-1 truncate text-left text-sm font-medium hover:text-indigo-600"
                            title={`Saved ${new Date(snap.savedAt).toLocaleString()}`}
                          >
                            {name}
                            <span className="block text-[11px] font-normal text-[#a1a1a6]">
                              {snap.travelers.length} pax · {new Date(snap.savedAt).toLocaleDateString()}
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              const next = { ...offerIndex };
                              delete next[name];
                              persistOffers(next);
                            }}
                            aria-label={`Delete ${name}`}
                            className="rounded-full px-2 py-1 text-xs text-[#a1a1a6] hover:bg-black/5 hover:text-red-500"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    {Object.keys(offerIndex).length === 0 && (
                      <li className="text-xs text-[#a1a1a6]">Nothing saved yet — offers live in this browser.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {toast && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#1d1d1f] px-5 py-2.5 text-sm text-white shadow-xl">
            {toast}
          </div>
        )}

        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-10 lg:grid-cols-[1fr_380px]">
          {/* -------- left column -------- */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Build a real-cost offer.
            </h1>
            <p className="mt-2 max-w-2xl text-[0.95rem] text-[#6e6e73]">
              Every option below is a real supplier offer researched online — with links,
              contacts, and gross (VAT-inclusive) consumer prices. Toggle components, pick
              variants or enter custom prices, set your buffer and profit, and export the
              client-facing offer as a PDF. This page is unlisted and not indexed.
            </p>

            {/* Trip parameters */}
            <div className="neo-card-sm mt-8 grid grid-cols-2 gap-4 p-6 md:grid-cols-4">
              <NumberField label="Travelers" value={people} onChange={setPeopleCount} min={1} />
              <NumberField label="Hotel nights" value={nights} onChange={(v) => setNights(Math.max(1, v))} min={1} />
              <NumberField label="Ski days" value={skiDays} onChange={(v) => setSkiDays(Math.max(1, v))} min={1} />
              <NumberField label="EUR → USD rate" value={fx} onChange={setFx} min={0.5} step={0.01} />
            </div>

            {/* Traveler roster */}
            <details className="neo-card-sm mt-4 p-5">
              <summary className="cursor-pointer text-sm font-semibold">
                👥 Travelers — {people}
                <span className="ml-2 font-normal text-[#a1a1a6]">
                  name them for per-person planning
                </span>
              </summary>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {travelers.map((t) => (
                  <div key={t.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => renameTraveler(t.id, e.target.value)}
                      className="min-w-0 flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeTraveler(t.id)}
                      disabled={travelers.length <= 1}
                      aria-label={`Remove ${t.name}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-sm text-[#6e6e73] transition-colors hover:bg-black/10 disabled:opacity-40"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPeopleCount(people + 1)}
                className="mt-3 rounded-full bg-black/5 px-4 py-1.5 text-xs font-semibold text-[#494949] transition-colors hover:bg-black/10"
              >
                + Add traveler
              </button>
            </details>

            {/* When to go — researched season bands; picking a week sets departure */}
            <WhenToGo selected={tripStart} onSelect={setTripStart} />

            {/* Components */}
            {components.map((component) => {
              const cfg = config[component.id];
              return (
                <section key={component.id} className="mt-10">
                  <div className="flex items-center justify-between">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={cfg.enabled}
                        onChange={(e) => patch(component.id, { enabled: e.target.checked })}
                        className="h-5 w-5 accent-indigo-500"
                      />
                      <span className="text-xl font-bold tracking-tight">
                        {component.icon} {component.label}
                      </span>
                    </label>
                    <span className="flex items-center gap-3">
                      {cfg.enabled && (
                        <button
                          type="button"
                          onClick={() => toggleSplit(component)}
                          className={cn(
                            'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                            cfg.split
                              ? 'bg-indigo-500 text-white'
                              : 'bg-black/5 text-[#494949] hover:bg-black/10'
                          )}
                        >
                          {cfg.split ? '👥 Split: on' : 'Split per traveler'}
                        </button>
                      )}
                      {component.id === 'hotel' && cfg.enabled && !cfg.split && (
                        <button
                          type="button"
                          onClick={() => setShowMap((v) => !v)}
                          className="rounded-full bg-black/5 px-4 py-1.5 text-xs font-semibold text-[#494949] transition-colors hover:bg-black/10"
                        >
                          {showMap ? 'Hide map' : 'Show map'}
                        </button>
                      )}
                      <span className="hidden text-xs font-medium uppercase tracking-wide text-[#a1a1a6] sm:inline">
                        {component.unitHint}
                      </span>
                    </span>
                  </div>

                  {component.id === 'hotel' && cfg.enabled && showMap && !cfg.split && (
                    <div className="mt-4">
                      <HotelMap
                        hotels={component.options
                          .filter((o) => o.lat != null && o.lon != null)
                          .map((o) => ({
                            id: o.id,
                            name: o.name.replace(/ ★+S?$/u, '').slice(0, 26),
                            lat: o.lat!,
                            lon: o.lon!,
                            priceLabel: `${o.currency === 'EUR' ? '€' : '$'}${o.price.toLocaleString()}`,
                            selected: cfg.optionId === o.id,
                          }))}
                        onSelectHotel={(id) => patch('hotel', { optionId: id })}
                        onPickOsmHotel={(pick) =>
                          patch('hotel', {
                            optionId: CUSTOM,
                            customLabel: `${pick.name}${pick.website ? ` · ${pick.website}` : ''} (picked on map)`,
                          })
                        }
                      />
                    </div>
                  )}

                  {!cfg.split && (
                  <div
                    className={cn(
                      'mt-4 grid gap-4',
                      !cfg.enabled && 'pointer-events-none opacity-40'
                    )}
                  >
                    {component.options.map((option) => {
                      const selected = cfg.optionId === option.id;
                      const { qty, detail } = optionQuantity(option, people, nights, skiDays);
                      const partyTotalUSD =
                        option.price * qty * (option.currency === 'EUR' ? fx : 1);
                      return (
                        <div
                          key={option.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => patch(component.id, { optionId: option.id })}
                          onKeyDown={(e) => e.key === 'Enter' && patch(component.id, { optionId: option.id })}
                          className={cn(
                            'flex cursor-pointer flex-col gap-4 rounded-2xl border bg-white p-4 text-left transition-all sm:flex-row',
                            selected
                              ? 'border-indigo-400 shadow-[0_14px_34px_-10px_rgba(99,102,241,0.35)] ring-2 ring-indigo-400'
                              : 'border-black/10 hover:border-black/25 hover:shadow-[0_10px_28px_-12px_rgba(29,29,31,0.18)]'
                          )}
                        >
                          {/* Photo */}
                          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-56 sm:self-stretch">
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 text-4xl">
                              {component.icon}
                            </div>
                            {option.imageUrl && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={option.imageUrl}
                                alt={option.name}
                                loading="lazy"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                            )}
                          </div>

                          {/* Details */}
                          <div className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-2">
                              <span className="text-base font-semibold">{option.name}</span>
                              {option.tier && (
                                <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                                  {option.tier}
                                </span>
                              )}
                            </span>
                            <p className="mt-1 text-sm leading-relaxed text-[#6e6e73]">
                              {option.description}
                            </p>
                            {option.note && (
                              <p className="mt-1.5 text-xs text-[#a1a1a6]">{option.note}</p>
                            )}
                            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                              {option.url && (
                                <a
                                  href={option.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="font-medium text-indigo-600 underline underline-offset-2 hover:text-indigo-800"
                                >
                                  Offer page ↗
                                </a>
                              )}
                              {option.contact && (
                                <span className="text-[#6e6e73]">{option.contact}</span>
                              )}
                              {option.url && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    pullPhotos(option.id, option.url!);
                                  }}
                                  disabled={galleryBusy[option.id]}
                                  className="rounded-full bg-black/5 px-3 py-1 font-semibold text-[#494949] transition-colors hover:bg-black/10 disabled:opacity-50"
                                >
                                  {galleryBusy[option.id] ? 'Pulling photos…' : '📷 Pull photos from site'}
                                </button>
                              )}
                            </p>

                            {(() => {
                              const gallery = [
                                ...(option.images ?? []),
                                ...(galleries[option.id] ?? []),
                              ].filter((u, i, a) => u !== option.imageUrl && a.indexOf(u) === i);
                              if (gallery.length === 0) return null;
                              return (
                                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                                  {gallery.slice(0, 10).map((src) => (
                                    <a
                                      key={src}
                                      href={src}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="shrink-0"
                                    >
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                        src={src}
                                        alt=""
                                        loading="lazy"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                                        }}
                                        className="h-16 w-24 rounded-lg object-cover shadow-sm transition-transform hover:scale-105"
                                      />
                                    </a>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>

                          {/* Price column */}
                          <div className="flex shrink-0 flex-row items-end justify-between gap-1 border-t border-black/5 pt-3 sm:w-44 sm:flex-col sm:justify-center sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0 sm:text-right">
                            <div>
                              <p className="text-lg font-bold tracking-tight">
                                {option.currency === 'EUR' ? '€' : '$'}
                                {option.price.toLocaleString()}
                              </p>
                              <p className="text-[11px] font-medium text-[#a1a1a6]">
                                {UNIT_LABEL[option.unit]}
                                {option.vatRate > 0
                                  ? ` · incl. ${Math.round(option.vatRate * 100)}% VAT`
                                  : ''}
                              </p>
                            </div>
                            <div className="sm:mt-2">
                              <p className="text-sm font-bold text-indigo-600">
                                {fmtUSD(partyTotalUSD)} total
                              </p>
                              <p className="text-[11px] text-[#a1a1a6]">{detail}</p>
                            </div>
                            <span
                              className={cn(
                                'mt-1 hidden rounded-full px-4 py-1.5 text-xs font-semibold sm:inline-block',
                                selected
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-black/5 text-[#6e6e73]'
                              )}
                            >
                              {selected ? 'Selected ✓' : 'Select'}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Custom option */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => patch(component.id, { optionId: CUSTOM })}
                      onKeyDown={(e) => e.key === 'Enter' && patch(component.id, { optionId: CUSTOM })}
                      className={cn(
                        'flex cursor-pointer flex-col rounded-2xl border border-dashed p-5 transition-all',
                        cfg.optionId === CUSTOM
                          ? 'border-indigo-400 bg-white shadow-[0_14px_34px_-10px_rgba(99,102,241,0.35)] ring-2 ring-indigo-400'
                          : 'border-black/20 bg-white/50 hover:bg-white'
                      )}
                    >
                      <span className="font-semibold">Custom</span>
                      <span className="mt-1 text-sm text-[#6e6e73]">
                        Manual price for a supplier you negotiated yourself.
                      </span>
                      {cfg.optionId === CUSTOM && (
                        <div className="mt-3 flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            placeholder="Label (e.g. Chalet XYZ direct deal)"
                            value={cfg.customLabel}
                            onChange={(e) => patch(component.id, { customLabel: e.target.value })}
                            className="rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
                          />
                          <div className="flex gap-2">
                            <input
                              type="number"
                              placeholder="Price USD"
                              value={cfg.customPrice}
                              onChange={(e) => patch(component.id, { customPrice: e.target.value })}
                              className="w-32 rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
                            />
                            <select
                              value={cfg.customBasis}
                              onChange={(e) =>
                                patch(component.id, {
                                  customBasis: e.target.value as ComponentConfig['customBasis'],
                                })
                              }
                              className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none"
                            >
                              <option value="per_person">per person</option>
                              <option value="total">total (whole group)</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  )}

                  {/* Per-traveler allocation matrix */}
                  {cfg.enabled && cfg.split && (
                    <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-sm font-semibold">Per-traveler assignment</p>
                        <p className="text-[11px] text-[#6e6e73]">
                          Rooms, vans, apartments and group items are pooled per option and split
                          evenly among the travelers sharing them.
                        </p>
                      </div>
                      <div className="mt-3 grid gap-2">
                        {travelers.map((t) => {
                          const a =
                            cfg.assignments[t.id] ?? { optionId: fallbackAssignId(component, cfg) };
                          return (
                            <div
                              key={t.id}
                              className="flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2"
                            >
                              <span className="w-28 truncate text-sm font-medium" title={t.name}>
                                {t.name}
                              </span>
                              <select
                                value={a.optionId}
                                onChange={(e) =>
                                  assign(component.id, t.id, { optionId: e.target.value })
                                }
                                className="min-w-0 flex-1 rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm focus:outline-none"
                              >
                                {component.options.map((o) => (
                                  <option key={o.id} value={o.id}>
                                    {o.name} — {o.currency === 'EUR' ? '€' : '$'}
                                    {o.price.toLocaleString()} {UNIT_LABEL[o.unit]}
                                  </option>
                                ))}
                                <option value={CUSTOM}>Custom price…</option>
                                <option value={NONE}>None — own arrangement</option>
                              </select>
                              {a.optionId === CUSTOM && (
                                <input
                                  type="number"
                                  placeholder="USD pp"
                                  value={a.customPrice ?? ''}
                                  onChange={(e) =>
                                    assign(component.id, t.id, { customPrice: e.target.value })
                                  }
                                  className="w-24 rounded-lg border border-black/10 px-2 py-1.5 text-sm focus:border-sky-400 focus:outline-none"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Live pulls for flights & hotels */}
                  {component.id === 'flights' && cfg.enabled && !cfg.split && (
                    <LiveFlightPanel
                      people={people}
                      selectedId={cfg.optionId === LIVE ? cfg.liveId ?? null : null}
                      onSelect={(o, source) =>
                        patch(component.id, {
                          optionId: LIVE,
                          liveId: o.id,
                          live: {
                            label: `${o.carrier} — ${o.stops === 0 ? 'nonstop' : `${o.stops} stop`}`,
                            detail: `${o.itinerary}`,
                            price: o.pricePerPerson,
                            currency: o.currency,
                            unit: 'per_person',
                            deepLink: o.deepLink,
                            source,
                          },
                        })
                      }
                    />
                  )}
                  {component.id === 'hotel' && cfg.enabled && !cfg.split && (
                    <LiveHotelPanel
                      people={people}
                      selectedId={cfg.optionId === LIVE ? cfg.liveId ?? null : null}
                      onSelect={(o, source) =>
                        patch(component.id, {
                          optionId: LIVE,
                          liveId: o.id,
                          live: {
                            label: `${o.name}${o.ratingHint ? ` (${o.ratingHint})` : ''}`,
                            detail: [o.roomDescription, o.boardType].filter(Boolean).join(' · ') || 'live rate',
                            price: o.perPersonPerNight,
                            currency: o.currency,
                            unit: 'per_person_night',
                            deepLink: o.deepLink,
                            source,
                          },
                        })
                      }
                    />
                  )}
                </section>
              );
            })}

            {/* Logistics */}
            <section className="mt-14">
              <h2 className="text-2xl font-bold tracking-tight">How this trip is actually assembled</h2>
              <div className="mt-5 space-y-4">
                {logistics.map((l) => (
                  <div key={l.step} className="neo-card-sm p-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">{l.step}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#494949]">{l.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* -------- right column: summary -------- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="neo-card p-7">
              <h2 className="text-lg font-bold tracking-tight">Offer summary</h2>

              {warnings.length > 0 && (
                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                  {warnings.map((w) => (
                    <p key={w} className="flex gap-1.5 py-0.5 text-xs leading-snug text-amber-800">
                      <span aria-hidden>⚠️</span> {w}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Offer title"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Client name (optional)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="rounded-xl border border-black/10 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
                />
              </div>

              <ul className="mt-5 space-y-2.5 border-t border-black/5 pt-4 text-sm">
                {lines.map((l, i) => (
                  <li key={`${l.component.id}-${i}`} className="flex items-baseline justify-between gap-3">
                    <span>
                      <span className="font-medium">{l.component.icon} {l.label}</span>
                      <span className="block text-xs text-[#a1a1a6]">{l.detail}</span>
                    </span>
                    <span className="whitespace-nowrap font-semibold">{fmtUSD(l.totalUSD)}</span>
                  </li>
                ))}
                {lines.length === 0 && (
                  <li className="text-sm text-[#a1a1a6]">Nothing enabled yet.</li>
                )}
              </ul>

              {anySplit && (
                <div className="mt-4 border-t border-black/5 pt-4">
                  <details open>
                    <summary className="cursor-pointer text-sm font-semibold text-indigo-600">
                      By traveler
                    </summary>
                    <ul className="mt-2 space-y-2 text-xs">
                      {perTraveler.map((pt) => (
                        <li key={pt.traveler.id} className="flex items-baseline justify-between gap-3">
                          <span className="min-w-0 text-[#494949]">
                            <span className="font-medium">{pt.traveler.name}</span>
                            <span className="block truncate text-[11px] text-[#a1a1a6]">
                              {pt.picks.join(', ') || 'shared services only'}
                            </span>
                          </span>
                          <span className="whitespace-nowrap font-semibold">{fmtUSD2(pt.total)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[10px] leading-relaxed text-[#a1a1a6]">
                      Shared rooms, vans, apartments and group items are split evenly among the
                      travelers using them; components without per-traveler split are divided
                      across everyone.
                    </p>
                  </details>

                  <div className="mt-3 space-y-1.5 text-[11px] text-[#6e6e73]">
                    <p className="text-xs font-semibold text-[#494949]">Shared services</p>
                    {splitComponents.map((c) => (
                      <p key={c.id} className="leading-relaxed">
                        {c.icon}{' '}
                        {splitGroups
                          .filter((g) => g.component.id === c.id)
                          .map(
                            (g) =>
                              `${g.shortLabel}: ${g.members
                                .slice(0, 2)
                                .map((m) => m.name)
                                .join(', ')}${g.members.length > 2 ? ` +${g.members.length - 2}` : ''}`
                          )
                          .join(' · ')}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-1.5 border-t border-black/5 pt-4 text-sm">
                <p className="flex justify-between">
                  <span className="text-[#6e6e73]">Real cost, {people} pax</span>
                  <span className="font-semibold">{fmtUSD(realTotal)}</span>
                </p>
                <p className="flex justify-between text-xs text-[#a1a1a6]">
                  <span>of which VAT (est.)</span>
                  <span>{fmtUSD2(vatTotal)}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-[#6e6e73]">Real cost per person</span>
                  <span className="font-semibold">{fmtUSD2(perPersonReal)}</span>
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/5 pt-4">
                <NumberField label="Cost buffer ×" value={buffer} onChange={setBuffer} min={1} step={0.05} />
                <NumberField label="Profit %" value={profitPct} onChange={setProfitPct} min={0} step={1} suffix="%" />
              </div>

              <div className="mt-5 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 p-5">
                <p className="flex justify-between text-sm">
                  <span className="text-[#6e6e73]">Proposed price / person</span>
                  <span className="text-xl font-bold tracking-tight">{fmtUSD(perPersonFinal)}</span>
                </p>
                <p className="mt-1 flex justify-between text-sm">
                  <span className="text-[#6e6e73]">Offer total ({people} pax)</span>
                  <span className="font-semibold">{fmtUSD(offeredTotal)}</span>
                </p>
                <p className="mt-2 flex justify-between text-xs text-[#6e6e73]">
                  <span>Gross profit vs real cost</span>
                  <span>
                    {fmtUSD(profitAbs)} ({marginOnOffer.toFixed(1)}% of offer)
                  </span>
                </p>
              </div>

              {/* Departure + payment schedule */}
              <div className="mt-5 border-t border-black/5 pt-4">
                <label className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
                  Departure (Saturday)
                  <input
                    type="date"
                    value={tripStart}
                    onChange={(e) => setTripStart(e.target.value)}
                    className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm font-normal normal-case tracking-normal"
                  />
                </label>
                {paySchedule && (
                  <div className="mt-3 space-y-1.5 rounded-xl bg-black/[0.03] p-3 text-xs">
                    <p className="flex justify-between">
                      <span className="text-[#6e6e73]">Deposit (30%) — due on booking</span>
                      <span className="font-semibold">{fmtUSD(paySchedule.deposit)} · {fmtUSD(paySchedule.depositPP)}/pp</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#6e6e73]">Balance — due {paySchedule.balanceDue}</span>
                      <span className="font-semibold">{fmtUSD(paySchedule.balance)} · {fmtUSD(paySchedule.balancePP)}/pp</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Personal note (Ski.com practice: say why you built it this way) */}
              <textarea
                placeholder="Personal note to the client — why this trip is built this way (goes on the PDF)"
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                rows={3}
                className="mt-4 w-full rounded-xl border border-black/10 px-3 py-2 text-xs leading-relaxed focus:border-sky-400 focus:outline-none"
              />

              <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-[#6e6e73]">
                <input
                  type="checkbox"
                  checked={includeInternal}
                  onChange={(e) => setIncludeInternal(e.target.checked)}
                  className="h-4 w-4 accent-indigo-500"
                />
                Include internal cost sheet in the PDF
              </label>

              <button
                onClick={() => window.print()}
                className="mt-4 w-full rounded-full bg-[#1d1d1f] px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Export offer as PDF
              </button>
              <p className="mt-2 text-center text-[11px] text-[#a1a1a6]">
                Uses your browser&apos;s print dialog — choose &ldquo;Save as PDF&rdquo;.
              </p>
            </div>

            <SnowPanel />
          </aside>
        </div>
      </div>

      {/* ======== PRINT / PDF VIEW (?printPreview=1 shows it on screen) ======== */}
      <div className={printPreview ? 'block bg-white' : 'hidden print:block'}>
        <PrintOffer data={printData} includeInternal={includeInternal} />
      </div>
    </div>
  );
}
