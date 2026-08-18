"use client"

import { cn } from "@/lib/utils"

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 6.68 9.14 4.75 12 4.75Z" />
    </svg>
  )
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#F25022" d="M3 3h8.5v8.5H3z" />
      <path fill="#7FBA00" d="M12.5 3H21v8.5h-8.5z" />
      <path fill="#00A4EF" d="M3 12.5h8.5V21H3z" />
      <path fill="#FFB900" d="M12.5 12.5H21V21h-8.5z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-foreground" aria-hidden="true">
      <path d="M16.37 1.43c.09 1.02-.32 2.02-.94 2.74-.66.78-1.74 1.38-2.78 1.3-.11-1 .38-2.04.97-2.7.66-.76 1.83-1.32 2.75-1.34ZM20.1 17.2c-.5 1.15-.74 1.66-1.38 2.68-.9 1.42-2.16 3.19-3.73 3.2-1.4.02-1.76-.91-3.66-.9-1.9.01-2.29.92-3.69.9-1.57-.02-2.77-1.61-3.66-3.03C1.5 16.2 1.24 11.43 2.78 8.9 3.87 7.1 5.59 6.06 7.2 6.06c1.65 0 2.68.9 4.05.9 1.32 0 2.13-.9 4.04-.9 1.44 0 2.96.78 4.05 2.13-3.56 1.95-2.98 7.03.76 9.01Z" />
    </svg>
  )
}

export function SocialButtons({ className }: { className?: string }) {
  const buttons = [
    { label: "Google", icon: <GoogleIcon /> },
    { label: "Microsoft", icon: <MicrosoftIcon /> },
    { label: "Apple", icon: <AppleIcon /> },
  ]
  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {buttons.map((b) => (
        <button
          key={b.label}
          type="button"
          aria-label={b.label}
          className="flex h-10 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted"
        >
          {b.icon}
        </button>
      ))}
    </div>
  )
}
