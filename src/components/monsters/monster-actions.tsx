'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import type { MonsterAction, MonsterActionConfig } from '@/types/monster-actions'

interface MonsterActionsProps {
  monsterId: string
  onAction?: (action: MonsterAction) => void | Promise<void>
  className?: string
}

const ACTIONS_CONFIG: Record<MonsterAction, MonsterActionConfig> = {
  feed: {
    label: 'Nourrir',
    emoji: '🍎',
    color: 'strawberry',
    animation: 'animate-bounce'
  },
  comfort: {
    label: 'Consoler',
    emoji: '💝',
    color: 'peach',
    animation: 'animate-pulse'
  },
  hug: {
    label: 'Câliner',
    emoji: '🤗',
    color: 'blueberry',
    animation: 'animate-wiggle'
  },
  wake: {
    label: 'Réveiller',
    emoji: '⏰',
    color: 'latte',
    animation: 'animate-shake'
  }
}

function MonsterActions ({
  monsterId,
  onAction,
  className = ''
}: MonsterActionsProps): React.ReactNode {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null)

  const handleAction = (action: MonsterAction): void => {
    const config = ACTIONS_CONFIG[action]

    // Déclencher l'animation
    setActiveAnimation(config.animation)

    // Exécuter l'action callback si fournie
    if (onAction !== undefined && onAction !== null) {
      void onAction(action)
    }

    // Arrêter l'animation après 1 seconde
    setTimeout(() => {
      setActiveAnimation(null)
    }, 1000)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className='text-xl font-semibold text-blueberry-950'>Actions disponibles</h3>

      <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {(Object.entries(ACTIONS_CONFIG) as Array<[MonsterAction, MonsterActionConfig]>).map(
          ([actionKey, config]) => (
            <Button
              key={actionKey}
              onClick={() => { handleAction(actionKey) }}
              variant='primary'
              color={config.color}
              size='md'
              className='flex flex-col items-center gap-2 py-4 h-auto'
            >
              <span className={`text-3xl ${activeAnimation === config.animation ? config.animation : ''}`}>
                {config.emoji}
              </span>
              <span className='text-sm font-medium'>{config.label}</span>
            </Button>
          )
        )}
      </div>
    </div>
  )
}

export default MonsterActions
