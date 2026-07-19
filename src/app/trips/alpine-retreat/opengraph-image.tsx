import { renderOgImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Alpine Retreat — the Alps without the ski pass — Bonvo.Ski';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Alpine Retreat',
    title: 'The Alps, without the ski pass.',
    subtitle:
      'Spa hotels, mountain food, winter trails, and optional ski days — a slow high-altitude week, fully organized from the US.',
    accent: '#a5b4fc',
  });
}
