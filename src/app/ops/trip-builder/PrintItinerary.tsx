import React from 'react';
import type { OfferPrintData, PrintServiceGroup } from './printTypes';

// "Your week, day by day" — a real, dated itinerary generated from the offer
// data. Rendered inside the client-facing PDF (print) view. All links are real
// hrefs so they stay clickable in the exported PDF, and every day block is
// break-safe for pagination.

// A transatlantic arrival group implies a Friday overnight departure.
const TRANSATLANTIC = /JFK|EWR|BOS|nonstop|United|SWISS|Air France/i;

function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function joinNames(names: string[]): string {
  if (names.length === 0) return 'everyone';
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
}

// Inline link with the document's link styling; plain text when no url.
function L({ label, url }: { label: string; url?: string }) {
  if (!url) return <>{label}</>;
  return (
    <a href={url} className="underline decoration-black/30 underline-offset-2">
      {label}
    </a>
  );
}

// "<linked label> — who; <linked label> — who"
function GroupList({ groups, who }: { groups: PrintServiceGroup[]; who: (g: PrintServiceGroup) => string }) {
  return (
    <>
      {groups.map((g, i) => (
        <React.Fragment key={i}>
          {i > 0 ? '; ' : ''}
          <L label={g.label} url={g.url} /> — {who(g)}
        </React.Fragment>
      ))}
    </>
  );
}

interface DayEntry {
  date: Date;
  title: string;
  body: React.ReactNode;
}

// Varied one-liners for ordinary ski days (Sunday and the Wednesday traverse
// are handled separately).
const FILLER: { title: string; body: string }[] = [
  {
    title: 'High-alpine morning',
    body: 'Wide cruising reds off the Cime Caron, then a long lunch on a sunny piste-side terrace.',
  },
  {
    title: 'Mountain-hut day',
    body: 'Ski the Val Thorens bowls and stop for a proper lunch at an altitude hut above the tree line.',
  },
  {
    title: 'Ski & spa',
    body: 'An unhurried ski morning, an early finish, and the afternoon in the spa before après.',
  },
  {
    title: 'Explore the valleys',
    body: 'Push out toward Orelle and the far pistes, chasing the best snow of the day.',
  },
];

export default function PrintItinerary({ data }: { data: OfferPrintData }) {
  const start = new Date(`${data.tripStart}T00:00:00`); // arrival Saturday
  const who = (g: PrintServiceGroup): string =>
    g.memberNames.length >= data.people ? 'everyone' : joinNames(g.memberNames);

  const flightGroups = data.arrivalGroups.filter((g) => TRANSATLANTIC.test(g.label));
  const insuranceLines = data.lines.filter((l) => l.componentId === 'insurance');
  const hasInsurance = insuranceLines.length > 0;
  const hasCarre = insuranceLines.some((l) => /carr[eé]/i.test(`${l.label} ${l.detail}`));
  const { hotel, transferGroups, arrivalGroups, skiSchool, skiPass } = data;

  const entries: DayEntry[] = [];

  // Day 0 — Friday before: overnight departure for any transatlantic group.
  if (flightGroups.length > 0) {
    entries.push({
      date: addDays(start, -1),
      title: 'Overnight flight to Geneva ✈️',
      body: (
        <ul className="space-y-0.5">
          {flightGroups.map((g, i) => (
            <li key={i}>
              <L label={g.label} url={g.url} /> — {who(g)}
            </li>
          ))}
        </ul>
      ),
    });
  }

  // Saturday — arrival day.
  entries.push({
    date: start,
    title: 'Arrival & check-in',
    body: (
      <ul className="space-y-0.5">
        {arrivalGroups.length > 0 && (
          <li>
            Getting there: <GroupList groups={arrivalGroups} who={who} />
          </li>
        )}
        {transferGroups.length > 0 && (
          <li>
            Transfer up to Val Thorens: <GroupList groups={transferGroups} who={who} />
          </li>
        )}
        {hotel && (
          <li>
            Check-in at <L label={hotel.name} url={hotel.url} />
            {hotel.lat != null && hotel.lon != null && (
              <>
                {' '}
                (
                <a
                  href={`https://www.google.com/maps?q=${hotel.lat},${hotel.lon}`}
                  className="underline decoration-black/30 underline-offset-2"
                >
                  map
                </a>
                )
              </>
            )}
            .
          </li>
        )}
        {skiPass && (
          <li>
            Ski-pass pickup at the desk: <L label={skiPass.name} url={skiPass.url} />.
          </li>
        )}
      </ul>
    ),
  });

  // Ski days: Sunday through the final Friday.
  let fillerIdx = 0;
  for (let i = 0; i < data.skiDays; i++) {
    const date = addDays(start, 1 + i);
    const isFirst = i === 0;
    const isWednesday = date.getDay() === 3;

    if (isFirst) {
      entries.push({
        date,
        title: 'First tracks',
        body: (
          <p>
            An easy warm-up morning in Val Thorens to find your legs on home pistes.
            {skiSchool && (
              <>
                {' '}
                Your course with <L label={skiSchool.name} url={skiSchool.url} /> starts this morning.
              </>
            )}
            {hasInsurance &&
              (hasCarre
                ? ' Carré Neige piste-rescue cover is active for the whole week.'
                : ' Your travel insurance cover is active for the whole week.')}
          </p>
        ),
      });
      continue;
    }

    if (isWednesday) {
      entries.push(
        skiPass
          ? {
              date,
              title: 'The 3 Vallées traverse 🏔️',
              body: (
                <p>
                  Cross the valleys to Méribel &amp; Courchevel and back —{' '}
                  <a
                    href="https://www.les3vallees.com/en/"
                    className="underline decoration-black/30 underline-offset-2"
                  >
                    Les 3 Vallées
                  </a>
                  . Your 6-day pass covers the full 600 km of linked terrain.
                </p>
              ),
            }
          : {
              date,
              title: 'A slower day',
              body: (
                <p>
                  Swap skis for a winter walk on the high trails and an afternoon in the spa — a
                  gentle mid-week reset.
                </p>
              ),
            }
      );
      continue;
    }

    const f = FILLER[fillerIdx % FILLER.length];
    fillerIdx++;
    entries.push({ date, title: f.title, body: <p>{f.body}</p> });
  }

  // Final Saturday — departure.
  entries.push({
    date: addDays(start, 1 + data.skiDays),
    title: 'Departure',
    body: (
      <p>
        {transferGroups.length > 0 ? (
          <>
            Transfer down to Geneva: <GroupList groups={transferGroups} who={who} />. Flights home
            and onward journeys from there.
          </>
        ) : (
          'Own journeys home from Val Thorens.'
        )}
      </p>
    ),
  });

  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold">Your week, day by day</h2>
      <div className="mt-4 text-sm">
        {entries.map((e, i) => (
          <div
            key={i}
            className="flex gap-4 border-t border-black/10 py-3 first:border-t-0"
            style={{ breakInside: 'avoid' }}
          >
            <div className="w-28 shrink-0 text-xs font-semibold uppercase text-[#6e6e73]">
              {fmtDate(e.date)}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{e.title}</p>
              <div className="mt-0.5 text-[#494949]">{e.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
