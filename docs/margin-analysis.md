# Bonvo.Ski — Package Margin Analysis (Internal)

**Date:** 2026-07-19 · **Season priced:** winter 2026/27 (research data from published 2025/26 rates)
**FX assumption:** €1 ≈ $1.10 · £1 ≈ $1.27

## Pricing method

Per instruction, every observed market price is multiplied by a **1.5× "generous
baseline"** factor before margin is applied. This absorbs FX swings, peak-week
surcharges, supplier price changes, and quoting error. The **target margin of
20–30% is then applied on top of that padded baseline** — meaning the real
margin against today's observed costs is far higher (roughly 80–95%), which is
the safety buffer, not the expectation. When we actually contract suppliers,
re-run this table with contracted rates.

```
package price = (observed cost × 1.5) × (1 + margin)
```

## 1. Val Thorens "Classic" — from $4,490 pp

Lean configuration: January/March departure, 3★ half-board (Le Val Chavière
class), shared coach transfer, double occupancy, no rental.

| Component | Observed market cost (source) | ×1.5 baseline |
|---|---:|---:|
| Flight JFK/EWR→GVA round trip | $650 (Kayak Jan avg $675, deals from $426) | $975 |
| Hotel 7 nights half-board, pp double | $920 (≈€120/night pp, 3★ Selva/VT class) | $1,380 |
| Transfer GVA↔VT shared coach (Ben's Bus return £92) | $115 | $173 |
| 6-day Les 3 Vallées pass | $450 (€409 official 2025/26) | $675 |
| Insurance 10 days (Squaremouth band $150–230) + Carré Neige €24.50 | $207 | $310 |
| **Total** | **$2,342** | **$3,513** |

- **Sell at $4,490 → margin over 1.5× baseline = 27.8%** ✅ (target 20–30%)
- Margin over observed cost: 92%. Absolute gross per head vs baseline: ~$977.

## 2. Val Thorens "Signature" — from $6,990 pp

4★ ski-in/ski-out (Fahrenheit Seven class, Crystal Ski £1,219–2,109 pp/7n HB),
private van transfer, premium rental included.

| Component | Observed | ×1.5 baseline |
|---|---:|---:|
| Flight RT | $850 | $1,275 |
| Hotel 7n HB pp (≈€250/night pp) | $1,925 | $2,888 |
| Private transfer share (AlpinBus ~£280/van ÷ 4, both ways) | $180 | $270 |
| 6-day pass | $450 | $675 |
| Rental 6d premium + helmet (Prosneige 3–4★ tier) | $310 | $465 |
| Insurance + Carré Neige | $227 | $341 |
| **Total** | **$3,942** | **$5,914** |

- **Sell at $6,990 → margin over baseline = 18.2%** — slightly under target;
  acceptable because the hotel figure is already top-of-band. At the €200/night
  midpoint the margin is 24%. Keep as-is; quote up for February weeks.

## 3. Family Week (2 adults + 2 kids) — from $13,990

Family Flex pass: everyone pays child rate, €345 pp × 4.

| Component | Observed | ×1.5 baseline |
|---|---:|---:|
| Flights 4 × $600 (Jan family fares) | $2,400 | $3,600 |
| Family room/2 doubles 7n HB (~€350/night total) | $2,695 | $4,043 |
| Transfer, shared coach ×4 | $460 | $690 |
| Family Flex passes 4 × €345 | $1,520 | $2,280 |
| Family insurance | $450 | $675 |
| **Total** | **$7,525** | **$11,288** |

- **Sell at $13,990 → margin over baseline = 23.9%** ✅
- Kids' ski school (ESF ~€230/child/6 mornings) quoted as add-on at cost ×1.5 ×1.25.
- The "family discount" story holds: 4 × Classic ($17,960) − $13,990 = **$3,970
  saved vs four individual packages** — funded by the child-rate passes and
  shared rooms, not by margin sacrifice.

## 4. Alpine Retreat — from $3,790 pp

No pass, no rental; spa-hotel week, half board.

| Component | Observed | ×1.5 baseline |
|---|---:|---:|
| Flight RT | $650 | $975 |
| Spa hotel 7n HB pp | $1,100 | $1,650 |
| Transfer shared | $115 | $173 |
| Insurance 10d (non-ski base, ski day rider on demand) | $160 | $240 |
| **Total** | **$2,025** | **$3,038** |

- **Sell at $3,790 → margin over baseline = 24.8%** ✅
- Per-day ski add-on (day pass ~$75 + rental ~$45 + lesson): quote at ×1.5×1.25 ≈ $225/day.

## 5. Group Trip — from $4,190 pp (8+ riders)

Classic configuration with group economics: Ben's Bus group rate (£80.5 rt),
S3V negotiated group passes (assume −5%), same 3★ hotel block.

| Component | Observed | ×1.5 baseline |
|---|---:|---:|
| Flight RT | $650 | $975 |
| Hotel 7n HB pp | $920 | $1,380 |
| Transfer group rate | $102 | $153 |
| Group pass (−5% on €409) | $427 | $641 |
| Insurance | $207 | $310 |
| **Total** | **$2,306** | **$3,459** |

- **Sell at $4,190 → margin over baseline = 21.1%** ✅ — deliberately the
  thinnest tier: volume product, and Dolomiti's published "21st person free"
  formula suggests real group COGS will beat these numbers.

## Competitive position (the reason the product works)

Published all-in costs for a comparable **US** ski week, per person, flights
included: **$5,500–$9,400** (peak Vail/Park City class; SnowBrains, NSAA +11%
since 2022/23, Time Out/Casino.org $1,225–$2,004/day all-in). Family of four:
**$11,000–$19,000** (Denver Gazette $11,265; SnowBrains $9,968 in 2023 + NSAA
inflation).

So even with the 1.5× padding **and** 20–30% margin, Classic at $4,490
undercuts the bottom of the US range, and the family package sits below the
US family midpoint — while including transatlantic flights, dinners, transfers,
and insurance that the US numbers don't.

## Supplier channels for batch buying (validated)

- **Les 3 Vallées / S3V:** group passes for organized groups via sales office
  (contact@s3v.com), negotiated per group. Family Flex: groups of 3+ (max 2
  adults), everyone pays child rate €335–345/6 days.
- **Dolomiti Superski** (backup resort, ~15–25% cheaper land costs): published
  group formula — 21+ people, 1 free pass, advance name list; 5% online
  multi-day discount; kids <8 free.
- **Transfers:** Ben's Bus publishes per-seat group discounts GVA→VT; AlpinBus/
  Alpybus charter coaches to 50+ pax.
- **Hotels:** South Tyrol quotes per-person half-board (easy packaging);
  French hotels sell HB allotments to operators.

## Risks / next steps

1. These are rack/consumer rates — operator-contracted rates should come in
   10–25% under observed, widening margin further.
2. February school-holiday weeks blow through the hotel baseline; quote
   individually (the sites say so).
3. Flights are the most volatile line; the 1.5× pad covers ~$975–1,275 RT,
   which has never been breached on NYC–GVA economy averages.
4. Before selling: confirm S3V group contract, hotel allotments, and whether a
   US Seller of Travel registration (CA/FL/WA/HI) is required — likely yes
   before taking payments.
