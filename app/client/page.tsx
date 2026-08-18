"use client"

import Link from "next/link"
import { FileText, Sparkles, Truck, PiggyBank, ExternalLink } from "lucide-react"
import { PortalShell } from "@/components/portal/portal-shell"
import { StatCard } from "@/components/shared/stat-card"
import { RecentRequests } from "@/components/dashboard/recent-requests"
import { ShipmentsOverview } from "@/components/dashboard/shipments-overview"
import { TopRoutes } from "@/components/dashboard/top-routes"
import { Button } from "@/components/ui/button"
import { portalConfigs } from "@/lib/nav-config"
import { clientKpis, currentUser } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"

export default function ClientDashboardPage() {
  const { t, locale } = useLocale()
  const user = currentUser.client
  const firstName = (locale === "ar" ? user.nameAr : user.name).split(" ")[0]

  return (
    <PortalShell
      config={portalConfigs.client}
      title={`${t("dash.greeting")}, ${firstName}`}
      subtitle={t("dash.subtitle")}
    >
      <div className="flex flex-col gap-6">
        {/* KPI cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label={t("dash.activeRequests")}
            value={String(clientKpis.activeRequests)}
            icon={FileText}
            hint={`+${clientKpis.activeRequestsDelta} ${t("common.thisWeek")}`}
            hintTone="success"
          />
          <StatCard
            label={t("dash.matchesFound")}
            value={String(clientKpis.matchesFound)}
            icon={Sparkles}
            hint={t("dash.newMatches")}
            hintTone="primary"
          />
          <StatCard
            label={t("dash.inTransit")}
            value={String(clientKpis.inTransit)}
            icon={Truck}
            hint={t("dash.shipmentsLabel")}
          />
          <StatCard
            label={t("dash.estSavings")}
            value={`OMR ${clientKpis.estSavings.toLocaleString()}`}
            icon={PiggyBank}
            hint={t("common.thisMonth")}
          />
        </div>

        {/* Recent requests + overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentRequests />
          </div>
          <ShipmentsOverview />
        </div>

        <TopRoutes />

        <div className="flex flex-wrap gap-3">
          <Button render={<Link href="/client/requests/new" />}>
            {t("landing.hero.createShipment")}
          </Button>
          <Button variant="outline" render={<Link href="/client/matches" />}>
            <ExternalLink className="size-4" />
            {t("nav.matches")}
          </Button>
        </div>
      </div>
    </PortalShell>
  )
}
