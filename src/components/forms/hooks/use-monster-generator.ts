import { useState, useCallback } from 'react'
import { generateMonsterSvg } from '../utils/generate-monster-svg'

/**
 * Hook personnalisé pour gérer la génération de monstre
 *
 * Respecte le principe SRP : Gère uniquement la logique de génération
 *
 * @returns {Object} État et méthodes de génération
 * @returns {boolean} isGenerating - Indique si une génération est en cours
 * @returns {string | null} error - Message d'erreur éventuel
 * @returns {(name: string) => string | null} generate - Génère un monstre à partir d'un nom
 * @returns {() => void} clearError - Efface le message d'erreur
 *
 * @example
 * ```tsx
 * const { isGenerating, error, generate, clearError } = useMonsterGenerator()
 *
 * const handleGenerate = () => {
 *   const svg = generate('Mochi')
 *   if (svg) {
 *     setMonsterSvg(svg)
 *   }
 * }
 * ```
 */
export function useMonsterGenerator (): {
  isGenerating: boolean
  error: string | null
  generate: (name: string) => string | null
  clearError: () => void
} {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Génère un SVG de monstre à partir d'un nom
   *
   * @param {string} name - Nom utilisé comme seed pour la génération
   * @returns {string | null} Le SVG généré ou null en cas d'erreur
   */
  const generate = useCallback((name: string): string | null => {
    const trimmedName = name.trim()

    if (trimmedName === '') {
      setError('Veuillez saisir un nom avant de générer votre créature.')
      return null
    }

    setError(null)
    setIsGenerating(true)

    try {
      const svg = generateMonsterSvg(trimmedName)
      return svg
    } catch (generationError: unknown) {
      console.error('Erreur lors de la génération:', generationError)
      setError('Impossible de générer la créature. Réessayez.')
      return null
    } finally {
      setIsGenerating(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isGenerating,
    error,
    generate,
    clearError
  }
}
