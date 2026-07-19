'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { HeroSectionProps } from '@/types';

// Maps a full-size /images/* path to its pre-sized card variant in /images/cards/.
function cardVariant(src: string): string {
  return src.replace('/images/', '/images/cards/');
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  title,
  subtitle,
  className
}) => {
  return (
    <section className={cn(
      'relative w-full min-h-[92vh] flex items-center overflow-hidden',
      'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950',
      className
    )}>
      {/* Ambient glows */}
      <div aria-hidden className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-indigo-500/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-48 -left-24 h-[30rem] w-[30rem] rounded-full bg-sky-400/10 blur-3xl" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className={cn(
          'grid items-center gap-12',
          backgroundImage ? 'md:grid-cols-[1.15fr_0.85fr]' : ''
        )}>
          <div className={cn('text-center', backgroundImage && 'md:text-left')}>
            {title && (
              <h1 className="text-hero text-white mb-6 drop-shadow-lg">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className={cn(
                'text-subtitle text-white/85 drop-shadow-md',
                backgroundImage ? 'md:max-w-xl' : 'max-w-3xl mx-auto'
              )}>
                {subtitle}
              </p>
            )}
          </div>

          {backgroundImage && (
            <div className="relative hidden md:block justify-self-center w-full max-w-sm">
              {/* Plain <img>, not next/image: an absolutely-positioned fill
                  image in this hero gets stuck as a blank first paint in
                  Chrome. A normal in-flow img paints reliably; the asset is a
                  pre-sized ~1024px card variant, so optimization adds nothing. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cardVariant(backgroundImage)}
                alt=""
                width={585}
                height={1024}
                className="w-full aspect-[3/4] object-cover rounded-3xl shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
