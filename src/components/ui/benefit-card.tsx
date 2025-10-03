import { type Benefit } from '@/types'

interface BenefitCardProps {
  benefit: Benefit
  children?: React.ReactNode
}

function getBenefitColor (color: string): string {
  switch (color) {
    case 'blueberry':
      return 'bg-latte-25 border-latte-100 bg-blueberry-950'
    case 'strawberry':
      return 'bg-strawberry-50 border-strawberry-100 bg-strawberry-500'
    case 'peach':
      return 'bg-peach-50 border-peach-100 bg-peach-500'
    case 'latte':
      return 'bg-latte-50 border-latte-100 bg-latte-500'
    default:
      return 'bg-latte-50 border-latte-100 bg-latte-500'
  }
}

export default function BenefitCard ({ benefit, children }: BenefitCardProps): React.ReactNode {
  const colorClasses = getBenefitColor(benefit.color)
  const [bgClass, borderClass, iconBgClass] = colorClasses.split(' ')

  return (
    <div
      className={`text-center p-8 rounded-3xl ${bgClass} border ${borderClass} shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105`}
    >
      <div
        className={`w-20 h-20 ${iconBgClass} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md`}
      >
        <span className='text-3xl text-white'>{benefit.icon}</span>
      </div>
      <h3 className='text-xl font-bold text-blueberry-950 mb-4'>{benefit.title}</h3>
      <p className='text-latte-700 leading-relaxed'>{benefit.description}</p>
    </div>
  )
}
