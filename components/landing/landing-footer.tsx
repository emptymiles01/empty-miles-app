"use client"

import Link from "next/link"
import { Logo } from "@/components/brand/logo"
import { useLocale } from "@/lib/i18n/locale-provider"

export function LandingFooter() {
  const { t } = useLocale()

  const columns = [
    {
      title: t("landing.footer.product"),
      links: [
        { label: t("landing.footer.smartmatch"), href: "#solutions" },
        { label: t("landing.footer.tracking"), href: "#how" },
        { label: t("landing.footer.pricing"), href: "#routes" },
      ],
    },
    {
      title: t("landing.footer.companyCol"),
      links: [
        { label: t("landing.footer.about2"), href: "#testimonials" },
        { label: t("landing.footer.careers"), href: "#" },
        { label: t("landing.footer.contact"), href: "#" },
      ],
    },
    {
      title: t("landing.footer.legal"),
      links: [
        { label: t("landing.footer.privacy"), href: "#" },
        { label: t("landing.footer.terms"), href: "#" },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("landing.footer.about")}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Empty Miles. {t("landing.footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
