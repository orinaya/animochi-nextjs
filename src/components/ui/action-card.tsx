import { type ThemeColor } from '@/types'

interface ActionCardProps {
  title: string
  description: string
  icon: string
  color: ThemeColor
  children?: React.ReactNode
}

function getActionColor (color: string): string {
  switch (color) {
    case 'blueberry':
      return 'bg-blueberry-100 text-blueberry-600 group-hover:bg-blueberry-200'
    case 'strawberry':
      return 'bg-strawberry-100 text-strawberry-600 group-hover:bg-strawberry-200'
    case 'peach':
      return 'bg-peach-100 text-peach-600 group-hover:bg-peach-200'
    case 'latte':
      return 'bg-latte-100 text-latte-600 group-hover:bg-latte-200'
    default:
      return 'bg-latte-100 text-latte-600 group-hover:bg-latte-200'
  }
}

export default function ActionCard ({
  title,
  description,
  icon,
  color,
  children
}: ActionCardProps): React.ReactNode {
  return (
    <div className='group bg-white rounded-xl p-6 border border-latte-200 hover:border-latte-300 hover:shadow-lg transition-all duration-300 cursor-pointer'>
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${getActionColor(
          color
        )}`}
      >
        <span className='text-2xl'>{icon}</span>
      </div>
      <h3 className='text-xl font-semibold text-blueberry-950 mb-2'>{title}</h3>
      <p className='opacity-80 leading-relaxed'>{description}</p>
    </div>
  )
}
