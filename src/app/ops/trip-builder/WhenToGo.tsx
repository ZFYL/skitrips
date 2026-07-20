'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BAND_LABEL, type Band, type SeasonWeek } from '@/lib/seasonData';

const BAND_STYLE: Record<Band, string> = {
  low: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  mid: 'bg-sky-100 text-sky-800 hover:bg-sky-200',
  high: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
  peak: 'bg-rose-100 text-rose-800 hover:bg-rose-200',
};

const BAND_DOT: Record<Band, string> = {
  low: 'bg-emerald-500',
  mid: 'bg-sky-500',
  high: 'bg-amber-500',
  peak: 'bg-rose-500',
};

interface WhenToGoProps {
  weeks: SeasonWeek[];
  selected: string; // YYYY-MM-DD Saturday
  onSelect: (weekStart: string) => void;
}

// Season-price/crowd strip — every Saturday-changeover week of 2026/27 with
// its researched band (school-holiday calendars + operator value guidance).
export default function WhenToGo({ weeks, selected, onSelect }: WhenToGoProps) {
  const selectedWeek = weeks.find((w) => w.start === selected);
  return (
    <div className="neo-card-sm mt-6 p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-bold">📅 When to go — season 2026/27</p>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(BAND_LABEL) as Band[]).map((b) => (
            <span key={b} className="flex items-center gap-1.5 text-[11px] text-[#6e6e73]">
              <span className={cn('h-2 w-2 rounded-full', BAND_DOT[b])} />
              {BAND_LABEL[b]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-1.5 overflow-x-auto pb-2">
        {weeks.map((w) => {
          const d = new Date(`${w.start}T00:00:00`);
          const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const isSel = w.start === selected;
          return (
            <button
              key={w.start}
              onClick={() => onSelect(w.start)}
              title={`${BAND_LABEL[w.band]}${w.flags.length ? ` · ${w.flags.join(', ')}` : ''}${w.note ? ` — ${w.note}` : ''}`}
              className={cn(
                'flex shrink-0 flex-col items-center rounded-xl px-2.5 py-2 text-[11px] font-semibold transition-all',
                BAND_STYLE[w.band],
                isSel && 'ring-2 ring-indigo-500 ring-offset-2'
              )}
            >
              {label}
              {w.flags.length > 0 && <span className="mt-0.5 text-[9px] font-medium opacity-70">{w.flags[0]}</span>}
            </button>
          );
        })}
      </div>

      {selectedWeek && (
        <p className="mt-2 text-xs text-[#6e6e73]">
          <span className="font-semibold">Week of {new Date(`${selectedWeek.start}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}:</span>{' '}
          {BAND_LABEL[selectedWeek.band]}
          {selectedWeek.flags.length > 0 && ` · ${selectedWeek.flags.join(' · ')}`}
          {selectedWeek.note && ` — ${selectedWeek.note}`}
        </p>
      )}
      <p className="mt-1 text-[10px] text-[#a1a1a6]">
        Bands from the official French zone-A/B/C calendar, UK term dates, and operator value guidance (researched Jul 2026). Clicking a week sets the departure date.
      </p>
    </div>
  );
}
