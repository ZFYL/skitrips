import React from 'react';
import { cn } from '@/lib/utils';

export interface ItineraryDay {
  day: string;
  title: string;
  detail: string;
}

interface ItineraryTimelineProps {
  days: ItineraryDay[];
  className?: string;
}

const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ days, className }) => {
  return (
    <ol className={cn('space-y-6', className)}>
      {days.map((item) => (
        <li key={item.day} className="neo-card-sm p-8">
          <span className="inline-block rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_6px_16px_rgba(99,102,241,0.3)]">
            {item.day}
          </span>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#1d1d1f]">{item.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-[#6e6e73]">{item.detail}</p>
        </li>
      ))}
    </ol>
  );
};

export default ItineraryTimeline;
