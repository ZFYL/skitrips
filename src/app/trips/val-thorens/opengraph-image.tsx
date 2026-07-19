import { renderOgImage, OG_SIZE } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Val Thorens ski package from the US — Bonvo.Ski';

export default function Image() {
  return renderOgImage({
    eyebrow: 'Flagship Package',
    title: 'Val Thorens: 7 nights, 600 km of pistes.',
    subtitle:
      'Flights from the US, 4-star half-board hotel, private transfers, 6-day Les 3 Vallées pass, and full ski insurance — one price.',
    accent: '#38bdf8',
  });
}
