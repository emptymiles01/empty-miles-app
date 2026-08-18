"use client"

import { useState } from "react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { useI18n } from "@/lib/i18n/locale-provider"
import { announcements } from "@/lib/data"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Megaphone, Plus, Users, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminAnnouncementsPage() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  function handlePublish(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    toast.success(t("common.published"))
  }

  return (
    <PortalShell portal="admin" titleKey="adm.announcements" subtitleKey="adm.announcementsSub">
      <div className="flex flex-col gap-6">
        <PageHeader titleKey="adm.announcements" subtitleKey="adm.announcementsSub">
          <Button onClick={() => setOpen(true)}>
            <Plus data-icon="inline-start" />
            {t("adm.newAnnouncement")}
          </Button>
        </PageHeader>

        <div className="flex flex-col gap-4">
          {announcements.map((a) => (
            <Card key={a.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Megaphone className="size-5" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <CardTitle className="text-base">{a.title}</CardTitle>
                      <CardDescription>{a.body}</CardDescription>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant={a.status === "published" ? "default" : "secondary"}>
                      {a.status === "published" ? t("adm.publish") : t("status.draft")}
                    </Badge>
                    <Button variant="ghost" size="icon" className="size-8" onClick={() => toast.info(`${a.title} — ${t("common.edited")}`)}>
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive" onClick={() => toast.error(`${a.title} — ${t("common.deleted")}`)}>
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  {a.audience}
                </span>
                <span>{a.date}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t("adm.newAnnouncement")}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handlePublish} className="mt-6 flex flex-col gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel>Title</FieldLabel>
                <Input placeholder="Announcement title" required />
              </Field>
              <Field>
                <FieldLabel>Message</FieldLabel>
                <Textarea rows={4} placeholder="Announcement body..." required />
              </Field>
              <Field>
                <FieldLabel>Audience</FieldLabel>
                <Select defaultValue="all">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="clients">Clients</SelectItem>
                    <SelectItem value="providers">Providers</SelectItem>
                    <SelectItem value="drivers">Drivers</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>{t("common.cancel")}</Button>
              <Button type="submit">{t("adm.publish")}</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </PortalShell>
  )
}
