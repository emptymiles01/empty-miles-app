"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLocale } from "@/lib/i18n/locale-provider"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  labelKey,
  value,
  icon: Icon,
  hint,
  trend,
  trendUp,
  hintTone = "muted",
  className,
}: {
  label?: string
  labelKey?: string
  value: string
  icon: LucideIcon
  hint?: string
  trend?: string
  trendUp?: boolean
  hintTone?: "muted" | "success" | "primary"
  className?: string
}) {
  const { t } = useLocale()
  const resolvedLabel = label ?? (labelKey ? t(labelKey as never) : "")
  const resolvedHint = hint ?? trend
  const resolvedTone = hint ? hintTone : trend ? (trendUp ? "success" : "muted") : hintTone

  return (
    <Card className={cn("gap-0 py-0", className)}>
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-muted-foreground">{resolvedLabel}</p>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" />
          </span>
        </div>
        <p className="font-heading text-2xl font-bold tracking-tight">{value}</p>
        {resolvedHint && (
          <p
            className={cn(
              "text-xs font-medium",
              resolvedTone === "success" && "text-success",
              resolvedTone === "primary" && "text-primary",
              resolvedTone === "muted" && "text-muted-foreground",
            )}
          >
            {resolvedHint}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
