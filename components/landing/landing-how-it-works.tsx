"use client"

import { FileText, Sparkles, MapPinned } from "lucide-react"
import { useLocale } from "@/lib/i18n/locale-provider"

export function LandingHowItWorks() {
  const { t } = useLocale()

  const steps = [
    { icon: FileText, title: t("landing.how.s1.title"), desc: t("landing.how.s1.desc") },
    { icon: Sparkles, title: t("landing.how.s2.title"), desc: t("landing.how.s2.desc") },
    { icon: MapPinned, title: t("landing.how.s3.title"), desc: t("landing.how.s3.desc") },
  ]

  return (
    <section id="how" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("landing.how.tag")}</span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance lg:text-4xl">
            {t("landing.how.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">{t("landing.how.subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-card p-7">
              <span className="absolute end-6 top-6 font-heading text-5xl font-extrabold text-muted/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
