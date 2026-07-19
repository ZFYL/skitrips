import React from 'react';
import { cn } from '@/lib/utils';
import { mailto } from '@/lib/site';

interface PriceCardProps {
  name: string;
  price: string;
  priceNote: string;
  highlights: string[];
  emailSubject: string;
  buttonLabel?: string;
  featured?: boolean;
  className?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({
  name,
  price,
  priceNote,
  highlights,
  emailSubject,
  buttonLabel = 'Request this trip',
  featured = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border p-8',
        featured
          ? 'border-black bg-black text-white shadow-xl'
          : 'border-gray-200 bg-white text-black',
        className
      )}
    >
      <p
        className={cn(
          'text-sm font-semibold uppercase tracking-wide',
          featured ? 'text-white/70' : 'text-gray-500'
        )}
      >
        {name}
      </p>
      <p className="mt-4 text-4xl font-bold">{price}</p>
      <p className={cn('mt-1 text-sm', featured ? 'text-white/70' : 'text-gray-500')}>
        {priceNote}
      </p>
      <ul className="mt-6 space-y-3 text-sm flex-1">
        {highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden>✓</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <a
        href={mailto(emailSubject)}
        className={cn(
          'mt-8 rounded-lg px-6 py-3 text-center font-medium transition-colors',
          featured
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-black text-white hover:bg-gray-800'
        )}
      >
        {buttonLabel}
      </a>
    </div>
  );
};

export default PriceCard;
