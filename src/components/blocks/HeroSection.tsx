'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HeroSectionProps } from '@/types';

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage,
  title,
  subtitle,
  className
}) => {
  return (
    <section className={cn(
      'relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden',
      className
    )}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      {(title || subtitle) && (
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {title && (
            <h1 className="text-hero text-white mb-6 drop-shadow-lg">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-subtitle text-white/90 drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white drop-shadow-lg"
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
