"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Boxes, CheckCircle2, TrendingUp, Wallet } from "lucide-react"
import { providerRevenue, capacities } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

const utilization = [
  { route: "Muscat → Dubai", used: 88 },
  { route: "Sohar → Riyadh", used: 72 },
  { route: "Muscat → Doha", used: 64 },
  { route: "Salalah → Dubai", used: 54 },
]

export default function ProviderAnalyticsPage() {
  const { t, dir } = useI18n()

  return (
    <PortalShell portal="provider" titleKey="nav.analytics">
      <div className="flex flex-col gap-5">
        <PageHeader titleKey="analytics.title" subtitleKey="analytics.subtitle" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard labelKey="prov.totalEarnings" value="OMR 44,120" icon={Wallet} trend="+14%" trendUp />
          <StatCard labelKey="prov.revenue" value="OMR 8,920" icon={TrendingUp} hint={t("common.thisMonth")} />
          <StatCard labelKey="prov.acceptedRequests" value="52" icon={CheckCircle2} trend="+6 this month" trendUp />
          <StatCard labelKey="prov.availableCapacity" value="120 Tons" icon={Boxes} />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("prov.revenueTrend")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[280px] w-full"
                config={{ revenue: { label: t("prov.revenue"), color: "var(--chart-1)" } }}
              >
                <AreaChart data={providerRevenue} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} reversed={dir === "rtl"} />
                  <YAxis tickLine={false} axisLine={false} width={56} orientation={dir === "rtl" ? "right" : "left"} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <defs>
                    <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="revenue" type="monotone" fill="url(#fillRevenue)" stroke="var(--color-revenue)" strokeWidth={2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("prov.utilization")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                className="h-[280px] w-full"
                config={{ used: { label: t("prov.utilization"), color: "var(--chart-2)" } }}
              >
                <BarChart data={utilization} layout="vertical" margin={{ left: 8, right: 8 }}>
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="route"
                    tickLine={false}
                    axisLine={false}
                    width={110}
                    tick={{ fontSize: 11 }}
                    orientation={dir === "rtl" ? "right" : "left"}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="used" fill="var(--color-used)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  )
}
