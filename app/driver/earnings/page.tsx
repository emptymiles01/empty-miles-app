"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Wallet, TrendingUp, Clock } from "lucide-react"
import { driverEarnings, driverKpis, payouts } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

export default function DriverEarningsPage() {
  const { t, dir } = useI18n()

  return (
    <PortalShell portal="driver" titleKey="nav.earnings">
      <div className="flex flex-col gap-5">
        <PageHeader titleKey="drv.earnings" subtitleKey="drv.earningsSub" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard labelKey="drv.thisMonth" value={`OMR ${driverKpis.thisMonth.toLocaleString()}`} icon={Wallet} trend="+12%" trendUp />
          <StatCard labelKey="prov.totalEarnings" value="OMR 15,100" icon={TrendingUp} />
          <StatCard labelKey="drv.pendingPayout" value={`OMR ${driverKpis.pendingPayout}`} icon={Clock} hintTone="primary" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("drv.earnings")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[260px] w-full"
              config={{ earnings: { label: t("drv.earnings"), color: "var(--chart-1)" } }}
            >
              <BarChart data={driverEarnings} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} reversed={dir === "rtl"} />
                <YAxis tickLine={false} axisLine={false} width={56} orientation={dir === "rtl" ? "right" : "left"} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="earnings" fill="var(--color-earnings)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="ps-6">{t("drv.payout")}</TableHead>
                  <TableHead>{t("common.route")}</TableHead>
                  <TableHead>{t("inv.amount")}</TableHead>
                  <TableHead>{t("common.date")}</TableHead>
                  <TableHead className="pe-6">{t("common.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="ps-6 font-medium">{p.id}</TableCell>
                    <TableCell className="text-muted-foreground">{p.route}</TableCell>
                    <TableCell className="font-semibold">OMR {p.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{p.date}</TableCell>
                    <TableCell className="pe-6">
                      <StatusBadge status={p.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
