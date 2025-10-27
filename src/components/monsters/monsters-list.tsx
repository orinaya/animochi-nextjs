import MonsterCard from './monster-card'
import type { MonsterState } from '@/types/monster'

interface DashboardMonster {
  id?: string
  _id?: string
  name: string
  draw: string
  level?: number | null
  state?: MonsterState | string | null
  createdAt?: string
  updatedAt?: string
}

function MonstersList ({ monsters }: { monsters: DashboardMonster[] }): React.ReactNode {
  if (monsters === null || monsters === undefined || monsters.length === 0) {
    return (
      <div className='text-center py-12'>
        <div className='text-6xl mb-4'>🐾</div>
        <h3 className='text-xl font-semibold text-blueberry-950 mb-2'>
          Aucun monstre trouvé
        </h3>
        <p className='text-latte-600'>
          Il est temps de créer votre premier compagnon !
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-blueberry-950'>
          Vos Monstres ({monsters.length})
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {monsters.map((monster) => (
          <MonsterCard
            key={monster.id ?? monster._id ?? monster.name}
            {...monster}
          />
        ))}
      </div>
    </div>
  )
}

export default MonstersList
