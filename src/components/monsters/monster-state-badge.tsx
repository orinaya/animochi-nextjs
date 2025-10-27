import type { MonsterState } from '@/types/monster'
import { getStateEmoji, getStateColor } from './utils'

/**
 * Props pour le composant MonsterStateBadge
 */
interface MonsterStateBadgeProps {
  /** État du monstre */
  state: MonsterState | string | null
}

/**
 * Badge affichant l'état d'un monstre avec emoji et texte
 *
 * Respecte le principe SRP : Affiche uniquement le badge d'état
 *
 * @param {MonsterStateBadgeProps} props - Les propriétés du composant
 * @returns {React.ReactNode} Le badge d'état stylisé
 *
 * @example
 * ```tsx
 * <MonsterStateBadge state="happy" />
 * ```
 */
function MonsterStateBadge ({ state }: MonsterStateBadgeProps): React.ReactNode {
  const emoji = getStateEmoji(state)
  const colorClass = getStateColor(state)
  const displayState = state ?? 'happy'

  return (
    <span
      className={`text-2xl ${colorClass} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2`}
    >
      {emoji}
      <span className='capitalize'>{displayState}</span>
    </span>
  )
}

export default MonsterStateBadge
