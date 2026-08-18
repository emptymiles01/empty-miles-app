"use client"

import Link from "next/link"
import { PortalShell } from "@/components/portal/portal-shell"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPinned, CheckCircle2, Wallet, Star, Package, ArrowRight } from "lucide-react"
import { driverKpis, driverLoads, driverTrips } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"

export default function DriverDashboard() {
  const { t } = useI18n()
  const activeTrip = driverTrips.find((trip) => trip.status === "inTransit")

  return (
    <PortalShell portal="driver" titleKey="drv.dashboard" subtitleKey="drv.dashboardSub">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard labelKey="drv.activeTrips" value={String(driverKpis.activeTrips)} icon={MapPinned} />
          <StatCard labelKey="drv.completedTrips" value={String(driverKpis.completedTrips)} icon={CheckCircle2} />
          <StatCard labelKey="drv.thisMonth" value={`OMR ${driverKpis.thisMonth.toLocaleString()}`} icon={Wallet} trend="+12%" trendUp />
          <StatCard labelKey="drv.rating" value={`${driverKpis.rating} / 5`} icon={Star} hintTone="primary" />
        </div>

        {activeTrip && (
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t("track.title")}</CardTitle>
              <StatusBadge status={activeTrip.status} />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <RouteLabel origin={activeTrip.origin} destination={activeTrip.destination} className="font-semibold" />
                <span className="text-sm text-muted-foreground">{activeTrip.eta}</span>
              </div>
              <Progress value={activeTrip.progress} />
              <Button variant="outline" size="sm" className="w-fit" render={<Link href="/driver/trips" />}>
                {t("drv.viewTrip")}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{t("drv.availableLoads")}</CardTitle>
            <Button variant="ghost" size="sm" render={<Link href="/driver/loads" />}>
              {t("common.viewAll")}
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {driverLoads.slice(0, 3).map((load) => (
              <div
                key={load.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Package className="size-4" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <RouteLabel origin={load.origin} destination={load.destination} className="font-semibold" />
                    <p className="text-xs text-muted-foreground">
                      {load.weight} Tons · {load.cargo} · {load.distance} km
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-end">
                    <p className="text-xs text-muted-foreground">{t("drv.payout")}</p>
                    <p className="font-heading font-bold">OMR {load.payout}</p>
                  </div>
                  <Button size="sm">{t("drv.accept")}</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
