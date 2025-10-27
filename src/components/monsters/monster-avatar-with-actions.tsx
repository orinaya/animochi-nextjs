'use client'

import { useState, useEffect } from 'react'
import MonsterAvatar from './monster-avatar'
import type { MonsterAction } from '@/types/monster-actions'

interface MonsterAvatarWithActionsProps {
  draw: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  activeAction?: MonsterAction | null
}

interface EmojiParticle {
  id: number
  emoji: string
  x: number
  y: number
  rotation: number
  delay: number
}

const ACTION_EMOJIS: Record<MonsterAction, string[]> = {
  feed: ['🍎', '🍏', '🍊', '🍌', '🍇'],
  comfort: ['💝', '💖', '💗', '💓', '💕'],
  hug: ['🤗', '🫂', '❤️', '💛', '💚'],
  wake: ['⏰', '⏱️', '☀️', '🌟', '✨']
}

function MonsterAvatarWithActions ({
  draw,
  name,
  size = 'md',
  className = '',
  activeAction = null
}: MonsterAvatarWithActionsProps): React.ReactNode {
  const [particles, setParticles] = useState<EmojiParticle[]>([])

  useEffect(() => {
    if (activeAction !== null && activeAction !== undefined) {
      const emojis = ACTION_EMOJIS[activeAction]
      const newParticles: EmojiParticle[] = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        delay: i * 0.1
      }))

      setParticles(newParticles)

      // Nettoyer les particules après l'animation
      const timeout = setTimeout(() => {
        setParticles([])
      }, 2000)

      return () => { clearTimeout(timeout) }
    }
  }, [activeAction])

  return (
    <div className={`relative ${className}`}>
      <MonsterAvatar
        draw={draw}
        name={name}
        size={size}
      />

      {/* Particules d'emojis */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className='absolute pointer-events-none animate-emoji-float'
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.rotation}deg)`,
            animationDelay: `${particle.delay}s`
          }}
        >
          <span className='text-2xl sm:text-3xl'>
            {particle.emoji}
          </span>
        </div>
      ))}
    </div>
  )
}

export default MonsterAvatarWithActions
