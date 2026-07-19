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
    <ol className={cn('relative space-y-8 border-l border-gray-300 pl-8', className)}>
      {days.map((item) => (
        <li key={item.day} className="relative">
          <span
            aria-hidden
            className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-black ring-4 ring-white"
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {item.day}
          </p>
          <h3 className="mt-1 text-lg font-bold text-black">{item.title}</h3>
          <p className="mt-1 text-body text-gray-700">{item.detail}</p>
        </li>
      ))}
    </ol>
  );
};

export default ItineraryTimeline;
