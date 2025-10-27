'use client'
import { useState } from 'react'

import CreateMonsterModal from './create-monster-modal'

import { authClient } from '@/lib/auth-client'

import MonstersList from '../monsters/monsters-list'
import { CreateMonsterFormValues, Monster } from '@/types'
import { createMonster } from '@/actions/monsters.action'
import { Button } from '../ui'

type Session = typeof authClient.$Infer.Session

function DashboardContent ({ session, monsters }: { session: Session, monsters: Monster[] }): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogout = (): void => {
    void authClient.signOut()
    window.location.href = '/sign-in'
  }

  const handleCreateMonster = (): void => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
  }

  const handleMonsterSubmit = async (values: CreateMonsterFormValues): Promise<void> => {
    void values
    await createMonster(values)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold mb-4'>Bienvenue {session.user.email} sur votre tableau de bord</h1>
      <Button onClick={handleCreateMonster}>
        Créer une créature
      </Button>
      <MonstersList monsters={monsters} />
      <p className='text-lg text-gray-600'>Ici, vous pouvez gérer vos créatures et suivre votre progression.</p>
      <Button onClick={handleLogout}>
        Se déconnecter
      </Button>
      <CreateMonsterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleMonsterSubmit}
      />
    </div>
  )
}

export default DashboardContent
