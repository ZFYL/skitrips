import Link from "next/link";
import {
  Header,
  Footer,
  HeroSection,
  TitleBlock,
  SuperBlock,
  StatStrip,
  ComparisonTable,
  ContactCTA,
} from '@/components';
import { flagship, landingPrices, comparisonRows, comparisonFootnote } from '@/lib/packages';

const tripCards = [
  {
    href: '/trips/val-thorens',
    badge: 'Flagship',
    title: 'Val Thorens Week',
    text: '7 nights at 2,300 m in Les 3 Vallées — the biggest connected ski area on Earth. Flights, hotel, transfers, pass, insurance.',
    price: `from $${flagship.priceFrom.toLocaleString()}`,
  },
  {
    href: '/trips/alpine-retreat',
    badge: 'No pass needed',
    title: 'Alpine Retreat',
    text: 'Same mountains, zero obligation to ski. Spa, mountain food, winter trails — and ski days on demand.',
    price: `from $${landingPrices.retreatFrom.toLocaleString()}`,
  },
  {
    href: '/trips/family',
    badge: 'Family plan',
    title: 'Family Week',
    text: 'Family-priced passes, kids’ lessons in English, connecting rooms, dinner included. One booking for the whole crew.',
    price: `4 people from $${landingPrices.familyFrom.toLocaleString()}`,
  },
  {
    href: '/trips/groups',
    badge: '8+ riders',
    title: 'Group Trip',
    text: 'Batch-bought group passes, a room block in one hotel, one coach from the airport. Zero group-chat chaos.',
    price: `from $${landingPrices.groupFrom.toLocaleString()}`,
  },
];

export default function Home() {
  const navigationItems = [
    { label: 'Val Thorens', href: '/trips/val-thorens', isActive: false },
    { label: 'Retreat', href: '/trips/alpine-retreat', isActive: false },
    { label: 'Family', href: '/trips/family', isActive: false },
    { label: 'Groups', href: '/trips/groups', isActive: false },
    { label: 'The App', href: '#app', isActive: false },
  ];

  return (
    <div className="min-h-screen">
      <Header navigation={navigationItems} />

      {/* Hero — trips first */}
      <HeroSection
        backgroundImage="/images/hero-snowboarder.jpg"
        title="Ski the Alps. Spend less than in Colorado."
        subtitle="Hand-built ski weeks from the US to Europe — flights, hotel, transfers, ski pass, and insurance in one package."
        actions={
          <>
            <Link href="/trips/val-thorens" className="pill-button pill-primary">
              See the Val Thorens week
            </Link>
            <Link href="/trips" className="pill-button pill-ghost-light">
              Why Europe wins
            </Link>
          </>
        }
      />

      <main>
        {/* Trip cards */}
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

        {/* Comparison — Apple spec style */}
        <SuperBlock>
          <TitleBlock
            title="The math, side by side."
            subtitle="A week out west versus a week in the biggest ski area on the planet."
          />
          <div className="container mx-auto px-4 pb-24">
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

        {/* Stats */}
        <StatStrip
          stats={[
            { value: '600 km', label: 'of connected pistes in Les 3 Vallées' },
            { value: '6 days', label: 'of skiing included in every package' },
            { value: '1 email', label: 'to start planning your trip' },
          ]}
        />

        {/* The app */}
        <SuperBlock>
          <section id="app">
            <TitleBlock
              title="Built on our own 3D maps."
              subtitle="Bonvo started as a 3D mapping project for European resorts — that knowledge is in every trip."
            />
          </section>
          <div className="container mx-auto px-4 pb-24">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="neo-card overflow-hidden p-9">
                <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  Navigate resorts in 3D
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#6e6e73]">
                  Live navigation, lift and slope search, elevation profiles,
                  and snowboarder-friendly flat-section warnings. Know the
                  mountain before you land — and never miss the last lift home.
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cards/search-hero.jpg"
                  alt="Bonvo 3D map illustration — rider checking the resort map"
                  width={585}
                  height={1024}
                  loading="lazy"
                  className="mt-8 aspect-[4/3] w-full rounded-[1.5rem] object-cover object-top shadow-[0_20px_50px_rgba(29,29,31,0.18)]"
                />
              </div>
              <div className="neo-card overflow-hidden p-9">
                <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  Find the good places
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-[#6e6e73]">
                  Mountain-hut restaurants, sun terraces, events, and the runs
                  your level actually enjoys. Every Bonvo trip ships with our
                  maps in your pocket — so you ski like you know the valley.
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cards/ski-lift.jpg"
                  alt="Bonvo app illustration — rider on a chairlift with the map open"
                  width={585}
                  height={1024}
                  loading="lazy"
                  className="mt-8 aspect-[4/3] w-full rounded-[1.5rem] object-cover object-top shadow-[0_20px_50px_rgba(29,29,31,0.18)]"
                />
              </div>
            </div>
          </div>
        </SuperBlock>

        {/* Final Call to Action */}
        <ContactCTA
          title="Tell us about your winter."
          text="Send us your rough dates and who's coming. Within one business day you'll have a complete, personally quoted trip plan — no obligation."
          buttonLabel="Start planning my trip"
          emailSubject="Ski trip to the Alps — trip inquiry"
          secondaryLabel="Explore the flagship week"
          secondaryHref="/trips/val-thorens"
        />
      </main>

      <Footer />
    </div>
  );
}
