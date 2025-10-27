'use client'

import { useState } from 'react'
import InputField from '@/components/ui/input'
import FormError from './form-error'
import MonsterPreview from './monster-preview'
import FormActions from './form-actions'
import { useMonsterFormState, useMonsterGenerator } from './hooks'
import {
  DEFAULT_MONSTER_LEVEL,
  DEFAULT_MONSTER_STATE,
  DEFAULT_MONSTER_OWNER_ID,
  type CreateMonsterFormValues
} from '@/types'
import { validateCreateMonsterForm } from '@/components/forms/validators/create-monster-validation'

/**
 * Props pour le composant CreateMonsterForm
 */
interface CreateMonsterFormProps {
  /** ID du propriétaire par défaut (optionnel) */
  defaultOwnerId?: string
  /** Callback appelée lors de la soumission du formulaire */
  onSubmit: (values: CreateMonsterFormValues) => Promise<void> | void
  /** Callback appelée lors de l'annulation (optionnel) */
  onCancel?: () => void
}

/**
 * Formulaire de création d'un nouveau monstre
 *
 * Permet à l'utilisateur de :
 * - Saisir un nom pour sa créature
 * - Générer une représentation visuelle unique basée sur le nom
 * - Soumettre le formulaire pour créer la créature
 *
 * Respecte le principe SRP : Orchestre uniquement le formulaire de création
 * Respecte le principe DIP : Utilise des hooks et composants abstraits
 * Respecte le principe OCP : Extension via props sans modification du code
 *
 * @param {CreateMonsterFormProps} props - Les propriétés du composant
 * @returns {React.ReactNode} Le formulaire de création complet
 *
 * @example
 * ```tsx
 * <CreateMonsterForm
 *   defaultOwnerId={userId}
 *   onSubmit={async (values) => {
 *     await createMonster(values)
 *   }}
 *   onCancel={() => closeModal()}
 * />
 * ```
 */
function CreateMonsterForm ({
  defaultOwnerId = '',
  onSubmit,
  onCancel
}: CreateMonsterFormProps): React.ReactNode {
  // État du formulaire via hook personnalisé
  const { fields, updateField, setDraw } = useMonsterFormState()

  // Gestion de la génération via hook personnalisé
  const { isGenerating, error: generatorError, generate } = useMonsterGenerator()

  // État local pour la soumission et les erreurs de validation
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)

  /**
   * Gère la génération du monstre à partir du nom saisi
   */
  const handleGenerateMonster = (): void => {
    const svg = generate(fields.name)
    if (svg !== null) {
      setDraw(svg)
    }
  }

  /**
   * Gère la soumission du formulaire
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Événement de soumission
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setValidationError(null)

    // Construction du payload avec valeurs par défaut
    const ownerId = defaultOwnerId === '' ? DEFAULT_MONSTER_OWNER_ID : defaultOwnerId

    const payload: CreateMonsterFormValues = {
      name: fields.name,
      draw: fields.draw,
      level: DEFAULT_MONSTER_LEVEL,
      state: DEFAULT_MONSTER_STATE,
      ownerId
    }

    // Validation du formulaire
    const error = validateCreateMonsterForm(payload)
    if (error != null) {
      setValidationError(error)
      return
    }

    // Soumission
    setIsSubmitting(true)

    void (async () => {
      try {
        await onSubmit(payload)
      } catch (submitError: unknown) {
        console.error('Erreur lors de la création du monstre:', submitError)
        setValidationError('Impossible de créer la créature pour le moment. Réessayez plus tard.')
      } finally {
        setIsSubmitting(false)
      }
    })()
  }

  // Combine les erreurs de génération et de validation
  const displayError = generatorError ?? validationError

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <FormError message={displayError} />

      <InputField
        type='text'
        name='name'
        label='Nom de la créature'
        placeholder='Par exemple : Mochi'
        value={fields.name}
        required
        onChangeText={(text) => updateField('name', text)}
      />

      <div className='space-y-4'>
        <MonsterPreview draw={fields.draw} />
        <FormActions
          isSubmitting={isSubmitting}
          isGenerating={isGenerating}
          onCancel={onCancel}
          onGenerate={handleGenerateMonster}
        />
      </div>
    </form>
  )
}

export default CreateMonsterForm
