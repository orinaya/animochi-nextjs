import Button from '@/components/ui/button'
import { type ThemeColor, type MonsterRarity } from '@/types'

interface MonsterCardProps {
  name: string
  description: string
  color: ThemeColor
  emoji: string
  rarity: MonsterRarity
  children?: React.ReactNode
}

function getRarityColor (rarity: string): string {
  switch (rarity) {
    case 'Commun':
      return 'text-latte-700 bg-latte-100 border-latte-200'
    case 'Rare':
      return 'text-blueberry-950 bg-latte-25 border-latte-200'
    case 'Épique':
      return 'text-strawberry-700 bg-strawberry-100 border-strawberry-200'
    case 'Légendaire':
      return 'text-peach-700 bg-peach-100 border-peach-200'
    default:
      return 'text-latte-700 bg-latte-100 border-latte-200'
  }
}

function getCardColor (color: string): string {
  switch (color) {
    case 'blueberry':
      return 'border-latte-200 hover:border-blueberry-950 hover:shadow-md'
    case 'strawberry':
      return 'border-strawberry-200 hover:border-strawberry-300 hover:shadow-strawberry-100'
    case 'peach':
      return 'border-peach-200 hover:border-peach-300 hover:shadow-peach-100'
    case 'latte':
      return 'border-latte-200 hover:border-latte-300 hover:shadow-latte-100'
    default:
      return 'border-latte-200 hover:border-latte-300 hover:shadow-latte-100'
  }
}

export default function MonsterCard ({
  name,
  description,
  color,
  emoji,
  rarity,
  children
}: MonsterCardProps): React.ReactNode {
  return (
    <div
      className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl ${getCardColor(
        color
      )}`}
    >
      <div className='text-center mb-4'>
        <div className='text-6xl mb-2'>{emoji}</div>
        <h3 className='text-xl font-bold text-blueberry-950 mb-1'>{name}</h3>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRarityColor(
            rarity
          )}`}
        >
          {rarity}
        </span>
      </div>
      <p className='opacity-80 text-center mb-4 leading-relaxed'>{description}</p>
      <div className='text-center'>
        <Button size='sm' variant='outline' color={color as 'blueberry' | 'strawberry' | 'latte'}>
          Adopter
        </Button>
      </div>
    </div>
  )
}
