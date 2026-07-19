import type { Metadata } from 'next';
import {
  Header,
  Footer,
  HeroSection,
  SuperBlock,
  TitleBlock,
  StatStrip,
  IncludedList,
  ItineraryTimeline,
  PriceCard,
  FAQBlock,
  ContactCTA,
} from '@/components';
import { tripsNav, SITE_URL } from '@/lib/site';
import { flagship } from '@/lib/packages';

export const metadata: Metadata = {
  title:
    'Val Thorens Ski Package from the US — 7 Nights, Flights, Hotel, Pass & Insurance',
  description:
    'A complete Val Thorens ski week for Americans: round-trip flights, private Geneva transfers, half-board hotel, 6-day Les 3 Vallées pass, and full ski insurance — from $4,490 per person.',
  alternates: { canonical: `${SITE_URL}/trips/val-thorens` },
  openGraph: {
    title: 'Val Thorens Ski Package from the US',
    description:
      '7 nights, 600 km of pistes, everything organized — flights, hotel, transfers, pass, insurance.',
    url: `${SITE_URL}/trips/val-thorens`,
  },
};

const included = [
  {
    title: 'Round-trip flights from the US',
    detail:
      'New York (JFK/EWR) to Geneva, with other US departure airports quoted on request. We book, monitor, and rebook if anything moves.',
  },
  {
    title: 'Geneva–Val Thorens transfers',
    detail:
      'About 2.5–3 hours door to door with an established Alps transfer operator — shared coach on the Classic package, private van on Signature. No rental car, no snow chains, no mountain driving.',
  },
  {
    title: '7 nights, half-board hotel',
    detail:
      'Classic: a warm 3-star like Le Val Chavière, five minutes from the lifts. Signature: 4-star ski-in/ski-out Fahrenheit Seven, on the slopes. Breakfast and a multi-course dinner every day, both tiers.',
  },
  {
    title: '6-day Les 3 Vallées ski pass',
    detail:
      'The full 600 km area — Val Thorens, Méribel, Courchevel. We batch-buy passes directly with the lift company, and yours is waiting at hotel check-in.',
  },
  {
    title: 'Full ski trip insurance',
    detail:
      'A US winter-sports travel policy (medical, evacuation, cancellation) plus Carré Neige on-piste rescue cover added to your pass — the piece US health insurance almost never handles.',
  },
  {
    title: 'Optional gear & lessons',
    detail:
      'Pre-booked 6-day ski or snowboard rental delivered to your hotel ski room, and English-speaking ESF instructors or off-piste guides — added to the same booking at local prices.',
  },
];

const itinerary = [
  {
    day: 'Day 1 — Friday',
    title: 'Overnight flight from New York',
    detail:
      'Evening departure from JFK or Newark to Geneva. Dinner on board, a few hours of sleep, and you wake up over the Alps.',
  },
  {
    day: 'Day 2 — Saturday',
    title: 'Land in Geneva, drive up to 2,300 m',
    detail:
      'Your driver meets you at arrivals. Three scenic hours later you check into the highest ski resort in Europe. Pass and lift map at the front desk; gear fitted in the hotel ski room. Early dinner, early night.',
  },
  {
    day: 'Days 3–5',
    title: 'Ski Val Thorens and the Belleville valley',
    detail:
      'Glacier runs, wide sunny boulevards, and the resort at your door. Skis on at 9:00, mountain-hut lunch at altitude, pool or sauna before dinner. Jet lag works in your favor — you will be first on the lifts.',
  },
  {
    day: 'Day 6',
    title: 'The big traverse: Méribel & Courchevel',
    detail:
      'Cross the full Trois Vallées and back in a day — the kind of distance no US resort can offer. Our 3D maps keep the route honest so you make the last lift home.',
  },
  {
    day: 'Days 7–8',
    title: 'Your mountains, your pace',
    detail:
      'Chase the powder from midweek snowfall, book a guide for the famous off-piste, or ski a half day and give the afternoon to the spa and the sun terraces.',
  },
  {
    day: 'Day 9 — Sunday',
    title: 'Down the mountain, home by evening',
    detail:
      'Morning transfer to Geneva, afternoon flight, and you land in New York the same day — legs tired, camera roll full.',
  },
];

const faq = [
  {
    question: 'Why Val Thorens and not a US resort?',
    answer:
      'Scale and price. Les 3 Vallées is about 600 km of connected pistes — several times the size of the biggest US resorts — and a 6-day pass costs roughly $450, less than two peak days at the Vail ticket window. At 2,300 m, Val Thorens is also among the most snow-sure resorts in the Alps from November to May.',
  },
  {
    question: 'What does "from $4,490" actually include?',
    answer:
      'Everything listed above: round-trip flights from New York, both airport transfers, 7 nights half-board, the 6-day Les 3 Vallées pass, and full insurance including on-piste rescue. The from-price applies to January and March departures in a shared double room; February holiday weeks and solo rooms are quoted individually.',
  },
  {
    question: 'How does the batch ski-pass buying work?',
    answer:
      'The Les 3 Vallées lift company sells passes to organized groups through its sales office, and we buy our travelers\' passes in batches directly with them. You skip the ticket-window entirely — your pass is an envelope with your name on it at hotel check-in.',
  },
  {
    question: 'I don\'t speak French. Is that a problem?',
    answer:
      'Not at all. Val Thorens is one of the most international resorts in the Alps — hotel staff, ski schools, and lift personnel work in English all season, and ESF has dedicated English-speaking instructors.',
  },
  {
    question: 'Can non-skiers or a mixed group join?',
    answer:
      'Yes. Partners who don\'t ski take our Alpine Retreat version of the same week — same hotel, no pass — and families get family-pass pricing on a dedicated package. Groups of 8+ get group rates.',
  },
  {
    question: 'How do I book?',
    answer:
      'You don\'t — yet. Email us your dates and party size, and we reply within one business day with a complete personal quote. Nothing is charged until you approve the final plan.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TouristTrip',
      name: 'Val Thorens Ski Week from the US',
      description:
        '7-night ski package from New York to Val Thorens, France: flights, transfers, half-board hotel, 6-day Les 3 Vallées ski pass, and full ski insurance.',
      touristType: 'Skiers and snowboarders from the United States',
      itinerary: {
        '@type': 'ItemList',
        itemListElement: itinerary.map((d, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: d.title,
        })),
      },
      offers: {
        '@type': 'Offer',
        price: flagship.priceFrom,
        priceCurrency: 'USD',
        availability: 'https://schema.org/PreOrder',
        url: `${SITE_URL}/trips/val-thorens`,
      },
      provider: {
        '@type': 'Organization',
        name: 'Bonvo.Ski',
        url: SITE_URL,
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ],
};

export default function ValThorensPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header navigation={tripsNav} />

      <HeroSection
        backgroundImage="/images/hero-snowboarder.jpg"
        title="Val Thorens, France"
        subtitle="7 nights at 2,300 meters. 600 km of pistes. One package, one price, everything handled."
      />

      <main>
        <SuperBlock>
          <TitleBlock
            title="The Highest Resort in Europe, Door to Door"
            subtitle="You board a plane in New York on Friday. Saturday afternoon you're checking into the snow."
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-gray-700">
              <p>
                Val Thorens sits at 2,300 meters at the head of the Belleville
                valley — the highest ski resort in Europe, snow-sure from
                November into May, and the front door to Les 3 Vallées: about
                600 kilometers of connected pistes across Val Thorens, Méribel,
                and Courchevel. For scale, that is more skiing than the largest
                US resorts combined, on a single lift pass that costs about
                $450 for six days.
              </p>
              <p>
                The catch has always been logistics: transatlantic flights, a
                mountain transfer in a country you may not know, French hotel
                booking, pass pickup, insurance that actually covers skiing.
                That is exactly the part we do for a living. You tell us your
                dates; we hand you a complete week with every leg confirmed —
                and our own 3D maps of the resort in your pocket.
              </p>
            </div>
          </div>
        </SuperBlock>

        <StatStrip
          stats={[
            { value: '600 km', label: 'of pistes on one 6-day pass' },
            { value: '2,300 m', label: 'resort altitude — snow-sure Nov–May' },
            { value: '≈ $450', label: 'the 6-day pass — under 2 peak days at Vail' },
          ]}
        />

        <SuperBlock>
          <TitleBlock
            title="Everything In the Package"
            subtitle="If it's part of getting you skiing, it's included"
          />
          <div className="container mx-auto px-4 pb-20">
            <IncludedList items={included} />
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock
            title="Your Week, Day by Day"
            subtitle="A Friday-to-Sunday pattern that costs you just five working days"
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto max-w-3xl">
              <ItineraryTimeline days={itinerary} />
            </div>
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock
            title="Where You Stay"
            subtitle="Hotels we know personally, not search-result roulette"
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-gray-700">
              <p>
                <strong>Classic tier</strong> — a friendly 3-star such as{' '}
                <strong>Le Val Chavière</strong> in the resort center: five
                minutes on foot to the lifts, a proper restaurant, and the
                half-board dinner that makes French ski hotels famous.
              </p>
              <p>
                <strong>Signature tier</strong> — the 4-star{' '}
                <strong>Fahrenheit Seven</strong>, ski-in/ski-out on the
                slopes, with its cult après-ski bar downstairs; or the
                chalet-style <strong>Le Sherpa</strong> with panoramic
                Trois Vallées views. Skis on at the door, last run ends at the
                ski room.
              </p>
              <p>
                Exact hotel and room type are confirmed on your personal quote
                — availability in Val Thorens moves fast, and we only promise
                rooms we can actually hold.
              </p>
            </div>
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock title="Two Ways to Do the Week" subtitle="Both all-in. The difference is how close your bed is to the snow." />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              <PriceCard
                name="Classic"
                price={`from $${flagship.priceFrom.toLocaleString()}`}
                priceNote="per person, double occupancy — flights included"
                highlights={[
                  'Round-trip flights NYC → Geneva',
                  'Shared coach transfer both ways',
                  '7 nights, 3-star hotel, half board',
                  '6-day Les 3 Vallées pass',
                  'Full ski insurance + Carré Neige rescue cover',
                ]}
                emailSubject="Val Thorens Classic package — trip inquiry"
              />
              <PriceCard
                featured
                name="Signature"
                price={`from $${flagship.signaturePriceFrom.toLocaleString()}`}
                priceNote="per person, double occupancy — flights included"
                highlights={[
                  'Round-trip flights NYC → Geneva',
                  'Private van transfer both ways',
                  '7 nights, 4-star ski-in/ski-out, half board',
                  '6-day Les 3 Vallées pass',
                  '6-day premium ski or snowboard rental',
                  'Full ski insurance + Carré Neige rescue cover',
                ]}
                emailSubject="Val Thorens Signature package — trip inquiry"
              />
            </div>
            <p className="mt-8 text-center text-sm text-gray-600">
              Family of four from ${flagship.familyPriceFrom.toLocaleString()} with
              family-pass pricing — see the{' '}
              <a href="/trips/family" className="underline underline-offset-4 font-medium text-black">
                Family Week
              </a>
              . {flagship.season} departures.
            </p>
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock
            title="Why We Can Price It Like This"
            subtitle="Batch buying, direct relationships, and no ticket windows"
          />
          <div className="container mx-auto px-4 pb-20">
            <div className="mx-auto max-w-3xl space-y-6 text-body-large text-gray-700">
              <p>
                Alpine lift companies, unlike their US counterparts, work with
                organized buyers: the Les 3 Vallées operator sells passes in
                batches to groups through its sales office, hotels hold
                half-board allotments for operators who fill them every season,
                and transfer companies price by the coach, not the seat. We
                aggregate our travelers into exactly those channels.
              </p>
              <p>
                The result: you pay one fixed package price that is typically
                well under a self-organized peak week in Colorado — and you
                never stand in a single line to make it happen.
              </p>
            </div>
          </div>
        </SuperBlock>

        <SuperBlock>
          <TitleBlock title="Questions Skiers Ask" />
          <div className="container mx-auto px-4 pb-20">
            <FAQBlock items={faq} />
          </div>
        </SuperBlock>

        <ContactCTA
          title="Your Week at 2,300 Meters Starts With One Email"
          text="Send us your dates, your departure airport, and who's coming. Within one business day you'll have a complete personal quote — flights, rooms, passes, insurance, one price."
          buttonLabel="Request my Val Thorens quote"
          emailSubject="Val Thorens package — trip inquiry"
          secondaryLabel="Compare all trip types"
          secondaryHref="/trips"
        />
      </main>

      <Footer />
    </div>
  );
}
