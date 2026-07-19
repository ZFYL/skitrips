'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TitleBlockProps } from '@/types';

const TitleBlock: React.FC<TitleBlockProps> = ({
  title,
  subtitle,
  className
}) => {
  return (
    <div className={cn(
      'relative w-full py-20 text-center',
      className
    )}>
      {/* Background overlay with drop shadow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent backdrop-blur-sm" />
      
      {/* Content with text shadow */}
      <div className="relative z-10 container mx-auto px-4">
        <h2 
          className="text-title text-black mb-4"
          style={{ textShadow: 'var(--shadow-text)' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p 
            className="text-subtitle text-gray-700"
            style={{ textShadow: 'var(--shadow-text)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Decorative line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-px bg-black/20" />
    </div>
  );
};

export default TitleBlock;
