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
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12">
              <Image
                src={logo}
                alt="Bonvo Ski Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-black uppercase tracking-wide">
                BONVO.SKI
              </span>
              <span className="text-sm font-light text-black uppercase tracking-wide">
                Maps for skiers and riders
              </span>
            </div>
          </Link>

          {/* Navigation */}
          {navigation.length > 0 && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-gray-600',
                    item.isActive ? 'text-black' : 'text-gray-700'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile menu button (placeholder for future implementation) */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
