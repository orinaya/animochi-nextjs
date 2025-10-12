'use client'

import Button from '@/components/ui/button'
import { FiSettings, FiZap } from 'react-icons/fi'
import Image from 'next/image'
import { SectionContent } from '../ui'

interface HeroSectionProps {
  children?: React.ReactNode
}

export default function HeroSection ({ children }: HeroSectionProps): React.ReactNode {
  return (
    <section
      id='hero'
      className='relative h-screen bg-strawberry-100'
      style={{
        backgroundImage: `
          url('/assets/images/cloud/cloud-1.svg'),
          url('/assets/images/cloud/cloud-2.svg')
        `,
        backgroundSize: '100%',
        backgroundPosition: 'bottom, bottom, 0%, 0%',
        backgroundRepeat: 'no-repeat, no-repeat'
      }}
    >
      <Image
        src='/assets/images/animochi/animochi-1.png'
        alt='Animochi creature'
        width={240}
        height={250}
        className='absolute'
        style={{
          transform: 'rotate(5deg)',
          flexShrink: 0,
          top: '50%',
          left: '30%'
        }}
      />
      <Image
        src='/assets/images/animochi/animochi-5.png'
        alt='Animochi creature'
        width={240}
        height={250}
        className='absolute'
        style={{
          transform: 'rotate(8deg)',
          flexShrink: 0,
          top: '20%',
          left: '10%'
        }}
      />

      <Image
        src='/assets/images/animochi/animochi-6.png'
        alt='Animochi creature'
        width={240}
        height={250}
        className='absolute'
        style={{
          transform: 'rotate(-3deg)',
          flexShrink: 0,
          top: '50%',
          right: '30%'
        }}
      />

      <Image
        src='/assets/images/animochi/animochi-4.png'
        alt='Animochi creature'
        width={240}
        height={250}
        className='absolute'
        style={{
          transform: 'rotate(-11deg)',
          flexShrink: 0,
          top: '20%',
          right: '10%'
        }}
      />

      <SectionContent
        title="C'est dans la poche, petit"
        highlightedWords='monstre'
        content="Découvrez l'univers magique d'Animochi ! Adoptez, nourrissez et regardez grandir votre créature adorable dans cette expérience Tamagotchi nouvelle génération."
        alignment='center'
        titleSize='xl'
        buttons={
          <>
            <Button size='md' variant='primary' color='strawberry' iconBefore={FiZap}>
              Commencer l'aventure
            </Button>
            <Button size='md' variant='outline' color='strawberry' iconBefore={FiSettings}>
              Découvrir nos fonctionnalités
            </Button>
          </>
  }
      />
    </section>
  )
}
