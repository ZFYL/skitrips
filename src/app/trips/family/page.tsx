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
  title: 'Family Ski Trips to Europe — One Booking, the Whole Crew Sorted',
  description:
    'Family ski weeks in the Alps with family ski-pass pricing, English-speaking kids lessons, connecting rooms, and half-board dinners. A US family of four often pays less than a Colorado week.',
  alternates: { canonical: `${SITE_URL}/trips/family` },
  openGraph: {
    title: 'Family Ski Trips to Europe',
    description:
      'Family pass pricing, kids lessons in English, connecting rooms, half-board dinners — one booking.',
    url: `${SITE_URL}/trips/family`,
  },
};

const included = [
  {
    title: 'Family ski-pass pricing',
    detail:
      'Alpine resorts sell real family passes — with the family formula, parents can pay the child rate. We handle the paperwork and your passes are at the hotel desk on arrival.',
  },
  {
    title: 'Kids ski school in English',
    detail:
      'Morning group lessons with English-speaking instructors, booked before you fly. Kids progress all week with the same teacher; you get four hours a day to actually ski.',
  },
  {
    title: 'Connecting family rooms',
    detail:
      'Hotels we have personally checked for family logistics: connecting rooms or family suites, ski rooms with boot warmers, and a table held for you at dinner every night.',
  },
  {
    title: 'Half-board dinners included',
    detail:
      'A five-course dinner is included every evening — no 8pm scramble to feed tired kids at resort-town restaurant prices.',
  },
  {
    title: 'Door-to-door private transfers',
    detail:
      'A van with child seats meets you at the airport. Car seats, luggage, and cranky post-flight kids are all someone else’s driving problem.',
  },
  {
    title: 'Full family travel insurance',
    detail:
      'Medical, cancellation, and winter-sports coverage for every family member, including ski school and sledding.',
  },
];

const faq = [
  {
    question: 'Is a European ski week really cheaper for a family than a US one?',
    answer:
      'Frequently, yes — published estimates put a family-of-four Colorado ski week at roughly $10,000-11,000+ once lift tickets, lodging, rentals, and lessons are added up. The biggest driver is lift tickets: peak-day tickets at flagship US resorts have passed $350 per person per day, while big Alpine areas charge a fraction of that — and add family-pass discounts on top.',
  },
  {
    question: 'What ages does this work for?',
    answer:
      'From ski-kindergarten age (about 3-4) upward. Many Alpine resorts let the youngest kids ski free, ski schools take children from age 3, and hotels are used to multi-generation bookings — grandparents welcome, see our Alpine Retreat for the non-skiers.',
  },
  {
    question: 'What about school schedules and jet lag?',
    answer:
      'Most families fly an overnight east-coast departure, land in Europe mid-morning, and are in the hotel by afternoon — kids adjust in a day. A Saturday-to-Sunday pattern uses only five school days; we plan the calendar with you.',
  },
  {
    question: 'Do the kids need to speak French, Italian or German?',
    answer:
      'No. We book ski schools with dedicated English-language groups, and Alpine resort staff work in English all season. The only new vocabulary your kids will pick up is hot chocolate in three languages.',
  },
];

export default function FamilyPage() {
  return (
    <div className="min-h-screen">
      <Header navigation={tripsNav} />

      <HeroSection
        backgroundImage="/images/hero-snowboarder.jpg"
        title="The Family Ski Week, Solved"
        subtitle="One booking: flights, family rooms, kids' lessons in English, family-priced ski passes, and dinner already on the table"
      />

      <main>
        <SuperBlock>
          <TitleBlock
            title="A Colorado Family Week Now Costs Five Figures"
            subtitle="The Alps run on family pricing instead"
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-gray-700">
              <p>
                Add it up honestly — flights, a week of lodging, four sets of
                lift tickets, rentals, and a few days of ski school — and a US
                family ski week at a major resort lands around $10,000 to
                $11,000, and climbs fast from there. One published example: a
                family of four spent $847 for a single day at Vail.
              </p>
              <p>
                European ski culture was built by families, and the pricing
                shows it. Family ski passes let parents pay child rates, small
                kids often ski free, and half-board hotels mean dinner for four
                is already included. We package all of it — with the
                transatlantic logistics handled — into one booking and one
                fixed price.
              </p>
              <p>
                And because family plans deserve a family discount, every
                Bonvo family package of four or more is priced below the
                equivalent four individual packages. The bigger the crew, the
                better the math.
              </p>
            </div>
          </div>
        </SuperBlock>

        <StatStrip
          stats={[
            { value: `$${landingPrices.familyFrom.toLocaleString()}`, label: 'from, family of four — flights included' },
            { value: '4 hrs/day', label: 'of kids ski school while you ride' },
            { value: '7', label: 'nights with dinner included' },
          ]}
        />

        <SuperBlock>
          <TitleBlock title="What the Family Week Includes" subtitle="Built around the two hardest problems: logistics and dinner" />
          <div className="container mx-auto px-4 pb-20">
            <IncludedList items={included} />
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock title="Questions Parents Ask" />
          <div className="container mx-auto px-4 pb-20">
            <FAQBlock items={faq} />
          </div>
        </SuperBlock>

        <ContactCTA
          title="Bring the Whole Crew"
          text="Tell us ages, dates, and departure airport. We'll send a complete family plan — rooms, lessons, passes, transfers — with one all-in price and the family discount applied."
          buttonLabel="Plan our family week"
          emailSubject="Family ski week — trip inquiry"
          secondaryLabel="See what a full package includes"
          secondaryHref="/trips/val-thorens"
        />
      </main>

      <Footer />
    </div>
  );
}
