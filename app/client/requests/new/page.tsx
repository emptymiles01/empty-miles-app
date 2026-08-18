"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { MapPin, Package, CalendarClock, Sparkles } from "lucide-react"
import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { portalConfigs } from "@/lib/nav-config"
import { cities } from "@/lib/data"
import { useLocale } from "@/lib/i18n/locale-provider"
import { toast } from "sonner"

const cityNames = Object.keys(cities)
const cargoTypes = ["General Cargo", "Building Materials", "FMCG", "Machinery", "Electronics", "Steel Coils"]
const transportTypes = ["Truck (FTL)", "Truck (LTL)", "Air Cargo", "Container (20ft)", "Container (40ft)", "Refrigerated"]

export default function CreateRequestPage() {
  const { t } = useLocale()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    toast.success(t("create.findMatches"))
    setTimeout(() => router.push("/client/matches"), 700)
  }

  return (
    <PortalShell config={portalConfigs.client} title={t("create.title")}>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl flex-col gap-5">
        <PageHeader title={t("create.title")} subtitle={t("create.subtitle")} />

        {/* Route */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4 text-primary" />
              {t("create.routeSection")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-4">
              <Field>
                <FieldLabel>{t("create.origin")}</FieldLabel>
                <Select defaultValue="Muscat">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cityNames.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>{t("create.destination")}</FieldLabel>
                <Select defaultValue="Dubai">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cityNames.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Cargo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="size-4 text-primary" />
              {t("create.cargoSection")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-4">
              <Field>
                <FieldLabel>{t("create.cargoType")}</FieldLabel>
                <Select defaultValue={cargoTypes[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cargoTypes.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>{t("create.weight")}</FieldLabel>
                <Input type="number" min={1} defaultValue={20} />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel>{t("create.transportType")}</FieldLabel>
                <Select defaultValue={transportTypes[0]}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transportTypes.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarClock className="size-4 text-primary" />
              {t("create.scheduleSection")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-4">
              <Field>
                <FieldLabel>{t("create.pickupDate")}</FieldLabel>
                <Input type="date" defaultValue="2024-05-25" />
              </Field>
              <Field>
                <FieldLabel>{t("create.deliveryDate")}</FieldLabel>
                <Input type="date" defaultValue="2024-05-27" />
              </Field>
              <Field className="sm:col-span-2">
                <FieldLabel>{t("create.notes")}</FieldLabel>
                <Textarea rows={3} placeholder="..." />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <div className="flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => toast.success(t("common.draftSaved"))}>
            {t("create.saveDraft")}
          </Button>
          <Button type="submit" disabled={submitting}>
            <Sparkles className="size-4" />
            {t("create.findMatches")}
          </Button>
        </div>
      </form>
    </PortalShell>
  )
}
