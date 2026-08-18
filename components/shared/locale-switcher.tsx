"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "@/lib/i18n/locale-provider"
import { localeMeta, locales } from "@/lib/i18n/config"

export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="gap-1.5">
            <Globe data-icon="inline-start" />
            {compact ? locale.toUpperCase() : localeMeta[locale].native}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-36">
        <DropdownMenuGroup>
          {locales.map((l) => (
            <DropdownMenuItem key={l} onClick={() => setLocale(l)} className="justify-between">
              <span>{localeMeta[l].native}</span>
              {locale === l && <span className="text-primary">●</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
