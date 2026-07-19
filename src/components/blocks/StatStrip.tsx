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
    <div className={cn('w-full py-16', className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="neo-card flex flex-col items-center justify-center px-8 py-12 text-center"
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
