"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { driverTrips } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"

export default function DriverTripsPage() {
  const { t } = useI18n()

  return (
    <PortalShell portal="driver" titleKey="nav.myTrips">
      <div className="flex flex-col gap-5">
        <PageHeader titleKey="drv.myTrips" subtitleKey="drv.tripsSub" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {driverTrips.map((trip) => (
            <Card key={trip.id} className="gap-0">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">{trip.id}</p>
                    <RouteLabel origin={trip.origin} destination={trip.destination} className="font-semibold" />
                  </div>
                  <StatusBadge status={trip.status} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Progress value={trip.progress} />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{trip.eta}</span>
                    <span className="font-medium text-foreground">OMR {trip.payout}</span>
                  </div>
                </div>

                <Button variant={trip.status === "inTransit" ? "default" : "outline"} size="sm" className="w-full">
                  {trip.status === "inTransit" ? t("drv.viewTrip") : t("track.title")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  )
}
