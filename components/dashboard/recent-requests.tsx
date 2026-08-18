"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { requests } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"

export function RecentRequests() {
  const { t } = useLocale()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">{t("dash.recentRequests")}</CardTitle>
        <Link href="/client/requests" className="text-sm font-medium text-primary hover:underline">
          {t("common.viewAll")}
        </Link>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="ps-6">{t("common.route")}</TableHead>
              <TableHead>{t("common.cargo")}</TableHead>
              <TableHead className="hidden md:table-cell">{t("common.date")}</TableHead>
              <TableHead className="hidden sm:table-cell">{t("common.matches")}</TableHead>
              <TableHead className="pe-6 text-end">{t("common.status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.slice(0, 4).map((r) => (
              <TableRow key={r.id}>
                <TableCell className="ps-6">
                  <RouteLabel origin={r.origin} destination={r.destination} />
                </TableCell>
                <TableCell className="text-muted-foreground">{r.cargo}</TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">{r.date}</TableCell>
                <TableCell className="hidden sm:table-cell">{r.matches}</TableCell>
                <TableCell className="pe-6 text-end">
                  <StatusBadge status={r.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
