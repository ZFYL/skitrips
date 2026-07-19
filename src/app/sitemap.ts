import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1 },
    { path: '/trips', priority: 0.9 },
    { path: '/trips/val-thorens', priority: 0.9 },
    { path: '/trips/alpine-retreat', priority: 0.8 },
    { path: '/trips/family', priority: 0.8 },
    { path: '/trips/groups', priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }));
}
