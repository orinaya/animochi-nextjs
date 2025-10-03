import Button from '@/components/ui/button'

interface HeroSectionProps {
  children?: React.ReactNode
}

export default function HeroSection ({ children }: HeroSectionProps): React.ReactNode {
  return (
    <section id='hero' className='pt-56 pb-24 px-4 h-screen'>
      <div className=' m-auto justify-center flex items-center h-full'>
        <div className='max-w-6xl space-y-6 text-center'>
          <h1 className='text-4xl md:text-7xl font-extrabold text-blueberry-950 leading-tight'>
            Votre compagnon virtuel
            <span className='text-strawberry-400'> vous attend</span>
          </h1>
          <p className='text-xl opacity-80 leading-relaxed'>
            Découvrez l&apos;univers magique d&apos;Animochi ! Adoptez, nourrissez et regardez
            grandir votre créature adorable dans cette expérience Tamagotchi nouvelle génération.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button size='lg' variant='primary' color='strawberry'>
              Commencer l&apos;aventure
            </Button>
            <Button size='lg' variant='outline' color='blueberry'>
              Découvrir la démo
            </Button>
          </div>
        </div>
        {/* <div className='flex justify-center'>
            <div className='relative'>
              <div className='absolute inset-0 rounded-full blur-3xl opacity-30' />
              {/* <Image
                src={AnimochiLogo}
                alt='Animochi - Votre compagnon virtuel'
                width={400}
                height={400}
                className='relative z-10 w-auto h-80'
              />
            </div>
          </div> */}
      </div>
    </section>
  )
}
