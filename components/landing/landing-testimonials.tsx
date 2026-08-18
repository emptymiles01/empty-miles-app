"use client"

import { Quote } from "lucide-react"
import { useLocale } from "@/lib/i18n/locale-provider"

export function LandingTestimonials() {
  const { t } = useLocale()

  const items = [
    { quote: t("landing.test.q1"), name: t("landing.test.n1"), initials: "AN" },
    { quote: t("landing.test.q2"), name: t("landing.test.n2"), initials: "GF" },
    { quote: t("landing.test.q3"), name: t("landing.test.n3"), initials: "MD" },
  ]

  return (
    <section id="testimonials" className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("landing.test.tag")}</span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance lg:text-4xl">
            {t("landing.test.title")}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <figure key={item.name} className="flex flex-col rounded-2xl border border-border bg-card p-7">
              <Quote className="size-7 text-primary/30" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                  {item.initials}
                </span>
                <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
