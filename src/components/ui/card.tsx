import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'soft' | 'minimal'
}

function Card ({ children, className = '', variant = 'default' }: CardProps): React.ReactNode {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'elevated':
        return 'shadow-lg border-0 bg-white'
      case 'soft':
        return 'shadow-sm border border-latte-100 bg-latte-25'
      case 'minimal':
        return 'border-0 bg-white'
      default:
        return 'shadow-md border-0 bg-white'
    }
  }

  return (
    <div
      className={`
      rounded-3xl p-8 transition-all duration-200
      ${getVariantStyles()}
      ${className}
    `}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

function CardHeader ({ children, className = '' }: CardHeaderProps): React.ReactNode {
  return <div className={`mb-6 text-center ${className}`}>{children}</div>
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

function CardTitle ({ children, className = '' }: CardTitleProps): React.ReactNode {
  return <h2 className={`text-3xl font-bold text-blueberry-950 mb-3 ${className}`}>{children}</h2>
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

function CardDescription ({ children, className = '' }: CardDescriptionProps): React.ReactNode {
  return <p className={`text-latte-600 ${className}`}>{children}</p>
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

function CardContent ({ children, className = '' }: CardContentProps): React.ReactNode {
  return <div className={className}>{children}</div>
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent }
