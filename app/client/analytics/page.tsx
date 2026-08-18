"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useI18n } from "@/lib/i18n/locale-provider"
import { Banknote, Package, Route, TrendingUp } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

const savingsData = [
  { month: "Jan", savings: 4200, spend: 18400 },
  { month: "Feb", savings: 5100, spend: 17200 },
  { month: "Mar", savings: 6800, spend: 19500 },
  { month: "Apr", savings: 7400, spend: 16800 },
  { month: "May", savings: 9200, spend: 15400 },
  { month: "Jun", savings: 12450, spend: 14200 },
]

const routeVolume = [
  { route: "Muscat → Dubai", shipments: 32 },
  { route: "Muscat → Riyadh", shipments: 28 },
  { route: "Sohar → Dubai", shipments: 22 },
  { route: "Salalah → Doha", shipments: 18 },
  { route: "Muscat → Doha", shipments: 14 },
]

export default function AnalyticsPage() {
  const { t, dir } = useI18n()

  return (
    <PortalShell portal="client" titleKey="nav.analytics">
      <PageHeader titleKey="analytics.title" subtitleKey="analytics.subtitle" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard labelKey="analytics.totalSpend" value="OMR 101,500" icon={Banknote} trend="-8% vs last period" trendUp />
        <StatCard labelKey="analytics.totalSavings" value="OMR 45,150" icon={TrendingUp} trend="+18%" trendUp />
        <StatCard labelKey="analytics.totalShipments" value="114" icon={Package} trend="+12 this month" trendUp />
        <StatCard labelKey="analytics.activeRoutes" value="8" icon={Route} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("analytics.savingsTrend")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[280px] w-full"
              config={{
                savings: { label: t("analytics.totalSavings"), color: "var(--chart-2)" },
                spend: { label: t("analytics.totalSpend"), color: "var(--chart-1)" },
              }}
            >
              <AreaChart data={savingsData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} reversed={dir === "rtl"} />
                <YAxis tickLine={false} axisLine={false} width={48} orientation={dir === "rtl" ? "right" : "left"} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillSavings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-savings)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-savings)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="fillSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-spend)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-spend)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <Area dataKey="spend" type="monotone" fill="url(#fillSpend)" stroke="var(--color-spend)" strokeWidth={2} />
                <Area dataKey="savings" type="monotone" fill="url(#fillSavings)" stroke="var(--color-savings)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("analytics.routeVolume")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              className="h-[280px] w-full"
              config={{ shipments: { label: t("analytics.totalShipments"), color: "var(--chart-1)" } }}
            >
              <BarChart data={routeVolume} layout="vertical" margin={{ left: 8, right: 8 }}>
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
                <Bar dataKey="shipments" fill="var(--color-shipments)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
