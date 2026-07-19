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
    <div className={cn('mx-auto max-w-3xl space-y-4', className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-lg border border-gray-200 bg-white p-6"
        >
          <summary className="cursor-pointer list-none font-bold text-black flex items-center justify-between gap-4">
            {item.question}
            <span
              aria-hidden
              className="text-gray-400 transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-body text-gray-700">{item.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQBlock;
