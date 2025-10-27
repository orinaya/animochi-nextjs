import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MonsterState } from '@/types/monster'
import MonsterAvatar from './monster-avatar'

interface MonsterCardProps {
  id?: string
  _id?: string
  name: string
  draw: string
  level?: number | null
  state?: MonsterState | string | null
  createdAt?: string
  updatedAt?: string
  className?: string
}

function MonsterCard({
  id,
  _id,
  name,
  draw,
  level = 1,
  state = 'happy',
  createdAt,
  updatedAt,
  className = ''
}: MonsterCardProps): React.ReactNode {
  const monsterId = id ?? _id ?? 'unknown'

  const getStateEmoji = (monsterState: MonsterState | string | null): string => {
    switch (monsterState) {
      case 'happy':
        return '😊'
      case 'sad':
        return '😢'
      case 'angry':
        return '😠'
      case 'hungry':
        return '🍎'
      case 'sleepy':
        return '😴'
      default:
        return '😊'
    }
  }

  const getStateColor = (monsterState: MonsterState | string | null): string => {
    switch (monsterState) {
      case 'happy':
        return 'text-strawberry-500 bg-strawberry-50'
      case 'sad':
        return 'text-blueberry-500 bg-blueberry-50'
      case 'angry':
        return 'text-peach-600 bg-peach-50'
      case 'hungry':
        return 'text-latte-600 bg-latte-50'
      case 'sleepy':
        return 'text-blueberry-400 bg-blueberry-25'
      default:
        return 'text-strawberry-500 bg-strawberry-50'
    }
  }

  const formatDate = (dateString?: string): string => {
    if (dateString == null || dateString === '') return 'Non défini'
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Date invalide'
    }
  }

  const getLevelColor = (monsterLevel: number | null): string => {
    if (monsterLevel == null || monsterLevel <= 0) return 'text-latte-500'
    if (monsterLevel <= 5) return 'text-blueberry-500'
    if (monsterLevel <= 10) return 'text-strawberry-500'
    if (monsterLevel <= 20) return 'text-peach-500'
    return 'text-latte-700'
  }

  return (
    <Card variant='elevated' className={`hover:shadow-xl transition-all duration-300 ${className}`}>
      <CardHeader className='pb-4'>
        <CardTitle className='text-xl font-semibold text-blueberry-950 flex items-center justify-between'>
          <span>{name}</span>
          <span className={`text-2xl ${getStateColor(state)} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2`}>
            {getStateEmoji(state)}
            <span className='capitalize'>{state ?? 'happy'}</span>
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Monster Visual */}
        <div className='flex justify-center mb-6'>
          <MonsterAvatar
            draw={draw}
            name={name}
            size='md'
          />
        </div>

        {/* Monster Stats */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-latte-25 rounded-xl p-3'>
            <div className='text-sm text-latte-600 mb-1'>Niveau</div>
            <div className={`text-2xl font-bold ${getLevelColor(level)}`}>
              {level ?? 1}
            </div>
          </div>

          <div className='bg-latte-25 rounded-xl p-3'>
            <div className='text-sm text-latte-600 mb-1'>ID</div>
            <div className='text-xs text-blueberry-700 font-mono truncate'>
              {monsterId}
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className='space-y-2 pt-2 border-t border-latte-100'>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-latte-600'>Créé le :</span>
            <span className='text-blueberry-700 font-medium'>
              {formatDate(createdAt)}
            </span>
          </div>

          {(updatedAt != null) && (
            <div className='flex justify-between items-center text-sm'>
              <span className='text-latte-600'>Modifié le :</span>
              <span className='text-blueberry-700 font-medium'>
                {formatDate(updatedAt)}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2 pt-4'>
          <button className='flex-1 bg-strawberry-500 hover:bg-strawberry-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200'>
            Nourrir
          </button>
          <button className='flex-1 bg-blueberry-500 hover:bg-blueberry-600 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200'>
            Jouer
          </button>
          <button className='bg-latte-200 hover:bg-latte-300 text-latte-700 font-medium py-2 px-4 rounded-xl transition-colors duration-200'>
            ⚙️
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default MonsterCard
