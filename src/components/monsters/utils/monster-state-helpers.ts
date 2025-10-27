import type { MonsterState } from '@/types/monster'

/**
 * Retourne l'emoji correspondant à l'état d'un monstre
 *
 * Respecte le principe SRP : Gère uniquement le mapping état -> emoji
 *
 * @param {MonsterState | string | null} state - État du monstre
 * @returns {string} L'emoji correspondant à l'état
 *
 * @example
 * ```tsx
 * const emoji = getStateEmoji('happy') // '😊'
 * ```
 */
export function getStateEmoji (state: MonsterState | string | null): string {
  switch (state) {
    case 'happy':
      return '😊'
    case 'sad':
      return '😢'
    case 'angry':
      return '😠'
    case 'hungry':
      return '🍎'
    case 'sleepy':
      return '😴'
    default:
      return '😊'
  }
}

/**
 * Retourne les classes CSS pour la couleur de l'état d'un monstre
 *
 * Respecte le principe SRP : Gère uniquement le mapping état -> couleur
 *
 * @param {MonsterState | string | null} state - État du monstre
 * @returns {string} Classes CSS Tailwind pour la couleur
 *
 * @example
 * ```tsx
 * const colorClass = getStateColor('happy') // 'text-strawberry-500 bg-strawberry-50'
 * ```
 */
export function getStateColor (state: MonsterState | string | null): string {
  switch (state) {
    case 'happy':
      return 'text-strawberry-500 bg-strawberry-50'
    case 'sad':
      return 'text-blueberry-500 bg-blueberry-50'
    case 'angry':
      return 'text-peach-600 bg-peach-50'
    case 'hungry':
      return 'text-latte-600 bg-latte-50'
    case 'sleepy':
      return 'text-blueberry-400 bg-blueberry-25'
    default:
      return 'text-strawberry-500 bg-strawberry-50'
  }
}

/**
 * Retourne les classes CSS pour la couleur du niveau d'un monstre
 *
 * Respecte le principe SRP : Gère uniquement le mapping niveau -> couleur
 *
 * @param {number | null} level - Niveau du monstre
 * @returns {string} Classes CSS Tailwind pour la couleur du niveau
 *
 * @example
 * ```tsx
 * const colorClass = getLevelColor(15) // 'text-peach-500'
 * ```
 */
export function getLevelColor (level: number | null): string {
  if (level == null || level <= 0) return 'text-latte-500'
  if (level <= 5) return 'text-blueberry-500'
  if (level <= 10) return 'text-strawberry-500'
  if (level <= 20) return 'text-peach-500'
  return 'text-latte-700'
}
