"use client"

import { useState } from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Plus, Truck } from "lucide-react"
import { fleet } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success",
  idle: "bg-muted text-muted-foreground",
  maintenance: "bg-warning/10 text-warning",
}

export default function ProviderFleetPage() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  function handleAddVehicle(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    toast.success(t("common.added"))
  }

  return (
    <PortalShell portal="provider" titleKey="nav.fleet">
      <div className="flex flex-col gap-5">
        <PageHeader titleKey="prov.fleet" subtitleKey="prov.fleetSub">
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            {t("prov.addVehicle")}
          </Button>
        </PageHeader>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="ps-6">{t("prov.vehicle")}</TableHead>
                    <TableHead>{t("prov.plate")}</TableHead>
                    <TableHead>{t("cap.transportType")}</TableHead>
                    <TableHead>{t("prov.capacityTons")}</TableHead>
                    <TableHead>{t("prov.driver")}</TableHead>
                    <TableHead className="pe-6">{t("prov.statusLabel")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fleet.map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="ps-6">
                        <span className="inline-flex items-center gap-2 font-medium">
                          <Truck className="size-4 text-muted-foreground" />
                          {v.name}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{v.plate}</TableCell>
                      <TableCell className="text-muted-foreground">{v.type}</TableCell>
                      <TableCell>{v.capacity} Tons</TableCell>
                      <TableCell className="text-muted-foreground">{v.driver}</TableCell>
                      <TableCell className="pe-6">
                        <Badge variant="secondary" className={cn(statusStyles[v.status])}>
                          {t(`prov.${v.status}` as never)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t("prov.addVehicle")}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAddVehicle} className="mt-6 flex flex-col gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel>{t("prov.vehicle")}</FieldLabel>
                <Input placeholder="e.g. Volvo FH16" required />
              </Field>
              <Field>
                <FieldLabel>{t("prov.plate")}</FieldLabel>
                <Input placeholder="e.g. AB 12345" required />
              </Field>
              <Field>
                <FieldLabel>{t("cap.transportType")}</FieldLabel>
                <Select defaultValue="Truck (FTL)">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Truck (FTL)", "Truck (LTL)", "Refrigerated", "Container (20ft)", "Container (40ft)"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>{t("prov.capacityTons")}</FieldLabel>
                <Input type="number" min={1} defaultValue={20} required />
              </Field>
              <Field>
                <FieldLabel>{t("prov.driver")}</FieldLabel>
                <Input placeholder="Driver name" />
              </Field>
            </FieldGroup>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{t("common.cancel")}</Button>
              <Button type="submit">{t("common.added")}</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </PortalShell>
  )
}
