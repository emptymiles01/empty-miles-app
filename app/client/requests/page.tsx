"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Eye } from "lucide-react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { RouteLabel } from "@/components/shared/route-label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { portalConfigs } from "@/lib/nav-config"
import { requests } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"

const filters = ["all", "newMatches", "inProgress", "inTransit", "delivered", "pending"] as const

export default function ClientRequestsPage() {
  const { t } = useLocale()
  const [filter, setFilter] = useState<(typeof filters)[number]>("all")
  const [query, setQuery] = useState("")

  const filtered = requests.filter((r) => {
    const matchesFilter = filter === "all" || r.status === filter
    const matchesQuery =
      query === "" ||
      `${r.origin} ${r.destination} ${r.cargo} ${r.id}`.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <PortalShell config={portalConfigs.client} title={t("nav.myRequests")}>
      <div className="flex flex-col gap-5">
        <PageHeader
          title={t("nav.myRequests")}
          subtitle={t("create.subtitle")}
          actions={
            <Button render={<Link href="/client/requests/new" />}>
              <Plus className="size-4" />
              {t("nav.createRequest")}
            </Button>
          }
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ToggleGroup
            value={[filter]}
            onValueChange={(v) => v[0] && setFilter(v[0] as (typeof filters)[number])}
            className="flex-wrap"
          >
            {filters.map((f) => (
              <ToggleGroupItem key={f} value={f} className="data-[pressed]:bg-primary data-[pressed]:text-primary-foreground">
                {f === "all" ? t("common.all") : t(`status.${f}` as never)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <InputGroup className="w-full sm:w-64">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder={t("common.search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </div>

        <Card className="p-0">
          <CardContent className="px-0 py-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="ps-6">{t("smart.requestId")}</TableHead>
                  <TableHead>{t("common.route")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("common.cargo")}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t("common.date")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("common.matches")}</TableHead>
                  <TableHead>{t("common.status")}</TableHead>
                  <TableHead className="pe-6 text-end">{t("common.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="ps-6 font-medium">{r.id}</TableCell>
                    <TableCell>
                      <RouteLabel origin={r.origin} destination={r.destination} />
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{r.cargo}</TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">{r.date}</TableCell>
                    <TableCell className="hidden sm:table-cell">{r.matches}</TableCell>
                    <TableCell>
                      <StatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="pe-6 text-end">
                      <Button variant="ghost" size="sm" render={<Link href="/client/matches" />}>
                        <Eye className="size-4" />
                        {t("common.view")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                      {t("common.noResults")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  )
}
