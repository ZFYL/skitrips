'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SuperBlockProps } from '@/types';

const SuperBlock: React.FC<SuperBlockProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(
      'relative w-full bg-white',
      className
    )}>
      {/* Container for multiple content blocks */}
      <div className="relative">
        {children}
      </div>
      
      {/* Optional separator line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
};

export default SuperBlock;
