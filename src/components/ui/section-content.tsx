import { SectionContentProps } from '@/types'
import React from 'react'

// Fonction helper pour les classes d'alignement
function getAlignmentClasses (alignment: 'left' | 'center' | 'right'): string {
  switch (alignment) {
    case 'left':
      return 'text-left justify-start items-start'
    case 'right':
      return 'text-right justify-end items-end'
    case 'center':
    default:
      return 'text-center justify-center items-center'
  }
}

// Fonction helper pour les tailles de titre
function getTitleSizeClasses (size: 'sm' | 'md' | 'lg' | 'xl'): { title: string, highlight: string } {
  switch (size) {
    case 'sm':
      return {
        title: 'text-2xl md:text-4xl',
        highlight: 'text-3xl md:text-5xl'
      }
    case 'md':
      return {
        title: 'text-3xl md:text-5xl',
        highlight: 'text-4xl md:text-6xl'
      }
    case 'lg':
      return {
        title: 'text-4xl md:text-6xl',
        highlight: 'text-5xl md:text-7xl'
      }
    case 'xl':
    default:
      return {
        title: 'text-4xl md:text-7xl',
        highlight: 'text-5xl md:text-8xl'
      }
  }
}

// Fonction helper pour les classes de justification des boutons
function getButtonsJustification (alignment: 'left' | 'center' | 'right'): string {
  switch (alignment) {
    case 'left':
      return 'justify-start'
    case 'right':
      return 'justify-end'
    case 'center':
    default:
      return 'justify-center'
  }
}

export default function SectionContent ({
  title,
  highlightedWords,
  content,
  alignment = 'center',
  titleSize = 'xl',
  buttons,
  className = '',
  children
}: SectionContentProps): React.ReactNode {
  const alignmentClasses = getAlignmentClasses(alignment)
  const titleSizeClasses = getTitleSizeClasses(titleSize)
  const buttonsJustification = getButtonsJustification(alignment)

  return (
    <div className={`m-auto flex pt-28 ${alignmentClasses} ${className}`}>
      <div className='max-w-3xl space-y-6'>
        <h1 className={`${titleSizeClasses.title} font-extrabold text-blueberry-950 leading-tight`}>
          {title}
          <span className={`text-strawberry-400 font-tehegan ${titleSizeClasses.highlight}`}>
            {' '}{highlightedWords}
          </span>
        </h1>

        <p className='text-xl opacity-80 leading-relaxed'>
          {content}
        </p>

        {buttons !== undefined && (
          <div className={`flex flex-col sm:flex-row gap-4 items-center ${buttonsJustification}`}>
            {buttons}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}
