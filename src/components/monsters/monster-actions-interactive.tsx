'use client'

import { MonsterActions } from '@/components/monsters'
import { useActionContext } from './creature-interaction'

interface MonsterActionsInteractiveProps {
  monsterId: string
  className?: string
}

function MonsterActionsInteractive ({
  monsterId,
  className = ''
}: MonsterActionsInteractiveProps): React.ReactNode {
  const { setAction } = useActionContext()

  return (
    <MonsterActions
      monsterId={monsterId}
      onAction={setAction}
      className={className}
    />
  )
}

export default MonsterActionsInteractive
