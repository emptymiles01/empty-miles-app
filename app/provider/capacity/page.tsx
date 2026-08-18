"use client"

import { useState } from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { RouteLabel } from "@/components/shared/route-label"
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
import { Plus } from "lucide-react"
import { capacities } from "@/lib/data"
import { cities } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { toast } from "sonner"

const cityNames = Object.keys(cities)

export default function ProviderCapacityPage() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    toast.success(t("common.added"))
  }

  return (
    <PortalShell portal="provider" titleKey="nav.myCapacity">
      <div className="flex flex-col gap-5">
        <PageHeader titleKey="nav.myCapacity" subtitleKey="prov.capacitySub">
          <Button onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            {t("cap.addCapacity")}
          </Button>
        </PageHeader>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="ps-6">{t("common.route")}</TableHead>
                    <TableHead>{t("cap.transportType")}</TableHead>
                    <TableHead>{t("cap.capacity")}</TableHead>
                    <TableHead>{t("cap.availableFrom")}</TableHead>
                    <TableHead>{t("cap.rate")}</TableHead>
                    <TableHead className="pe-6">{t("prov.statusLabel")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {capacities.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="ps-6">
                        <RouteLabel origin={c.origin} destination={c.destination} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">{c.transportType}</TableCell>
                      <TableCell>{c.capacity} Tons</TableCell>
                      <TableCell className="text-muted-foreground">{c.availableFrom}</TableCell>
                      <TableCell>{c.rate.toLocaleString()}</TableCell>
                      <TableCell className="pe-6">
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          {t("cap.available")}
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
            <SheetTitle>{t("cap.addCapacity")}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAdd} className="mt-6 flex flex-col gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel>{t("create.origin")}</FieldLabel>
                <Select defaultValue="Muscat">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {cityNames.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>{t("create.destination")}</FieldLabel>
                <Select defaultValue="Dubai">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {cityNames.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>{t("cap.transportType")}</FieldLabel>
                <Select defaultValue="Truck (FTL)">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Truck (FTL)", "Truck (LTL)", "Refrigerated", "Container (20ft)", "Container (40ft)"].map((v) => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>{t("cap.capacity")} (Tons)</FieldLabel>
                <Input type="number" min={1} defaultValue={20} required />
              </Field>
              <Field>
                <FieldLabel>{t("cap.availableFrom")}</FieldLabel>
                <Input type="date" required />
              </Field>
              <Field>
                <FieldLabel>{t("cap.rate")} (OMR)</FieldLabel>
                <Input type="number" min={1} defaultValue={850} required />
              </Field>
            </FieldGroup>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{t("common.cancel")}</Button>
              <Button type="submit">{t("cap.addCapacity")}</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </PortalShell>
  )
}
