import Section from '@/components/ui/section'
import BenefitCard from '@/components/ui/benefit-card'
import { benefits } from '@/data'

interface BenefitsSectionProps {
  children?: React.ReactNode
}

export default function BenefitsSection ({ children }: BenefitsSectionProps): React.ReactNode {
  return (
    <Section
      id='benefits'
      title='Pourquoi choisir Animochi ?'
      subtitle='Une expérience unique qui combine nostalgie et innovation pour créer des liens authentiques avec votre compagnon virtuel.'
      className='bg-white'
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </Section>
  )
}
