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
        'flex flex-col rounded-[2rem] p-9',
        featured
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-[0_30px_70px_rgba(29,29,31,0.4)]'
          : 'neo-card text-[#1d1d1f]',
        className
      )}
    >
      <p
        className={cn(
          'text-sm font-semibold uppercase tracking-wide',
          featured ? 'text-sky-300' : 'text-[#6e6e73]'
        )}
      >
        {name}
      </p>
      <p className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">{price}</p>
      <p className={cn('mt-2 text-sm', featured ? 'text-white/60' : 'text-[#a1a1a6]')}>
        {priceNote}
      </p>
      <ul className="mt-8 flex-1 space-y-4 text-[0.95rem]">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-3">
            <span
              aria-hidden
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]',
                featured
                  ? 'bg-white/15 text-sky-300'
                  : 'bg-gradient-to-br from-sky-500 to-indigo-500 text-white'
              )}
            >
              ✓
            </span>
            <span className={featured ? 'text-white/85' : 'text-[#494949]'}>{h}</span>
          </li>
        ))}
      </ul>
      <a
        href={mailto(emailSubject)}
        className={cn(
          'pill-button mt-9 text-center',
          featured ? 'bg-white text-[#1d1d1f] hover:bg-gray-100' : 'pill-primary'
        )}
      >
        {buttonLabel}
      </a>
    </div>
  );
};

export default PriceCard;
