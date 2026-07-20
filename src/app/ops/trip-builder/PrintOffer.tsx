import React from 'react';
import type { OfferPrintData } from './printTypes';
import { pFmt, pFmt2 } from './printTypes';
import PrintItinerary from './PrintItinerary';
import PrintBreakdown from './PrintBreakdown';
import PrintExtras from './PrintExtras';

// The client-facing PDF (print) document. Screen-hidden; rendered via
// window.print(). Section content lives in PrintItinerary / PrintBreakdown /
// PrintExtras; this file owns the frame: header, inclusions table, note,
// price & payment box, and the optional internal cost sheet.

export default function PrintOffer({
  data,
  includeInternal,
}: {
  data: OfferPrintData;
  includeInternal: boolean;
}) {
  const d = data;
  return (
    <div className="mx-auto max-w-[720px] px-2 py-6 text-[#1d1d1f]">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b-2 border-[#1d1d1f] pb-4">
        <p className="text-2xl font-bold tracking-tight">BONVO.SKI</p>
        <p className="text-right text-xs text-[#6e6e73]">
          Personal trip proposal · {d.todayStr}
          <span className="block">Ref {d.offerRef} · valid until {d.validUntil}</span>
        </p>
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight">{d.offerTitle}</h1>
      {d.clientName && <p className="mt-1 text-base text-[#6e6e73]">Prepared for {d.clientName}</p>}
      <p className="mt-3 text-sm text-[#6e6e73]">
        Departure week of{' '}
        {new Date(`${d.tripStart}T00:00:00`).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        })}{' '}
        · {d.people} traveler{d.people > 1 ? 's' : ''} · {d.nights} nights · {d.skiDays} ski days ·
        {' '}{d.resortName}, {d.resortArea}, {d.resortCountry}
        {d.seasonNote && <span className="block text-xs text-[#a1a1a6]">{d.seasonNote}</span>}
      </p>

      {/* What's included */}
      <table className="mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-black/20 text-left">
            <th className="py-2 pr-4 font-semibold">Included in your trip</th>
            <th className="py-2 font-semibold">Details</th>
          </tr>
        </thead>
        <tbody>
          {d.lines.map((l, i) => (
            <tr key={i} className="border-b border-black/10 align-top">
              <td className="py-2.5 pr-4 font-medium">
                {l.icon} {l.componentLabel}
              </td>
              <td className="py-2.5 text-[#494949]">
                {l.url ? (
                  <a href={l.url} className="text-[#1d1d1f] underline decoration-black/30 underline-offset-2">
                    {l.label}
                  </a>
                ) : (
                  l.label
                )}
                {l.description ? ` — ${l.description}` : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Personal note */}
      {d.personalNote.trim() && (
        <div className="mt-8 rounded-xl bg-[#f5f5f7] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
            A note from your trip designer
          </p>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">{d.personalNote}</p>
        </div>
      )}

      {/* Day-by-day itinerary (agent section) */}
      <PrintItinerary data={d} />

      {/* Per-person costs & service groups (agent section) */}
      <PrintBreakdown data={d} />

      {/* Price & payment */}
      <div className="mt-8 rounded-xl border-2 border-[#1d1d1f] p-5" style={{ breakInside: 'avoid' }}>
        <p className="flex justify-between text-lg font-bold">
          <span>Price per person</span>
          <span>{pFmt(d.perPersonFinal)}</span>
        </p>
        <p className="mt-1 flex justify-between text-sm text-[#494949]">
          <span>Total for {d.people} traveler{d.people > 1 ? 's' : ''}</span>
          <span>{pFmt(d.offeredTotal)}</span>
        </p>
        {d.pay && (
          <div className="mt-3 border-t border-black/10 pt-3 text-sm text-[#494949]">
            <p className="flex justify-between">
              <span>Deposit on booking (30%)</span>
              <span>{pFmt(d.pay.deposit)} — {pFmt(d.pay.depositPP)} per person</span>
            </p>
            <p className="mt-1 flex justify-between">
              <span>Balance due {d.pay.balanceDue}</span>
              <span>{pFmt(d.pay.balance)} — {pFmt(d.pay.balancePP)} per person</span>
            </p>
          </div>
        )}
        <p className="mt-2 text-xs text-[#6e6e73]">
          All listed components included. Price is all-in and VAT-inclusive where applicable; valid
          subject to availability at time of booking. Nothing is charged until you approve the final
          itinerary.
        </p>
      </div>

      {/* Practical segments: inclusions detail, know-before-you-go, terms, next steps (agent section) */}
      <PrintExtras data={d} />

      {/* Internal cost sheet (optional) */}
      {includeInternal && d.internal && (
        <div
          className="mt-10 border-t-2 border-dashed border-black/30 pt-6"
          style={{ breakBefore: 'page' }}
        >
          <p className="text-lg font-bold">Internal cost sheet — do not send to client</p>
          <table className="mt-4 w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/20 text-left">
                <th className="py-1.5 pr-3 font-semibold">Component</th>
                <th className="py-1.5 pr-3 font-semibold">Supplier / basis</th>
                <th className="py-1.5 text-right font-semibold">Cost (USD)</th>
              </tr>
            </thead>
            <tbody>
              {d.lines.map((l, i) => (
                <tr key={i} className="border-b border-black/10">
                  <td className="py-1.5 pr-3">{l.componentLabel}</td>
                  <td className="py-1.5 pr-3">{l.label} · {l.detail}</td>
                  <td className="py-1.5 text-right">{pFmt2(l.totalUSD)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 space-y-1 text-xs">
            <p className="flex justify-between"><span>Real cost total</span><span>{pFmt2(d.internal.realTotal)}</span></p>
            <p className="flex justify-between"><span>Included VAT (est.)</span><span>{pFmt2(d.internal.vatTotal)}</span></p>
            <p className="flex justify-between"><span>Buffer ×{d.internal.buffer.toFixed(2)}</span><span>{pFmt2(d.internal.bufferedTotal)}</span></p>
            <p className="flex justify-between"><span>Profit {d.internal.profitPct}%</span><span>{pFmt2(d.internal.finalTotal)}</span></p>
            <p className="flex justify-between font-semibold"><span>Offered (rounded)</span><span>{pFmt2(d.offeredTotal)}</span></p>
            <p className="flex justify-between font-semibold">
              <span>Gross profit</span>
              <span>{pFmt2(d.internal.profitAbs)} · {d.internal.marginOnOffer.toFixed(1)}% of offer</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
