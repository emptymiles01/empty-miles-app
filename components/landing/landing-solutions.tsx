"use client"

import Link from "next/link"
import { Package, Truck, CarFront, Check, ArrowRight } from "lucide-react"
import { useLocale } from "@/lib/i18n/locale-provider"

export function LandingSolutions() {
  const { t } = useLocale()

  const solutions = [
    {
      icon: Package,
      href: "/signup?role=client",
      title: t("landing.sol.client.title"),
      desc: t("landing.sol.client.desc"),
      features: [t("landing.sol.client.f1"), t("landing.sol.client.f2"), t("landing.sol.client.f3")],
      featured: false,
    },
    {
      icon: Truck,
      href: "/signup?role=provider",
      title: t("landing.sol.provider.title"),
      desc: t("landing.sol.provider.desc"),
      features: [t("landing.sol.provider.f1"), t("landing.sol.provider.f2"), t("landing.sol.provider.f3")],
      featured: true,
    },
    {
      icon: CarFront,
      href: "/login",
      title: t("landing.sol.driver.title"),
      desc: t("landing.sol.driver.desc"),
      features: [t("landing.sol.driver.f1"), t("landing.sol.driver.f2"), t("landing.sol.driver.f3")],
      featured: false,
    },
  ]

  return (
    <section id="solutions" className="bg-muted/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("landing.sol.tag")}</span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance lg:text-4xl">
            {t("landing.sol.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">{t("landing.sol.subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {solutions.map((s) => (
            <div
              key={s.title}
              className={
                s.featured
                  ? "relative rounded-2xl border border-primary bg-card p-7 shadow-sm ring-1 ring-primary/20"
                  : "relative rounded-2xl border border-border bg-card p-7"
              }
            >
              <span
                className={
                  s.featured
                    ? "flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                    : "flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                }
              >
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

              <ul className="mt-5 flex flex-col gap-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={s.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                {t("landing.sol.learnMore")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
