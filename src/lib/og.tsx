import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

interface OgImageOptions {
  eyebrow: string;
  title: string;
  subtitle: string;
  accent?: string;
}

// Shared 1200x630 OG card renderer used by every page's opengraph-image.tsx.
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  accent = '#38bdf8',
}: OgImageOptions): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 55%, #1e3a8a 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Bonvo.Ski
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: accent,
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 980,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <div style={{ width: 56, height: 4, background: accent }} />
          Ski trips from the US to the European Alps — bonvo.ski
        </div>
      </div>
    ),
    OG_SIZE
  );
}
