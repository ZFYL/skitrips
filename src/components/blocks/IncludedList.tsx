import React from 'react';
import { cn } from '@/lib/utils';

export interface IncludedItem {
  title: string;
  detail: string;
}

interface IncludedListProps {
  items: IncludedItem[];
  className?: string;
}

const IncludedList: React.FC<IncludedListProps> = ({ items, className }) => {
  return (
    <div className={cn('grid gap-8 md:grid-cols-2', className)}>
      {items.map((item) => (
        <div key={item.title} className="neo-card flex gap-5 p-8">
          <span
            aria-hidden
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-base text-white shadow-[0_8px_20px_rgba(99,102,241,0.35)]"
          >
            ✓
          </span>
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[#1d1d1f]">{item.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-[#6e6e73]">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncludedList;
