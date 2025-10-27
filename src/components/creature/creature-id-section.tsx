/**
 * Props pour le composant CreatureIdSection
 */
interface CreatureIdSectionProps {
  /** ID unique de la créature */
  id: string
}

/**
 * Section affichant l'identifiant unique d'une créature
 *
 * Respecte le principe SRP : Affichage uniquement de l'ID
 *
 * @param {CreatureIdSectionProps} props - Les propriétés du composant
 * @returns {React.ReactNode} La section ID
 *
 * @example
 * ```tsx
 * <CreatureIdSection id="507f1f77bcf86cd799439011" />
 * ```
 */
function CreatureIdSection ({ id }: CreatureIdSectionProps): React.ReactNode {
  return (
    <div className='bg-blueberry-50 rounded-2xl p-6'>
      <h3 className='text-sm font-semibold text-blueberry-600 uppercase tracking-wide mb-3'>
        Identifiant unique
      </h3>
      <p className='text-sm text-blueberry-950 font-mono bg-white px-4 py-2 rounded-lg break-all'>
        {id}
      </p>
    </div>
  )
}

export default CreatureIdSection
