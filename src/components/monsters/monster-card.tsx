'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Monster } from '@/types/monster'
import MonsterAvatar from './monster-avatar'
import MonsterStateBadge from './monster-state-badge'
import MonsterStats from './monster-stats'
import MonsterTimestamps from './monster-timestamps'
import MonsterActionsButtons from './monster-actions-buttons'
import { getMonsterId } from './utils'

/**
 * Props pour le composant MonsterCard
 */
type MonsterCardProps = Monster & {
  /** Classes CSS additionnelles */
  className?: string
}

/**
 * Carte affichant les informations d'un monstre
 *
 * Affiche toutes les informations essentielles d'un monstre :
 * - Nom et état
 * - Avatar visuel
 * - Statistiques (niveau, ID)
 * - Timestamps
 * - Actions rapides
 *
 * Respecte le principe SRP : Orchestre uniquement l'affichage de la carte
 * Respecte le principe OCP : Composition de sous-composants réutilisables
 * Respecte le principe DIP : Utilise des fonctions utilitaires abstraites
 *
 * @param {MonsterCardProps} props - Les propriétés du composant
 * @returns {React.ReactNode} La carte du monstre
 *
 * @example
 * ```tsx
 * <MonsterCard
 *   id="123"
 *   name="Mochi"
 *   draw="<svg>...</svg>"
 *   level={5}
 *   state="happy"
 *   createdAt="2025-10-27T12:00:00Z"
 * />
 * ```
 */
function MonsterCard ({
  id,
  _id,
  name,
  draw,
  level = 1,
  state = 'happy',
  createdAt,
  updatedAt,
  className = ''
}: MonsterCardProps): React.ReactNode {
  const monsterId = getMonsterId(id, _id)
  const cardKey = monsterId

  return (
    <Link key={cardKey} href={`/creature/${cardKey}`}>
      <Card
        variant='elevated'
        className={`hover:shadow-xl transition-all duration-300 ${className}`}
      >
        <CardHeader className='pb-4'>
          <CardTitle className='text-xl font-semibold text-blueberry-950 flex items-center justify-between'>
            <span>{name}</span>
            <MonsterStateBadge state={state} />
          </CardTitle>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* Avatar du monstre */}
          <div className='flex justify-center mb-6'>
            <MonsterAvatar draw={draw} name={name} size='md' />
          </div>

          {/* Statistiques */}
          <MonsterStats level={level} monsterId={monsterId} />

          {/* Timestamps */}
          <MonsterTimestamps createdAt={createdAt} updatedAt={updatedAt} />

          {/* Boutons d'action */}
          <MonsterActionsButtons />
        </CardContent>
      </Card>
    </Link>
  )
}

export default MonsterCard
