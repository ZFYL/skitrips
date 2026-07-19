import type { Metadata } from 'next';
import {
  Header,
  Footer,
  HeroSection,
  SuperBlock,
  TitleBlock,
  StatStrip,
  IncludedList,
  FAQBlock,
  ContactCTA,
} from '@/components';
import { tripsNav, SITE_URL } from '@/lib/site';
import { landingPrices } from '@/lib/packages';

export const metadata: Metadata = {
  title: 'Alpine Retreat — A Mountain Week in the Alps, No Ski Pass Required',
  description:
    'A slow week in a high-altitude Alpine village: spa, mountain restaurants, winter hiking, and optional ski days. Flights, hotel, and transfers organized end to end for US travelers.',
  alternates: { canonical: `${SITE_URL}/trips/alpine-retreat` },
  openGraph: {
    title: 'Alpine Retreat — the Alps Without the Ski Pass',
    description:
      'Spa, mountain food, winter hiking, and optional ski days. Fully organized from the US.',
    url: `${SITE_URL}/trips/alpine-retreat`,
  },
};

const included = [
  {
    title: 'Round-trip flights from the US',
    detail: 'We book and monitor your flights from your home airport to the Alps, with sane connections.',
  },
  {
    title: '7 nights in a spa hotel',
    detail: 'A hotel with a proper wellness floor — pools, saunas, treatment menu — and half-board dining included.',
  },
  {
    title: 'Private door-to-door transfers',
    detail: 'A driver meets you at arrivals. No rental car, no mountain-road driving, no chains.',
  },
  {
    title: 'Full travel insurance',
    detail: 'Medical, cancellation, and mountain-activity coverage for the whole stay — skiing included if you decide to try.',
  },
  {
    title: 'A week of non-ski mountain life',
    detail: 'Winter hiking routes, sledding evenings, mountain-hut lunches reachable by lift as a pedestrian, and our own 3D maps to find them.',
  },
  {
    title: 'Ski days on demand',
    detail: 'Wake up and feel like trying? We arrange a day pass, rental gear, and an instructor for that day only — pay per day, not per week.',
  },
];

const faq = [
  {
    question: 'Do I need to know how to ski at all?',
    answer:
      'No. In the Alps the village is the destination: lifts sell pedestrian tickets, mountain restaurants are reachable by gondola, and the spa culture is world-class. Skiing is one option among many, not the entry fee.',
  },
  {
    question: 'What does a typical day look like?',
    answer:
      'Slow breakfast, a gondola ride up for a two-hour panoramic hike, a long lunch on a sun terrace at 2,500 meters, then the pool and sauna before a five-course half-board dinner. Repeat, or swap in a market town day trip.',
  },
  {
    question: 'Can I mix a retreat with skiers in my group?',
    answer:
      'Yes — this is the classic setup. Skiers take the full package with a 6-day pass; non-skiers take the retreat version of the same hotel and week. You share the same table at dinner.',
  },
  {
    question: 'When is the best time to come?',
    answer:
      'January and March are the sweet spots: quieter villages, better hotel rates, and reliable snow at altitude. We avoid the mid-February European school-holiday crush unless your dates require it.',
  },
];

export default function AlpineRetreatPage() {
  return (
    <div className="min-h-screen">
      <Header navigation={tripsNav} />

      <HeroSection
        backgroundImage="/images/search-hero.jpg"
        title="The Alps, Without the Ski Pass"
        subtitle="A slow mountain week — spa, food, winter trails, and the option to ski only if you feel like it"
      />

      <main>
        <SuperBlock>
          <TitleBlock
            title="Not Everyone Comes for the Black Runs"
            subtitle="And the Alps figured that out a century before anyone else"
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-gray-700">
              <p>
                US ski resorts are built around one product: the lift ticket.
                If you don&apos;t ski, you wait in the condo. Alpine villages
                are different — they were spa towns, farming valleys, and
                mountaineering bases long before the first cable car. The
                result is a place where a non-skier has the better week:
                thermal pools, high-altitude sun terraces, groomed winter
                hiking trails, and some of the best regional cooking in
                Europe.
              </p>
              <p>
                The Alpine Retreat is our package for exactly that. We put you
                in a genuine spa hotel in a high village, organize every leg of
                the journey from your US doorstep, and hand you a week with no
                schedule. If one morning the snow looks too good to watch from
                a deckchair, we&apos;ll have skis, a pass, and an instructor
                arranged by the time you finish breakfast.
              </p>
            </div>
          </div>
        </SuperBlock>

        <StatStrip
          stats={[
            { value: `$${landingPrices.retreatFrom.toLocaleString()}`, label: 'per person, from — flights included' },
            { value: '0', label: 'ski passes you are forced to buy' },
            { value: '7', label: 'nights, half-board, spa included' },
          ]}
        />

        <SuperBlock>
          <TitleBlock title="What's In the Retreat" subtitle="Everything organized, nothing obligatory" />
          <div className="container mx-auto px-4 pb-20">
            <IncludedList items={included} />
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock title="Questions People Ask" />
          <div className="container mx-auto px-4 pb-20">
            <FAQBlock items={faq} />
          </div>
        </SuperBlock>

        <ContactCTA
          title="A Mountain Week on Your Terms"
          text="Tell us your dates and what a perfect day off looks like for you. We'll design the retreat around it and send a complete quote within one business day."
          buttonLabel="Plan my retreat"
          emailSubject="Alpine Retreat — trip inquiry"
          secondaryLabel="Compare with the ski package"
          secondaryHref="/trips/val-thorens"
        />
      </main>

      <Footer />
    </div>
  );
}
