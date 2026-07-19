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
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-bold uppercase tracking-wide">Bonvo.Ski</p>
            <p className="mt-2 text-sm text-white/70">
              Maps for skiers and riders — and hand-built ski trips from the US
              to the European Alps.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
              Trips
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60 mb-4">
              Talk to us
            </p>
            <p className="text-sm text-white/80">
              Every trip starts with a conversation. Tell us your dates, your
              crew, and how you like to ride.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block text-sm font-medium text-white underline underline-offset-4 hover:text-white/80"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
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
