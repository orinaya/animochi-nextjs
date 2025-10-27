import { useState, useCallback } from 'react'

/**
 * Interface pour les champs du formulaire de création de monstre
 */
interface FormFields {
  /** Nom de la créature */
  name: string
  /** Représentation SVG de la créature */
  draw: string
}

/**
 * Hook personnalisé pour gérer l'état du formulaire de création de monstre
 *
 * Respecte le principe SRP : Gère uniquement l'état des champs du formulaire
 *
 * @returns {Object} État et méthodes de gestion du formulaire
 * @returns {FormFields} fields - Valeurs actuelles des champs
 * @returns {(field: keyof FormFields, value: string) => void} updateField - Met à jour un champ spécifique
 * @returns {(draw: string) => void} setDraw - Met à jour le SVG de la créature
 * @returns {() => void} resetForm - Réinitialise le formulaire
 *
 * @example
 * ```tsx
 * const { fields, updateField, setDraw, resetForm } = useMonsterFormState()
 *
 * <input
 *   value={fields.name}
 *   onChange={(e) => updateField('name', e.target.value)}
 * />
 * ```
 */
export function useMonsterFormState (): {
  fields: FormFields
  updateField: (field: keyof FormFields, value: string) => void
  setDraw: (draw: string) => void
  resetForm: () => void
} {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    draw: ''
  })

  /**
   * Met à jour un champ spécifique du formulaire
   */
  const updateField = useCallback((field: keyof FormFields, value: string): void => {
    setFields((current) => ({
      ...current,
      [field]: value
    }))
  }, [])

  /**
   * Met à jour le SVG de la créature et normalise le nom
   */
  const setDraw = useCallback((draw: string): void => {
    setFields((current) => ({
      ...current,
      name: current.name.trim(),
      draw
    }))
  }, [])

  /**
   * Réinitialise tous les champs du formulaire
   */
  const resetForm = useCallback((): void => {
    setFields({
      name: '',
      draw: ''
    })
  }, [])

  return {
    fields,
    updateField,
    setDraw,
    resetForm
  }
}
