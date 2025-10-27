import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import MonsterStateBadge from '../monsters/monster-state-badge'
import type { Monster } from '@/types/monster'

/**
 * Props pour le composant CreatureHeader
 */
interface CreatureHeaderProps {
  /** Monstre à afficher */
  monster: Monster
}

/**
 * En-tête de la page créature avec nom et badge d'état
 *
 * Respecte le principe SRP : Affichage uniquement de l'en-tête de la carte créature
 *
 * @param {CreatureHeaderProps} props - Les propriétés du composant
 * @returns {React.ReactNode} L'en-tête de la page créature
 *
 * @example
 * ```tsx
 * <CreatureHeader monster={monster} />
 * ```
 */
function CreatureHeader ({ monster }: CreatureHeaderProps): React.ReactNode {
  return (
    <CardHeader>
      <div className='flex items-center justify-between mb-4'>
        <CardTitle className='text-4xl'>{monster.name}</CardTitle>
        <MonsterStateBadge state={monster.state ?? null} />
      </div>
      <CardDescription>
        Voici toutes les informations sur votre créature
      </CardDescription>
    </CardHeader>
  )
}

export default CreatureHeader
