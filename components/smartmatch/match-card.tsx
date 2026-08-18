"use client"

import { useState } from "react"
import { Building2, Truck, Calendar, ChevronDown, BadgeCheck, Star, Sparkles, Route, Boxes, Clock, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLocale } from "@/lib/i18n/locale-provider"
import { toast } from "sonner"
import type { MatchProvider } from "@/lib/data"
import type { MatchResult } from "@/lib/ai/schemas"

function scoreTone(score: number) {
  if (score >= 90) return "bg-success/12 text-success border-success/20"
  if (score >= 80) return "bg-info/10 text-info border-info/20"
  return "bg-warning/15 text-warning-foreground border-warning/30"
}

function ScoreBar({ value, label, icon: Icon }: { value: number; label: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="w-24 shrink-0 text-xs text-muted-foreground">{label}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            value >= 80 ? "bg-success" : value >= 60 ? "bg-primary" : "bg-warning",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-7 text-right text-xs font-medium tabular-nums">{value}</span>
    </div>
  )
}

interface MatchCardProps {
  provider: MatchProvider
  /** AI-generated match result. When provided the card shows AI scores and explanation. */
  aiResult?: MatchResult
  /** True while the AI is still computing results for this provider. */
  aiLoading?: boolean
}

export function MatchCard({ provider, aiResult, aiLoading = false }: MatchCardProps) {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

  // Use the AI confidence score when available, fall back to static matchScore
  const displayScore = aiResult ? aiResult.confidenceScore : provider.matchScore

  function handleAccept() {
    setAccepted(true)
    toast.success(`${provider.name} — ${t("smart.accept")}`)
  }

  function handleViewProfile() {
    toast.info(`${provider.name} — ${t("smart.viewProfile")}`)
  }

  return (
    <Card className="gap-0 p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Building2 className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-semibold">{provider.name}</p>
            {provider.verified && <BadgeCheck className="size-4 shrink-0 text-primary" />}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Truck className="size-3.5" />
              {provider.transportType} · {provider.capacity} {t("common.tons")}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {t("smart.available")} {provider.availableDate}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-warning text-warning" />
              {provider.rating}
            </span>
          </div>
          {/* AI-generated highlight flags */}
          {aiResult && aiResult.flags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {aiResult.flags.map((flag) => (
                <span
                  key={flag}
                  className="inline-flex items-center gap-0.5 rounded-full bg-primary/8 px-2 py-0.5 text-[11px] font-medium text-primary"
                >
                  {flag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Badge variant="outline" className={cn("rounded-full font-semibold", scoreTone(displayScore))}>
            {displayScore}% {t("smart.match")}
          </Badge>
          {aiResult && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <Sparkles className="size-3 text-primary" />
              AI ranked #{aiResult.rank}
            </span>
          )}
          {aiLoading && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground animate-pulse">
              <Sparkles className="size-3 text-primary" />
              Ranking...
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-border pt-3">
        <div>
          <p className="text-xs text-muted-foreground">{t("smart.estimatedPrice")}</p>
          <p className="font-heading text-lg font-bold">OMR {provider.price}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleViewProfile}>
            {t("smart.viewProfile")}
          </Button>
          <Button size="sm" onClick={handleAccept} disabled={accepted} className={accepted ? "bg-success hover:bg-success" : ""}>
            {accepted ? t("common.accepted") : t("smart.accept")}
          </Button>
        </div>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        aria-expanded={open}
      >
        {t("smart.whyMatch")}
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="mt-2 flex flex-col gap-3">
          {/* AI explanation — shown when available */}
          {aiResult ? (
            <>
              <p className="text-xs leading-relaxed text-muted-foreground">
                <Sparkles className="mr-1 inline size-3 text-primary" />
                {aiResult.explanation}
              </p>
              <div className="flex flex-col gap-2 rounded-lg bg-muted/40 p-3">
                <ScoreBar value={aiResult.routeCompatibility} label="Route fit" icon={Route} />
                <ScoreBar value={aiResult.capacityFit} label="Capacity" icon={Boxes} />
                <ScoreBar value={aiResult.timingScore} label="Timing" icon={Clock} />
                <ScoreBar value={aiResult.priceScore} label="Price" icon={TrendingDown} />
              </div>
            </>
          ) : (
            <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li>• {t("smart.routeCompatDesc")}</li>
              <li>• {t("smart.capacityFitDesc")}</li>
              <li>• {t("smart.priceAdvantageDesc")}</li>
            </ul>
          )}
        </div>
      )}
    </Card>
  )
}
