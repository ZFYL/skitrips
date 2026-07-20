import React from 'react';
import type { OfferPrintData, PrintServiceGroup, PrintComponentGroups } from './printTypes';
import { pFmt, pFmt2 } from './printTypes';

// Client-facing per-person cost split and service-sharing breakdown.
// Rendered inside PrintOffer between the itinerary and the price box.
// perTraveler.totalUSD holds REAL (internal) cost — never printed raw; each
// traveler's share is scaled proportionally so the column sums to offeredTotal.

export default function PrintBreakdown({ data }: { data: OfferPrintData }) {
  const travelerCount = data.travelerNames.length || data.people;

  const isEveryone = (group: PrintServiceGroup): boolean => {
    if (group.memberNames.length < data.travelerNames.length) return false;
    return data.travelerNames.every((n) => group.memberNames.includes(n));
  };

  const memberSummary = (group: PrintServiceGroup): string =>
    isEveryone(group) ? 'everyone' : group.memberNames.join(', ');

  // Section 1 — only components that actually have shared groups.
  const sharedComponents = data.componentGroups.filter((c) => c.groups.length > 0);

  // Section 2 — scale internal costs onto the offered (client) total.
  const realSum = data.perTraveler.reduce((acc, t) => acc + t.totalUSD, 0);
  const clientShare = (t: { totalUSD: number }): number =>
    realSum > 0
      ? (t.totalUSD / realSum) * data.offeredTotal
      : data.offeredTotal / (data.perTraveler.length || travelerCount);
  const averagePP = data.offeredTotal / (data.people || travelerCount);

  const pickSignatures = new Set(data.perTraveler.map((t) => t.picks.join('|')));
  const distinctPicks = pickSignatures.size > 1;
  const showPerTravelerTable = data.perTraveler.length > 0 && (data.anySplit || distinctPicks);

  // Matrix — split components: more than one group, or a group not covering everyone.
  const splitComponents: PrintComponentGroups[] = data.componentGroups.filter(
    (c) => c.groups.length > 1 || c.groups.some((g) => !isEveryone(g)),
  );

  const truncate = (s: string, max = 18): string =>
    s.length > max ? `${s.slice(0, max - 1)}…` : s;

  const cellLabel = (component: PrintComponentGroups, traveler: string): string => {
    const group = component.groups.find((g) => g.memberNames.includes(traveler));
    if (!group) return '—';
    if (group.label.includes('Own arrangement')) return 'Own';
    return truncate(group.label);
  };

  const showMatrix = data.anySplit && splitComponents.length > 0;

  if (sharedComponents.length === 0 && data.perTraveler.length === 0 && !showMatrix) {
    return null;
  }

  return (
    <>
      {/* 1 — Who shares what */}
      {sharedComponents.length > 0 && (
        <div className="mt-8" style={{ breakInside: 'avoid' }}>
          <h2 className="text-lg font-bold">Who shares what</h2>
          <table className="mt-3 w-full border-collapse text-sm">
            <tbody>
              {sharedComponents.map((c) => (
                <tr key={c.componentId} className="border-b border-black/10 align-top">
                  <td className="w-1/3 py-2.5 pr-4 font-medium">
                    {c.icon} {c.componentLabel}
                  </td>
                  <td className="py-2.5 text-[#494949]">
                    <ul className="space-y-1">
                      {c.groups.map((g, gi) => (
                        <li key={gi}>
                          {g.url ? (
                            <a
                              href={g.url}
                              className="font-medium text-[#1d1d1f] underline decoration-black/30 underline-offset-2"
                            >
                              {g.label}
                            </a>
                          ) : (
                            <span className="font-medium text-[#1d1d1f]">{g.label}</span>
                          )}
                          <span> — {memberSummary(g)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2 — Cost per traveler */}
      {data.perTraveler.length > 0 && (
        <div className="mt-8" style={{ breakInside: 'avoid' }}>
          <h2 className="text-lg font-bold">Cost per traveler</h2>
          {showPerTravelerTable ? (
            <>
              <table className="mt-3 w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-black/20 text-left">
                    <th className="py-2 pr-4 font-semibold">Traveler</th>
                    <th className="py-2 pr-4 font-semibold">Selected services</th>
                    <th className="py-2 text-right font-semibold">Their share</th>
                  </tr>
                </thead>
                <tbody>
                  {data.perTraveler.map((t, i) => (
                    <tr key={i} className="border-b border-black/10 align-top">
                      <td className="py-2.5 pr-4 font-medium">{t.name}</td>
                      <td className="py-2.5 pr-4 text-[#494949]">
                        {t.picks.length > 0 ? t.picks.join(' · ') : 'standard package'}
                      </td>
                      <td className="py-2.5 text-right">{pFmt2(clientShare(t))}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-black/20 font-semibold">
                    <td className="py-2.5 pr-4">Average per person</td>
                    <td className="py-2.5 pr-4" />
                    <td className="py-2.5 text-right">{pFmt2(averagePP)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs text-[#6e6e73]">
                Individual prices reflect each traveler&apos;s selected services, scaled to the
                package price.
              </p>
            </>
          ) : (
            <p className="mt-3 text-center text-sm text-[#494949]">
              Even split: {pFmt(averagePP)} per person.
            </p>
          )}
        </div>
      )}

      {/* Travelers & services matrix (only when split) */}
      {showMatrix && (
        <div className="mt-8" style={{ breakInside: 'avoid' }}>
          <h2 className="text-lg font-bold">Travelers &amp; services</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/20 text-left">
                  <th className="py-2 pr-4 font-semibold">Traveler</th>
                  {splitComponents.map((c) => (
                    <th key={c.componentId} className="py-2 pr-4 font-semibold">
                      {c.icon} {c.componentLabel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.travelerNames.map((name, i) => (
                  <tr key={i} className="border-b border-black/10 align-top">
                    <td className="py-2.5 pr-4 font-medium">{name}</td>
                    {splitComponents.map((c) => (
                      <td key={c.componentId} className="py-2.5 pr-4 text-[#494949]">
                        {cellLabel(c, name)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
