'use client'

import { useEffect } from 'react'
import CreateMonsterForm from '@/components/forms/create-monster-form'
import type { CreateMonsterFormValues } from '@/types'

interface CreateMonsterModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: CreateMonsterFormValues) => Promise<void> | void
  defaultOwnerId?: string
}

function CreateMonsterModal ({
  isOpen,
  onClose,
  onSubmit,
  defaultOwnerId
}: CreateMonsterModalProps): React.ReactNode {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

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
          <h2 className='text-2xl font-semibold text-blueberry-950 mb-2'>Créer une nouvelle créature</h2>
          <p className='text-latte-700'>Complétez les informations pour ajouter une créature à votre collection.</p>
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
