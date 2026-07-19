'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { HorizontalContentBlockProps } from '@/types';

const HorizontalContentBlock: React.FC<HorizontalContentBlockProps> = ({
  leftContent,
  rightContent,
  className
}) => {
  return (
    <div className={cn(
      'w-full py-16',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="content-split">
          {/* Left Content - 30% */}
          <div className="flex items-center justify-center">
            {leftContent}
          </div>
          
          {/* Right Content - 70% */}
          <div className="flex flex-col justify-center space-y-6">
            {rightContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalContentBlock;
