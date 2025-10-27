'use client'

import { useState, createContext, useContext } from 'react'
import type { MonsterAction } from '@/types/monster-actions'

interface ActionContextType {
  activeAction: MonsterAction | null
  setAction: (action: MonsterAction) => void
}

const ActionContext = createContext<ActionContextType | null>(null)

export function useActionContext (): ActionContextType {
  const context = useContext(ActionContext)
  if (context === null) {
    throw new Error('useActionContext must be used within ActionProvider')
  }
  return context
}

interface ActionProviderProps {
  children: React.ReactNode
}

export function ActionProvider ({ children }: ActionProviderProps): React.ReactNode {
  const [activeAction, setActiveAction] = useState<MonsterAction | null>(null)

  const setAction = (action: MonsterAction): void => {
    setActiveAction(action)

    // Réinitialiser l'action après l'animation
    setTimeout(() => {
      setActiveAction(null)
    }, 2000)
  }

  return (
    <ActionContext.Provider value={{ activeAction, setAction }}>
      {children}
    </ActionContext.Provider>
  )
}
