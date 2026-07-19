import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Header,
  Footer,
  HeroSection,
  SuperBlock,
  TitleBlock,
  StatStrip,
  ComparisonTable,
  ContactCTA,
} from '@/components';
import { tripsNav, SITE_URL } from '@/lib/site';
import { flagship, landingPrices, comparisonRows, comparisonFootnote } from '@/lib/packages';

export const metadata: Metadata = {
  title: 'Ski Trips to Europe for Americans — Why the Alps Beat a US Ski Week',
  description:
    'A week in the Alps — flights, hotel, transfers, ski pass, and insurance included — often costs less than lift tickets and lodging alone in Colorado. See the math and our hand-built packages.',
  alternates: { canonical: `${SITE_URL}/trips` },
  openGraph: {
    title: 'Ski Trips to Europe for Americans',
    description:
      'Flights, hotel, transfers, ski pass, and insurance — often for less than a comparable US ski week.',
    url: `${SITE_URL}/trips`,
  },
};

const tripCards = [
  {
    href: '/trips/val-thorens',
    title: 'The Flagship: Val Thorens, France',
    text: `${flagship.nights} nights in the highest resort of Les 3 Vallées — the biggest connected ski area on Earth. Flights, 4-star half-board hotel, private transfers, 6-day pass, and full ski insurance.`,
    price: `from $${flagship.priceFrom.toLocaleString()} per person`,
  },
  {
    href: '/trips/alpine-retreat',
    title: 'The Alpine Retreat',
    text: 'Same mountains, no ski pass required. Come for the air, the food, the spa, and the views — ski a day or two if the mood strikes.',
    price: `from $${landingPrices.retreatFrom.toLocaleString()} per person`,
  },
  {
    href: '/trips/family',
    title: 'The Family Week',
    text: 'One booking, the whole crew sorted — family ski pass pricing, kids’ lessons in English, connecting rooms, and a discount on the family plan.',
    price: `family of four from $${landingPrices.familyFrom.toLocaleString()}`,
  },
  {
    href: '/trips/groups',
    title: 'The Group Trip',
    text: 'Friends, ski clubs, and companies. We batch-buy ski passes at group rates and take over a floor of the hotel, not a corner of it.',
    price: `from $${landingPrices.groupFrom.toLocaleString()} per person`,
  },
];

export default function TripsPage() {
  return (
    <div className="min-h-screen">
      <Header navigation={tripsNav} />

      <HeroSection
        backgroundImage="/images/ski-lift.jpg"
        title="Ski the Alps. Spend Less Than in Colorado."
        subtitle="Hand-built ski weeks from the US to Europe — flights, hotel, transfers, ski pass, and insurance in one package"
      />

      <main>
        <SuperBlock>
          <TitleBlock
            title="The Math Americans Don't Hear Often Enough"
            subtitle="A single peak-season day at a big US resort can cost more than $250 at the ticket window"
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-gray-700">
              <p>
                Every winter, millions of Americans pay some of the highest ski
                prices in the world: window lift tickets above $250 a day,
                slope-side rooms at $600 a night, $25 chairlift chili. Skiing in
                the US has quietly become a luxury product.
              </p>
              <p>
                Meanwhile, across the Atlantic, the largest ski areas on the
                planet — hundreds of miles of connected pistes — sell six-day
                passes for roughly the price of two days in Vail. Hotels serve
                five-course half-board dinners as the default, not the upgrade.
                And the après-ski was invented there.
              </p>
              <p>
                We build the whole trip for you — flights from the US, private
                airport transfers, a hotel we know personally, your ski pass
                waiting at check-in, and real winter-sports insurance. You pack.
                We handle everything else.
              </p>
            </div>
            <ComparisonTable
              className="mt-16"
              usHeading="Typical US ski week"
              europeHeading="Bonvo Alps week"
              rows={comparisonRows}
              footnote={comparisonFootnote}
            />
          </div>
        </SuperBlock>

        <StatStrip
          stats={[
            { value: '600 km', label: 'of connected pistes in Les 3 Vallées' },
            { value: '6 days', label: 'of skiing included in every package' },
            { value: '1 email', label: 'to start planning your trip' },
          ]}
        />

        <SuperBlock>
          <TitleBlock
            title="Pick Your Kind of Week"
            subtitle="Four ways to do the Alps — all fully organized, all quoted personally"
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="grid gap-8 md:grid-cols-2">
              {tripCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-lg border border-gray-200 bg-white p-8 transition-shadow hover:shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-black group-hover:underline underline-offset-4">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-body text-gray-700">{card.text}</p>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-black">
                    {card.price} →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </SuperBlock>

        <SuperBlock>
          <div className="container mx-auto px-4 py-20">
            <div className="content-split">
              <div className="relative w-full max-w-sm aspect-square">
                <Image
                  src="/images/hero-snowboarder.jpg"
                  alt="Snowboarder riding deep snow in the Alps"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-black">
                  Built by people who actually ski these mountains
                </h3>
                <p className="text-body text-gray-700">
                  Bonvo started as a 3D mapping project for European ski
                  resorts. We know these valleys lift by lift and slope by slope
                  — which hotel is genuinely 40 meters from the gondola, which
                  transfer company still shows up when it dumps half a meter
                  overnight, and where to eat on the mountain without paying
                  resort-tourist prices. That knowledge is what goes into every
                  package.
                </p>
                <p className="text-body text-gray-700">
                  Every trip is quoted personally. Tell us your dates, your
                  airports, and who&apos;s coming — we come back with a complete
                  plan and a fixed price.
                </p>
              </div>
            </div>
          </div>
        </SuperBlock>

        <ContactCTA
          title="Tell Us About Your Winter"
          text="Send us your rough dates and who's coming. Within one business day you'll have a complete, personally quoted trip plan — no obligation, no payment details."
          buttonLabel="Start planning my trip"
          emailSubject="Ski trip to the Alps — trip inquiry"
          secondaryLabel="See the flagship package"
          secondaryHref="/trips/val-thorens"
        />
      </main>

      <Footer />
    </div>
  );
}
