"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Boxes, Sparkles, CheckCircle2, Wallet, Plus } from "lucide-react"
import { capacities, incomingRequests, providerKpis } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"

export default function ProviderDashboard() {
  const { t } = useI18n()

  return (
    <PortalShell portal="provider" titleKey="provider.dashboard" subtitleKey="provider.dashboardSub">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            labelKey="prov.availableCapacity"
            value={`${providerKpis.availableCapacity} Tons`}
            icon={Boxes}
            trend={`+${providerKpis.availableCapacityDelta} this week`}
            trendUp
          />
          <StatCard labelKey="prov.activeMatches" value={String(providerKpis.activeMatches)} icon={Sparkles} hint={t("dash.newMatches")} hintTone="primary" />
          <StatCard labelKey="prov.acceptedRequests" value={String(providerKpis.acceptedRequests)} icon={CheckCircle2} hint={t("common.thisMonth")} />
          <StatCard labelKey="prov.revenue" value={`OMR ${providerKpis.revenue.toLocaleString()}`} icon={Wallet} hint={t("common.thisMonth")} />
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>{t("prov.capacityOverview")}</CardTitle>
            <Button size="sm">
              <Plus className="size-4" />
              {t("cap.addCapacity")}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("common.route")}</TableHead>
                    <TableHead>{t("cap.transportType")}</TableHead>
                    <TableHead>{t("cap.capacity")}</TableHead>
                    <TableHead>{t("cap.availableFrom")}</TableHead>
                    <TableHead>{t("cap.rate")}</TableHead>
                    <TableHead>{t("prov.statusLabel")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {capacities.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <RouteLabel origin={c.origin} destination={c.destination} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">{c.transportType}</TableCell>
                      <TableCell>{c.capacity} Tons</TableCell>
                      <TableCell className="text-muted-foreground">{c.availableFrom}</TableCell>
                      <TableCell>{c.rate.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          {c.status === "available" ? t("cap.available") : t("status.inProgress")}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("cap.incomingRequests")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {incomingRequests.map((r) => (
              <div
                key={r.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <RouteLabel origin={r.origin} destination={r.destination} className="font-semibold" />
                  <p className="text-xs text-muted-foreground">
                    {r.weight} Tons · {r.cargoType} · {r.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-end">
                    <p className="text-xs text-muted-foreground">{t("cap.matchScore")}</p>
                    <p className="font-heading font-bold text-success">{r.matchScore}%</p>
                  </div>
                  <Button variant="outline" size="sm">
                    {t("prov.view")}
                  </Button>
                  <Button size="sm">{t("prov.respond")}</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
