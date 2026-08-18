/**
 * POST /api/smartmatch
 *
 * Accepts a shipment request + list of provider candidates and returns
 * AI-ranked match results with per-match confidence scores and explanations.
 *
 * Uses generateText + Output.object() via the Vercel AI Gateway so no
 * additional provider packages are needed.
 */

import { generateText, Output, gateway } from "ai"
import { zodSchema } from "ai"
import { NextResponse } from "next/server"
import { z } from "zod/v3"

import {
  SYSTEM_PROMPT,
  buildMatchPrompt,
  type ShipmentInput,
  type ProviderCandidate,
} from "@/lib/ai/match-engine"
import { MatchResponseSchema } from "@/lib/ai/schemas"

// ─── Request validation ──────────────────────────────────────────────────────

const RequestBodySchema = z.object({
  shipment: z.object({
    id: z.string(),
    origin: z.string(),
    destination: z.string(),
    cargoType: z.string(),
    weight: z.number().positive(),
    transportType: z.string(),
    requiredDate: z.string(),
    notes: z.string().optional(),
  }),
  candidates: z
    .array(
      z.object({
        providerId: z.string(),
        name: z.string(),
        transportType: z.string(),
        capacity: z.number().positive(),
        availableDate: z.string(),
        pricePerTonne: z.number().nonnegative(),
        rating: z.number().min(0).max(5),
        verified: z.boolean(),
        originHub: z.string().optional(),
        destinationHub: z.string().optional(),
      }),
    )
    .min(1)
    .max(20),
})

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate request body
    const parsed = RequestBodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const { shipment, candidates } = parsed.data as {
      shipment: ShipmentInput
      candidates: ProviderCandidate[]
    }

    // Build the prompt
    const userPrompt = buildMatchPrompt(shipment, candidates)

    // Call the AI via Vercel AI Gateway using generateText + Output.object()
    const { output } = await generateText({
      model: gateway("openai/gpt-4.1-mini"),
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
      output: Output.object({
        name: "MatchResponse",
        description: "Ranked transport provider matches for a shipment request",
        schema: zodSchema(MatchResponseSchema),
      }),
    })

    return NextResponse.json(output, { status: 200 })
  } catch (err: unknown) {
    console.error("[SmartMatch] Error:", err)

    // Surface a structured error so the client can handle it gracefully
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      { error: "Matching engine failed", message },
      { status: 500 },
    )
  }
}
