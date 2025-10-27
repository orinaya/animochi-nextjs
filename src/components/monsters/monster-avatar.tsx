import React from 'react'

interface MonsterAvatarProps {
  draw: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

function MonsterAvatar({
  draw,
  name,
  size = 'md',
  className = ''
}: MonsterAvatarProps): React.ReactNode {
  const getSizeClasses = (avatarSize: string): string => {
    switch (avatarSize) {
      case 'sm':
        return 'w-16 h-16'
      case 'md':
        return 'w-32 h-32'
      case 'lg':
        return 'w-48 h-48'
      case 'xl':
        return 'w-64 h-64'
      default:
        return 'w-32 h-32'
    }
  }

  const renderMonsterVisual = (): React.ReactNode => {
    // Si c'est du SVG en ligne (commence par <svg)
    if (draw.startsWith('<svg')) {
      return (
        <div
          className='w-full h-full flex items-center justify-center'
          dangerouslySetInnerHTML={{ __html: draw }}
        />
      )
    }

    // Si c'est un chemin vers un fichier (commence par / ou http)
    if (draw.startsWith('/') || draw.startsWith('http')) {
      return (
        <img
          src={draw}
          alt={`${name} monster avatar`}
          className='w-full h-full object-contain'
          onError={(e) => {
            // Fallback en cas d'erreur de chargement d'image
            e.currentTarget.style.display = 'none'
            const fallback = e.currentTarget.nextSibling as HTMLElement
            if (fallback != null) {
              fallback.style.display = 'flex'
            }
          }}
        />
      )
    }

    // Si c'est du contenu SVG sans balise ouvrante ou un emoji/texte
    if (draw.includes('<') && draw.includes('>')) {
      return (
        <div
          className='w-full h-full flex items-center justify-center'
          dangerouslySetInnerHTML={{ __html: draw }}
        />
      )
    }

    // Fallback pour emoji ou texte simple
    return (
      <div className='w-full h-full flex items-center justify-center text-4xl font-bold text-blueberry-950 font-tehegan'>
        {draw}
      </div>
    )
  }

  return (
    <div className={`${getSizeClasses(size)} bg-latte-50 rounded-2xl border-2 border-latte-100 flex items-center justify-center p-4 ${className}`}>
      {renderMonsterVisual()}
      {/* Fallback caché qui s'affiche en cas d'erreur d'image */}
      <div
        className='w-full h-full items-center justify-center text-4xl font-bold text-blueberry-950 font-tehegan'
        style={{ display: 'none' }}
      >
        🐾
      </div>
    </div>
  )
}

export default MonsterAvatar