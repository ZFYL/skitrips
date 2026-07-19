import { renderOgImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Group ski trips to Europe — Bonvo.Ski';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Group Trips',
    title: 'Take the whole crew to the Alps.',
    subtitle:
      'Batch-bought group ski passes, one hotel, one coach, one booking — friends, clubs, and company retreats.',
    accent: '#34d399',
  });
}
