import type { Monster } from '@/types/monster'
import { getStateEmoji, getLevelColor } from '../monsters/utils'

/**
 * Props pour le composant CreatureStatsSection
 */
interface CreatureStatsSectionProps {
  /** Monstre dont afficher les stats */
  monster: Monster
  /** ID du monstre */
  monsterId: string
}

/**
 * Section affichant les statistiques détaillées d'une créature
 *
 * Affiche :
 * - Niveau avec couleur dynamique
 * - État actuel avec emoji
 *
 * Respecte le principe SRP : Affichage uniquement des statistiques
 *
 * @param {CreatureStatsSectionProps} props - Les propriétés du composant
 * @returns {React.ReactNode} La section de statistiques
 *
 * @example
 * ```tsx
 * <CreatureStatsSection monster={monster} monsterId={id} />
 * ```
 */
function CreatureStatsSection ({ monster, monsterId }: CreatureStatsSectionProps): React.ReactNode {
  const levelColor = getLevelColor(monster.level ?? null)
  const stateEmoji = getStateEmoji(monster.state ?? null)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='bg-latte-25 rounded-2xl p-6'>
        <h3 className='text-sm font-semibold text-latte-600 uppercase tracking-wide mb-2'>
          Niveau
        </h3>
        <p className={`text-3xl font-bold ${levelColor}`}>
          {monster.level ?? 1}
        </p>
      </div>

      <div className='bg-latte-25 rounded-2xl p-6'>
        <h3 className='text-sm font-semibold text-latte-600 uppercase tracking-wide mb-2'>
          État actuel
        </h3>
        <div className='flex items-center gap-3'>
          <span className='text-3xl'>{stateEmoji}</span>
          <p className='text-2xl font-bold text-blueberry-950 capitalize'>
            {monster.state ?? 'happy'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreatureStatsSection
