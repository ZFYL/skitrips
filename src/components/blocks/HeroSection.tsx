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
  actions,
  className
}) => {
  return (
    <div className="px-4 pt-24">
      <section className={cn(
        'relative mx-auto flex min-h-[82vh] w-full max-w-[1400px] items-center overflow-hidden rounded-[2.5rem]',
        'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950',
        'shadow-[0_40px_90px_rgba(29,29,31,0.35)]',
        className
      )}>
        {/* Ambient glows */}
        <div aria-hidden className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-indigo-500/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-48 -left-24 h-[30rem] w-[30rem] rounded-full bg-sky-400/15 blur-3xl" />

        {/* Content */}
        <div className="container relative z-10 mx-auto px-6 py-20 md:px-12">
          <div className={cn(
            'grid items-center gap-12',
            backgroundImage ? 'md:grid-cols-[1.15fr_0.85fr]' : ''
          )}>
            <div className={cn('text-center', backgroundImage && 'md:text-left')}>
              {title && (
                <h1 className="text-hero mb-6 text-white">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className={cn(
                  'text-subtitle text-white/75',
                  backgroundImage ? 'md:max-w-xl' : 'mx-auto max-w-3xl'
                )}>
                  {subtitle}
                </p>
              )}
              {actions && (
                <div className={cn(
                  'mt-10 flex flex-col items-center gap-4 sm:flex-row',
                  backgroundImage ? 'md:justify-start justify-center' : 'justify-center'
                )}>
                  {actions}
                </div>
              )}
            </div>

            {backgroundImage && (
              <div className="relative hidden w-full max-w-sm justify-self-center md:block">
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
                  className="aspect-[3/4] w-full rounded-[2rem] object-cover shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform">
          <div className="animate-bounce">
            <svg className="h-6 w-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
