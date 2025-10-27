import { useEffect } from 'react'

/**
 * Hook personnalisé pour bloquer/débloquer le scroll du body
 *
 * Respecte le principe SRP : Gère uniquement le blocage du scroll
 * Utile pour empêcher le scroll de la page lorsqu'une modale est ouverte
 *
 * @param {boolean} locked - Active ou désactive le blocage du scroll
 *
 * @example
 * ```tsx
 * useBodyScrollLock(isModalOpen)
 * ```
 */
export function useBodyScrollLock (locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [locked])
}
