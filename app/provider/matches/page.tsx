"use client"

import { Route, Boxes, CalendarClock, TrendingDown, Sparkles, RefreshCw, AlertCircle } from "lucide-react"
import { PortalShell } from "@/components/portal/portal-shell"
import { MatchCard } from "@/components/smartmatch/match-card"
import { RouteMap } from "@/components/shared/route-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/page-header"
import { matchProviders, requests } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { useSmartMatch } from "@/hooks/use-smartmatch"
import {
  requestToShipmentInput,
  matchProviderToCandidate,
} from "@/lib/ai/match-engine"

export default function ProviderMatchesPage() {
  const { t } = useI18n()
  const request = requests[0]

  const shipmentInput = requestToShipmentInput(request)
  const candidates = matchProviders.map(matchProviderToCandidate)

  const { rankedResults, getResultFor, isLoading, error, refresh, data } =
    useSmartMatch(shipmentInput, candidates)

  const orderedProviders =
    rankedResults.length > 0
      ? rankedResults
          .map((r) => matchProviders.find((p) => p.id === r.providerId))
          .filter(Boolean)
      : matchProviders

  const reasons = [
    { icon: Route, title: t("smart.routeCompat"), desc: t("smart.routeCompatDesc") },
    { icon: Boxes, title: t("smart.capacityFit"), desc: t("smart.capacityFitDesc") },
    { icon: CalendarClock, title: t("smart.availabilityTitle"), desc: t("smart.availabilityDesc") },
    { icon: TrendingDown, title: t("smart.priceAdvantage"), desc: t("smart.priceAdvantageDesc") },
  ]

  return (
    <PortalShell portal="provider" titleKey="nav.matches">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <PageHeader titleKey="smart.title" subtitleKey="prov.requestsSub" />
          <Button
            variant="ghost"
            size="sm"
            onClick={refresh}
            disabled={isLoading}
            className="mt-1 shrink-0"
            title="Re-run AI matching"
          >
            <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {/* AI status banner */}
        {isLoading && (
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm text-primary">
            <Sparkles className="size-4 animate-pulse" />
            <span>SmartMatch AI is ranking incoming requests&hellip;</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
            <AlertCircle className="size-4" />
            <span>AI matching unavailable — showing default results.</span>
          </div>
        )}
        {data?.summary && !isLoading && (
          <div className="flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 px-4 py-2.5 text-sm text-foreground">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>{data.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_minmax(320px,42%)]">
          <div className="flex flex-col gap-3">
            {orderedProviders.map((p) =>
              p ? (
                <MatchCard
                  key={p.id}
                  provider={p}
                  aiResult={getResultFor(p.id)}
                  aiLoading={isLoading}
                />
              ) : null,
            )}
          </div>

          <div className="flex flex-col gap-5">
            <Card className="overflow-hidden p-0">
              <RouteMap origin={request.origin} destination={request.destination} className="aspect-[4/3] w-full" />
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t("smart.whyTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {reasons.map((r) => (
                  <div key={r.title} className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <r.icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{r.title}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PortalShell>
  )
}
