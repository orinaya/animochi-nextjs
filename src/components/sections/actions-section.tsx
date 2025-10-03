import Section from '@/components/ui/section'
import ActionCard from '@/components/ui/action-card'
import { gameActions } from '@/data'

interface ActionsSectionProps {
  children?: React.ReactNode
}

export default function ActionsSection ({ children }: ActionsSectionProps): React.ReactNode {
  return (
    <Section
      id='actions'
      title='Prendre soin de votre compagnon'
      subtitle="Découvrez toutes les façons d'interagir avec votre créature pour la garder heureuse et en bonne santé."
      className='bg-white'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {gameActions.map((action) => (
          <ActionCard
            key={action.id}
            title={action.title}
            description={action.description}
            icon={action.icon}
            color={action.color}
          />
        ))}
      </div>
    </Section>
  )
}
