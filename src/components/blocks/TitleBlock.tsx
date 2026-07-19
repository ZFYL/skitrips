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
    <div className={cn('relative w-full pt-24 pb-14 text-center', className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-title mb-5 text-[#1d1d1f]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-subtitle mx-auto max-w-2xl text-[#6e6e73]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default TitleBlock;
