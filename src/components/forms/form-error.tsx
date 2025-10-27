/**
 * Props pour le composant FormError
 */
interface FormErrorProps {
  /** Message d'erreur à afficher (null ou undefined si pas d'erreur) */
  message: string | null | undefined
}

/**
 * Composant d'affichage des erreurs de formulaire
 *
 * Affiche un message d'erreur stylisé si un message est fourni.
 *
 * Respecte le principe SRP : Affichage uniquement des erreurs
 *
 * @param {FormErrorProps} props - Les propriétés du composant
 * @returns {React.ReactNode | null} Le message d'erreur ou null si pas d'erreur
 *
 * @example
 * ```tsx
 * <FormError message={error} />
 * ```
 */
function FormError ({ message }: FormErrorProps): React.ReactNode | null {
  if (message == null || message === '') {
    return null
  }

  return (
    <p className='text-sm text-strawberry-600 bg-strawberry-25 border border-strawberry-200 rounded-2xl px-4 py-3'>
      {message}
    </p>
  )
}

export default FormError
