"use client"

import { MapPin, Truck, User } from "lucide-react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { shipments } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"

export default function ProviderShipmentsPage() {
  const { t } = useI18n()

  return (
    <PortalShell portal="provider" titleKey="nav.shipments">
      <div className="flex flex-col gap-5">
        <PageHeader titleKey="nav.shipments" subtitleKey="track.subtitle" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {shipments.map((s) => (
            <Card key={s.id} className="gap-0">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{s.id}</p>
                    <RouteLabel origin={s.origin} destination={s.destination} className="mt-1 font-semibold" />
                  </div>
                  <StatusBadge status={s.status} />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="size-4" />
                  {s.cargo}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  {s.driver} · {s.vehicle}
                </div>

                {s.status !== "pending" && (
                  <div className="flex flex-col gap-1.5">
                    <Progress value={s.progress} />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {s.progress}%
                      </span>
                      <span>{s.eta}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  )
}
