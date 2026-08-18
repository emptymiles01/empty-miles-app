"use client"

import { Cell, Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { shipmentBreakdown } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"

const chartConfig = {
  inTransit: { label: "In Transit", color: "var(--chart-1)" },
  delivered: { label: "Delivered", color: "var(--chart-2)" },
  pending: { label: "Pending", color: "var(--chart-3)" },
} satisfies ChartConfig

export function ShipmentsOverview() {
  const { t } = useLocale()
  const { total, inTransit, delivered, pending } = shipmentBreakdown

  const data = [
    { key: "inTransit", label: t("dash.inTransit"), value: inTransit, color: "var(--chart-1)", pct: 20 },
    { key: "delivered", label: t("dash.delivered"), value: delivered, color: "var(--chart-2)", pct: 60 },
    { key: "pending", label: t("dash.pending"), value: pending, color: "var(--chart-3)", pct: 20 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("dash.shipmentsOverview")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <ChartContainer config={chartConfig} className="aspect-square h-[150px]">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="label" innerRadius={48} outerRadius={70} strokeWidth={0}>
                {data.map((d) => (
                  <Cell key={d.key} fill={d.color} />
                ))}
              </Pie>
              <text x="50%" y="46%" textAnchor="middle" className="fill-foreground font-heading text-2xl font-bold">
                {total}
              </text>
              <text x="50%" y="60%" textAnchor="middle" className="fill-muted-foreground text-[11px]">
                {t("dash.total")}
              </text>
            </PieChart>
          </ChartContainer>

          <ul className="flex flex-1 flex-col gap-3">
            {data.map((d) => (
              <li key={d.key} className="flex items-center gap-2 text-sm">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="flex-1 text-muted-foreground">{d.label}</span>
                <span className="font-medium text-foreground">
                  {d.value} ({d.pct}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
