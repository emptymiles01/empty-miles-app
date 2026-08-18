"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Clock, User, Truck, CheckCircle2, Circle } from "lucide-react"
import { PortalShell } from "@/components/portal/portal-shell"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { RouteMap } from "@/components/shared/route-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { portalConfigs } from "@/lib/nav-config"
import { shipments } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"

export default function ShipmentTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { t } = useLocale()
  const shipment = shipments.find((s) => s.id === id)
  if (!shipment) notFound()

  const timeline = [
    { labelKey: "track.tl.created", time: "14 May, 09:12", done: true },
    { labelKey: "track.tl.assigned", time: "15 May, 11:40", done: shipment.progress > 0 },
    { labelKey: "track.tl.pickedUp", time: "16 May, 08:00", done: shipment.progress >= 18 },
    { labelKey: "track.tl.inTransit", time: "—", done: shipment.progress >= 50 },
    { labelKey: "track.tl.delivered", time: shipment.status === "delivered" ? shipment.eta : "—", done: shipment.progress >= 100 },
  ]

  return (
    <PortalShell config={portalConfigs.client} title={t("track.title")}>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" render={<Link href="/client/shipments" />}>
            <ArrowLeft className="size-4" />
            {t("nav.shipments")}
          </Button>
          <StatusBadge status={shipment.status} />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_minmax(300px,38%)]">
          <div className="flex flex-col gap-5">
            <Card className="overflow-hidden p-0">
              <RouteMap origin={shipment.origin} destination={shipment.destination} className="aspect-[16/10] w-full" />
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{shipment.id}</p>
                    <RouteLabel origin={shipment.origin} destination={shipment.destination} className="mt-1 text-lg font-bold" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Progress value={shipment.progress} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{shipment.progress}%</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {t("track.eta")}: {shipment.eta}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoRow icon={User} label={t("track.driver")} value={shipment.driver} />
                  <InfoRow icon={Truck} label={t("track.vehicle")} value={shipment.vehicle} />
                  <InfoRow icon={MapPin} label={t("track.currentLocation")} value={`${shipment.origin} region`} />
                  <InfoRow icon={Clock} label={t("track.eta")} value={shipment.eta} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("track.timeline")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="relative flex flex-col gap-6 ps-2">
                {timeline.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      {step.done ? (
                        <CheckCircle2 className="size-5 shrink-0 text-success" />
                      ) : (
                        <Circle className="size-5 shrink-0 text-muted-foreground/40" />
                      )}
                      {i < timeline.length - 1 && (
                        <span className={`mt-1 w-px flex-1 min-h-6 ${step.done ? "bg-success/40" : "bg-border"}`} />
                      )}
                    </div>
                    <div className="-mt-0.5 pb-4">
                      <p className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {t(step.labelKey as never)}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
