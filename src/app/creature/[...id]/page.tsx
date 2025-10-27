import { getMonsterById } from '@/actions/monsters.action'
import ErrorClient from '@/components/error-client'
import { Card, CardContent } from '@/components/ui/card'
import {
  ActionProvider,
  MonsterAvatarInteractive,
  MonsterActionsInteractive
} from '@/components/monsters'
import {
  CreatureHeader,
  CreatureStatsSection,
  CreatureTimestampsSection,
  CreatureIdSection,
  BackToDashboardButton
} from '@/components/creature'
import Link from 'next/link'
import { Button } from '@/components/ui'

/**
 * Page de détail d'une créature
 *
 * Page Server Component qui :
 * - Récupère le monstre par son ID
 * - Affiche toutes les informations détaillées
 * - Permet les interactions (nourrir, jouer, etc.)
 *
 * Respecte le principe SRP : Gère uniquement la logique serveur de la page créature
 * Respecte le principe DIP : Utilise l'abstraction getMonsterById
 *
 * @param {Object} params - Paramètres de la route dynamique
 * @returns {Promise<React.ReactNode>} La page de détail ou une erreur
 *
 * @example
 * Route accessible via /creature/[id]
 */
async function CreaturePage ({
  params
}: {
  params: { id: string }
}): Promise<React.ReactNode> {
  const { id } = await params
  const monster = await getMonsterById(id)

  // Affichage d'une erreur si le monstre n'existe pas
  if (monster === null || monster === undefined) {
    return <ErrorClient error={null} />
  }

  return (
    <ActionProvider>
      <div className='min-h-screen bg-latte-25 py-12 px-4'>
        <div className='max-w-4xl mx-auto'>
          <BackToDashboardButton />

          <Card variant='elevated' className='mb-8'>
            <CreatureHeader monster={monster} />

            <CardContent>
              <div className='flex flex-col lg:flex-row gap-8'>
                {/* Avatar et actions mobile */}
                <div className='flex-shrink-0 flex flex-col items-center gap-6'>
                  <MonsterAvatarInteractive
                    draw={monster.draw}
                    name={monster.name}
                    size='xl'
                    className='shadow-lg'
                  />

                  {/* Actions en version mobile sous l'avatar */}
                  <MonsterActionsInteractive
                    monsterId={id}
                    className='lg:hidden w-full'
                  />
                </div>

                {/* Sections d'informations */}
                <div className='flex-grow space-y-6'>
                  <CreatureStatsSection monster={monster} monsterId={id} />
                  <CreatureTimestampsSection
                    createdAt={monster.createdAt}
                    updatedAt={monster.updatedAt}
                  />
                  <CreatureIdSection id={id} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions en version desktop dans une card séparée */}
          <Card variant='elevated' className='mb-8 hidden lg:block'>
            <CardContent className='pt-6'>
              <MonsterActionsInteractive monsterId={id} />
            </CardContent>
          </Card>

          {/* Bouton de retour principal */}
          <div className='text-center'>
            <Link href='/dashboard'>
              <Button variant='primary' size='lg'>
                Retour à mes créatures
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ActionProvider>
  )
}

export default CreaturePage
