'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = ({
  logo = '/images/logo.png',
  navigation = [],
  className
}) => {
  return (
    <header className={cn('fixed top-4 left-0 right-0 z-50 px-4', className)}>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full bg-white/80 pl-3 pr-6 shadow-[0_12px_40px_rgba(29,29,31,0.12)] backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 transition-colors hover:bg-black/5">
          <div className="relative h-9 w-9">
            <Image
              src={logo}
              alt="Bonvo Ski Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-base font-bold tracking-tight text-[#1d1d1f]">
            BONVO.SKI
          </span>
        </Link>

        {/* Navigation */}
        {navigation.length > 0 && (
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  item.isActive
                    ? 'bg-[#1d1d1f] text-white'
                    : 'text-[#1d1d1f]/80 hover:bg-black/5 hover:text-[#1d1d1f]'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile menu button (placeholder for future implementation) */}
        <button className="rounded-full p-2 hover:bg-black/5 md:hidden" aria-label="Menu">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
