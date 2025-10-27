import MonsterCard from './monster-card'
import MonstersEmptyState from './monsters-empty-state'
import MonstersListHeader from './monsters-list-header'
import type { Monster } from '@/types/monster'

/**
 * Props pour le composant MonstersList
 */
interface MonstersListProps {
  /** Liste des monstres à afficher */
  monsters: Monster[]
}

/**
 * Liste des monstres de l'utilisateur
 *
 * Affiche une grille responsive de cartes de monstres avec :
 * - Un état vide stylisé si aucun monstre
 * - Un en-tête avec compteur
 * - Une grille adaptative (1 colonne mobile, 2 tablette, 3 desktop)
 *
 * Respecte le principe SRP : Orchestre uniquement l'affichage de la liste
 * Respecte le principe OCP : Composition de sous-composants réutilisables
 *
 * @param {MonstersListProps} props - Les propriétés du composant
 * @returns {React.ReactNode} La liste complète des monstres
 *
 * @example
 * ```tsx
 * <MonstersList monsters={userMonsters} />
 * ```
 */
function MonstersList ({ monsters }: MonstersListProps): React.ReactNode {
  // Affiche un état vide si aucun monstre
  if (monsters === null || monsters === undefined || monsters.length === 0) {
    return <MonstersEmptyState />
  }

  return (
    <div className='space-y-6'>
      <MonstersListHeader count={monsters.length} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {monsters.map((monster) => (
          <MonsterCard
            key={monster.id ?? monster._id ?? monster.name}
            {...monster}
          />
        ))}
      </div>
    </div>
  )
}

export default MonstersList
