import Button from '@/components/ui/button'

/**
 * Props pour le composant FormActions
 */
interface FormActionsProps {
  /** Indique si la soumission est en cours */
  isSubmitting: boolean
  /** Indique si la génération est en cours */
  isGenerating: boolean
  /** Callback appelée lors de l'annulation */
  onCancel?: () => void
  /** Callback appelée lors de la génération */
  onGenerate: () => void
}

/**
 * Composant des actions du formulaire de création de monstre
 *
 * Gère l'affichage et l'état des boutons d'action (générer, annuler, créer).
 *
 * Respecte le principe SRP : Gère uniquement l'affichage des actions
 * Respecte le principe OCP : Extension via props sans modification
 *
 * @param {FormActionsProps} props - Les propriétés du composant
 * @returns {React.ReactNode} Les boutons d'action du formulaire
 *
 * @example
 * ```tsx
 * <FormActions
 *   isSubmitting={isSubmitting}
 *   isGenerating={isGenerating}
 *   onCancel={handleCancel}
 *   onGenerate={handleGenerate}
 * />
 * ```
 */
function FormActions ({
  isSubmitting,
  isGenerating,
  onCancel,
  onGenerate
}: FormActionsProps): React.ReactNode {
  return (
    <div className='space-y-4'>
      {/* Bouton de génération */}
      <Button
        type='button'
        variant='secondary'
        color='blueberry'
        className='w-full'
        onClick={onGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? 'Génération en cours...' : 'Générer mon monstre'}
      </Button>

      {/* Boutons de soumission et annulation */}
      <div className='flex flex-col sm:flex-row sm:justify-end gap-4 pt-2'>
        {onCancel != null && (
          <Button
            type='button'
            variant='ghost'
            color='latte'
            className='sm:w-auto w-full'
            onClick={onCancel}
          >
            Annuler
          </Button>
        )}
        <Button
          type='submit'
          variant='primary'
          color='strawberry'
          className='sm:w-auto w-full'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Création en cours...' : 'Créer la créature'}
        </Button>
      </div>
    </div>
  )
}

export default FormActions
