import React from 'react';
import { cn } from '@/lib/utils';

export interface ComparisonRow {
  label: string;
  us: string;
  europe: string;
}

interface ComparisonTableProps {
  usHeading: string;
  europeHeading: string;
  rows: ComparisonRow[];
  footnote?: string;
  className?: string;
}

// Apple-style spec comparison: two columns of big, short values with the
// spec label centered between rows. Keep row values SHORT — details belong
// in the footnote or surrounding prose, not in the cells.
const ComparisonTable: React.FC<ComparisonTableProps> = ({
  usHeading,
  europeHeading,
  rows,
  footnote,
  className,
}) => {
  return (
    <div className={cn('mx-auto max-w-3xl', className)}>
      {/* Column headers */}
      <div className="grid grid-cols-2 gap-6">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-[#6e6e73]">
          {usHeading}
        </p>
        <p className="text-gradient text-center text-sm font-semibold uppercase tracking-wide">
          {europeHeading}
        </p>
      </div>

      {rows.map((row) => (
        <div key={row.label} className="mt-10 first-of-type:mt-8">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[#a1a1a6]">
            {row.label}
          </p>
          <div className="mt-3 grid grid-cols-2 items-center gap-6">
            <p className="text-center text-xl font-medium tracking-tight text-[#6e6e73] md:text-2xl">
              {row.us}
            </p>
            <p className="text-center text-xl font-semibold tracking-tight text-[#1d1d1f] md:text-2xl">
              {row.europe}
            </p>
          </div>
        </div>
      ))}

      {footnote && (
        <p className="mt-12 text-center text-xs leading-relaxed text-[#a1a1a6]">{footnote}</p>
      )}
    </div>
  );
};

export default ComparisonTable;
