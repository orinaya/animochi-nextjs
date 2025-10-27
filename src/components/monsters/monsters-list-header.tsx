/**
 * Props pour le composant MonstersListHeader
 */
interface MonstersListHeaderProps {
  /** Nombre total de monstres */
  count: number
}

/**
 * En-tête de la liste des monstres affichant le titre et le compteur
 *
 * Respecte le principe SRP : Affiche uniquement l'en-tête de la liste
 *
 * @param {MonstersListHeaderProps} props - Les propriétés du composant
 * @returns {React.ReactNode} L'en-tête de la liste
 *
 * @example
 * ```tsx
 * <MonstersListHeader count={monsters.length} />
 * ```
 */
function MonstersListHeader ({ count }: MonstersListHeaderProps): React.ReactNode {
  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-2xl font-bold text-blueberry-950'>
        Vos Monstres ({count})
      </h2>
    </div>
  )
}

export default MonstersListHeader
