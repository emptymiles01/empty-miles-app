"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { incomingRequests } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { toast } from "sonner"

export default function ProviderRequestsPage() {
  const { t } = useI18n()

  return (
    <PortalShell portal="provider" titleKey="nav.requests">
      <div className="flex flex-col gap-5">
        <PageHeader titleKey="nav.requests" subtitleKey="prov.requestsSub" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {incomingRequests.map((r) => (
            <Card key={r.id} className="gap-0">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">{r.id}</p>
                    <RouteLabel origin={r.origin} destination={r.destination} className="font-semibold" />
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-muted-foreground">{t("cap.matchScore")}</p>
                    <p className="font-heading text-lg font-bold text-success">{r.matchScore}%</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {r.weight} Tons · {r.cargoType} · {r.date}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.info(`${r.id} — ${t("prov.view")}`)}>
                    {t("prov.view")}
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => toast.success(`${r.id} — ${t("prov.respond")}`)}>
                    {t("prov.respond")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalShell>
  )
}
