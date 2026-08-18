"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RouteLabel } from "@/components/shared/route-label"
import { topRoutes } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"

export function TopRoutes() {
  const { t } = useLocale()

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">{t("dash.topRoutes")}</CardTitle>
        <Button variant="outline" size="sm" render={<Link href="/client/analytics" />}>
          {t("dash.viewAnalytics")}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topRoutes.map((r) => (
            <div key={`${r.origin}-${r.destination}`} className="rounded-xl border border-border bg-muted/40 p-4">
              <RouteLabel origin={r.origin} destination={r.destination} className="font-semibold" />
              <p className="mt-2 text-sm text-muted-foreground">
                {r.matches} {t("common.matches")}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
