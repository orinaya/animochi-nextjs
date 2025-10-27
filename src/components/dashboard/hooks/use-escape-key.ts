import { useEffect } from 'react'

/**
 * Hook personnalisé pour gérer la touche Escape
 *
 * Respecte le principe SRP : Se concentre uniquement sur la gestion de la touche Escape
 *
 * @param {boolean} enabled - Active ou désactive l'écoute de la touche Escape
 * @param {() => void} onEscape - Callback appelée lors de l'appui sur Escape
 *
 * @example
 * ```tsx
 * useEscapeKey(isOpen, () => {
 *   console.log('Escape pressed')
 *   closeModal()
 * })
 * ```
 */
export function useEscapeKey (enabled: boolean, onEscape: () => void): void {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onEscape()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, onEscape])
}
