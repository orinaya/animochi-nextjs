export type ThemeColor = 'blueberry' | 'strawberry' | 'peach' | 'latte'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

export type MonsterRarity = 'Commun' | 'Rare' | 'Épique' | 'Légendaire'

export interface Monster {
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
