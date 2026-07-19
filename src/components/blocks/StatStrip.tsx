import React from 'react';
import { cn } from '@/lib/utils';

export interface Stat {
  value: string;
  label: string;
}

interface StatStripProps {
  stats: Stat[];
  className?: string;
}

// Pale tint per tile — the color is the accent, not the shadow.
const tints = [
  'bg-gradient-to-br from-sky-50 to-indigo-50',
  'bg-gradient-to-br from-violet-50 to-fuchsia-50',
  'bg-gradient-to-br from-amber-50 to-rose-50',
];

const StatStrip: React.FC<StatStripProps> = ({ stats, className }) => {
  return (
    <div className={cn('w-full py-16', className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col items-center justify-center rounded-[2rem] border border-black/[0.04] px-8 py-12 text-center shadow-[0_14px_34px_-14px_rgba(29,29,31,0.08)]',
                tints[i % tints.length]
              )}
            >
              <p className="text-gradient text-4xl font-bold tracking-tight md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-4 text-sm font-medium text-[#6e6e73]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatStrip;
