"use client"

import Link from "next/link"
import { PortalShell } from "@/components/portal/portal-shell"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, Package, CircleDollarSign, ShieldCheck, ArrowRight } from "lucide-react"
import { adminKpis, platformGrowth, verifications } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

export default function AdminDashboard() {
  const { t, dir } = useI18n()

  return (
    <PortalShell portal="admin" titleKey="adm.dashboard" subtitleKey="adm.dashboardSub">
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard labelKey="adm.totalUsers" value={adminKpis.totalUsers.toLocaleString()} icon={Users} trend="+18% MoM" trendUp />
          <StatCard labelKey="adm.activeShipments" value={String(adminKpis.activeShipments)} icon={Package} trend="+12%" trendUp />
          <StatCard labelKey="adm.gmv" value={`OMR ${(adminKpis.gmv / 1000).toFixed(0)}k`} icon={CircleDollarSign} trend="+22%" trendUp />
          <StatCard labelKey="adm.pendingVerifications" value={String(adminKpis.pendingVerifications)} icon={ShieldCheck} hintTone="primary" hint={t("adm.review")} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("adm.platformGrowth")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[280px] w-full"
                config={{
                  users: { label: t("adm.totalUsers"), color: "var(--chart-1)" },
                  shipments: { label: t("adm.activeShipments"), color: "var(--chart-2)" },
                }}
              >
                <AreaChart data={platformGrowth} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} reversed={dir === "rtl"} />
                  <YAxis tickLine={false} axisLine={false} width={48} orientation={dir === "rtl" ? "right" : "left"} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="fillShipmentsA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-shipments)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-shipments)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="users" type="monotone" fill="url(#fillUsers)" stroke="var(--color-users)" strokeWidth={2} />
                  <Area dataKey="shipments" type="monotone" fill="url(#fillShipmentsA)" stroke="var(--color-shipments)" strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>{t("adm.verification")}</CardTitle>
              <Button variant="ghost" size="sm" render={<Link href="/admin/verification" />}>
                {t("common.viewAll")}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {verifications.slice(0, 3).map((v) => (
                <div key={v.id} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{v.company}</span>
                    <span className="text-xs text-muted-foreground">{v.applicant}</span>
                  </div>
                  <Badge variant="secondary" className="bg-warning/10 text-warning">
                    {t("adm.pending")}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  )
}
