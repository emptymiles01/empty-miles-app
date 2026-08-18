import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans, Cairo, Geist_Mono } from "next/font/google"
import { LocaleProvider } from "@/lib/i18n/locale-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" })
const display = Plus_Jakarta_Sans({ variable: "--font-display", subsets: ["latin"], display: "swap" })
const cairo = Cairo({ variable: "--font-arabic", subsets: ["arabic", "latin"], display: "swap" })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Empty Miles · GCC Logistics Marketplace",
  description:
    "Empty Miles connects businesses with trusted logistics providers across Oman and the GCC. Turn empty capacity into opportunity with AI-powered SmartMatch.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#2f6bff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`bg-background ${inter.variable} ${display.variable} ${cairo.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <LocaleProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster position="top-center" richColors />
        </LocaleProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
