'use client';

import React, { useEffect, useState } from 'react';
import type { SnowMonth } from '@/lib/resorts/types';

// Live resort conditions via Open-Meteo (free, keyless, CC-BY-4.0), pinned to
// the resort's base elevation so temperatures are honest.

interface Daily {
  time: string[];
  snowfall_sum: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

interface SnowPanelProps {
  name: string;
  lat: number;
  lon: number;
  elevationM: number;
  snowByMonth: SnowMonth[];
  snowFacts: string;
}

export default function SnowPanel({ name, lat, lon, elevationM, snowByMonth, snowFacts }: SnowPanelProps) {
  const [daily, setDaily] = useState<Daily | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setDaily(null);
    setErr(false);
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=snowfall_sum,temperature_2m_max,temperature_2m_min&forecast_days=7` +
      `&elevation=${Math.round(elevationM)}&timezone=auto`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setDaily(j.daily as Daily))
      .catch(() => setErr(true));
  }, [lat, lon, elevationM]);

  const maxBase = Math.max(1, ...snowByMonth.map((m) => m.base));

  return (
    <div className="neo-card-sm mt-6 p-6">
      <p className="text-sm font-bold">🌨️ {name} — live 7-day outlook</p>
      <p className="mt-0.5 text-[11px] text-[#a1a1a6]">
        Open-Meteo at {Math.round(elevationM)} m resort elevation · refreshed on load
      </p>
      {err && <p className="mt-3 text-xs text-[#a1a1a6]">Forecast unavailable right now.</p>}
      {daily && (
        <div className="mt-3 grid grid-cols-7 gap-1.5 text-center">
          {daily.time.map((t, i) => {
            const snow = daily.snowfall_sum[i] ?? 0;
            return (
              <div key={t} className="rounded-lg bg-white px-1 py-2 shadow-[0_4px_10px_rgba(29,29,31,0.06)]">
                <p className="text-[10px] font-semibold uppercase text-[#a1a1a6]">
                  {new Date(t + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className="mt-1 text-sm" aria-hidden>{snow > 0.5 ? '🌨️' : '☀️'}</p>
                <p className="mt-1 text-[11px] font-semibold text-sky-700">
                  {snow > 0 ? `${snow.toFixed(0)}cm` : '—'}
                </p>
                <p className="text-[10px] text-[#6e6e73]">
                  {Math.round(daily.temperature_2m_max[i])}°/{Math.round(daily.temperature_2m_min[i])}°
                </p>
              </div>
            );
          })}
        </div>
      )}
      {!daily && !err && <p className="mt-3 text-xs text-[#a1a1a6]">Loading forecast…</p>}

      {/* Historical monthly base depth */}
      {snowByMonth.length > 0 && (
        <div className="mt-5 border-t border-black/5 pt-4">
          <p className="text-xs font-semibold text-[#494949]">Average base depth by month</p>
          <div className="mt-2 flex items-end gap-2" aria-hidden>
            {snowByMonth.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-sky-700">{m.base}</span>
                <div
                  className="w-full rounded-t-[4px] bg-gradient-to-t from-sky-400 to-sky-200"
                  style={{ height: `${(m.base / maxBase) * 56}px` }}
                />
                <span className="text-[10px] text-[#a1a1a6]">{m.month}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-[#a1a1a6]">{snowFacts}</p>
        </div>
      )}
    </div>
  );
}
