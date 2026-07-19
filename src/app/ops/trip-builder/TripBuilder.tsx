'use client';

import React, { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  components,
  logistics,
  UNIT_LABEL,
  type SupplierOption,
  type TripComponent,
} from '@/lib/tripBuilderData';
import type { LiveFlightOffer, LiveHotelOffer, LiveResponse } from '@/lib/live/types';

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

interface ComponentConfig {
  enabled: boolean;
  optionId: string; // option id, 'custom', or 'live'
  customLabel: string;
  customPrice: string; // USD, as typed
  customBasis: 'per_person' | 'total';
  live?: LiveSelection;
  liveId?: string;
}

interface Line {
  component: TripComponent;
  label: string;
  detail: string;
  totalUSD: number;
  vatUSD: number;
  option?: SupplierOption;
}

const CUSTOM = 'custom';
const LIVE = 'live';

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
  const [people, setPeople] = useState(2);
  const [nights, setNights] = useState(7);
  const [skiDays, setSkiDays] = useState(6);
  const [fx, setFx] = useState(1.1); // EUR → USD
  const [buffer, setBuffer] = useState(1.0);
  const [profitPct, setProfitPct] = useState(25);
  const [clientName, setClientName] = useState('');
  const [offerTitle, setOfferTitle] = useState('Val Thorens Ski Week — Les 3 Vallées');
  const [includeInternal, setIncludeInternal] = useState(false);

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
        },
      ])
    )
  );

  const patch = (id: string, p: Partial<ComponentConfig>) =>
    setConfig((prev) => ({ ...prev, [id]: { ...prev[id], ...p } }));

  const lines: Line[] = useMemo(() => {
    const out: Line[] = [];
    for (const component of components) {
      const cfg = config[component.id];
      if (!cfg?.enabled) continue;

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
  }, [config, people, nights, skiDays, fx]);

  const realTotal = lines.reduce((s, l) => s + l.totalUSD, 0);
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

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f]">
      {/* ======== SCREEN UI ======== */}
      <div className="print:hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold tracking-tight">BONVO.SKI</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                Internal — Trip Builder
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(99,102,241,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Export offer as PDF
            </button>
          </div>
        </header>

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
              <NumberField label="Travelers" value={people} onChange={(v) => setPeople(Math.max(1, v))} min={1} />
              <NumberField label="Hotel nights" value={nights} onChange={(v) => setNights(Math.max(1, v))} min={1} />
              <NumberField label="Ski days" value={skiDays} onChange={(v) => setSkiDays(Math.max(1, v))} min={1} />
              <NumberField label="EUR → USD rate" value={fx} onChange={setFx} min={0.5} step={0.01} />
            </div>

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
                    <span className="text-xs font-medium uppercase tracking-wide text-[#a1a1a6]">
                      {component.unitHint}
                    </span>
                  </div>

                  <div
                    className={cn(
                      'mt-4 grid gap-4 md:grid-cols-2',
                      !cfg.enabled && 'pointer-events-none opacity-40'
                    )}
                  >
                    {component.options.map((option) => {
                      const selected = cfg.optionId === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => patch(component.id, { optionId: option.id })}
                          className={cn(
                            'relative flex flex-col rounded-2xl border p-5 text-left transition-all',
                            selected
                              ? 'border-indigo-400 bg-white shadow-[0_14px_34px_-10px_rgba(99,102,241,0.35)] ring-2 ring-indigo-400'
                              : 'border-black/10 bg-white/70 hover:border-black/20 hover:bg-white'
                          )}
                        >
                          {option.imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={option.imageUrl}
                              alt=""
                              loading="lazy"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                              className="mb-4 h-36 w-full rounded-xl object-cover"
                            />
                          )}
                          <span className="flex items-start justify-between gap-3">
                            <span className="font-semibold">{option.name}</span>
                            {option.tier && (
                              <span className="shrink-0 rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                                {option.tier}
                              </span>
                            )}
                          </span>
                          <span className="mt-1 text-sm leading-relaxed text-[#6e6e73]">
                            {option.description}
                          </span>
                          <span className="mt-3 text-lg font-bold tracking-tight">
                            {option.currency === 'EUR' ? '€' : '$'}
                            {option.price.toLocaleString()}
                            <span className="ml-1.5 text-xs font-medium text-[#a1a1a6]">
                              {UNIT_LABEL[option.unit]}
                              {option.vatRate > 0
                                ? ` · incl. ${Math.round(option.vatRate * 100)}% VAT`
                                : ' · no VAT'}
                            </span>
                          </span>
                          {option.note && (
                            <span className="mt-1.5 text-xs text-[#a1a1a6]">{option.note}</span>
                          )}
                          <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
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
                          </span>
                        </button>
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

                  {/* Live pulls for flights & hotels */}
                  {component.id === 'flights' && cfg.enabled && (
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
                  {component.id === 'hotel' && cfg.enabled && (
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
                {lines.map((l) => (
                  <li key={l.component.id} className="flex items-baseline justify-between gap-3">
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
          </aside>
        </div>
      </div>

      {/* ======== PRINT / PDF VIEW ======== */}
      <div className="hidden print:block">
        <div className="mx-auto max-w-[720px] px-2 py-6 text-[#1d1d1f]">
          {/* Client-facing offer */}
          <div className="flex items-baseline justify-between border-b-2 border-[#1d1d1f] pb-4">
            <p className="text-2xl font-bold tracking-tight">BONVO.SKI</p>
            <p className="text-sm text-[#6e6e73]">Personal trip proposal · {today}</p>
          </div>

          <h1 className="mt-8 text-3xl font-bold tracking-tight">{offerTitle}</h1>
          {clientName && <p className="mt-1 text-base text-[#6e6e73]">Prepared for {clientName}</p>}
          <p className="mt-3 text-sm text-[#6e6e73]">
            {people} traveler{people > 1 ? 's' : ''} · {nights} nights · {skiDays} ski days · Val
            Thorens, Les 3 Vallées, France
          </p>

          <table className="mt-8 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/20 text-left">
                <th className="py-2 pr-4 font-semibold">Included in your trip</th>
                <th className="py-2 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.component.id} className="border-b border-black/10 align-top">
                  <td className="py-2.5 pr-4 font-medium">{l.component.icon} {l.component.label}</td>
                  <td className="py-2.5 text-[#494949]">
                    {l.label}
                    {l.option?.description ? ` — ${l.option.description}` : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 rounded-xl border-2 border-[#1d1d1f] p-5">
            <p className="flex justify-between text-lg font-bold">
              <span>Price per person</span>
              <span>{fmtUSD(perPersonFinal)}</span>
            </p>
            <p className="mt-1 flex justify-between text-sm text-[#494949]">
              <span>Total for {people} traveler{people > 1 ? 's' : ''}</span>
              <span>{fmtUSD(offeredTotal)}</span>
            </p>
            <p className="mt-2 text-xs text-[#6e6e73]">
              All listed components included. Price is all-in and VAT-inclusive where applicable;
              valid subject to availability at time of booking. Nothing is charged until you approve
              the final itinerary.
            </p>
          </div>

          <p className="mt-8 text-sm text-[#494949]">
            To confirm or adjust this proposal, reply to your Bonvo contact or write to
            hello@bonvo.ski. We answer within one business day.
          </p>

          {/* Internal cost sheet (optional) */}
          {includeInternal && (
            <div className="mt-10 border-t-2 border-dashed border-black/30 pt-6" style={{ breakBefore: 'page' }}>
              <p className="text-lg font-bold">Internal cost sheet — do not send to client</p>
              <table className="mt-4 w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b border-black/20 text-left">
                    <th className="py-1.5 pr-3 font-semibold">Component</th>
                    <th className="py-1.5 pr-3 font-semibold">Supplier / basis</th>
                    <th className="py-1.5 text-right font-semibold">Cost (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l) => (
                    <tr key={l.component.id} className="border-b border-black/10">
                      <td className="py-1.5 pr-3">{l.component.label}</td>
                      <td className="py-1.5 pr-3">{l.label} · {l.detail}</td>
                      <td className="py-1.5 text-right">{fmtUSD2(l.totalUSD)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 space-y-1 text-xs">
                <p className="flex justify-between"><span>Real cost total</span><span>{fmtUSD2(realTotal)}</span></p>
                <p className="flex justify-between"><span>Included VAT (est.)</span><span>{fmtUSD2(vatTotal)}</span></p>
                <p className="flex justify-between"><span>Buffer ×{buffer.toFixed(2)}</span><span>{fmtUSD2(bufferedTotal)}</span></p>
                <p className="flex justify-between"><span>Profit {profitPct}%</span><span>{fmtUSD2(finalTotal)}</span></p>
                <p className="flex justify-between font-semibold"><span>Offered (rounded)</span><span>{fmtUSD2(offeredTotal)}</span></p>
                <p className="flex justify-between font-semibold"><span>Gross profit</span><span>{fmtUSD2(profitAbs)} · {marginOnOffer.toFixed(1)}% of offer</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
