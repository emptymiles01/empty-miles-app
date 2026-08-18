"use client"

import { ArrowRight } from "lucide-react"
import { topRoutes } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"

export function LandingRoutes() {
  const { t } = useLocale()

  // Indicative starting prices per corridor (OMR)
  const prices = [120, 180, 95, 240]

  return (
    <section id="routes" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("landing.routes.tag")}</span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance lg:text-4xl">
            {t("landing.routes.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            {t("landing.routes.subtitle")}
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topRoutes.map((r, i) => (
            <div
              key={`${r.origin}-${r.destination}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-2 font-heading text-lg font-bold">
                <span>{r.origin}</span>
                <ArrowRight className="size-4 text-primary rtl:rotate-180" />
                <span>{r.destination}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{r.matches}</span> {t("landing.routes.matches")}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("landing.routes.from")} <span className="font-semibold text-primary">OMR {prices[i]}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
