import { createMonster } from '@/actions/monsters.action'
import type { CreateMonsterFormValues } from '@/types'
import { useCallback, useState } from 'react'

/**
 * Hook personnalisé pour gérer le processus de création d'un monstre
 *
 * Respecte le principe SRP en se concentrant uniquement sur la logique de création.
 * Respecte le principe OCP en permettant l'extension via la callback onSuccess.
 *
 * @param {() => void} [onSuccess] - Callback optionnelle appelée après création réussie
 * @returns {Object} Objet contenant l'état et la méthode de soumission
 * @returns {boolean} isSubmitting - Indique si une création est en cours
 * @returns {(values: CreateMonsterFormValues) => Promise<void>} handleSubmit - Fonction pour soumettre la création
 * @returns {string | null} error - Message d'erreur le cas échéant
 *
 * @example
 * ```tsx
 * const { isSubmitting, handleSubmit, error } = useMonsterCreation(() => {
 *   console.log('Monstre créé avec succès!')
 * })
 *
 * return (
 *   <form onSubmit={(e) => {
 *     e.preventDefault()
 *     handleSubmit(formData)
 *   }}>
 *     {error && <p>{error}</p>}
 *     <button disabled={isSubmitting}>Créer</button>
 *   </form>
 * )
 * ```
 */
export function useMonsterCreation (onSuccess?: () => void): {
  isSubmitting: boolean
  handleSubmit: (values: CreateMonsterFormValues) => Promise<void>
  error: string | null
  clearError: () => void
} {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Soumet les données du formulaire pour créer un nouveau monstre
   *
   * @param {CreateMonsterFormValues} values - Données du formulaire validées
   * @throws Ne propage pas les erreurs, les capture et les stocke dans l'état
   */
  const handleSubmit = useCallback(
    async (values: CreateMonsterFormValues): Promise<void> => {
      setIsSubmitting(true)
      setError(null)

      try {
        await createMonster(values)
        onSuccess?.()
      } catch (submitError: unknown) {
        console.error('Erreur lors de la création du monstre:', submitError)
        setError('Impossible de créer la créature pour le moment. Réessayez plus tard.')
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSuccess]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isSubmitting,
    handleSubmit,
    error,
    clearError
  }
}
