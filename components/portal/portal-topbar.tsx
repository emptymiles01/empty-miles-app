"use client"

import Link from "next/link"
import { useState } from "react"
import { Bell, Menu, ChevronDown, LogOut, User, Settings as SettingsIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LocaleSwitcher } from "@/components/shared/locale-switcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "@/lib/i18n/locale-provider"
import { notifications } from "@/lib/data"
import type { PortalConfig } from "@/lib/nav-config"
import { currentUser } from "@/lib/data"

export function PortalTopbar({
  config,
  onOpenSidebar,
  title,
  subtitle,
}: {
  config: PortalConfig
  onOpenSidebar: () => void
  title: string
  subtitle?: string
}) {
  const { t, locale } = useLocale()
  const user = currentUser[config.portal]
  const [allRead, setAllRead] = useState(false)
  const unread = allRead ? 0 : notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenSidebar} aria-label="Open menu">
        <Menu className="size-5" />
      </Button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate font-heading text-lg font-bold leading-tight">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      <LocaleSwitcher compact />

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="relative" aria-label={t("common.notifications")} />
          }
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute end-1.5 top-1.5 flex size-2 rounded-full bg-destructive ring-2 ring-background" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="flex items-center justify-between px-2 py-1.5">
            <DropdownMenuLabel className="p-0">{t("common.notifications")}</DropdownMenuLabel>
            <button className="text-xs font-medium text-primary hover:underline" onClick={() => setAllRead(true)}>{t("common.markAllRead")}</button>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {notifications.slice(0, 5).map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2">
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="text-sm font-medium">{locale === "ar" ? n.titleAr : n.title}</span>
                  {!n.read && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
                </div>
                <span className="text-xs text-muted-foreground">{locale === "ar" ? n.bodyAr : n.body}</span>
                <span className="text-[11px] text-muted-foreground/70">{n.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="h-10 gap-2 px-1.5 sm:px-2" />}
        >
          <Avatar className="size-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div className="hidden text-start sm:block">
            <p className="text-sm font-semibold leading-none">{locale === "ar" ? user.nameAr : user.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t(config.roleKey as never)}</p>
          </div>
          <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{locale === "ar" ? user.nameAr : user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem render={<Link href={`${config.basePath}/settings`} />}>
              <User className="size-4" />
              {t("settings.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={`${config.basePath}/settings`} />}>
              <SettingsIcon className="size-4" />
              {t("nav.settings")}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/login" />}>
            <LogOut className="size-4" />
            {t("auth.signOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
