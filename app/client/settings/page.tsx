"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PageHeader } from "@/components/shared/page-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { currentUser } from "@/lib/data"
import { useI18n } from "@/lib/i18n/locale-provider"
import type { Locale } from "@/lib/i18n/config"

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n()
  const user = currentUser.client

  return (
    <PortalShell portal="client" titleKey="nav.settings">
      <PageHeader titleKey="settings.title" subtitleKey="settings.subtitle" />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">{t("settings.profile")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("settings.notifications")}</TabsTrigger>
          <TabsTrigger value="security">{t("settings.security")}</TabsTrigger>
          <TabsTrigger value="preferences">{t("settings.preferences")}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.profile")}</CardTitle>
              <CardDescription>{t("settings.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  {t("common.edit")}
                </Button>
              </div>
              <FieldGroup>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="name">{t("auth.fullName")}</FieldLabel>
                    <Input id="name" defaultValue={user.name} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="company">{t("settings.company")}</FieldLabel>
                    <Input id="company" defaultValue={user.company} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">{t("settings.phone")}</FieldLabel>
                    <Input id="phone" type="tel" defaultValue="+968 9123 4567" dir="ltr" />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Button>{t("settings.saveChanges")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.notifications")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {[
                { key: "New SmartMatch results", desc: "Get notified when new matches are found" },
                { key: "Shipment status updates", desc: "Track pickup, transit and delivery events" },
                { key: "Invoice and billing", desc: "Reminders for due and overdue invoices" },
                { key: "Messages from providers", desc: "New quotes and chat messages" },
              ].map((item, i) => (
                <div key={item.key}>
                  {i > 0 && <Separator />}
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-foreground">{item.key}</span>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                    <Switch defaultChecked={i < 3} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.security")}</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="current">{t("auth.password")}</FieldLabel>
                  <Input id="current" type="password" placeholder="••••••••••" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="new">New Password</FieldLabel>
                  <Input id="new" type="password" placeholder="••••••••••" />
                  <FieldDescription>Use at least 8 characters with a mix of letters and numbers.</FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Button>{t("settings.saveChanges")}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.preferences")}</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="lang">{t("settings.language")}</FieldLabel>
                  <Select value={locale} onValueChange={(v) => v && setLocale(v as Locale)}>
                    <SelectTrigger id="lang" className="w-full sm:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>Changes the interface language and text direction.</FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  )
}
