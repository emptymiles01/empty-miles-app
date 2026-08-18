"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Package, Truck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { SocialButtons } from "@/components/auth/social-buttons"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/lib/i18n/locale-provider"
import { cn } from "@/lib/utils"

type Role = "client" | "provider"

export function SignupForm() {
  const { t } = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole: Role = searchParams.get("role") === "provider" ? "provider" : "client"
  const [role, setRole] = useState<Role>(initialRole)
  const [show, setShow] = useState(false)

  const roleCards: { value: Role; icon: typeof Package; title: string; desc: string }[] = [
    { value: "client", icon: Package, title: t("role.client"), desc: t("auth.clientDesc") },
    { value: "provider", icon: Truck, title: t("role.provider"), desc: t("auth.providerDesc") },
  ]

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push(role === "client" ? "/client/dashboard" : "/provider/dashboard")
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold">{t("auth.createAccount")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("auth.joinSubtitle")}</p>
      </div>

      <form onSubmit={onSubmit} className="mt-6">
        <FieldGroup>
          <Field>
            <FieldLabel>{t("auth.iAmA")}</FieldLabel>
            <div className="grid grid-cols-2 gap-3">
              {roleCards.map((r) => {
                const active = role === r.value
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={cn(
                      "relative flex flex-col gap-1.5 rounded-xl border p-3 text-start transition-colors",
                      active ? "border-primary bg-primary/5" : "border-border hover:bg-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <r.icon className="size-4" />
                    </span>
                    <span className="text-sm font-semibold">{r.title}</span>
                    <span className="text-[11px] leading-tight text-muted-foreground">{r.desc}</span>
                    {active && (
                      <span className="absolute end-2 top-2 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-2.5" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="name">{t("auth.fullName")}</FieldLabel>
            <Input id="name" defaultValue="Ahmed Al Balushi" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">{t("auth.email")}</FieldLabel>
            <Input id="email" type="email" defaultValue="ahmed@company.com" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">{t("auth.password")}</FieldLabel>
            <div className="relative">
              <Input id="password" type={show ? "text" : "password"} defaultValue="password123" required className="pe-10" />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </Field>

          <Button type="submit" className="h-10 w-full">
            {t("auth.createAccountBtn")}
          </Button>
        </FieldGroup>
      </form>

      <div className="my-5 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">{t("auth.continueWith")}</span>
        <Separator className="flex-1" />
      </div>
      <SocialButtons />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.haveAccount")}{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          {t("auth.signIn")}
        </Link>
      </p>
    </div>
  )
}
