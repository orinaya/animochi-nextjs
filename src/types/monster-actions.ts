export type MonsterAction = 'feed' | 'comfort' | 'hug' | 'wake'

export interface MonsterActionConfig {
  label: string
  emoji: string
  color: 'strawberry' | 'blueberry' | 'peach' | 'latte'
  animation: string
}
