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
import type { Portal } from "@/lib/nav-config"
import { useI18n } from "@/lib/i18n/locale-provider"
import type { Locale } from "@/lib/i18n/config"
import { toast } from "sonner"

export function SettingsView({ portal }: { portal: Portal }) {
  const { t, locale, setLocale } = useI18n()
  const user = currentUser[portal]

  const notificationItems = [
    { key: "matches", defaultChecked: true },
    { key: "shipments", defaultChecked: true },
    { key: "billing", defaultChecked: true },
    { key: "messages", defaultChecked: false },
  ]

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    toast.success(t("settings.savedSuccess"))
  }

  function handleSaveSecurity(e: React.FormEvent) {
    e.preventDefault()
    toast.success(t("settings.passwordUpdated"))
  }

  return (
    <PortalShell portal={portal} titleKey="nav.settings">
      <PageHeader titleKey="settings.title" subtitleKey="settings.subtitle" />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">{t("settings.profile")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("settings.notifications")}</TabsTrigger>
          <TabsTrigger value="security">{t("settings.security")}</TabsTrigger>
          <TabsTrigger value="preferences">{t("settings.preferences")}</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleSaveProfile}>
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
                  <Button type="button" variant="outline" size="sm" onClick={() => toast.info(t("settings.uploadPhoto"))}>
                    {t("settings.uploadPhoto")}
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
                <Button type="submit">{t("settings.saveChanges")}</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.notifications")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {notificationItems.map((item, i) => (
                <div key={item.key}>
                  {i > 0 && <Separator />}
                  <div className="flex items-center justify-between gap-4 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-foreground">
                        {t(`settings.notif.${item.key}` as never)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t(`settings.notif.${item.key}Desc` as never)}
                      </span>
                    </div>
                    <Switch
                      defaultChecked={item.defaultChecked}
                      onCheckedChange={(v) => toast.success(`${t(`settings.notif.${item.key}` as never)}: ${v ? "on" : "off"}`)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <form onSubmit={handleSaveSecurity}>
              <CardHeader>
                <CardTitle>{t("settings.security")}</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="current">{t("settings.currentPassword")}</FieldLabel>
                    <Input id="current" type="password" placeholder="••••••••••" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="new">{t("settings.newPassword")}</FieldLabel>
                    <Input id="new" type="password" placeholder="••••••••••" required />
                    <FieldDescription>{t("settings.newPasswordHint")}</FieldDescription>
                  </Field>
                </FieldGroup>
              </CardContent>
              <CardFooter>
                <Button type="submit">{t("settings.saveChanges")}</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Preferences */}
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
                  <FieldDescription>{t("settings.langHint")}</FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  )
}
