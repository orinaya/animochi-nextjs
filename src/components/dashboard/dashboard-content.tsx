'use client'

import CreateMonsterModal from './create-monster-modal'
import DashboardHeader from './dashboard-header'
import DashboardActions from './dashboard-actions'
import { useModal, useAuth, useMonsterCreation } from './hooks'

import { authClient } from '@/lib/auth-client'
import MonstersList from '../monsters/monsters-list'
import type { Monster } from '@/types'

type Session = typeof authClient.$Infer.Session

/**
 * Props pour le composant DashboardContent
 */
interface DashboardContentProps {
  /** Session utilisateur authentifié */
  session: Session
  /** Liste des monstres appartenant à l'utilisateur */
  monsters: Monster[]
}

/**
 * Composant principal du contenu du Dashboard
 *
 * Orchestre l'affichage des différentes sections du dashboard (header, actions, liste des monstres)
 * et gère l'état de la modale de création de monstre.
 *
 * Respecte le principe SRP : Orchestre uniquement l'affichage du dashboard
 * Respecte le principe DIP : Dépend des abstractions (hooks) plutôt que d'implémentations
 *
 * @param {DashboardContentProps} props - Les propriétés du composant
 * @returns {React.ReactNode} Le contenu complet du dashboard
 *
 * @example
 * ```tsx
 * <DashboardContent session={session} monsters={monsters} />
 * ```
 */
function DashboardContent ({ session, monsters }: DashboardContentProps): React.ReactNode {
  // Gestion de l'état du modal via hook personnalisé
  const { isOpen, open, close } = useModal()

  // Gestion de l'authentification via hook personnalisé
  const { logout } = useAuth()

  // Gestion de la création de monstre via hook personnalisé
  const { handleSubmit } = useMonsterCreation(() => {
    // Callback de succès : ferme le modal et recharge la page pour afficher le nouveau monstre
    close()
    window.location.reload()
  })

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-8 px-4'>
      <div className='w-full max-w-7xl space-y-8'>
        <DashboardHeader session={session} />

        <DashboardActions
          onCreateMonster={open}
          onLogout={logout}
        />

        <MonstersList monsters={monsters} />

        <CreateMonsterModal
          isOpen={isOpen}
          onClose={close}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default DashboardContent
