"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { PortalSidebar } from "./portal-sidebar"
import { PortalTopbar } from "./portal-topbar"
import { type Portal, type PortalConfig, portalConfigs } from "@/lib/nav-config"
import { useLocale } from "@/lib/i18n/locale-provider"

export function PortalShell({
  config: configProp,
  portal,
  title,
  titleKey,
  subtitle,
  subtitleKey,
  children,
}: {
  config?: PortalConfig
  portal?: Portal
  title?: string
  titleKey?: string
  subtitle?: string
  subtitleKey?: string
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { dir, t } = useLocale()

  const config = configProp ?? portalConfigs[portal ?? "client"]
  const resolvedTitle = title ?? (titleKey ? t(titleKey as never) : "")
  const resolvedSubtitle = subtitle ?? (subtitleKey ? t(subtitleKey as never) : undefined)

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <PortalSidebar config={config} />
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side={dir === "rtl" ? "right" : "left"} className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <PortalSidebar config={config} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopbar
          config={config}
          title={resolvedTitle}
          subtitle={resolvedSubtitle}
          onOpenSidebar={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
