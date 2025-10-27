import { Button } from '../ui'

/**
 * Props pour le composant DashboardActions
 */
interface DashboardActionsProps {
  /** Callback appelée lors du clic sur le bouton de création de créature */
  onCreateMonster: () => void
  /** Callback appelée lors du clic sur le bouton de déconnexion */
  onLogout: () => void
}

/**
 * Composant gérant les actions principales du Dashboard
 *
 * Respecte le principe SRP : Gère uniquement l'affichage des boutons d'action
 * Respecte le principe OCP : Extension possible via de nouvelles props sans modification
 *
 * @param {DashboardActionsProps} props - Les propriétés du composant
 * @returns {React.ReactNode} Les boutons d'action du dashboard
 *
 * @example
 * ```tsx
 * <DashboardActions
 *   onCreateMonster={handleCreateMonster}
 *   onLogout={handleLogout}
 * />
 * ```
 */
function DashboardActions ({ onCreateMonster, onLogout }: DashboardActionsProps): React.ReactNode {
  return (
    <div className='flex flex-col sm:flex-row gap-4 items-center justify-center mb-8'>
      <Button
        onClick={onCreateMonster}
        variant='primary'
        color='strawberry'
        size='lg'
      >
        Créer une créature
      </Button>
      <Button
        onClick={onLogout}
        variant='outline'
        color='latte'
        size='lg'
      >
        Se déconnecter
      </Button>
    </div>
  )
}

export default DashboardActions
