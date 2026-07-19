import React from 'react';
import { cn } from '@/lib/utils';
import { mailto } from '@/lib/site';

interface ContactCTAProps {
  title: string;
  text: string;
  buttonLabel: string;
  emailSubject: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

const ContactCTA: React.FC<ContactCTAProps> = ({
  title,
  text,
  buttonLabel,
  emailSubject,
  secondaryLabel,
  secondaryHref,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative w-full py-24 text-center bg-gradient-to-br from-blue-50 to-indigo-100',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-title text-black mb-6">{title}</h2>
        <p className="text-body-large text-gray-700 mb-8 max-w-2xl mx-auto">{text}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={mailto(emailSubject)}
            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {buttonLabel}
          </a>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              className="border border-black text-black px-8 py-3 rounded-lg font-medium hover:bg-black hover:text-white transition-colors"
            >
              {secondaryLabel}
            </a>
          )}
        </div>
        <p className="mt-6 text-sm text-gray-600">
          No payment now — we reply within one business day with a personal quote.
        </p>
      </div>
    </div>
  );
};

export default ContactCTA;
