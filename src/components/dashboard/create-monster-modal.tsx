'use client'

import CreateMonsterForm from '@/components/forms/create-monster-form'
import type { CreateMonsterFormValues } from '@/types'
import { useEscapeKey, useBodyScrollLock, useBackdropClick } from './hooks'

/**
 * Props pour le composant CreateMonsterModal
 */
interface CreateMonsterModalProps {
  /** État d'ouverture de la modale */
  isOpen: boolean
  /** Callback appelée lors de la fermeture de la modale */
  onClose: () => void
  /** Callback appelée lors de la soumission du formulaire */
  onSubmit: (values: CreateMonsterFormValues) => Promise<void> | void
  /** ID du propriétaire par défaut (optionnel) */
  defaultOwnerId?: string
}

/**
 * Composant Modal pour la création d'un nouveau monstre
 *
 * Gère l'affichage d'une modale contenant le formulaire de création de monstre.
 * Implémente les comportements standard d'une modale :
 * - Fermeture via touche Escape
 * - Fermeture via clic sur le backdrop
 * - Blocage du scroll du body quand ouverte
 *
 * Respecte le principe SRP : Gère uniquement l'enveloppe modale
 * Respecte le principe OCP : Extension via props sans modification du code
 * Respecte le principe DIP : Utilise des hooks abstraits pour les comportements
 *
 * @param {CreateMonsterModalProps} props - Les propriétés du composant
 * @returns {React.ReactNode} La modale de création ou null si fermée
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 *
 * <CreateMonsterModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onSubmit={async (values) => {
 *     await createMonster(values)
 *   }}
 * />
 * ```
 */
function CreateMonsterModal ({
  isOpen,
  onClose,
  onSubmit,
  defaultOwnerId
}: CreateMonsterModalProps): React.ReactNode {
  // Gestion de la fermeture via touche Escape
  useEscapeKey(isOpen, onClose)

  // Blocage du scroll du body quand la modale est ouverte
  useBodyScrollLock(isOpen)

  // Gestion du clic sur le backdrop
  const handleBackdropClick = useBackdropClick(onClose)

  // Si la modale est fermée, ne rien afficher
  if (!isOpen) return null

  /**
   * Handler de soumission du formulaire
   * Ferme automatiquement la modale après soumission réussie
   *
   * @param {CreateMonsterFormValues} values - Valeurs du formulaire
   */
  const handleSubmit = async (values: CreateMonsterFormValues): Promise<void> => {
    await onSubmit(values)
    onClose()
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-blueberry-950/30 backdrop-blur-sm px-4'
      role='dialog'
      aria-modal='true'
      onClick={handleBackdropClick}
    >
      <div className='relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl border border-latte-200'>
        <div className='mb-8 text-center sm:text-left'>
          <h2 className='text-2xl font-semibold text-blueberry-950 mb-2'>
            Créer une nouvelle créature
          </h2>
          <p className='text-latte-700'>
            Complétez les informations pour ajouter une créature à votre collection.
          </p>
        </div>

        <CreateMonsterForm
          defaultOwnerId={defaultOwnerId}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}

export default CreateMonsterModal
