import React from 'react';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/site';

const footerLinks = [
  { label: 'Ski Trips to Europe', href: '/trips' },
  { label: 'Val Thorens Package', href: '/trips/val-thorens' },
  { label: 'Alpine Retreat', href: '/trips/alpine-retreat' },
  { label: 'Family Trips', href: '/trips/family' },
  { label: 'Group Trips', href: '/trips/groups' },
];

const Footer: React.FC = () => {
  return (
    <footer className="px-4 pb-8 pt-4">
      <div className="neo-card mx-auto max-w-[1200px] px-8 py-14 md:px-14">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold tracking-tight text-[#1d1d1f]">BONVO.SKI</p>
            <p className="mt-3 text-sm leading-relaxed text-[#6e6e73]">
              Maps for skiers and riders — and hand-built ski trips from the US
              to the European Alps.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#a1a1a6]">
              Trips
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#494949] transition-colors hover:text-[#1d1d1f]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#a1a1a6]">
              Talk to us
            </p>
            <p className="text-sm leading-relaxed text-[#6e6e73]">
              Every trip starts with a conversation. Tell us your dates, your
              crew, and how you like to ride.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#1d1d1f] shadow-[0_8px_20px_rgba(29,29,31,0.1)] transition-transform hover:-translate-y-0.5"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-black/5 pt-6 text-xs text-[#a1a1a6]">
          <p>
            © {new Date().getFullYear()} Bonvo.Ski. Prices shown are indicative
            packages; every trip is quoted individually before you commit.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
