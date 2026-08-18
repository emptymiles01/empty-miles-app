export type Locale = "en" | "ar"

export const locales: Locale[] = ["en", "ar"]

export const localeMeta: Record<Locale, { label: string; native: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", native: "English", dir: "ltr" },
  ar: { label: "Arabic", native: "العربية", dir: "rtl" },
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return localeMeta[locale].dir
}
