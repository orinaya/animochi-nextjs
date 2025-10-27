'use client'

import { MonsterAvatarWithActions } from '@/components/monsters'
import { useActionContext } from './creature-interaction'

interface MonsterAvatarInteractiveProps {
  draw: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

function MonsterAvatarInteractive ({
  draw,
  name,
  size = 'xl',
  className = ''
}: MonsterAvatarInteractiveProps): React.ReactNode {
  const { activeAction } = useActionContext()

  return (
    <MonsterAvatarWithActions
      draw={draw}
      name={name}
      size={size}
      className={className}
      activeAction={activeAction}
    />
  )
}

export default MonsterAvatarInteractive
