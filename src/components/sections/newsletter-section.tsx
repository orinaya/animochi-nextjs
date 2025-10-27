'use client'

import Button from '@/components/ui/button'

interface NewsletterSectionProps {
  children?: React.ReactNode
}

export default function NewsletterSection ({ children }: NewsletterSectionProps): React.ReactNode {
  return (
    <section id='newsletter' className='py-16 px-4 bg-blueberry-950'>
      <div className='max-w-4xl mx-auto text-center'>
        <div className='bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Offre spéciale de lancement ! 🎉
          </h2>
          <p className='text-xl text-white/90 mb-6 max-w-2xl mx-auto'>
            Inscrivez-vous à notre newsletter et recevez <strong>10% de réduction</strong> sur votre
            premier achat in-app, plus des conseils exclusifs pour prendre soin de votre compagnon !
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='votre@email.com'
              className='flex-1 px-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50'
            />
            <Button size='md' variant='secondary'>
              S&apos;abonner
            </Button>
          </div>
          <p className='text-sm text-white/80 mt-4'>
            🔒 Vos données sont protégées. Aucun spam, uniquement du contenu de qualité !
          </p>
        </div>
      </div>
    </section>
  )
}
