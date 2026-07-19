import { renderOgImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Family ski trips to Europe — Bonvo.Ski';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Family Ski Week',
    title: 'The family ski week, solved.',
    subtitle:
      'Family-priced ski passes, kids lessons in English, connecting rooms, and dinner already on the table — one booking.',
    accent: '#fbbf24',
  });
}
