"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/i18n/locale-provider"

export function LandingCta() {
  const { t } = useLocale()

  return (
    <section className="bg-background pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center text-navy-foreground lg:px-12 lg:py-20">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance lg:text-4xl">
              {t("landing.cta.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy-foreground/70 text-pretty">
              {t("landing.cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="h-11 px-5" render={<Link href="/signup" />}>
                {t("landing.cta.primary")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-primary-foreground/20 bg-transparent px-5 text-navy-foreground hover:bg-primary-foreground/10 hover:text-navy-foreground"
                render={<Link href="/login" />}
              >
                {t("landing.cta.secondary")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
