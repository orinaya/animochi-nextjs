import Header from '@/components/header'
import Footer from '@/components/footer'
import {
  HeroSection,
  BenefitsSection,
  MonstersSection,
  ActionsSection,
  NewsletterSection
} from '@/components/sections'

export default function Home(): React.ReactNode {
  return (
    <div className='min-h-screen bg-latte-50'>
      <Header />
      <HeroSection />
      <BenefitsSection />
      <MonstersSection />
      <ActionsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
