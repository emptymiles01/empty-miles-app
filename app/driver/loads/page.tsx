"use client"

import { useState } from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Route, CalendarClock } from "lucide-react"
import { driverLoads } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { toast } from "sonner"

export default function DriverLoadsPage() {
  const { t } = useI18n()
  const [accepted, setAccepted] = useState<Set<string>>(new Set())

  function handleAccept(id: string) {
    setAccepted((prev) => new Set(prev).add(id))
    toast.success(t("common.accepted"))
  }

  return (
    <PortalShell portal="driver" titleKey="nav.availableLoads">
      <div className="flex flex-col gap-5">
        <PageHeader titleKey="drv.availableLoads" subtitleKey="drv.loadsSub" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {driverLoads.map((load) => (
            <Card key={load.id} className="gap-0">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Package className="size-4" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-muted-foreground">{load.id}</p>
                      <RouteLabel origin={load.origin} destination={load.destination} className="font-semibold" />
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-muted-foreground">{t("drv.payout")}</p>
                    <p className="font-heading text-lg font-bold">OMR {load.payout}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Package className="size-3.5" />
                    {load.weight} Tons · {load.cargo}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Route className="size-3.5" />
                    {load.distance} km
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarClock className="size-3.5" />
                    {load.pickupDate}
                  </span>
                </div>

                <Button
                  size="sm"
                  className={`w-full ${accepted.has(load.id) ? "bg-success hover:bg-success" : ""}`}
                  disabled={accepted.has(load.id)}
                  onClick={() => handleAccept(load.id)}
                >
                  {accepted.has(load.id) ? t("common.accepted") : t("drv.accept")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  )
}
