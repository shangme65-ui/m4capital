import Layout from '@/components/Layout'
import Hero from '@/components/Hero'
import FeaturesSection from '@/components/sections/FeaturesSection'
import TradingSection from '@/components/sections/TradingSection'
import StatsSection from '@/components/sections/StatsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <FeaturesSection />
      <TradingSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  )
}