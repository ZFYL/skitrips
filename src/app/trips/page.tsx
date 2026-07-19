import type { Metadata } from 'next';
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
    badge: 'Flagship',
    title: 'Val Thorens Week',
    text: `${flagship.nights} nights in the highest resort of Les 3 Vallées — the biggest connected ski area on Earth. Flights, 4-star half-board option, private transfers, 6-day pass, full insurance.`,
    price: `from $${flagship.priceFrom.toLocaleString()}`,
  },
  {
    href: '/trips/alpine-retreat',
    badge: 'No pass needed',
    title: 'Alpine Retreat',
    text: 'Same mountains, no ski pass required. Come for the air, the food, the spa, and the views — ski a day or two if the mood strikes.',
    price: `from $${landingPrices.retreatFrom.toLocaleString()}`,
  },
  {
    href: '/trips/family',
    badge: 'Family plan',
    title: 'Family Week',
    text: 'One booking, the whole crew sorted — family ski-pass pricing, kids’ lessons in English, connecting rooms, and a family-plan discount.',
    price: `4 people from $${landingPrices.familyFrom.toLocaleString()}`,
  },
  {
    href: '/trips/groups',
    badge: '8+ riders',
    title: 'Group Trip',
    text: 'Friends, ski clubs, and companies. We batch-buy ski passes at group rates and take over a floor of the hotel, not a corner of it.',
    price: `from $${landingPrices.groupFrom.toLocaleString()}`,
  },
];

export default function TripsPage() {
  return (
    <div className="min-h-screen">
      <Header navigation={tripsNav} />

      <HeroSection
        backgroundImage="/images/ski-lift.jpg"
        title="The math Americans don't hear often enough."
        subtitle="Peak-day lift tickets out west now pass $350. Six days in the Alps' biggest ski area costs about $450 — and we build the whole trip around it."
        actions={
          <Link href="/trips/val-thorens" className="pill-button pill-primary">
            See the flagship week
          </Link>
        }
      />

      <main>
        <SuperBlock>
          <TitleBlock
            title="Skiing in the US became a luxury product."
            subtitle="The Alps never did."
          />
          <div className="container mx-auto px-4 pb-10">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-[#494949]">
              <p>
                Every winter, millions of Americans pay some of the highest ski
                prices in the world: window lift tickets above $250 a day,
                slope-side rooms at $600 a night, $25 chairlift chili.
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
          </div>
        </SuperBlock>

        <SuperBlock>
          <div className="container mx-auto px-4 pb-16 pt-8">
            <div className="neo-card mx-auto max-w-4xl px-6 py-14 md:px-14">
              <ComparisonTable
                usHeading="Typical US week"
                europeHeading="Bonvo Alps week"
                rows={comparisonRows}
                footnote={comparisonFootnote}
              />
            </div>
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
            title="Pick your kind of week."
            subtitle="Four ways to do the Alps — all fully organized, all quoted personally."
          />
          <div className="container mx-auto px-4 pb-16">
            <div className="grid gap-8 md:grid-cols-2">
              {tripCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="neo-card group flex flex-col p-9 transition-transform duration-200 hover:-translate-y-1"
                >
                  <span className="self-start rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#6e6e73] shadow-[0_6px_16px_rgba(29,29,31,0.08)]">
                    {card.badge}
                  </span>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#1d1d1f] md:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-[#6e6e73]">
                    {card.text}
                  </p>
                  <p className="mt-8 flex items-center justify-between">
                    <span className="text-gradient text-lg font-semibold tracking-tight">
                      {card.price}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-[0_8px_20px_rgba(29,29,31,0.12)] transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock
            title="Built by people who ski these mountains."
            subtitle="Bonvo started as a 3D mapping project for European resorts."
          />
          <div className="container mx-auto px-4 pb-16">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-[#494949]">
              <p>
                We know these valleys lift by lift and slope by slope — which
                hotel is genuinely 40 meters from the gondola, which transfer
                company still shows up when it dumps half a meter overnight,
                and where to eat on the mountain without paying resort-tourist
                prices. That knowledge is what goes into every package.
              </p>
              <p>
                Every trip is quoted personally. Tell us your dates, your
                airports, and who&apos;s coming — we come back with a complete
                plan and a fixed price.
              </p>
            </div>
          </div>
        </SuperBlock>

        <ContactCTA
          title="Tell us about your winter."
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
