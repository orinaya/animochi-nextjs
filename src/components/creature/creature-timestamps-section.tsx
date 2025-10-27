import { formatDate } from '../monsters/utils'

/**
 * Props pour le composant CreatureTimestampsSection
 */
interface CreatureTimestampsSectionProps {
  /** Date de création */
  createdAt?: string
  /** Date de modification */
  updatedAt?: string
}

/**
 * Section affichant les informations temporelles d'une créature
 *
 * Respecte le principe SRP : Affichage uniquement des timestamps
 *
 * @param {CreatureTimestampsSectionProps} props - Les propriétés du composant
 * @returns {React.ReactNode} La section temporelle
 *
 * @example
 * ```tsx
 * <CreatureTimestampsSection
 *   createdAt={monster.createdAt}
 *   updatedAt={monster.updatedAt}
 * />
 * ```
 */
function CreatureTimestampsSection ({
  createdAt,
  updatedAt
}: CreatureTimestampsSectionProps): React.ReactNode {
  return (
    <div className='bg-strawberry-25 rounded-2xl p-6'>
      <h3 className='text-sm font-semibold text-strawberry-600 uppercase tracking-wide mb-3'>
        Informations temporelles
      </h3>
      <div className='space-y-3'>
        <div className='flex justify-between items-center'>
          <span className='text-latte-700 font-medium'>Créé le :</span>
          <span className='text-blueberry-950 font-semibold'>
            {formatDate(createdAt)}
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-latte-700 font-medium'>Dernière mise à jour :</span>
          <span className='text-blueberry-950 font-semibold'>
            {formatDate(updatedAt)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CreatureTimestampsSection
