import { formatDate } from './utils'

/**
 * Props pour le composant MonsterTimestamps
 */
interface MonsterTimestampsProps {
  /** Date de création */
  createdAt?: string
  /** Date de dernière modification */
  updatedAt?: string
}

/**
 * Affiche les dates de création et modification d'un monstre
 *
 * Respecte le principe SRP : Affiche uniquement les timestamps
 *
 * @param {MonsterTimestampsProps} props - Les propriétés du composant
 * @returns {React.ReactNode} Les timestamps formatés
 *
 * @example
 * ```tsx
 * <MonsterTimestamps
 *   createdAt="2025-10-27T12:00:00Z"
 *   updatedAt="2025-10-27T14:00:00Z"
 * />
 * ```
 */
function MonsterTimestamps ({ createdAt, updatedAt }: MonsterTimestampsProps): React.ReactNode {
  return (
    <div className='space-y-2 pt-2 border-t border-latte-100'>
      <div className='flex justify-between items-center text-sm'>
        <span className='text-latte-600'>Créé le :</span>
        <span className='text-blueberry-700 font-medium'>
          {formatDate(createdAt)}
        </span>
      </div>

      {(updatedAt != null) && (
        <div className='flex justify-between items-center text-sm'>
          <span className='text-latte-600'>Modifié le :</span>
          <span className='text-blueberry-700 font-medium'>
            {formatDate(updatedAt)}
          </span>
        </div>
      )}
    </div>
  )
}

export default MonsterTimestamps
