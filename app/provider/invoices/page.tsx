"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { invoices } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { CircleDollarSign, Download, FileText, TriangleAlert } from "lucide-react"

export default function ProviderInvoicesPage() {
  const { t } = useI18n()

  const outstanding = invoices.filter((i) => i.status !== "paid").reduce((s, i) => s + i.amount, 0)
  const paid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0)
  const overdue = invoices.filter((i) => i.status === "overdue").length

  return (
    <PortalShell portal="provider" titleKey="nav.invoices">
      <PageHeader titleKey="inv.title" subtitleKey="inv.subtitle">
        <Button variant="outline">
          <Download data-icon="inline-start" />
          {t("common.export")}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard labelKey="inv.totalOutstanding" value={`OMR ${outstanding.toLocaleString()}`} icon={CircleDollarSign} />
        <StatCard labelKey="inv.paidThisMonth" value={`OMR ${paid.toLocaleString()}`} icon={FileText} />
        <StatCard labelKey="inv.overdue" value={String(overdue)} icon={TriangleAlert} />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("inv.number")}</TableHead>
                <TableHead>{t("common.route")}</TableHead>
                <TableHead>{t("inv.amount")}</TableHead>
                <TableHead>{t("common.date")}</TableHead>
                <TableHead>{t("inv.dueDate")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
                <TableHead className="text-end">{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.route}</TableCell>
                  <TableCell className="font-semibold">OMR {inv.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.dueDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={inv.status} />
                  </TableCell>
                  <TableCell className="text-end">
                    <Button variant="ghost" size="sm">
                      <Download data-icon="inline-start" />
                      {t("common.download")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PortalShell>
  )
}
