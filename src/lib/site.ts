// Central site configuration used by pages, metadata, and OG images.
export const SITE_URL = "https://www.skitrips.eu";
export const SITE_NAME = "Bonvo.Ski";
export const CONTACT_EMAIL = "hello@bonvo.ski";

export function mailto(subject: string): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

// Shared navigation for the trips section pages.
export const tripsNav = [
  { label: 'Why Europe', href: '/trips' },
  { label: 'Val Thorens Package', href: '/trips/val-thorens' },
  { label: 'Alpine Retreat', href: '/trips/alpine-retreat' },
  { label: 'Family', href: '/trips/family' },
  { label: 'Groups', href: '/trips/groups' },
];
