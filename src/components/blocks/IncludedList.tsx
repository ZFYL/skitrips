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
    <div className={cn('grid gap-6 md:grid-cols-2', className)}>
      {items.map((item) => (
        <div
          key={item.title}
          className="flex gap-4 rounded-lg border border-gray-200 bg-white p-6"
        >
          <span
            aria-hidden
            className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white text-sm"
          >
            ✓
          </span>
          <div>
            <h3 className="font-bold text-black">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-700">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncludedList;
