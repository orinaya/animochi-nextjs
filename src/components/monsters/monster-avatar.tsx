import React from 'react'

/**
 * Props pour le composant MonsterAvatar
 */
interface MonsterAvatarProps {
  /** Représentation visuelle (SVG inline, URL ou emoji) */
  draw: string
  /** Nom du monstre (utilisé pour l'alt text) */
  name: string
  /** Taille de l'avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Classes CSS additionnelles */
  className?: string
}

/**
 * Avatar visuel d'un monstre avec support multi-formats
 *
 * Supporte différents types de représentation :
 * - SVG inline (commence par <svg)
 * - URL d'image (commence par / ou http)
 * - Emoji ou texte simple
 *
 * Respecte le principe SRP : Affiche uniquement l'avatar du monstre
 * Respecte le principe OCP : Gère plusieurs formats via polymorphisme
 *
 * @param {MonsterAvatarProps} props - Les propriétés du composant
 * @returns {React.ReactNode} L'avatar du monstre avec fallback
 *
 * @example
 * ```tsx
 * <MonsterAvatar draw="<svg>...</svg>" name="Mochi" size="lg" />
 * <MonsterAvatar draw="/images/monster.png" name="Pixel" size="md" />
 * <MonsterAvatar draw="🐾" name="Emoji" size="sm" />
 * ```
 */
function MonsterAvatar ({
  draw,
  name,
  size = 'md',
  className = ''
}: MonsterAvatarProps): React.ReactNode {
  /**
   * Retourne les classes CSS Tailwind correspondant à la taille
   *
   * @param {string} avatarSize - Taille de l'avatar (sm, md, lg, xl)
   * @returns {string} Classes CSS pour la taille
   */
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

  /**
   * Rend le visuel du monstre selon le format du draw
   *
   * Gère automatiquement :
   * - SVG inline
   * - URLs d'images avec fallback en cas d'erreur
   * - Emoji/texte simple
   *
   * @returns {React.ReactNode} Le rendu visuel approprié
   */
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
