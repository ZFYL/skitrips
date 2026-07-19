'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SuperBlockProps } from '@/types';

const SuperBlock: React.FC<SuperBlockProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('relative w-full', className)}>
      {children}
    </div>
  );
};

export default SuperBlock;
