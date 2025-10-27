import React from 'react'

interface ErrorMessageProps {
  message: string | null
  className?: string
}

export default function ErrorMessage ({
  message,
  className = ''
}: ErrorMessageProps): React.ReactNode {
  if (message == null || message === '') return null

  return (
    <div
      className={`
      bg-strawberry-25 border border-strawberry-200 rounded-2xl p-5 mb-6
      flex items-start gap-3 text-strawberry-700
      ${className}
    `}
    >
      <span className='w-6 h-6 bg-strawberry-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
        <span className='text-strawberry-600 text-sm font-bold'>!</span>
      </span>
      <div>
        <h4 className='font-semibold text-strawberry-800 mb-1'>Erreur de connexion</h4>
        <p className='text-sm leading-relaxed'>{message}</p>
      </div>
    </div>
  )
}
