import { connectMongooseToDatabase, connectToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import { type NextRequest } from 'next/server'

const MONSTER_STATES = ['sad', 'angry', 'hungry', 'sleepy']

async function updateMonsterState (monsterId?: string | null): Promise<void> {
  // Logique pour mettre à jour l'état du monstre
  console.log(`Mise à jour de l'état du monstre avec l'ID : ${String(monsterId)}`)

  const randomState = MONSTER_STATES[Math.floor(Math.random() * MONSTER_STATES.length)]
  console.log(`Nouvel état du monstre : ${randomState}`)

  await connectMongooseToDatabase()
  const result = await Monster.updateOne({ _id: monsterId }, { state: randomState }).orFail()
  console.log(`Résultat de la mise à jour en base de données : ${result}`)
}

export async function GET (request: NextRequest): Promise<Response> {
  const id = request.nextUrl.searchParams.get('id')
  try {
    console.log(`Requête reçue pour mettre à jour l'état du monstre avec l'ID : ${id}`)
    await updateMonsterState(id)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'état du monstre :", error)
    return new Response('Failed to update monster state', { status: 500 })
  }
  return new Response('Monster state updated')
}
