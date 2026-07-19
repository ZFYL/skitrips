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
      'relative w-full pt-20 pb-12 text-center',
      className
    )}>
      <div className="container mx-auto px-4">
        <h2 className="text-title text-black mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-subtitle text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="mx-auto mt-8 w-16 h-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600" />
      </div>
    </div>
  );
};

export default TitleBlock;
