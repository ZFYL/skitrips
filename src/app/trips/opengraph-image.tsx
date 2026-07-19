import { renderOgImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Ski trips to Europe for Americans — Bonvo.Ski';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Ski Trips to Europe',
    title: 'Ski the Alps. Spend less than in Colorado.',
    subtitle:
      'Flights, hotel, transfers, ski pass, and insurance — one hand-built package from the US to the biggest ski areas on Earth.',
  });
}
