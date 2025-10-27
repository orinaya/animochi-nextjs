export type ThemeColor = 'blueberry' | 'strawberry' | 'peach' | 'latte'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

// Export tous les types de monstre (Monster, MonsterState, etc.)
export * from './monster'
export * from './monster-actions'

export type MonsterRarity = 'Commun' | 'Rare' | 'Épique' | 'Légendaire'

/**
 * Représentation simplifiée d'un monstre pour l'affichage marketing/public
 * (Différent de Monster qui est le type principal des monstres utilisateur)
 */
export interface MarketingMonster {
  id: string
  name: string
  description: string
  color: ThemeColor
  emoji: string
  rarity: MonsterRarity
}

export interface GameAction {
  id: string
  title: string
  description: string
  icon: string
  color: ThemeColor
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
  color: ThemeColor
}

export interface Animal {
  id: string
  name: string
  firstName: string
  type: string
  image: string
}

export interface SectionContentProps {
  title: string
  highlightedWords: string
  content: string
  alignment?: 'left' | 'center' | 'right'
  titleSize?: 'sm' | 'md' | 'lg' | 'xl'
  buttons?: React.ReactNode
  className?: string
  children?: React.ReactNode
}
