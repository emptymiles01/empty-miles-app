"use client"

import Link from "next/link"
import { MapPin, Truck, Eye } from "lucide-react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { portalConfigs } from "@/lib/nav-config"
import { shipments } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"

export default function ClientShipmentsPage() {
  const { t } = useLocale()

  return (
    <PortalShell config={portalConfigs.client} title={t("nav.shipments")}>
      <div className="flex flex-col gap-5">
        <PageHeader title={t("nav.shipments")} subtitle={t("track.subtitle")} />

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
                  {s.provider} · {s.cargo}
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

                <Button variant="outline" size="sm" className="w-full" render={<Link href={`/client/shipments/${s.id}`} />}>
                  <Eye className="size-4" />
                  {t("track.title")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  )
}
