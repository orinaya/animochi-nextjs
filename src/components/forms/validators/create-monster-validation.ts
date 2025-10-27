import type { CreateMonsterFormValues } from '@/types'

/**
 * Valide les données du formulaire de création de monstre
 *
 * Respecte le principe SRP : Valide uniquement les données du formulaire
 * Respecte le principe OCP : Extensible via de nouvelles règles de validation
 *
 * Règles de validation :
 * - Le nom ne doit pas être vide
 * - Le draw (SVG) doit être généré
 * - L'ownerId doit être présent
 *
 * @param {CreateMonsterFormValues} values - Valeurs du formulaire à valider
 * @returns {string | null} Message d'erreur ou null si validation réussie
 *
 * @example
 * ```tsx
 * const error = validateCreateMonsterForm(formValues)
 * if (error !== null) {
 *   setError(error)
 *   return
 * }
 * // Continuer avec la soumission
 * ```
 */
export function validateCreateMonsterForm (values: CreateMonsterFormValues): string | null {
  if (values.name.trim() === '') {
    return 'Le nom de la créature est requis.'
  }

  if (values.draw.trim() === '') {
    return "Vous devez générer votre créature avant de pouvoir l'enregistrer."
  }

  if (values.ownerId.trim() === '') {
    return 'Identifiant propriétaire manquant pour créer la créature.'
  }

  return null
}
