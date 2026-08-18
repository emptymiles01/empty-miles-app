"use client"

import { cities } from "@/lib/data"

// Lightweight stylized GCC route map (normalized coordinates, not geographic SVG paths).
export function RouteMap({
  origin,
  destination,
  className,
}: {
  origin: string
  destination: string
  className?: string
}) {
  const o = cities[origin]
  const d = cities[destination]
  const waypoints = Object.values(cities)

  if (!o || !d) return null

  // Midpoint with a slight arc lift.
  const mx = (o.x + d.x) / 2
  const my = (o.y + d.y) / 2 - 10

  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" className="size-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="seaGlow" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="oklch(0.28 0.04 245)" />
            <stop offset="100%" stopColor="oklch(0.17 0.03 250)" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#seaGlow)" rx="3" />

        {/* faint graticule */}
        {[20, 40, 60, 80].map((g) => (
          <line key={`v${g}`} x1={g} y1="0" x2={g} y2="100" stroke="oklch(0.4 0.02 250 / 0.15)" strokeWidth="0.2" />
        ))}
        {[20, 40, 60, 80].map((g) => (
          <line key={`h${g}`} x1="0" y1={g} x2="100" y2={g} stroke="oklch(0.4 0.02 250 / 0.15)" strokeWidth="0.2" />
        ))}

        {/* All cities as faint dots (skip origin/destination, drawn boldly below) */}
        {waypoints
          .filter((c) => c.name !== o.name && c.name !== d.name)
          .map((c) => (
            <g key={c.name}>
              <circle cx={c.x} cy={c.y} r="0.9" fill="oklch(0.7 0.02 250 / 0.5)" />
              <text x={c.x + 1.6} y={c.y + 0.8} fontSize="2.4" fill="oklch(0.78 0.02 250 / 0.65)">
                {c.name}
              </text>
            </g>
          ))}

        {/* Route arc */}
        <path
          d={`M ${o.x} ${o.y} Q ${mx} ${my} ${d.x} ${d.y}`}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.8"
          strokeDasharray="2 1.5"
          strokeLinecap="round"
        />

        {/* Origin */}
        <circle cx={o.x} cy={o.y} r="2.2" fill="var(--primary)" />
        <circle cx={o.x} cy={o.y} r="3.6" fill="none" stroke="var(--primary)" strokeWidth="0.5" opacity="0.5" />
        <text x={o.x} y={o.y - 3.5} fontSize="2.8" fontWeight="700" fill="oklch(0.96 0 0)" textAnchor="middle">
          {o.name}
        </text>

        {/* Destination */}
        <circle cx={d.x} cy={d.y} r="2.2" fill="var(--success)" />
        <circle cx={d.x} cy={d.y} r="3.6" fill="none" stroke="var(--success)" strokeWidth="0.5" opacity="0.5" />
        <text x={d.x} y={d.y - 3.5} fontSize="2.8" fontWeight="700" fill="oklch(0.96 0 0)" textAnchor="middle">
          {d.name}
        </text>
      </svg>
    </div>
  )
}
