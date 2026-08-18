"use client"

import { useLocale } from "@/lib/i18n/locale-provider"
import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  titleKey,
  subtitle,
  subtitleKey,
  actions,
  children,
  className,
}: {
  title?: string
  titleKey?: string
  subtitle?: string
  subtitleKey?: string
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  const { t } = useLocale()
  const resolvedTitle = title ?? (titleKey ? t(titleKey as never) : "")
  const resolvedSubtitle = subtitle ?? (subtitleKey ? t(subtitleKey as never) : undefined)
  const right = actions ?? children

  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <h2 className="font-heading text-xl font-bold tracking-tight">{resolvedTitle}</h2>
        {resolvedSubtitle && <p className="mt-1 text-sm text-muted-foreground">{resolvedSubtitle}</p>}
      </div>
      {right && <div className="flex flex-wrap items-center gap-2">{right}</div>}
    </div>
  )
}
