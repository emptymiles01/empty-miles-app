"use client"

import { Logo } from "@/components/brand/logo"
import { LocaleSwitcher } from "@/components/shared/locale-switcher"

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen lg:grid lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:block">
        <img
          src="/images/oman-auth.png"
          alt="Historic fort overlooking Muscat, Oman"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-navy/30" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-navy-foreground">
          <p className="font-heading text-3xl font-bold leading-tight text-balance">
            Move more with less across Oman & the GCC.
          </p>
          <p className="mt-3 max-w-sm text-sm text-navy-foreground/80">
            Join 1,250+ verified providers and businesses optimizing logistics with SmartMatch.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex min-h-screen flex-col bg-background">
        <header className="flex items-center justify-between px-6 py-5">
          <Logo />
          <LocaleSwitcher compact />
        </header>
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </main>
  )
}
