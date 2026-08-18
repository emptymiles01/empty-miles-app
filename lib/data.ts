// Shared domain types and mock data for the Empty Miles marketplace.
// Frontend-first: this stands in for the database until the backend is wired.

export type ShipmentStatus = "newMatches" | "inProgress" | "inTransit" | "delivered" | "pending" | "cancelled"
export type RequestStatus = "draft" | "active" | "completed" | "cancelled"
export type InvoiceStatus = "paid" | "unpaid" | "overdue"
export type TransportType = "Truck (FTL)" | "Truck (LTL)" | "Air Cargo" | "Container (20ft)" | "Container (40ft)" | "Refrigerated"

export type City = {
  name: string
  country: string
  // Normalized x/y (0-100) for the lightweight GCC map.
  x: number
  y: number
}

export const cities: Record<string, City> = {
  Muscat: { name: "Muscat", country: "Oman", x: 78, y: 58 },
  Sohar: { name: "Sohar", country: "Oman", x: 72, y: 50 },
  Salalah: { name: "Salalah", country: "Oman", x: 70, y: 86 },
  Dubai: { name: "Dubai", country: "UAE", x: 64, y: 48 },
  "Abu Dhabi": { name: "Abu Dhabi", country: "UAE", x: 58, y: 52 },
  Doha: { name: "Doha", country: "Qatar", x: 47, y: 44 },
  Riyadh: { name: "Riyadh", country: "Saudi Arabia", x: 33, y: 46 },
  "Kuwait City": { name: "Kuwait City", country: "Kuwait", x: 26, y: 26 },
  Manama: { name: "Manama", country: "Bahrain", x: 44, y: 40 },
}

export type Request = {
  id: string
  origin: string
  destination: string
  cargo: string
  cargoType: string
  weight: number
  transportType: TransportType
  date: string
  matches: number
  status: ShipmentStatus
}

export const requests: Request[] = [
  { id: "REQ-2024-1256", origin: "Muscat", destination: "Dubai", cargo: "20 Tons · General Cargo", cargoType: "General Cargo", weight: 20, transportType: "Truck (FTL)", date: "24 May 2024", matches: 5, status: "newMatches" },
  { id: "REQ-2024-1255", origin: "Sohar", destination: "Riyadh", cargo: "15 Tons · Building Materials", cargoType: "Building Materials", weight: 15, transportType: "Truck (FTL)", date: "22 May 2024", matches: 3, status: "inProgress" },
  { id: "REQ-2024-1254", origin: "Salalah", destination: "Doha", cargo: "8 Tons · FMCG", cargoType: "FMCG", weight: 8, transportType: "Container (20ft)", date: "20 May 2024", matches: 4, status: "inTransit" },
  { id: "REQ-2024-1253", origin: "Muscat", destination: "Abu Dhabi", cargo: "12 Tons · Machinery", cargoType: "Machinery", weight: 12, transportType: "Truck (FTL)", date: "18 May 2024", matches: 2, status: "delivered" },
  { id: "REQ-2024-1252", origin: "Sohar", destination: "Manama", cargo: "10 Tons · Steel Coils", cargoType: "Steel Coils", weight: 10, transportType: "Truck (FTL)", date: "16 May 2024", matches: 6, status: "inProgress" },
  { id: "REQ-2024-1251", origin: "Muscat", destination: "Kuwait City", cargo: "5 Tons · Electronics", cargoType: "Electronics", weight: 5, transportType: "Air Cargo", date: "14 May 2024", matches: 1, status: "pending" },
]

export type MatchProvider = {
  id: string
  name: string
  matchScore: number
  transportType: TransportType
  capacity: number
  availableDate: string
  price: number
  rating: number
  verified: boolean
}

export const matchProviders: MatchProvider[] = [
  { id: "PRV-001", name: "Star Logistics LLC", matchScore: 95, transportType: "Truck (FTL)", capacity: 20, availableDate: "25 May", price: 320, rating: 4.9, verified: true },
  { id: "PRV-002", name: "Gulf Freight Co.", matchScore: 90, transportType: "Truck (FTL)", capacity: 20, availableDate: "26 May", price: 340, rating: 4.7, verified: true },
  { id: "PRV-003", name: "Oman Transport Co.", matchScore: 85, transportType: "Truck (FTL)", capacity: 20, availableDate: "25 May", price: 360, rating: 4.6, verified: true },
  { id: "PRV-004", name: "Desert Link Logistics", matchScore: 70, transportType: "Truck (FTL)", capacity: 18, availableDate: "27 May", price: 380, rating: 4.3, verified: false },
  { id: "PRV-005", name: "Al Madina Movers", matchScore: 66, transportType: "Truck (LTL)", capacity: 16, availableDate: "28 May", price: 410, rating: 4.1, verified: true },
]

export type TopRoute = { origin: string; destination: string; matches: number }
export const topRoutes: TopRoute[] = [
  { origin: "Muscat", destination: "Dubai", matches: 32 },
  { origin: "Muscat", destination: "Riyadh", matches: 28 },
  { origin: "Sohar", destination: "Dubai", matches: 22 },
  { origin: "Salalah", destination: "Doha", matches: 18 },
]

export type Capacity = {
  id: string
  origin: string
  destination: string
  transportType: TransportType
  capacity: number
  availableFrom: string
  rate: number
  status: "available" | "booked"
}

export const capacities: Capacity[] = [
  { id: "CAP-01", origin: "Muscat", destination: "Dubai", transportType: "Truck (FTL)", capacity: 20, availableFrom: "25 May 2024", rate: 320, status: "available" },
  { id: "CAP-02", origin: "Sohar", destination: "Riyadh", transportType: "Truck (FTL)", capacity: 25, availableFrom: "26 May 2024", rate: 1850, status: "available" },
  { id: "CAP-03", origin: "Muscat", destination: "Doha", transportType: "Air Cargo", capacity: 5, availableFrom: "27 May 2024", rate: 2450, status: "available" },
  { id: "CAP-04", origin: "Salalah", destination: "Dubai", transportType: "Container (20ft)", capacity: 15, availableFrom: "28 May 2024", rate: 550, status: "available" },
]

export type IncomingRequest = {
  id: string
  origin: string
  destination: string
  weight: number
  cargoType: string
  date: string
  matchScore: number
}

export const incomingRequests: IncomingRequest[] = [
  { id: "REQ-2024-1256", origin: "Muscat", destination: "Dubai", weight: 20, cargoType: "General Cargo", date: "24 May 2024", matchScore: 92 },
  { id: "REQ-2024-1248", origin: "Sohar", destination: "Muscat", weight: 10, cargoType: "FMCG", date: "24 May 2024", matchScore: 87 },
  { id: "REQ-2024-1247", origin: "Riyadh", destination: "Salalah", weight: 15, cargoType: "Machinery", date: "23 May 2024", matchScore: 81 },
]

export type Shipment = {
  id: string
  origin: string
  destination: string
  provider: string
  cargo: string
  status: ShipmentStatus
  progress: number
  eta: string
  driver: string
  vehicle: string
}

export const shipments: Shipment[] = [
  { id: "SHP-3012", origin: "Salalah", destination: "Doha", provider: "Gulf Freight Co.", cargo: "8 Tons · FMCG", status: "inTransit", progress: 62, eta: "26 May, 14:00", driver: "Khalid Al Rawahi", vehicle: "Volvo FH16 · D-44821" },
  { id: "SHP-3011", origin: "Muscat", destination: "Abu Dhabi", provider: "Star Logistics LLC", cargo: "12 Tons · Machinery", status: "delivered", progress: 100, eta: "Delivered 18 May", driver: "Sami Al Balushi", vehicle: "Scania R500 · D-21043" },
  { id: "SHP-3010", origin: "Sohar", destination: "Riyadh", provider: "Oman Transport Co.", cargo: "15 Tons · Building Materials", status: "inProgress", progress: 18, eta: "29 May, 09:00", driver: "Yousef Al Harthy", vehicle: "MAN TGX · D-88210" },
  { id: "SHP-3009", origin: "Muscat", destination: "Dubai", provider: "Desert Link Logistics", cargo: "20 Tons · General Cargo", status: "pending", progress: 0, eta: "Awaiting pickup", driver: "Unassigned", vehicle: "Pending" },
]

export type Invoice = {
  id: string
  client: string
  route: string
  amount: number
  date: string
  dueDate: string
  status: InvoiceStatus
}

export const invoices: Invoice[] = [
  { id: "INV-2024-0231", client: "Star Logistics LLC", route: "Muscat → Abu Dhabi", amount: 1240, date: "18 May 2024", dueDate: "02 Jun 2024", status: "paid" },
  { id: "INV-2024-0230", client: "Gulf Freight Co.", route: "Salalah → Doha", amount: 880, date: "20 May 2024", dueDate: "04 Jun 2024", status: "unpaid" },
  { id: "INV-2024-0229", client: "Oman Transport Co.", route: "Sohar → Riyadh", amount: 1850, date: "10 May 2024", dueDate: "24 May 2024", status: "overdue" },
  { id: "INV-2024-0228", client: "Desert Link Logistics", route: "Muscat → Dubai", amount: 320, date: "08 May 2024", dueDate: "22 May 2024", status: "paid" },
]

export type Address = {
  id: string
  label: string
  contact: string
  phone: string
  city: string
  line: string
  type: "pickup" | "delivery" | "both"
}

export const addresses: Address[] = [
  { id: "ADR-1", label: "Muscat Main Warehouse", contact: "Ahmed Al Balushi", phone: "+968 9123 4567", city: "Muscat", line: "Plot 42, Rusayl Industrial Estate", type: "both" },
  { id: "ADR-2", label: "Sohar Port Depot", contact: "Operations Desk", phone: "+968 9988 1122", city: "Sohar", line: "Gate 7, Sohar Port Free Zone", type: "pickup" },
  { id: "ADR-3", label: "Dubai Distribution Hub", contact: "Rashid Khan", phone: "+971 50 234 5678", city: "Dubai", line: "Warehouse 19, Jebel Ali Free Zone", type: "delivery" },
]

export type DocumentItem = {
  id: string
  name: string
  type: string
  size: string
  date: string
  shipment: string
}

export const documents: DocumentItem[] = [
  { id: "DOC-1", name: "Bill of Lading - SHP-3012", type: "PDF", size: "248 KB", date: "24 May 2024", shipment: "SHP-3012" },
  { id: "DOC-2", name: "Commercial Invoice - SHP-3011", type: "PDF", size: "190 KB", date: "18 May 2024", shipment: "SHP-3011" },
  { id: "DOC-3", name: "Packing List - SHP-3010", type: "XLSX", size: "64 KB", date: "16 May 2024", shipment: "SHP-3010" },
  { id: "DOC-4", name: "Customs Declaration - SHP-3009", type: "PDF", size: "312 KB", date: "14 May 2024", shipment: "SHP-3009" },
]

export type NotificationItem = {
  id: string
  title: string
  titleAr: string
  body: string
  bodyAr: string
  time: string
  read: boolean
  kind: "match" | "shipment" | "invoice" | "message"
}

export const notifications: NotificationItem[] = [
  { id: "N1", title: "8 new matches found", titleAr: "8 مطابقات جديدة", body: "For request Muscat → Dubai (REQ-2024-1256)", bodyAr: "للطلب مسقط ← دبي (REQ-2024-1256)", time: "5m ago", read: false, kind: "match" },
  { id: "N2", title: "Shipment in transit", titleAr: "شحنة قيد النقل", body: "SHP-3012 Salalah → Doha is now en route", bodyAr: "الشحنة SHP-3012 صلالة ← الدوحة في الطريق", time: "1h ago", read: false, kind: "shipment" },
  { id: "N3", title: "Invoice paid", titleAr: "تم دفع الفاتورة", body: "INV-2024-0231 has been settled", bodyAr: "تمت تسوية الفاتورة INV-2024-0231", time: "3h ago", read: true, kind: "invoice" },
  { id: "N4", title: "New message", titleAr: "رسالة جديدة", body: "Star Logistics LLC sent you a quote", bodyAr: "أرسلت Star Logistics عرض سعر", time: "Yesterday", read: true, kind: "message" },
]

export type PortalUser = {
  name: string
  nameAr: string
  initials: string
  avatar: string
  email: string
  company: string
}

export const currentUser: Record<"client" | "provider" | "driver" | "admin", PortalUser> = {
  client: { name: "Ahmed Al Balushi", nameAr: "أحمد البلوشي", initials: "AB", avatar: "/avatars/ahmed.png", email: "ahmed@company.com", company: "Al Noor Trading LLC" },
  provider: { name: "Nasser Al Haddad", nameAr: "ناصر الحداد", initials: "NH", avatar: "/avatars/nasser.png", email: "nasser@logistics.com", company: "Gulf Freight Co." },
  driver: { name: "Khalid Al Rawahi", nameAr: "خالد الرواحي", initials: "KR", avatar: "/avatars/khalid.png", email: "khalid@driver.com", company: "Independent" },
  admin: { name: "Layla Al Said", nameAr: "ليلى السعيد", initials: "LS", avatar: "/avatars/layla.png", email: "layla@emptymiles.com", company: "Empty Miles" },
}

export type Conversation = {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  messages: { id: string; from: "me" | "them"; text: string; time: string }[]
}

export const conversations: Conversation[] = [
  {
    id: "C1",
    name: "Star Logistics LLC",
    lastMessage: "We can pick up on the 25th at 9 AM.",
    time: "10:24",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", from: "them", text: "Hi Ahmed, thanks for accepting our match for Muscat → Dubai.", time: "10:18" },
      { id: "m2", from: "me", text: "Great. What time can you pick up the cargo?", time: "10:21" },
      { id: "m3", from: "them", text: "We can pick up on the 25th at 9 AM.", time: "10:24" },
    ],
  },
  {
    id: "C2",
    name: "Gulf Freight Co.",
    lastMessage: "Documents have been uploaded.",
    time: "Yesterday",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", from: "them", text: "Documents have been uploaded.", time: "16:40" },
    ],
  },
  {
    id: "C3",
    name: "Oman Transport Co.",
    lastMessage: "Can we revise the rate for Sohar → Riyadh?",
    time: "Mon",
    unread: 0,
    online: true,
    messages: [
      { id: "m1", from: "them", text: "Can we revise the rate for Sohar → Riyadh?", time: "09:02" },
    ],
  },
]

// KPI helpers
export const clientKpis = {
  activeRequests: 12,
  activeRequestsDelta: 2,
  matchesFound: 8,
  inTransit: 5,
  estSavings: 12450,
}

export const providerKpis = {
  availableCapacity: 120,
  availableCapacityDelta: 10,
  activeMatches: 7,
  acceptedRequests: 5,
  revenue: 8920,
}

export const shipmentBreakdown = {
  total: 25,
  inTransit: 5,
  delivered: 15,
  pending: 5,
}

// Monthly analytics series
export const monthlyShipments = [
  { month: "Jan", shipments: 14, savings: 6200 },
  { month: "Feb", shipments: 18, savings: 7100 },
  { month: "Mar", shipments: 22, savings: 8900 },
  { month: "Apr", shipments: 19, savings: 8200 },
  { month: "May", shipments: 25, savings: 12450 },
  { month: "Jun", shipments: 28, savings: 13800 },
]

export const cargoMix = [
  { type: "General Cargo", value: 34 },
  { type: "Building Materials", value: 22 },
  { type: "FMCG", value: 18 },
  { type: "Machinery", value: 14 },
  { type: "Electronics", value: 12 },
]

// Provider fleet
export type Vehicle = {
  id: string
  name: string
  plate: string
  type: TransportType
  capacity: number
  driver: string
  status: "active" | "idle" | "maintenance"
}

export const fleet: Vehicle[] = [
  { id: "VEH-01", name: "Volvo FH16", plate: "D-44821", type: "Truck (FTL)", capacity: 24, driver: "Khalid Al Rawahi", status: "active" },
  { id: "VEH-02", name: "Scania R500", plate: "D-21043", type: "Truck (FTL)", capacity: 22, driver: "Sami Al Balushi", status: "active" },
  { id: "VEH-03", name: "MAN TGX", plate: "D-88210", type: "Truck (FTL)", capacity: 25, driver: "Yousef Al Harthy", status: "idle" },
  { id: "VEH-04", name: "Mercedes Actros", plate: "D-30192", type: "Refrigerated", capacity: 18, driver: "Unassigned", status: "maintenance" },
  { id: "VEH-05", name: "Isuzu FVR", plate: "D-55674", type: "Truck (LTL)", capacity: 12, driver: "Omar Al Lawati", status: "active" },
]

export const providerRevenue = [
  { month: "Jan", revenue: 5200 },
  { month: "Feb", revenue: 6100 },
  { month: "Mar", revenue: 7400 },
  { month: "Apr", revenue: 6900 },
  { month: "May", revenue: 8920 },
  { month: "Jun", revenue: 9600 },
]

// Driver loads & trips
export type Load = {
  id: string
  origin: string
  destination: string
  cargo: string
  weight: number
  distance: number
  payout: number
  pickupDate: string
}

export const driverLoads: Load[] = [
  { id: "LD-2041", origin: "Muscat", destination: "Dubai", cargo: "General Cargo", weight: 20, distance: 470, payout: 320, pickupDate: "25 May 2024" },
  { id: "LD-2042", origin: "Sohar", destination: "Abu Dhabi", cargo: "Building Materials", weight: 18, distance: 380, payout: 280, pickupDate: "26 May 2024" },
  { id: "LD-2043", origin: "Muscat", destination: "Doha", cargo: "FMCG", weight: 12, distance: 890, payout: 540, pickupDate: "27 May 2024" },
  { id: "LD-2044", origin: "Salalah", destination: "Muscat", cargo: "Electronics", weight: 8, distance: 1020, payout: 610, pickupDate: "28 May 2024" },
]

export type Trip = {
  id: string
  origin: string
  destination: string
  status: ShipmentStatus
  progress: number
  eta: string
  payout: number
}

export const driverTrips: Trip[] = [
  { id: "TR-3012", origin: "Salalah", destination: "Doha", status: "inTransit", progress: 62, eta: "26 May, 14:00", payout: 540 },
  { id: "TR-3008", origin: "Muscat", destination: "Dubai", status: "delivered", progress: 100, eta: "Delivered 20 May", payout: 320 },
  { id: "TR-3005", origin: "Sohar", destination: "Riyadh", status: "delivered", progress: 100, eta: "Delivered 14 May", payout: 480 },
]

export const driverKpis = {
  activeTrips: 1,
  completedTrips: 42,
  thisMonth: 2840,
  pendingPayout: 540,
  rating: 4.8,
}

export const driverEarnings = [
  { month: "Jan", earnings: 1980 },
  { month: "Feb", earnings: 2240 },
  { month: "Mar", earnings: 2610 },
  { month: "Apr", earnings: 2380 },
  { month: "May", earnings: 2840 },
  { month: "Jun", earnings: 3050 },
]

export type Payout = {
  id: string
  trip: string
  route: string
  amount: number
  date: string
  status: InvoiceStatus
}

export const payouts: Payout[] = [
  { id: "PO-9021", trip: "TR-3012", route: "Salalah → Doha", amount: 540, date: "26 May 2024", status: "unpaid" },
  { id: "PO-9018", trip: "TR-3008", route: "Muscat → Dubai", amount: 320, date: "20 May 2024", status: "paid" },
  { id: "PO-9015", trip: "TR-3005", route: "Sohar → Riyadh", amount: 480, date: "14 May 2024", status: "paid" },
]

// Admin
export type AdminUser = {
  id: string
  name: string
  email: string
  role: "client" | "provider" | "driver"
  company: string
  joined: string
  status: "approved" | "pending" | "suspended"
}

export const adminUsers: AdminUser[] = [
  { id: "U-1001", name: "Ahmed Al Balushi", email: "ahmed@company.com", role: "client", company: "Al Noor Trading LLC", joined: "12 Jan 2024", status: "approved" },
  { id: "U-1002", name: "Nasser Al Haddad", email: "nasser@logistics.com", role: "provider", company: "Gulf Freight Co.", joined: "03 Feb 2024", status: "approved" },
  { id: "U-1003", name: "Khalid Al Rawahi", email: "khalid@driver.com", role: "driver", company: "Independent", joined: "18 Feb 2024", status: "approved" },
  { id: "U-1004", name: "Fatima Al Zadjali", email: "fatima@desertlink.com", role: "provider", company: "Desert Link Logistics", joined: "22 Mar 2024", status: "pending" },
  { id: "U-1005", name: "Salim Al Hinai", email: "salim@swiftcargo.com", role: "provider", company: "Swift Cargo", joined: "01 Apr 2024", status: "suspended" },
  { id: "U-1006", name: "Mariam Al Saadi", email: "mariam@trade.com", role: "client", company: "Saadi Trading", joined: "09 Apr 2024", status: "approved" },
]

export type Verification = {
  id: string
  company: string
  applicant: string
  role: "provider" | "driver"
  documents: number
  submitted: string
  status: "pending" | "approved" | "rejected"
}

export const verifications: Verification[] = [
  { id: "VER-01", company: "Desert Link Logistics", applicant: "Fatima Al Zadjali", role: "provider", documents: 4, submitted: "22 Mar 2024", status: "pending" },
  { id: "VER-02", company: "Swift Cargo", applicant: "Salim Al Hinai", role: "provider", documents: 3, submitted: "24 Mar 2024", status: "pending" },
  { id: "VER-03", company: "Independent", applicant: "Omar Al Lawati", role: "driver", documents: 5, submitted: "25 Mar 2024", status: "pending" },
  { id: "VER-04", company: "Coastal Freight", applicant: "Hamed Al Maamari", role: "provider", documents: 4, submitted: "26 Mar 2024", status: "pending" },
]

export type Announcement = {
  id: string
  title: string
  body: string
  audience: string
  date: string
  status: "published" | "draft"
}

export const announcements: Announcement[] = [
  { id: "AN-01", title: "New Ramadan delivery schedule", body: "Adjusted pickup windows during Ramadan across all GCC routes.", audience: "All users", date: "20 May 2024", status: "published" },
  { id: "AN-02", title: "SmartMatch v2 rollout", body: "Improved matching accuracy with new route compatibility scoring.", audience: "Providers", date: "15 May 2024", status: "published" },
  { id: "AN-03", title: "Scheduled maintenance", body: "Platform maintenance on 30 May, 02:00-04:00 GST.", audience: "All users", date: "12 May 2024", status: "draft" },
]

export const adminKpis = {
  totalUsers: 1284,
  activeShipments: 168,
  gmv: 482300,
  pendingVerifications: 4,
}

export const platformGrowth = [
  { month: "Jan", users: 620, shipments: 84 },
  { month: "Feb", users: 760, shipments: 102 },
  { month: "Mar", users: 910, shipments: 128 },
  { month: "Apr", users: 1080, shipments: 145 },
  { month: "May", users: 1284, shipments: 168 },
  { month: "Jun", users: 1460, shipments: 192 },
]

export const userBreakdown = [
  { type: "Clients", value: 720 },
  { type: "Providers", value: 384 },
  { type: "Drivers", value: 180 },
]
