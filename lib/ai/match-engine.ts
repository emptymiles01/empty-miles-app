/**
 * SmartMatch Engine — core prompt builder and input types.
 *
 * Separating prompt construction from the API route keeps the logic testable,
 * lets you iterate on the prompt without touching Next.js plumbing, and makes
 * it straightforward to add fine-tuning or few-shot examples later.
 */

import type { MatchProvider, Request, Capacity } from "@/lib/data"

// ─── Input types ────────────────────────────────────────────────────────────

/**
 * Everything the engine needs about the shipment request.
 * Designed so you can pass either the mock `Request` shape today
 * or a richer Supabase-sourced object in the future without changing
 * the engine interface.
 */
export interface ShipmentInput {
  id: string
  origin: string
  destination: string
  cargoType: string
  weight: number          // tonnes
  transportType: string
  requiredDate: string    // human-readable, e.g. "24 May 2024"
  notes?: string          // special handling requirements
}

/**
 * A single transport capacity listing to rank against the shipment.
 */
export interface ProviderCandidate {
  providerId: string
  name: string
  transportType: string
  capacity: number        // tonnes available
  availableDate: string
  pricePerTonne: number   // or flat rate — the engine treats it relatively
  rating: number          // 0-5
  verified: boolean
  originHub?: string      // where the vehicle is currently or based
  destinationHub?: string // where the vehicle is heading (empty return leg)
}

// ─── Adapters from lib/data types ───────────────────────────────────────────

export function requestToShipmentInput(r: Request): ShipmentInput {
  return {
    id: r.id,
    origin: r.origin,
    destination: r.destination,
    cargoType: r.cargoType,
    weight: r.weight,
    transportType: r.transportType,
    requiredDate: r.date,
  }
}

export function matchProviderToCandidate(p: MatchProvider): ProviderCandidate {
  return {
    providerId: p.id,
    name: p.name,
    transportType: p.transportType,
    capacity: p.capacity,
    availableDate: p.availableDate,
    pricePerTonne: p.price,
    rating: p.rating,
    verified: p.verified,
  }
}

export function capacityToCandidate(c: Capacity, name: string, rating = 4.5, verified = true): ProviderCandidate {
  return {
    providerId: c.id,
    name,
    transportType: c.transportType,
    capacity: c.capacity,
    availableDate: c.availableFrom,
    pricePerTonne: c.rate,
    rating,
    verified,
    originHub: c.origin,
    destinationHub: c.destination,
  }
}

// ─── Prompt builder ──────────────────────────────────────────────────────────

/**
 * Builds the system + user messages for the matching call.
 *
 * Keeping this pure function separate from the HTTP layer means you can:
 *  • Unit test prompt rendering without mocking `fetch`
 *  • Add few-shot examples by appending to SYSTEM_PROMPT
 *  • A/B test prompt variants by swapping this function
 */

const SYSTEM_PROMPT = `You are SmartMatch, an expert logistics matching engine for the Empty Miles marketplace in the Gulf Cooperation Council (GCC) region.

Your job is to rank transport providers against a shipment request using semantic understanding — not just keyword matching. Consider:

1. ROUTE COMPATIBILITY — Does the provider operate on or near this corridor? A vehicle already heading toward the destination (filling an "empty miles" return leg) is a stronger match.
2. CAPACITY FIT — Can the provider's available capacity handle the cargo weight? Slight over-capacity is fine; under-capacity is a hard constraint.
3. TIMING ALIGNMENT — How well does the provider's availability window match the requested pickup date?
4. CARGO SUITABILITY — Is the vehicle type appropriate for the cargo (refrigerated for perishables, flat-bed for machinery, etc.)?
5. PRICE COMPETITIVENESS — Evaluate price relative to the other candidates, not in isolation.
6. TRUST SIGNALS — Verified carriers and higher ratings increase confidence.

Return ALL candidates ranked from best to worst. Every candidate must appear in the results array even if the match is weak — just give weak matches a low score and short explanation.

Be concise, specific, and professional. Mention concrete matching factors in explanations (e.g. route corridor, weight headroom, price advantage). Do not hallucinate provider details not present in the input.`

export function buildMatchPrompt(shipment: ShipmentInput, candidates: ProviderCandidate[]): string {
  const candidateLines = candidates
    .map(
      (c, i) =>
        `  ${i + 1}. id="${c.providerId}" name="${c.name}" type="${c.transportType}" ` +
        `capacity=${c.capacity}t available="${c.availableDate}" price=${c.pricePerTonne} ` +
        `rating=${c.rating} verified=${c.verified}` +
        (c.originHub ? ` hub="${c.originHub}→${c.destinationHub}"` : ""),
    )
    .join("\n")

  return `Shipment Request:
  ID: ${shipment.id}
  Route: ${shipment.origin} → ${shipment.destination}
  Cargo: ${shipment.cargoType}, ${shipment.weight} tonnes
  Transport needed: ${shipment.transportType}
  Required date: ${shipment.requiredDate}
  ${shipment.notes ? `Special requirements: ${shipment.notes}` : ""}

Transport Provider Candidates (${candidates.length} total):
${candidateLines}

Rank these ${candidates.length} providers from best to worst match for this shipment. 
Return modelVersion as "smartmatch-v1".`
}

export { SYSTEM_PROMPT }
