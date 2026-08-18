"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/brand/logo"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/lib/i18n/locale-provider"
import type { TranslationKey } from "@/lib/i18n/dictionaries"
import type { PortalConfig } from "@/lib/nav-config"

export function PortalSidebar({
  config,
  onNavigate,
}: {
  config: PortalConfig
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const { t } = useLocale()
  const dark = config.brandVariant === "light" // provider uses dark sidebar

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-e",
        dark ? "border-transparent bg-navy text-navy-foreground" : "border-border bg-card text-card-foreground",
      )}
    >
      <div className="flex h-16 items-center px-5">
        <Logo variant={dark ? "light" : "dark"} />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-1">
          {config.nav.map((item) => {
            const active =
              item.href === config.basePath
                ? pathname === item.href
                : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? dark
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary text-primary-foreground"
                      : dark
                        ? "text-navy-foreground/70 hover:bg-primary-foreground/10 hover:text-navy-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="size-[18px] shrink-0" />
                  <span className="flex-1 truncate">{t(item.labelKey as TranslationKey)}</span>
                  {item.badge ? (
                    <Badge
                      className={cn(
                        "h-5 min-w-5 justify-center rounded-full px-1.5 text-[11px]",
                        active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/15 text-primary",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-3">
        <div
          className={cn(
            "rounded-xl p-4",
            dark ? "bg-primary-foreground/5" : "bg-muted",
          )}
        >
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <HelpCircle className="size-4" />
            </span>
            <p className="text-sm font-semibold">{t("common.help")}</p>
          </div>
          <p className={cn("mt-2 text-xs leading-relaxed", dark ? "text-navy-foreground/60" : "text-muted-foreground")}>
            {t("common.helpText")}
          </p>
        </div>
      </div>
    </aside>
  )
}
