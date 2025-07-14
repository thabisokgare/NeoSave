import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { PricingSection } from "@/components/pricing-section"
import { DashboardPreview } from "@/components/dashboard-preview"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <DashboardPreview />
      <ContactSection />
      <Footer />
    </div>
  )
}
