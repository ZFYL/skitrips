import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface TripCard {
  href: string;
  badge: string;
  title: string;
  text: string;
  price: string;
  accent: 'sky' | 'violet' | 'amber' | 'emerald';
}

const accents = {
  sky: {
    badge: 'bg-sky-100 text-sky-700',
    glow: 'glow-sky',
    price: 'text-sky-600',
  },
  violet: {
    badge: 'bg-violet-100 text-violet-700',
    glow: 'glow-violet',
    price: 'text-violet-600',
  },
  amber: {
    badge: 'bg-amber-100 text-amber-700',
    glow: 'glow-peach',
    price: 'text-amber-600',
  },
  emerald: {
    badge: 'bg-emerald-100 text-emerald-700',
    glow: 'glow-mint',
    price: 'text-emerald-600',
  },
} as const;

interface TripCardGridProps {
  cards: TripCard[];
  className?: string;
}

const TripCardGrid: React.FC<TripCardGridProps> = ({ cards, className }) => {
  return (
    <div className={cn('grid gap-8 md:grid-cols-2', className)}>
      {cards.map((card) => {
        const accent = accents[card.accent];
        return (
          <Link
            key={card.href}
            href={card.href}
            className="neo-card group relative flex flex-col overflow-hidden p-9 transition-transform duration-200 hover:-translate-y-1"
          >
            {/* Pale glow in the card's corner — the story's underline */}
            <div aria-hidden className={cn('glow-blob -right-16 -top-16 h-56 w-56 opacity-70', accent.glow)} />
            <span
              className={cn(
                'relative z-10 self-start rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide',
                accent.badge
              )}
            >
              {card.badge}
            </span>
            <h3 className="relative z-10 mt-6 text-2xl font-bold tracking-tight text-[#1d1d1f] md:text-3xl">
              {card.title}
            </h3>
            <p className="relative z-10 mt-3 flex-1 text-[0.95rem] leading-relaxed text-[#6e6e73]">
              {card.text}
            </p>
            <p className="relative z-10 mt-8 flex items-center justify-between">
              <span className={cn('text-lg font-semibold tracking-tight', accent.price)}>
                {card.price}
              </span>
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-[0_8px_20px_rgba(29,29,31,0.12)] transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default TripCardGrid;
