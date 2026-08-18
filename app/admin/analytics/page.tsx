"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { useI18n } from "@/lib/i18n/locale-provider"
import { adminKpis, platformGrowth, userBreakdown } from "@/lib/data"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Cell,
  Pie,
  PieChart,
} from "recharts"
import { Users, Package, Wallet, ShieldCheck } from "lucide-react"

const growthConfig = {
  users: { label: "Users", color: "var(--chart-1)" },
  shipments: { label: "Shipments", color: "var(--chart-2)" },
}

const breakdownConfig = {
  value: { label: "Users" },
  Clients: { label: "Clients", color: "var(--chart-1)" },
  Providers: { label: "Providers", color: "var(--chart-2)" },
  Drivers: { label: "Drivers", color: "var(--chart-3)" },
}

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"]

export default function AdminAnalyticsPage() {
  const { t } = useI18n()

  return (
    <PortalShell portal="admin" titleKey="nav.analytics" subtitleKey="adm.dashboardSub">
      <div className="flex flex-col gap-6">
        <PageHeader titleKey="nav.analytics" subtitleKey="adm.dashboardSub" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard labelKey="adm.totalUsers" value={adminKpis.totalUsers.toLocaleString()} icon={Users} />
          <StatCard labelKey="adm.activeShipments" value={String(adminKpis.activeShipments)} icon={Package} />
          <StatCard labelKey="adm.gmv" value={`OMR ${adminKpis.gmv.toLocaleString()}`} icon={Wallet} />
          <StatCard labelKey="adm.pendingVerifications" value={String(adminKpis.pendingVerifications)} icon={ShieldCheck} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("adm.platformGrowth")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={growthConfig} className="h-72 w-full">
                <AreaChart data={platformGrowth} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="fillShipments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-shipments)" stopOpacity={0.7} />
                      <stop offset="95%" stopColor="var(--color-shipments)" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="users" type="monotone" stroke="var(--color-users)" fill="url(#fillUsers)" strokeWidth={2} />
                  <Area dataKey="shipments" type="monotone" stroke="var(--color-shipments)" fill="url(#fillShipments)" strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("adm.userBreakdown")}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ChartContainer config={breakdownConfig} className="mx-auto aspect-square h-64">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="type" />} />
                  <Pie data={userBreakdown} dataKey="value" nameKey="type" innerRadius={55} strokeWidth={4}>
                    {userBreakdown.map((entry, i) => (
                      <Cell key={entry.type} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  )
}
