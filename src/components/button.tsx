function getSize (size?: 'sm' | 'md' | 'lg' | 'xl'): string {
  switch (size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm'
    case 'md':
      return 'px-4 py-2 text-base'
    case 'lg':
      return 'px-5 py-2.5 text-lg'
    case 'xl':
      return 'px-6 py-3 text-xl'
    default:
      return 'px-3 py-1.5 text-sm'
  }
}

function getVariant (
  variant: 'primary' | 'secondary' | 'ghost' | 'outline',
  disabled: boolean
): string {
  switch (variant) {
    case 'primary':
      return disabled
        ? 'bg-strawberry-300 text-strawberry-50 cursor-not-allowed'
        : 'bg-strawberry-500 text-strawberry-50 hover:bg-strawberry-600'
    case 'secondary':
      return disabled
        ? 'bg-strawberry-100 text-strawberry-800'
        : 'bg-strawberry-200 text-strawberry-800 hover:bg-strawberry-300'
    case 'ghost':
      return disabled
        ? 'bg-transparent text-strawberry-500'
        : 'bg-transparent text-strawberry-500 hover:bg-strawberry-100'
    case 'outline':
      return disabled
        ? 'border border-strawberry-500 text-strawberry-500 background-transparent'
        : 'border border-strawberry-500 text-strawberry-500 background-transparent hover:bg-strawberry-100'
    default:
      return 'bg-strawberry-500 text-strawberry-50'
  }
}

function Button ({
  children = 'Click me',
  onClick,
  size = 'sm',
  variant = 'primary',
  disabled = true
}: {
  children: React.ReactNode
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  disabled?: boolean
}): React.ReactNode {
  return (
    <button
      className={`rounded-sm font-medium ${
        disabled ? '' : 'cursor-pointer transition-all duration-300'
      } ${getSize(size)} ${getVariant(variant, disabled)}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
