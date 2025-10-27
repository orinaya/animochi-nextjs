/**
 * Formate une date au format français avec heure
 *
 * Respecte le principe SRP : Gère uniquement le formatage de date
 *
 * @param {string | undefined} dateString - Date à formater (format ISO)
 * @returns {string} Date formatée ou message d'erreur
 *
 * @example
 * ```tsx
 * formatDate('2025-10-27T12:00:00Z') // '27/10/2025 12:00'
 * formatDate(undefined) // 'Non défini'
 * ```
 */
export function formatDate (dateString?: string): string {
  if (dateString == null || dateString === '') return 'Non défini'

  try {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Date invalide'
  }
}
