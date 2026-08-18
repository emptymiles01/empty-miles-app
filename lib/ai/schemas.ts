/**
 * Zod schemas for the SmartMatch AI engine output.
 * Using zod/v3 sub-path for compatibility with ai SDK 7.x (which bundles its
 * own zod-to-json-schema transform against the v3 API surface).
 */
import { z } from "zod/v3"

/**
 * A single ranked match returned by the AI engine.
 * Mirrors the shape of MatchProvider from lib/data.ts so the UI can
 * seamlessly replace or augment static data with AI-ranked results.
 */
export const MatchResultSchema = z.object({
  providerId: z
    .string()
    .describe("The provider id, e.g. PRV-001. Must match an id from the candidate list."),
  confidenceScore: z
    .number()
    .min(0)
    .max(100)
    .describe("AI confidence score 0-100. Higher means a better semantic fit."),
  rank: z
    .number()
    .int()
    .min(1)
    .describe("Rank position starting from 1 (1 = best match)."),
  explanation: z
    .string()
    .max(220)
    .describe(
      "One or two concise sentences explaining why this provider is a strong match. " +
        "Mention specific factors: route overlap, capacity fit, timing, price competitiveness.",
    ),
  routeCompatibility: z
    .number()
    .min(0)
    .max(100)
    .describe("How well the provider's route covers the required origin-destination corridor, 0-100."),
  capacityFit: z
    .number()
    .min(0)
    .max(100)
    .describe("How well the provider's available capacity meets the cargo weight requirement, 0-100."),
  timingScore: z
    .number()
    .min(0)
    .max(100)
    .describe("How well the pickup date aligns with the requested shipment date, 0-100."),
  priceScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Price competitiveness relative to the other candidates, 0-100."),
  flags: z
    .array(z.string())
    .max(3)
    .describe(
      "Up to 3 short highlight tags, e.g. 'Verified carrier', 'Best price', 'Exact route'. " +
        "Keep each tag under 20 characters.",
    ),
})

export type MatchResult = z.infer<typeof MatchResultSchema>

export const MatchResponseSchema = z.object({
  results: z
    .array(MatchResultSchema)
    .min(1)
    .describe("All candidates ranked from best to worst. Include every candidate, even weak matches."),
  summary: z
    .string()
    .max(300)
    .describe(
      "A brief paragraph (2-3 sentences) summarising the top pick and the overall match quality " +
        "for this shipment request. Write in a neutral, professional tone.",
    ),
  modelVersion: z
    .string()
    .describe("Identifier of the model version used, e.g. 'smartmatch-v1'."),
})

export type MatchResponse = z.infer<typeof MatchResponseSchema>
