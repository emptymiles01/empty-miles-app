"use client"

import { useState } from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { addresses } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import { MapPin, Pencil, Phone, Plus, Trash2, User } from "lucide-react"
import { toast } from "sonner"

type Address = typeof addresses[0]

export default function AddressBookPage() {
  const { t } = useI18n()
  const [addOpen, setAddOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Address | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Address | null>(null)

  const typeLabel = (type: string) =>
    type === "pickup"
      ? t("address.pickup")
      : type === "delivery"
      ? t("address.delivery")
      : `${t("address.pickup")} / ${t("address.delivery")}`

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setAddOpen(false)
    setEditTarget(null)
    toast.success(editTarget ? t("common.edited") : t("common.added"))
  }

  function handleDelete() {
    setDeleteTarget(null)
    toast.success(t("common.deleted"))
  }

  return (
    <PortalShell portal="client" titleKey="nav.addressBook">
      <PageHeader titleKey="address.title" subtitleKey="address.subtitle">
        <Button onClick={() => setAddOpen(true)}>
          <Plus data-icon="inline-start" />
          {t("address.add")}
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{a.label}</CardTitle>
                <Badge variant="secondary">{typeLabel(a.type)}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>{a.line}, {a.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="size-4 shrink-0 text-primary" />
                <span>{a.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <span dir="ltr">{a.phone}</span>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditTarget(a)}>
                <Pencil data-icon="inline-start" />
                {t("common.edit")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => setDeleteTarget(a)}
              >
                <Trash2 data-icon="inline-start" />
                {t("common.delete")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add / Edit Sheet */}
      <Sheet open={addOpen || !!editTarget} onOpenChange={(v) => { if (!v) { setAddOpen(false); setEditTarget(null) } }}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{editTarget ? t("common.edit") : t("address.add")}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSave} className="mt-6 flex flex-col gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel>{t("address.label")}</FieldLabel>
                <Input defaultValue={editTarget?.label ?? ""} placeholder="e.g. Warehouse Muscat" required />
              </Field>
              <Field>
                <FieldLabel>{t("address.city")}</FieldLabel>
                <Input defaultValue={editTarget?.city ?? ""} placeholder="City" required />
              </Field>
              <Field>
                <FieldLabel>{t("address.line")}</FieldLabel>
                <Input defaultValue={editTarget?.line ?? ""} placeholder="Street / area" required />
              </Field>
              <Field>
                <FieldLabel>{t("address.contact")}</FieldLabel>
                <Input defaultValue={editTarget?.contact ?? ""} placeholder="Contact name" />
              </Field>
              <Field>
                <FieldLabel>{t("settings.phone")}</FieldLabel>
                <Input type="tel" defaultValue={editTarget?.phone ?? ""} dir="ltr" placeholder="+968 ..." />
              </Field>
              <Field>
                <FieldLabel>Type</FieldLabel>
                <Select defaultValue={editTarget?.type ?? "both"}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">{t("address.pickup")}</SelectItem>
                    <SelectItem value="delivery">{t("address.delivery")}</SelectItem>
                    <SelectItem value="both">{t("address.pickup")} / {t("address.delivery")}</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => { setAddOpen(false); setEditTarget(null) }}>{t("common.cancel")}</Button>
              <Button type="submit">{editTarget ? t("settings.saveChanges") : t("address.add")}</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("common.delete")}</DialogTitle>
            <DialogDescription>
              {deleteTarget?.label} — {t("common.deleteConfirm")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>{t("common.cancel")}</Button>
            <Button variant="destructive" onClick={handleDelete}>{t("common.delete")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PortalShell>
  )
}
