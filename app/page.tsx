import { LandingNav } from "@/components/landing/landing-nav"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works"
import { LandingSolutions } from "@/components/landing/landing-solutions"
import { LandingRoutes } from "@/components/landing/landing-routes"
import { LandingTestimonials } from "@/components/landing/landing-testimonials"
import { LandingCta } from "@/components/landing/landing-cta"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function Page() {
  return (
    <main className="min-h-screen scroll-smooth bg-background">
      <LandingNav />
      <LandingHero />
      <LandingHowItWorks />
      <LandingSolutions />
      <LandingRoutes />
      <LandingTestimonials />
      <LandingCta />
      <LandingFooter />
    </main>
  )
}
