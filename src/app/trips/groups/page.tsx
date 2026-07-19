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
  title: 'Group Ski Trips to Europe — Friends, Clubs & Company Retreats',
  description:
    'Group ski weeks in the Alps with batch-bought ski passes at group rates, blocks of rooms in one hotel, private coach transfers, and one organizer-free booking for the whole crew.',
  alternates: { canonical: `${SITE_URL}/trips/groups` },
  openGraph: {
    title: 'Group Ski Trips to Europe',
    description:
      'Batch-bought group ski passes, room blocks, coach transfers — the whole crew, one booking.',
    url: `${SITE_URL}/trips/groups`,
  },
};

const included = [
  {
    title: 'Batch-bought ski passes at group rates',
    detail:
      'Alpine lift companies sell discounted group passes — typically from around 15-20 skiers. We buy your passes as one batch, pass the discount on, and hand them out at check-in.',
  },
  {
    title: 'A room block in one hotel',
    detail:
      'No one gets exiled to a hotel across the village. We reserve a block of rooms — or a full floor — so the group stays, eats, and starts every morning together.',
  },
  {
    title: 'Private coach from the airport',
    detail:
      'One flight window, one coach, everyone on it. The trip starts at the gate, not at the hotel.',
  },
  {
    title: 'Group dinners & one big table',
    detail:
      'Half-board with a standing group table, plus one organized mountain-hut dinner night — the evening everyone will still talk about in July.',
  },
  {
    title: 'Insurance for the whole roster',
    detail:
      'One group winter-sports policy covering every rider, so nobody discovers on the mountain that they skipped the checkbox.',
  },
  {
    title: 'A single organizer contact',
    detail:
      'One person from your group talks to one person at Bonvo. Rooming lists, dietary needs, late joiners — we absorb the chaos.',
  },
];

const faq = [
  {
    question: 'How big does the group need to be?',
    answer:
      'Group ski-pass rates at Alpine resorts typically start around 15-20 people, but our group packages make sense from about 8 — hotel and transfer economics kick in before the lift-pass discount does. The biggest groups we plan are 40+.',
  },
  {
    question: 'Does this work as a company retreat?',
    answer:
      'Very well. A January Alps week can cost less per head than a US city offsite once hotel bars and conference-center pricing are factored in. We can add a meeting room, a no-ski track for colleagues who prefer the spa, and one invoice for finance.',
  },
  {
    question: 'What if people ski at very different levels?',
    answer:
      'The giant interconnected Alpine areas are the answer: hundreds of kilometers of runs mean beginners, cruisers, and off-piste hunters all leave from the same gondola and meet for lunch at the same hut. We can add instructors or guides per sub-group.',
  },
  {
    question: 'How does payment work for a group?',
    answer:
      'One booking, then individual payment links per person if you want them — nobody has to chase 18 friends on Venmo. Prices are locked at booking for the whole group.',
  },
];

export default function GroupsPage() {
  return (
    <div className="min-h-screen">
      <Header navigation={tripsNav} />

      <HeroSection
        backgroundImage="/images/ski-lift.jpg"
        title="Take the Whole Crew to the Alps"
        subtitle="Friends' trips, ski clubs, and company retreats — batch-bought passes, one hotel, one coach, zero group-chat chaos"
      />

      <main>
        <SuperBlock>
          <TitleBlock
            title="Group Trips Die in the Group Chat"
            subtitle="Unless exactly one person is responsible — and that person is us"
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-gray-700">
              <p>
                Every group ski trip starts with twenty enthusiastic people and
                ends with six, because somebody had to compare hotels, count
                beds, collect deposits, and figure out lift tickets for a crew
                of mixed abilities. In the US, that job is brutal — and the
                per-person price at a destination resort makes half the group
                drop out anyway.
              </p>
              <p>
                Here is the better version. European lift companies actually
                like groups: they sell batch group passes at a discount,
                hotels hold room blocks with a group table at dinner, and one
                coach moves everyone from the airport to the snow. We do all
                of it under one booking, and the price per head usually comes
                in under what your friends paid for their last long weekend in
                Colorado.
              </p>
            </div>
          </div>
        </SuperBlock>

        <StatStrip
          stats={[
            { value: `$${landingPrices.groupFrom.toLocaleString()}`, label: 'per person, from — flights included' },
            { value: '8+', label: 'riders and the group pricing starts' },
            { value: '1', label: 'booking for the entire crew' },
          ]}
        />

        <SuperBlock>
          <TitleBlock title="What the Group Package Includes" subtitle="Designed so the trip organizer also gets a vacation" />
          <div className="container mx-auto px-4 pb-20">
            <IncludedList items={included} />
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock title="Questions Organizers Ask" />
          <div className="container mx-auto px-4 pb-20">
            <FAQBlock items={faq} />
          </div>
        </SuperBlock>

        <ContactCTA
          title="Rally the Crew"
          text="Tell us roughly how many of you there are and when you can escape. We'll send a group plan with per-person pricing you can paste straight into the group chat."
          buttonLabel="Get a group quote"
          emailSubject="Group ski trip — inquiry"
          secondaryLabel="See the flagship package"
          secondaryHref="/trips/val-thorens"
        />
      </main>

      <Footer />
    </div>
  );
}
