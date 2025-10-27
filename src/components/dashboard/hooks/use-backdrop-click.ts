import { useCallback } from 'react'

/**
 * Hook personnalisé pour gérer le clic sur le backdrop d'une modale
 *
 * Respecte le principe SRP : Gère uniquement la logique de clic sur backdrop
 *
 * @param {() => void} onBackdropClick - Callback appelée lors du clic sur le backdrop
 * @returns {(event: React.MouseEvent<HTMLDivElement>) => void} Handler de clic à attacher au backdrop
 *
 * @example
 * ```tsx
 * const handleBackdropClick = useBackdropClick(() => {
 *   closeModal()
 * })
 *
 * return (
 *   <div onClick={handleBackdropClick}>
 *     <div onClick={(e) => e.stopPropagation()}>
 *       Modal content
 *     </div>
 *   </div>
 * )
 * ```
 */
export function useBackdropClick (
  onBackdropClick: () => void
): (event: React.MouseEvent<HTMLDivElement>) => void {
  return useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      // Ferme uniquement si on clique directement sur le backdrop (pas sur ses enfants)
      if (event.target === event.currentTarget) {
        onBackdropClick()
      }
    },
    [onBackdropClick]
  )
}
