'use client'

import { useState } from 'react'
import InputField from '@/components/ui/input'
import Button from '@/components/ui/button'
import { DEFAULT_MONSTER_LEVEL, DEFAULT_MONSTER_STATE, DEFAULT_MONSTER_OWNER_ID, type CreateMonsterFormValues } from '@/types'
import { validateCreateMonsterForm } from '@/components/forms/validators/create-monster-validation'
import { generateMonsterSvg } from '@/components/forms/utils/generate-monster-svg'

interface CreateMonsterFormProps {
  defaultOwnerId?: string
  onSubmit: (values: CreateMonsterFormValues) => Promise<void> | void
  onCancel?: () => void
}

interface FormFields {
  name: string
  draw: string
}

function CreateMonsterForm ({
  defaultOwnerId = '',
  onSubmit,
  onCancel
}: CreateMonsterFormProps): React.ReactNode {
  const [fields, setFields] = useState<FormFields>({
    name: '',
    draw: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateMonster = (): void => {
    const trimmedName = fields.name.trim()

    if (trimmedName === '') {
      setError('Veuillez saisir un nom avant de générer votre créature.')
      return
    }

    setError(null)
    setIsGenerating(true)

    try {
      const svg = generateMonsterSvg(trimmedName)
      setFields((current) => ({
        ...current,
        name: trimmedName,
        draw: svg
      }))
    } finally {
      setIsGenerating(false)
    }
  }

  const handleChange = (field: keyof FormFields, value: string): void => {
    setFields((current) => ({
      ...current,
      [field]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setError(null)

    const ownerId = defaultOwnerId === '' ? DEFAULT_MONSTER_OWNER_ID : defaultOwnerId

    const payload: CreateMonsterFormValues = {
      name: fields.name,
      draw: fields.draw,
      level: DEFAULT_MONSTER_LEVEL,
      state: DEFAULT_MONSTER_STATE,
      ownerId
    }

    const validationError = validateCreateMonsterForm(payload)
    if (validationError != null) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)

    void (async () => {
      try {
        await onSubmit(payload)
      } catch (submitError: unknown) {
        console.error('Erreur lors de la création du monstre:', submitError)
        setError('Impossible de créer la créature pour le moment. Réessayez plus tard.')
      } finally {
        setIsSubmitting(false)
      }
    })()
  }

  let previewContent: React.ReactNode
  if (fields.draw !== '') {
    previewContent = (
      <div
        className='w-full h-full flex items-center justify-center'
        dangerouslySetInnerHTML={{ __html: fields.draw }}
      />
    )
  } else {
    previewContent = (
      <p className='text-center text-latte-600 px-6'>
        Générez votre créature pour prévisualiser son illustration animée ici.
      </p>
    )
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      {error != null && (
        <p className='text-sm text-strawberry-600 bg-strawberry-25 border border-strawberry-200 rounded-2xl px-4 py-3'>
          {error}
        </p>
      )}

      <InputField
        type='text'
        name='name'
        label='Nom de la créature'
        placeholder='Par exemple : Mochi'
        value={fields.name}
        required
        onChangeText={(text) => handleChange('name', text)}
      />

      <div className='space-y-4'>
        <div className='w-full aspect-square rounded-3xl border border-latte-200 bg-latte-25 flex items-center justify-center overflow-hidden p-4'>
          {previewContent}
        </div>
        <Button
          type='button'
          variant='secondary'
          color='blueberry'
          className='w-full'
          onClick={handleGenerateMonster}
          disabled={isGenerating}
        >
          {isGenerating ? 'Génération en cours...' : 'Générer mon monstre'}
        </Button>
      </div>
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
    </form>
  )
}

export default CreateMonsterForm
