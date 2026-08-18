"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { useI18n } from "@/lib/i18n/locale-provider"
import { shipments } from "@/lib/data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { Progress } from "@/components/ui/progress"

export default function AdminShipmentsPage() {
  const { t } = useI18n()

  return (
    <PortalShell portal="admin" titleKey="nav.shipments" subtitleKey="adm.shipmentsSub">
      <div className="flex flex-col gap-6">
        <PageHeader titleKey="nav.shipments" subtitleKey="adm.shipmentsSub" />

        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("shipments.id")}</TableHead>
                <TableHead>{t("common.route")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("track.provider")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("shipments.progress")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.id}</TableCell>
                  <TableCell>
                    <RouteLabel origin={s.origin} destination={s.destination} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {s.provider}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress value={s.progress} className="w-24" />
                      <span className="text-xs text-muted-foreground">{s.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={s.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </PortalShell>
  )
}
