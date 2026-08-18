"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLocale } from "@/lib/i18n/locale-provider"
import type { TranslationKey } from "@/lib/i18n/dictionaries"

type StatusKind =
  | "newMatches"
  | "inProgress"
  | "inTransit"
  | "delivered"
  | "pending"
  | "cancelled"
  | "available"
  | "draft"
  | "active"
  | "completed"
  | "paid"
  | "unpaid"
  | "overdue"

const styles: Record<StatusKind, string> = {
  newMatches: "bg-info/10 text-info border-info/20",
  inProgress: "bg-warning/15 text-warning-foreground border-warning/30",
  inTransit: "bg-primary/10 text-primary border-primary/20",
  delivered: "bg-success/12 text-success border-success/20",
  pending: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  available: "bg-success/12 text-success border-success/20",
  draft: "bg-muted text-muted-foreground border-border",
  active: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-success/12 text-success border-success/20",
  paid: "bg-success/12 text-success border-success/20",
  unpaid: "bg-warning/15 text-warning-foreground border-warning/30",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
}

export function StatusBadge({ status, className }: { status: StatusKind; className?: string }) {
  const { t } = useLocale()
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium", styles[status], className)}>
      {t(`status.${status}` as TranslationKey)}
    </Badge>
  )
}
