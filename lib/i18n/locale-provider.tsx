"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { type Locale, getDir, locales } from "./config"
import { dictionaries, type TranslationKey } from "./dictionaries"

type LocaleContextValue = {
  locale: Locale
  dir: "ltr" | "rtl"
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const STORAGE_KEY = "empty-miles-locale"

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) as Locale | null
    if (stored && locales.includes(stored)) {
      setLocaleState(stored)
    }
  }, [])

  useEffect(() => {
    const dir = getDir(locale)
    document.documentElement.setAttribute("dir", dir)
    document.documentElement.setAttribute("lang", locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ar" : "en")
  }, [locale, setLocale])

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) => {
      let value: string = (dictionaries[locale] as Record<string, string>)[key] ?? (dictionaries.en as Record<string, string>)[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(new RegExp(`{${k}}`, "g"), String(v))
        }
      }
      return value
    },
    [locale],
  )

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dir: getDir(locale), setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider")
  return ctx
}

// Alias for ergonomic imports across the app.
export const useI18n = useLocale
