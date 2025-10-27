/**
 * Composant affichant les boutons d'action d'un monstre
 *
 * Respecte le principe SRP : Affiche uniquement les boutons d'action
 * Respecte le principe OCP : Extensible via de nouveaux boutons
 *
 * @returns {React.ReactNode} Les boutons d'action du monstre
 *
 * @example
 * ```tsx
 * <MonsterActions />
 * ```
 */
function MonsterActions (): React.ReactNode {
  return (
    <div className='flex gap-2 pt-4'>
      <button className='flex-1 bg-strawberry-500 hover:bg-strawberry-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200'>
        Nourrir
      </button>
      <button className='flex-1 bg-blueberry-500 hover:bg-blueberry-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200'>
        Jouer
      </button>
      <button className='bg-latte-200 hover:bg-latte-300 text-latte-700 font-medium py-2 px-4 rounded-xl transition-colors duration-200'>
        ⚙️
      </button>
    </div>
  )
}

export default MonsterActions
