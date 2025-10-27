import type { authClient } from '@/lib/auth-client'

type Session = typeof authClient.$Infer.Session

/**
 * Props pour le composant DashboardHeader
 */
interface DashboardHeaderProps {
  /** Session utilisateur contenant les informations de l'utilisateur connecté */
  session: Session
}

/**
 * Composant d'en-tête du Dashboard affichant un message de bienvenue personnalisé
 *
 * Respecte le principe SRP : Affichage uniquement de l'en-tête et du message de bienvenue
 *
 * @param {DashboardHeaderProps} props - Les propriétés du composant
 * @returns {React.ReactNode} L'en-tête du dashboard avec message de bienvenue
 *
 * @example
 * ```tsx
 * <DashboardHeader session={session} />
 * ```
 */
function DashboardHeader ({ session }: DashboardHeaderProps): React.ReactNode {
  return (
    <div className='text-center mb-8'>
      <h1 className='text-4xl font-bold mb-4 text-blueberry-950'>
        Bienvenue {session.user.email}
      </h1>
      <p className='text-lg text-latte-600'>
        Gérez vos créatures et suivez votre progression
      </p>
    </div>
  )
}

export default DashboardHeader
