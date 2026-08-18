"use client"

import Link from "next/link"
import { MapPin, Truck, Package, Boxes, TrendingDown, Sparkles, Radio, BadgePercent, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/i18n/locale-provider"

export function LandingHero() {
  const { t } = useLocale()

  const stats = [
    { icon: Truck, value: "1,250+", label: t("landing.stats.providers") },
    { icon: Boxes, value: "8,750+", label: t("landing.stats.matched") },
    { icon: Package, value: "32,000+", label: t("landing.stats.delivered") },
    { icon: TrendingDown, value: "18%", label: t("landing.stats.savings") },
  ]

  const features = [
    { icon: Sparkles, title: t("landing.feat.ai.title"), desc: t("landing.feat.ai.desc") },
    { icon: Radio, title: t("landing.feat.capacity.title"), desc: t("landing.feat.capacity.desc") },
    { icon: BadgePercent, title: t("landing.feat.rates.title"), desc: t("landing.feat.rates.desc") },
    { icon: Eye, title: t("landing.feat.visibility.title"), desc: t("landing.feat.visibility.desc") },
  ]

  return (
    <section id="top" className="relative overflow-hidden bg-navy text-navy-foreground">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-logistics.png"
          alt="Cargo truck, airplane and container ship across the GCC"
          className="size-full object-cover object-center"
        />
        {/* Dark gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-28 lg:pt-36">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1 text-xs font-medium text-navy-foreground/80">
            <MapPin className="size-3.5 text-primary" />
            {t("brand.tagline")}
          </span>

          <h1 className="mt-6 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-balance lg:text-6xl">
            {t("landing.hero.title1")} <span className="text-primary">{t("landing.hero.title2")}</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-navy-foreground/70">
            {t("landing.hero.subtitle")}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" className="h-11 px-5" render={<Link href="/login" />}>
              {t("landing.hero.createShipment")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-primary-foreground/20 bg-transparent px-5 text-navy-foreground hover:bg-primary-foreground/10 hover:text-navy-foreground"
              render={<Link href="/login" />}
            >
              {t("landing.hero.listCapacity")}
            </Button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 bg-navy px-5 py-4">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <s.icon className="size-4" />
              </span>
              <div>
                <p className="font-heading text-lg font-bold leading-none">{s.value}</p>
                <p className="mt-1 text-xs text-navy-foreground/60">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SmartMatch features */}
        <div className="mt-14 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-primary">{t("landing.smart.title")}</h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-navy-foreground/70">
            {t("landing.smart.subtitle")}
          </p>
          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <f.icon className="size-4" />
                </span>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs leading-relaxed text-navy-foreground/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
