import { authClient } from '@/lib/auth-client'
import { useCallback } from 'react'

/**
 * Hook personnalisé pour gérer les opérations d'authentification
 *
 * Respecte le principe DIP (Dependency Inversion Principle) en s'appuyant sur
 * l'abstraction authClient plutôt que sur une implémentation concrète.
 *
 * @returns {Object} Objet contenant les méthodes d'authentification
 * @returns {() => void} logout - Fonction pour déconnecter l'utilisateur et le rediriger
 *
 * @example
 * ```tsx
 * const { logout } = useAuth()
 *
 * return (
 *   <button onClick={logout}>Se déconnecter</button>
 * )
 * ```
 */
export function useAuth (): {
  logout: () => void
} {
  /**
   * Déconnecte l'utilisateur et le redirige vers la page de connexion
   *
   * Note: Utilise window.location.href pour forcer un rechargement complet
   * et éviter les problèmes de cache de session
   */
  const logout = useCallback(() => {
    void authClient.signOut()
    window.location.href = '/sign-in'
  }, [])

  return {
    logout
  }
}
