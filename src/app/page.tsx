import Header from '@/components/header'
import Footer from '@/components/footer'
import {
  HeroSection,
  BenefitsSection,
  MonstersSection,
  ActionsSection,
  NewsletterSection
} from '@/components/sections'
import { Metadata } from 'next'

export const metadata: Readonly<Metadata> = {
  title: 'Animochi - Adoptez et prenez soin de créatures virtuelles uniques !',
  description: 'Animochi est une application web où vous pouvez adopter, élever et interagir avec des créatures virtuelles uniques appelées Animochis. Chaque Animochi a sa propre personnalité, ses besoins et ses caractéristiques spéciales.',
  icons: {
    icon: [
      { url: '/animochi-favicon.svg', type: 'image/svg+xml' },
      { url: '/animochi-favicon.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/animochi-favicon.svg', sizes: '32x32', type: 'image/svg+xml' }
    ],
    shortcut: [{ url: '/animochi-favicon.svg', type: 'image/svg+xml' }]
    // apple: [
    //   { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    // ]
  },
  manifest: '/manifest.json',
  keywords: 'Animochi, créatures virtuelles, adoption, élevage, interaction, jeu en ligne, animaux de compagnie numériques',
  openGraph: {
    title: 'Animochi - Adoptez et prenez soin de créatures virtuelles uniques !',
    description: 'Animochi est une application web où vous pouvez adopter, élever et interagir avec des créatures virtuelles uniques appelées Animochis. Chaque Animochi a sa propre personnalité, ses besoins et ses caractéristiques spéciales.',
    url: 'https://www.animochi.com',
    siteName: 'Animochi',
    images: [
      {
        url: 'https://www.animochi.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Animochi - Adoptez et prenez soin de créatures virtuelles uniques !'
      }
    ],
    locale: 'fr_FR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animochi - Adoptez et prenez soin de créatures virtuelles uniques !',
    description: 'Animochi est une application web où vous pouvez adopter, élever et interagir avec des créatures virtuelles uniques appelées Animochis. Chaque Animochi a sa propre personnalité, ses besoins et ses caractéristiques spéciales.',
    images: ['https://www.animochi.com/og-image.webp']
  }

}
//     icon: [
//       { url: '/animochi-favicon.svg', type: 'image/svg+xml' },
//       { url: '/animochi-favicon.svg', sizes: '16x16', type: 'image/svg+xml' },
//       { url: '/animochi-favicon.svg', sizes: '32x32', type: 'image/svg+xml' }
//     ],
//     shortcut: [{ url: '/animochi-favicon.svg', type: 'image/svg+xml' }]
//     // apple: [
//     //   { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
//     // ]
//   },
//   manifest: '/manifest.json'
// }

export default function Home (): React.ReactNode {
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
