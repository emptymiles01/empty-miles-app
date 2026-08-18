"use client"

import { useMemo, useState } from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { useI18n } from "@/lib/i18n/locale-provider"
import { adminUsers } from "@/lib/data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Search } from "lucide-react"

const ROLE_FILTERS = ["all", "client", "provider", "driver"] as const
type RoleFilter = (typeof ROLE_FILTERS)[number]

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  approved: "default",
  pending: "secondary",
  suspended: "destructive",
}

export default function AdminUsersPage() {
  const { t } = useI18n()
  const [query, setQuery] = useState("")
  const [role, setRole] = useState<RoleFilter>("all")

  const filtered = useMemo(() => {
    return adminUsers.filter((u) => {
      const matchesRole = role === "all" || u.role === role
      const matchesQuery =
        query.trim() === "" ||
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase()) ||
        u.company.toLowerCase().includes(query.toLowerCase())
      return matchesRole && matchesQuery
    })
  }, [query, role])

  return (
    <PortalShell portal="admin" titleKey="adm.users" subtitleKey="adm.usersSub">
      <div className="flex flex-col gap-6">
        <PageHeader titleKey="adm.users" subtitleKey="adm.usersSub" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <InputGroup className="sm:max-w-xs">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder={t("common.search")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>

          <ToggleGroup
            value={[role]}
            onValueChange={(v) => v[0] && setRole(v[0] as RoleFilter)}
            className="w-fit"
          >
            {ROLE_FILTERS.map((r) => (
              <ToggleGroupItem key={r} value={r}>
                {r === "all" ? t("common.all") : t(`role.${r}` as never)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <Card className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("adm.name")}</TableHead>
                <TableHead>{t("adm.role")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("adm.company")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("adm.joined")}</TableHead>
                <TableHead>{t("common.status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback>
                          {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{u.name}</span>
                        <span className="text-xs text-muted-foreground">{u.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {t(`role.${u.role}` as never)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {u.company}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {u.joined}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[u.status]} className="capitalize">
                      {t(`adm.${u.status}` as never)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </PortalShell>
  )
}
