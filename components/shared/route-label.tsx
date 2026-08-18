"use client"

import { ArrowRight } from "lucide-react"
import { useLocale } from "@/lib/i18n/locale-provider"
import { cn } from "@/lib/utils"

// Route label with a direction-aware arrow. In RTL the visual order flips
// automatically because the flex container inherits `dir`, and we flip the
// arrow glyph so it always points from origin to destination.
export function RouteLabel({
  origin,
  destination,
  className,
}: {
  origin: string
  destination: string
  className?: string
}) {
  const { dir } = useLocale()
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-medium", className)}>
      <span>{origin}</span>
      <ArrowRight className={cn("size-3.5 shrink-0 text-muted-foreground", dir === "rtl" && "rotate-180")} />
      <span>{destination}</span>
    </span>
  )
}
