'use client'

import Button from '@/components/ui/button'
import AnimochiLogo from '@/app/animochi-line.svg'
import Image from 'next/image'
import Link from 'next/link'
import { FiUser, FiUserPlus } from 'react-icons/fi'

interface HeaderProps {
  children?: React.ReactNode
}

export default function Header ({ children }: HeaderProps): React.ReactNode {
  return (
    <header className=' top-0 left-0 right-0 z-50 bg-strawberry-100 backdrop-blur-md px-4 py-3'>
      <div className='max-w-6xl mx-auto flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <Image src={AnimochiLogo} alt='Animochi' width={60} height={60} className='w-auto h-16' />
          {/* <span className='text-xl font-bold text-blueberry-950'>Animochi</span> */}
        </Link>

        {/* Navigation */}
        {/* <nav className='hidden md:flex items-center gap-6'>
          <a href='#hero' className='hover:opacity-80 transition-colors'>
            Accueil
          </a>
          <a href='#benefits' className='hover:opacity-80 transition-colors'>
            Avantages
          </a>
          <a href='#monsters' className='hover:opacity-80 transition-colors'>
            Créatures
          </a>
          <a href='#actions' className='hover:opacity-80 transition-colors'>
            Actions
          </a>
          <a href='#newsletter' className='hover:opacity-80 transition-colors'>
            Newsletter
          </a>
        </nav> */}

        {/* CTA Button */}
        <div className='hidden md:flex items-center gap-4'>
          <Button size='md' variant='ghost' color='blueberry' iconBefore={FiUser}>
            Se connecter
          </Button>
          <Button size='md' variant='primary' color='blueberry' iconBefore={FiUserPlus}>
            S'inscrire
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className='md:hidden p-2'>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
    </header>
  )
}
