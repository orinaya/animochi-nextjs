import { getMonsters } from '@/actions/monsters.action'
import DashboardContent from '@/components/dashboard/dashboard-content'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Page Dashboard - Point d'entrée principal du tableau de bord utilisateur
 *
 * Cette page Server Component :
 * - Vérifie l'authentification de l'utilisateur
 * - Charge les monstres de l'utilisateur
 * - Redirige vers /sign-in si non authentifié
 * - Passe les données au composant Client DashboardContent
 *
 * Respecte le principe SRP : Gère uniquement la logique serveur du dashboard
 * Respecte le principe DIP : Utilise des abstractions (auth, getMonsters)
 *
 * @returns {Promise<React.ReactNode>} Le contenu du dashboard ou redirection
 *
 * @example
 * Route accessible via /dashboard
 */
async function DashboardPage (): Promise<React.ReactNode> {
  // Récupération de la session utilisateur
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // Récupération des monstres de l'utilisateur
  const monsters = await getMonsters()

  // Sérialisation pour passage au composant client
  const plainMonsters = JSON.parse(JSON.stringify(monsters))

  // Redirection si non authentifié
  if (session === null || session === undefined) {
    redirect('/sign-in')
  }

  return (
    <DashboardContent session={session} monsters={plainMonsters} />
  )
}

export default DashboardPage
