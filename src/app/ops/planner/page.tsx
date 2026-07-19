import type { Metadata } from 'next';
import PlannerDashboard from './PlannerDashboard';

export const metadata: Metadata = {
  title: 'Trip Planner — Internal',
  description: 'Bonvo enterprise ski-trip scenario planner.',
  robots: { index: false, follow: false, nocache: true },
};

export default function PlannerPage() {
  return <PlannerDashboard />;
}
