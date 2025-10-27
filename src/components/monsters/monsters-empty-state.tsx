/**
 * Composant affiché lorsqu'aucun monstre n'est présent
 *
 * Respecte le principe SRP : Affiche uniquement l'état vide
 *
 * @returns {React.ReactNode} Le message d'état vide
 *
 * @example
 * ```tsx
 * {monsters.length === 0 && <MonstersEmptyState />}
 * ```
 */
function MonstersEmptyState (): React.ReactNode {
  return (
    <div className='text-center py-12'>
      <div className='text-6xl mb-4'>🐾</div>
      <h3 className='text-xl font-semibold text-blueberry-950 mb-2'>
        Aucun monstre trouvé
      </h3>
      <p className='text-latte-600'>
        Il est temps de créer votre premier compagnon !
      </p>
    </div>
  )
}

export default MonstersEmptyState
