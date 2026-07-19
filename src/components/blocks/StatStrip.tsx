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

const StatStrip: React.FC<StatStripProps> = ({ stats, className }) => {
  return (
    <div className={cn('w-full py-12 bg-black text-white', className)}>
      <div className="container mx-auto px-4">
        <div
          className="grid gap-8 text-center"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="mt-2 text-xs md:text-sm uppercase tracking-wide text-white/70">
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
