import { getLevelColor } from './utils'

/**
 * Props pour le composant MonsterStats
 */
interface MonsterStatsProps {
  /** Niveau du monstre */
  level: number | null
  /** ID du monstre */
  monsterId: string
}

/**
 * Affiche les statistiques d'un monstre (niveau et ID)
 *
 * Respecte le principe SRP : Affiche uniquement les statistiques
 *
 * @param {MonsterStatsProps} props - Les propriétés du composant
 * @returns {React.ReactNode} Les statistiques du monstre
 *
 * @example
 * ```tsx
 * <MonsterStats level={5} monsterId="abc123" />
 * ```
 */
function MonsterStats ({ level, monsterId }: MonsterStatsProps): React.ReactNode {
  const levelColor = getLevelColor(level)

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='bg-latte-25 rounded-xl p-3'>
        <div className='text-sm text-latte-600 mb-1'>Niveau</div>
        <div className={`text-2xl font-bold ${levelColor}`}>
          {level ?? 1}
        </div>
      </div>

      <div className='bg-latte-25 rounded-xl p-3'>
        <div className='text-sm text-latte-600 mb-1'>ID</div>
        <div className='text-xs text-blueberry-700 font-mono truncate'>
          {monsterId}
        </div>
      </div>
    </div>
  )
}

export default MonsterStats
