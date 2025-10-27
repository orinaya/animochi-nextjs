/**
 * Récupère l'ID d'un monstre depuis les différentes sources possibles
 *
 * Respecte le principe SRP : Gère uniquement la logique d'extraction d'ID
 *
 * @param {string | undefined} id - ID standard
 * @param {string | undefined} _id - ID MongoDB
 * @param {string} fallback - Valeur de secours si aucun ID n'est trouvé
 * @returns {string} L'ID du monstre ou la valeur de secours
 *
 * @example
 * ```tsx
 * const monsterId = getMonsterId(undefined, '507f1f77bcf86cd799439011', 'unknown')
 * // '507f1f77bcf86cd799439011'
 * ```
 */
export function getMonsterId (
  id: string | undefined,
  _id: string | undefined,
  fallback: string = 'unknown'
): string {
  return id ?? _id ?? fallback
}
