import type { Metadata } from 'next';
import TripBuilder from './TripBuilder';

export const metadata: Metadata = {
  title: 'Trip Builder — Internal',
  description: 'Internal Bonvo trip cost configurator.',
  robots: { index: false, follow: false, nocache: true },
};

export default function TripBuilderPage() {
  return <TripBuilder />;
}
