import Link from 'next/link'
import { Button } from '@/components/ui'

/**
 * Bouton de retour vers le dashboard
 *
 * Respecte le principe SRP : Affichage uniquement du bouton de navigation
 *
 * @returns {React.ReactNode} Le bouton de retour
 *
 * @example
 * ```tsx
 * <BackToDashboardButton />
 * ```
 */
function BackToDashboardButton (): React.ReactNode {
  return (
    <div className='mb-6'>
      <Link href='/dashboard'>
        <Button variant='ghost' size='md'>
          ← Retour au tableau de bord
        </Button>
      </Link>
    </div>
  )
}

export default BackToDashboardButton
