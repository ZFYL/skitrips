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
    <div className={cn('w-full px-4 py-20', className)}>
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-20 text-center shadow-[0_40px_90px_rgba(29,29,31,0.35)] md:px-16 md:py-24">
        <div aria-hidden className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-title mb-6 text-white">{title}</h2>
          <p className="text-body-large mx-auto mb-10 max-w-2xl text-white/75">{text}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={mailto(emailSubject)} className="pill-button pill-primary">
              {buttonLabel}
            </a>
            {secondaryLabel && secondaryHref && (
              <a href={secondaryHref} className="pill-button pill-ghost-light">
                {secondaryLabel}
              </a>
            )}
          </div>
          <p className="mt-8 text-sm text-white/50">
            No payment now — we reply within one business day with a personal quote.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;
