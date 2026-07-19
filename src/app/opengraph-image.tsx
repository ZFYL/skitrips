import { renderOgImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Bonvo.Ski — 3D ski maps and ski trips from the US to the Alps';

export default function Image() {
  return renderOgImage({
    eyebrow: '3D Maps & Trips',
    title: 'Navigate ski resorts in 3D. Then let us fly you there.',
    subtitle:
      '3D resort maps for skiers and riders — plus hand-built ski trip packages from the US to the European Alps.',
  });
}
