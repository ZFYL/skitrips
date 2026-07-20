import React from 'react';
import type { OfferPrintData } from './printTypes';
import { pFmt } from './printTypes';

// Closing practical segments of the client PDF (rendered after the price box):
// what's not included, know-before-you-go facts, booking terms, how to confirm,
// and the footer. Print-safe: each box avoids page-break splits; no color relied on.

const ETIAS_URL = 'https://travel-europe.europa.eu/etias_en';
const ACCESS_URL = 'https://www.valthorens.com/en/access/';

// Optional add-on components, keyed by componentId, with the phrasing used when
// the component is absent from the offer's included lines.
const ADD_ONS: { id: string; text: string }[] = [
  { id: 'skipass', text: 'Lift pass — 6-day Les 3 Vallées pass, available as an add-on' },
  { id: 'rental', text: 'Equipment rental — skis, boots & helmet, available as an add-on' },
  { id: 'skischool', text: 'Ski school / lessons — available as an add-on' },
  { id: 'insurance', text: 'Travel insurance — please hold your own, or add a policy through us' },
];

export default function PrintExtras({ data }: { data: OfferPrintData }) {
  const d = data;

  const includedIds = new Set(d.lines.map((l) => l.componentId));

  const notIncluded: string[] = [];
  for (const a of ADD_ONS) {
    if (!includedIds.has(a.id)) notIncluded.push(a.text);
  }
  notIncluded.push('Lunches on the mountain, drinks & personal spending');
  notIncluded.push(
    'Tourist tax (taxe de séjour) — approx. €1.65–2.50 per person, per night, collected by the hotel at check-out',
  );
  const drivingArrival = d.arrivalGroups.some((g) => /car/i.test(g.label));
  if (drivingArrival) {
    notIncluded.push('Resort parking (covered/outdoor) if arriving by car — payable on site');
  }

  const carreCovered = d.lines.some(
    (l) =>
      l.componentId === 'insurance' &&
      /carr[eé]/i.test(`${l.componentLabel} ${l.label} ${l.detail}`),
  );

  const know: React.ReactNode[] = [
    <>
      <span className="font-medium text-[#1d1d1f]">Passport & entry.</span> US passports should be
      valid at least 3 months beyond your return date. The Schengen area is introducing{' '}
      <a
        href={ETIAS_URL}
        className="text-[#1d1d1f] underline decoration-black/30 underline-offset-2"
      >
        ETIAS travel authorisation
      </a>{' '}
      — check whether it applies to your trip and apply online ahead of travel.
    </>,
    <>
      <span className="font-medium text-[#1d1d1f]">Saturday-to-Saturday.</span> Val Thorens runs a
      Saturday changeover — arrivals and departures fall on Saturdays, and lifts and roads are
      busiest that day.
    </>,
    <>
      <span className="font-medium text-[#1d1d1f]">Altitude.</span> The village sits at 2,300 m —
      Europe&apos;s highest ski resort. Drink plenty of water, go easy on alcohol the first evening,
      and take your first day gently.
    </>,
    <>
      <span className="font-medium text-[#1d1d1f]">Driving in winter.</span> Under France&apos;s Loi
      Montagne, winter tyres or snow chains are mandatory in the mountains from November to March. If
      you&apos;re driving, carry chains and check{' '}
      <a
        href={ACCESS_URL}
        className="text-[#1d1d1f] underline decoration-black/30 underline-offset-2"
      >
        resort access & road conditions
      </a>{' '}
      before you set off.
    </>,
    <>
      <span className="font-medium text-[#1d1d1f]">Staying connected.</span> EU roaming rules keep
      most European SIMs at home rates; US travelers may prefer a prepaid eSIM for data across
      France.
    </>,
    <>
      <span className="font-medium text-[#1d1d1f]">Power & adapters.</span> France uses Type E
      sockets at 230 V, 50 Hz — bring a suitable adapter and check dual-voltage on any US devices.
    </>,
  ];
  if (carreCovered) {
    know.splice(4, 0, (
      <>
        <span className="font-medium text-[#1d1d1f]">Piste rescue.</span> Your Carré Neige cover is
        active with the lift pass — on-piste rescue and helicopter evacuation are arranged with no
        upfront payment. Carry your pass while skiing.
      </>
    ));
  }

  return (
    <div>
      {/* Not included */}
      <h2 className="mt-8 text-lg font-bold">Not included</h2>
      <ul className="mt-2 space-y-1 text-sm text-[#494949]" style={{ breakInside: 'avoid' }}>
        {notIncluded.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-[#a1a1a6]">·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Know before you go */}
      <h2 className="mt-8 text-lg font-bold">Know before you go</h2>
      <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-[#494949]">
        {know.map((node, i) => (
          <p key={i} className="leading-relaxed" style={{ breakInside: 'avoid' }}>
            {node}
          </p>
        ))}
      </div>

      {/* Booking terms */}
      <h2 className="mt-8 text-lg font-bold">Booking terms</h2>
      <div
        className="mt-2 rounded-xl bg-[#f5f5f7] p-5 text-sm text-[#494949]"
        style={{ breakInside: 'avoid' }}
      >
        <ul className="space-y-1.5">
          <li className="flex gap-2">
            <span className="text-[#a1a1a6]">·</span>
            <span>
              <span className="font-medium text-[#1d1d1f]">Deposit.</span> 30% due on booking
              {d.pay ? <> — {pFmt(d.pay.deposit)} ({pFmt(d.pay.depositPP)} per person)</> : null} to
              confirm and hold your services.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#a1a1a6]">·</span>
            <span>
              <span className="font-medium text-[#1d1d1f]">Balance.</span> Due 30 days before
              departure
              {d.pay ? (
                <>
                  {' '}
                  ({d.pay.balanceDue}) — {pFmt(d.pay.balance)} ({pFmt(d.pay.balancePP)} per person)
                </>
              ) : null}
              .
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#a1a1a6]">·</span>
            <span>
              <span className="font-medium text-[#1d1d1f]">Lift passes.</span> Free date change on
              lift passes up to your first ski day.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#a1a1a6]">·</span>
            <span>
              <span className="font-medium text-[#1d1d1f]">Cancellation.</span> Per French Alps group
              terms, hotel cancellation typically forfeits the deposit more than 30 days out, and the
              full amount within 30 days of arrival. Travel insurance is strongly recommended.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#a1a1a6]">·</span>
            <span>
              <span className="font-medium text-[#1d1d1f]">Prices.</span> Valid until {d.validUntil}{' '}
              (offer ref {d.offerRef}). All prices in USD and VAT-inclusive where applicable, subject
              to availability at time of booking.
            </span>
          </li>
        </ul>
      </div>

      {/* How to confirm */}
      <h2 className="mt-8 text-lg font-bold">How to confirm</h2>
      <ol className="mt-2 space-y-2 text-sm text-[#494949]" style={{ breakInside: 'avoid' }}>
        <li className="flex gap-3">
          <span className="font-semibold text-[#1d1d1f]">1.</span>
          <span>
            Reply to this email, or write to{' '}
            <a
              href="mailto:hello@bonvo.ski"
              className="text-[#1d1d1f] underline decoration-black/30 underline-offset-2"
            >
              hello@bonvo.ski
            </a>
            , quoting offer ref {d.offerRef}.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-[#1d1d1f]">2.</span>
          <span>
            We send your booking confirmation and a secure payment link for the 30% deposit.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-semibold text-[#1d1d1f]">3.</span>
          <span>
            You receive travel documents and the final itinerary about 2 weeks before departure.
          </span>
        </li>
      </ol>

      {/* Footer */}
      <p className="mt-10 border-t border-black/10 pt-4 text-center text-xs text-[#6e6e73]">
        Bonvo.Ski — hand-built ski trips to the European Alps · hello@bonvo.ski · Offer {d.offerRef}
      </p>
    </div>
  );
}
