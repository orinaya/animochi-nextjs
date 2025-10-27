import { useState, useCallback } from 'react'

/**
 * Hook personnalisé pour gérer l'état d'ouverture/fermeture d'une modale
 *
 * Respecte le principe SRP (Single Responsibility Principle) en se concentrant
 * uniquement sur la gestion de l'état du modal.
 *
 * @returns {Object} Objet contenant l'état et les handlers du modal
 * @returns {boolean} isOpen - État d'ouverture du modal
 * @returns {() => void} open - Fonction pour ouvrir le modal
 * @returns {() => void} close - Fonction pour fermer le modal
 * @returns {() => void} toggle - Fonction pour basculer l'état du modal
 *
 * @example
 * ```tsx
 * const { isOpen, open, close } = useModal()
 *
 * return (
 *   <>
 *     <button onClick={open}>Ouvrir</button>
 *     <Modal isOpen={isOpen} onClose={close} />
 *   </>
 * )
 * ```
 */
export function useModal (initialState: boolean = false): {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
} {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return {
    isOpen,
    open,
    close,
    toggle
  }
}
