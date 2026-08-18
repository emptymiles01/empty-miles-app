import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  variant = "default",
}: {
  className?: string
  variant?: "default" | "light"
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/logo-icon.png"
        alt="Empty Miles logo"
        width={28}
        height={28}
        className="size-7 rounded-full object-cover"
      />
      <span
        className={cn(
          "font-heading text-sm font-extrabold tracking-tight",
          variant === "light" ? "text-primary-foreground" : "text-foreground",
        )}
      >
        EMPTY MILES
      </span>
    </div>
  )
}
