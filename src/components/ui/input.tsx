'use client'

import React from 'react'

interface InputFieldProps {
  type: string
  name?: string
  label?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeText?: (text: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
}

function InputField ({
  type,
  name,
  label,
  value,
  onChange,
  onChangeText,
  placeholder,
  required = false,
  disabled = false,
  error
}: InputFieldProps): React.ReactNode {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange !== undefined) onChange(e)
    if (onChangeText !== undefined) onChangeText(e.target.value)
  }

  const hasValue = value != null && value !== ''
  const hasError = error != null && error !== ''

  return (
    <div className='relative mb-6'>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          peer w-full px-6 py-4 bg-latte-25 border-2 rounded-2xl 
          focus:outline-none transition-all duration-300 placeholder-transparent
          focus:bg-white focus:shadow-md
          ${hasError
            ? 'border-strawberry-300 focus:border-strawberry-400 bg-strawberry-25'
            : hasValue
              ? 'border-blueberry-950 focus:border-blueberry-950'
              : 'border-latte-200 focus:border-blueberry-950 hover:border-latte-300'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      />

      {label != null && (
        <label
          htmlFor={name}
          className={`
            absolute left-6 transition-all duration-300 pointer-events-none
            ${hasValue || placeholder != null
              ? '-top-3 text-sm px-3 bg-white rounded-full'
              : 'top-4 text-base'
            }
            peer-focus:-top-3 peer-focus:text-sm peer-focus:px-3 peer-focus:bg-white peer-focus:rounded-full
            ${hasError
              ? 'text-strawberry-600 peer-focus:text-strawberry-600'
              : hasValue
                ? 'text-blueberry-950 peer-focus:text-blueberry-950'
                : 'text-latte-700 peer-focus:text-blueberry-950'
            }
          `}
        >
          {label}
          {required && <span className='text-strawberry-400 ml-1'>*</span>}
        </label>
      )}

      {hasError && (
        <p className='mt-2 text-sm text-strawberry-600 flex items-center gap-2'>
          <span className='w-4 h-4 bg-strawberry-100 rounded-full flex items-center justify-center'>
            <span className='text-strawberry-600 text-xs'>!</span>
          </span>
          {error}
        </p>
      )}
    </div>
  )
}

export default InputField
