"use client"

import Link from "next/link"
import { ArrowLeft, Route, Boxes, CalendarClock, TrendingDown, Sparkles, RefreshCw, AlertCircle } from "lucide-react"
import { PortalShell } from "@/components/portal/portal-shell"
import { MatchCard } from "@/components/smartmatch/match-card"
import { RouteMap } from "@/components/shared/route-map"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { portalConfigs } from "@/lib/nav-config"
import { matchProviders, requests } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"
import { toast } from "sonner"
import { useSmartMatch } from "@/hooks/use-smartmatch"
import {
  requestToShipmentInput,
  matchProviderToCandidate,
} from "@/lib/ai/match-engine"

export default function ClientMatchesPage() {
  const { t } = useLocale()
  const request = requests[0]

  // Convert static data to engine inputs
  const shipmentInput = requestToShipmentInput(request)
  const candidates = matchProviders.map(matchProviderToCandidate)

  // Fetch AI-ranked matches — auto-runs on mount, cached by SWR
  const { rankedResults, getResultFor, isLoading, error, refresh, data } =
    useSmartMatch(shipmentInput, candidates)

  // Use AI-ranked order when available, otherwise keep static order
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
    <PortalShell config={portalConfigs.client} title={t("smart.title")}>
      <div className="flex flex-col gap-5">
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" render={<Link href="/client/requests" />}>
              <ArrowLeft className="size-4" />
              {t("smart.backToRequests")}
            </Button>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-sm text-muted-foreground">{t("smart.bestMatches")}</span>
              <RouteLabel origin={request.origin} destination={request.destination} className="text-sm font-semibold" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {t("smart.requestId")}: {request.id}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={refresh}
              disabled={isLoading}
              title="Re-run AI matching"
            >
              <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="outline" size="sm" render={<Link href="/client/requests/new" />}>
              {t("smart.changeRequest")}
            </Button>
          </div>
        </div>

        {/* AI status banner */}
        {isLoading && (
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm text-primary">
            <Sparkles className="size-4 animate-pulse" />
            <span>SmartMatch AI is analysing {candidates.length} providers for this route&hellip;</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
            <AlertCircle className="size-4" />
            <span>AI matching unavailable — showing default results. {error.message}</span>
          </div>
        )}
        {data?.summary && !isLoading && (
          <div className="flex items-start gap-2 rounded-lg border border-primary/15 bg-primary/5 px-4 py-2.5 text-sm text-foreground">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
            <p>{data.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_minmax(320px,42%)]">
          {/* Match list — AI-ranked when available */}
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
            <Button variant="outline" className="mt-1 w-full" onClick={() => toast.info(t("common.loading"))}>
              {t("common.loadMore")}
            </Button>
          </div>

          {/* Map + reasons */}
          <div className="flex flex-col gap-5">
            <Card className="overflow-hidden p-0">
              <RouteMap
                origin={request.origin}
                destination={request.destination}
                className="aspect-[4/3] w-full"
              />
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
