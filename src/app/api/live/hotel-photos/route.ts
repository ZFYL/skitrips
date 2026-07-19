import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Extracts image URLs (og:image + prominent <img>/srcset) from a supplier's
// public page, server-side — the "pull more photos" backend for hotel cards.
// SSRF guards: https only, hostname (no IP literals), no localhost/.local,
// 5s timeout, 1.5MB read cap, image extensions only.

const IMG_EXT = /\.(jpe?g|png|webp|avif)(\?|$)/i;
const BLOCK_PATH = /(logo|icon|sprite|favicon|placeholder|pixel|badge|payment|flag)/i;
const MAX_HTML = 1_500_000;

function isSafeUrl(u: URL): boolean {
  if (u.protocol !== 'https:') return false;
  const h = u.hostname;
  if (!h.includes('.')) return false;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(h)) return false;      // IPv4 literal
  if (h.includes(':')) return false;                       // IPv6 literal
  if (/(^|\.)(localhost|local|internal|lan)$/.test(h)) return false;
  return true;
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url') ?? '';
  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 });
  }
  if (!isSafeUrl(target)) {
    return NextResponse.json({ error: 'url not allowed' }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(target.toString(), {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BonvoTripBuilder/1.0)' },
      next: { revalidate: 3600 },
    });
    clearTimeout(timer);
    if (!res.ok) {
      return NextResponse.json({ error: `upstream ${res.status}`, images: [] });
    }
    const html = (await res.text()).slice(0, MAX_HTML);

    const found = new Set<string>();
    const push = (src: string | undefined) => {
      if (!src) return;
      try {
        const abs = new URL(src, target).toString();
        if (!IMG_EXT.test(abs) || BLOCK_PATH.test(abs)) return;
        if (!abs.startsWith('https://')) return;
        found.add(abs);
      } catch {
        /* skip malformed */
      }
    };

    // og:image / twitter:image
    for (const m of html.matchAll(
      /<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["']/gi
    )) push(m[1]);
    for (const m of html.matchAll(
      /<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["']/gi
    )) push(m[1]);

    // <img src> and lazy-load variants
    for (const m of html.matchAll(/<img[^>]+(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi))
      push(m[1]);

    // srcset — take the last (largest) candidate of each set
    for (const m of html.matchAll(/srcset=["']([^"']+)["']/gi)) {
      const parts = m[1].split(',').map((s) => s.trim().split(/\s+/)[0]);
      push(parts[parts.length - 1]);
    }

    return NextResponse.json({
      source: target.hostname,
      images: [...found].slice(0, 12),
    });
  } catch (e) {
    return NextResponse.json({
      error: e instanceof Error ? e.message : 'fetch failed',
      images: [],
    });
  }
}
