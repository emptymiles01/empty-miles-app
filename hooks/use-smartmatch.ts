/**
 * useSmartMatch — SWR-powered hook for the SmartMatch AI engine.
 *
 * Fetches ranked match results from POST /api/smartmatch and provides
 * loading / error state and an on-demand refresh function. The hook
 * returns both the AI results and a helper to look up any provider's
 * AI-enriched data by its id, making it easy to merge with the existing
 * MatchProvider mock data without touching the data layer.
 */

"use client"

import useSWR from "swr"
import type { ShipmentInput, ProviderCandidate } from "@/lib/ai/match-engine"
import type { MatchResponse, MatchResult } from "@/lib/ai/schemas"

// ─── Fetcher ─────────────────────────────────────────────────────────────────

async function fetchMatches(
  shipment: ShipmentInput,
  candidates: ProviderCandidate[],
): Promise<MatchResponse> {
  const res = await fetch("/api/smartmatch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shipment, candidates }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? `SmartMatch API error ${res.status}`)
  }

  return res.json() as Promise<MatchResponse>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseSmartMatchOptions {
  /** Pass `false` to prevent the initial automatic fetch (useful for manual trigger). */
  enabled?: boolean
}

export function useSmartMatch(
  shipment: ShipmentInput | null,
  candidates: ProviderCandidate[],
  options: UseSmartMatchOptions = {},
) {
  const { enabled = true } = options

  // Build a stable, deterministic cache key from the inputs
  const cacheKey =
    enabled && shipment && candidates.length > 0
      ? [
          "smartmatch",
          shipment.id,
          shipment.origin,
          shipment.destination,
          shipment.cargoType,
          shipment.weight,
          candidates.map((c) => c.providerId).join(","),
        ]
      : null

  const { data, error, isLoading, mutate } = useSWR<MatchResponse>(
    cacheKey,
    () => fetchMatches(shipment!, candidates),
    {
      // Don't refetch on window focus or reconnect — AI calls are expensive
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // Deduplicate within a 10 s window so navigating back doesn't re-call
      dedupingInterval: 10_000,
    },
  )

  // Index results by providerId for O(1) lookup in match cards
  const resultsByProvider = (data?.results ?? []).reduce<Record<string, MatchResult>>(
    (acc, r) => {
      acc[r.providerId] = r
      return acc
    },
    {},
  )

  /**
   * Returns the AI match result for a specific provider id, or undefined
   * if results haven't loaded yet or the provider wasn't in the candidates.
   */
  function getResultFor(providerId: string): MatchResult | undefined {
    return resultsByProvider[providerId]
  }

  /**
   * Re-run the match (e.g. after the user edits the request).
   * Clears the current cache entry and triggers a fresh API call.
   */
  function refresh() {
    mutate()
  }

  return {
    /** Full API response including ranked results array and summary. */
    data,
    /** Per-provider lookup map. */
    resultsByProvider,
    /** Convenience lookup function. */
    getResultFor,
    /** True while the first fetch is in flight. */
    isLoading,
    /** Set when the API call failed. */
    error: error as Error | undefined,
    /** Trigger a fresh match run. */
    refresh,
    /** Sorted results by rank, ready to drive a ranked list. */
    rankedResults: [...(data?.results ?? [])].sort((a, b) => a.rank - b.rank),
  }
}
