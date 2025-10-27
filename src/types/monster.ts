export type MonsterState = 'happy' | 'sad' | 'angry' | 'hungry' | 'sleepy'

export interface CreateMonsterFormValues {
  name: string
  draw: string
  level: number
  state: MonsterState
  ownerId: string
}

export const DEFAULT_MONSTER_LEVEL = 1
export const DEFAULT_MONSTER_STATE: MonsterState = 'happy'
export const DEFAULT_MONSTER_OWNER_ID = 'pending-owner'
