"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/brand/logo"
import { LocaleSwitcher } from "@/components/shared/locale-switcher"
import { useLocale } from "@/lib/i18n/locale-provider"

export function LandingNav() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)

  const links: { key: string; href: string }[] = [
    { key: "landing.nav.home", href: "#top" },
    { key: "landing.nav.solutions", href: "#solutions" },
    { key: "landing.nav.forProviders", href: "#how" },
    { key: "landing.nav.company", href: "#routes" },
    { key: "landing.nav.resources", href: "#testimonials" },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="#top" aria-label="Empty Miles">
          <Logo variant="light" />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {t(l.key as never)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LocaleSwitcher compact />
          </div>
          <Button variant="ghost" className="hidden text-navy-foreground hover:bg-primary-foreground/10 hover:text-navy-foreground sm:inline-flex lg:hidden xl:inline-flex" render={<Link href="/login" />}>
            {t("auth.signIn")}
          </Button>
          <Button render={<Link href="/signup" />}>{t("landing.nav.getStarted")}</Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="text-navy-foreground hover:bg-primary-foreground/10 hover:text-navy-foreground lg:hidden" aria-label="Menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="top" className="border-border">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-1 pt-2">
                {links.map((l) => (
                  <a
                    key={l.key}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {t(l.key as never)}
                  </a>
                ))}
                <div className="mt-3 flex items-center justify-between border-t border-border pt-4">
                  <LocaleSwitcher compact />
                  <Button render={<Link href="/login" />}>{t("auth.signIn")}</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
