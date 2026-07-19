import React from 'react';
import { cn } from '@/lib/utils';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  items: FAQItem[];
  className?: string;
}

const FAQBlock: React.FC<FAQBlockProps> = ({ items, className }) => {
  return (
    <div className={cn('mx-auto max-w-3xl space-y-5', className)}>
      {items.map((item) => (
        <details key={item.question} className="group neo-card-sm p-7">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold tracking-tight text-[#1d1d1f]">
            {item.question}
            <span
              aria-hidden
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#6e6e73] shadow-[0_4px_12px_rgba(29,29,31,0.12)] transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-[#6e6e73]">{item.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQBlock;
