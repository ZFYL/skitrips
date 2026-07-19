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

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  usHeading,
  europeHeading,
  rows,
  footnote,
  className,
}) => {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="py-4 pr-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Per person, 6 ski days
            </th>
            <th className="py-4 px-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {usHeading}
            </th>
            <th className="py-4 pl-4 text-sm font-semibold uppercase tracking-wide text-black">
              {europeHeading}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-gray-200">
              <td className="py-4 pr-4 font-medium text-black">{row.label}</td>
              <td className="py-4 px-4 text-gray-700">{row.us}</td>
              <td className="py-4 pl-4 font-semibold text-black">{row.europe}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {footnote && <p className="mt-4 text-xs text-gray-500">{footnote}</p>}
    </div>
  );
};

export default ComparisonTable;
