import {
  LayoutDashboard,
  FilePlus2,
  FileText,
  Sparkles,
  Package,
  BarChart3,
  BookUser,
  ReceiptText,
  Settings,
  Boxes,
  Truck,
  Inbox,
  Wallet,
  Users,
  ShieldCheck,
  Megaphone,
  MapPinned,
  type LucideIcon,
} from "lucide-react"

export type Portal = "client" | "provider" | "driver" | "admin"

export type NavItem = {
  href: string
  labelKey: string
  icon: LucideIcon
  badge?: number
}

export type PortalConfig = {
  portal: Portal
  basePath: string
  brandVariant: "light" | "dark"
  roleKey: string
  nav: NavItem[]
}

export const portalConfigs: Record<Portal, PortalConfig> = {
  client: {
    portal: "client",
    basePath: "/client",
    brandVariant: "dark",
    roleKey: "role.client",
    nav: [
      { href: "/client", labelKey: "nav.dashboard", icon: LayoutDashboard },
      { href: "/client/requests/new", labelKey: "nav.createRequest", icon: FilePlus2 },
      { href: "/client/requests", labelKey: "nav.myRequests", icon: FileText },
      { href: "/client/matches", labelKey: "nav.matches", icon: Sparkles, badge: 8 },
      { href: "/client/shipments", labelKey: "nav.shipments", icon: Package },
      { href: "/client/analytics", labelKey: "nav.analytics", icon: BarChart3 },
      { href: "/client/address-book", labelKey: "nav.addressBook", icon: BookUser },
      { href: "/client/invoices", labelKey: "nav.invoices", icon: ReceiptText },
      { href: "/client/settings", labelKey: "nav.settings", icon: Settings },
    ],
  },
  provider: {
    portal: "provider",
    basePath: "/provider",
    brandVariant: "light",
    roleKey: "role.provider",
    nav: [
      { href: "/provider", labelKey: "nav.dashboard", icon: LayoutDashboard },
      { href: "/provider/capacity", labelKey: "nav.myCapacity", icon: Boxes },
      { href: "/provider/requests", labelKey: "nav.requests", icon: Inbox, badge: 5 },
      { href: "/provider/matches", labelKey: "nav.matches", icon: Sparkles },
      { href: "/provider/shipments", labelKey: "nav.shipments", icon: Package },
      { href: "/provider/fleet", labelKey: "nav.fleet", icon: Truck },
      { href: "/provider/analytics", labelKey: "nav.analytics", icon: BarChart3 },
      { href: "/provider/invoices", labelKey: "nav.invoices", icon: Wallet },
      { href: "/provider/settings", labelKey: "nav.settings", icon: Settings },
    ],
  },
  driver: {
    portal: "driver",
    basePath: "/driver",
    brandVariant: "light",
    roleKey: "role.driver",
    nav: [
      { href: "/driver", labelKey: "nav.dashboard", icon: LayoutDashboard },
      { href: "/driver/loads", labelKey: "nav.availableLoads", icon: Inbox, badge: 6 },
      { href: "/driver/trips", labelKey: "nav.myTrips", icon: MapPinned },
      { href: "/driver/earnings", labelKey: "nav.earnings", icon: Wallet },
      { href: "/driver/settings", labelKey: "nav.settings", icon: Settings },
    ],
  },
  admin: {
    portal: "admin",
    basePath: "/admin",
    brandVariant: "light",
    roleKey: "role.admin",
    nav: [
      { href: "/admin", labelKey: "nav.dashboard", icon: LayoutDashboard },
      { href: "/admin/users", labelKey: "nav.users", icon: Users },
      { href: "/admin/verification", labelKey: "nav.verification", icon: ShieldCheck, badge: 4 },
      { href: "/admin/shipments", labelKey: "nav.shipments", icon: Package },
      { href: "/admin/analytics", labelKey: "nav.analytics", icon: BarChart3 },
      { href: "/admin/announcements", labelKey: "nav.announcements", icon: Megaphone },
      { href: "/admin/settings", labelKey: "nav.settings", icon: Settings },
    ],
  },
}
