'use server'

import { connectToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import { auth } from '@/lib/auth'
import { CreateMonsterFormValues } from '@/types/monster'
import { headers } from 'next/headers'

export async function createMonster (monsterData: CreateMonsterFormValues): Promise<void> {
  await connectToDatabase()

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session === null || session === undefined) throw new Error('User not authenticated')

  console.log(session)
  console.log(monsterData)

  const monster = new Monster({
    ...monsterData,
    ownerId: session.user.id
  })

  await monster.save()
}

export async function getMonsters (): Promise<Monster[]> {
  try {
    await connectToDatabase()

    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (session === null || session === undefined) throw new Error('User not authenticated')

    const { user } = session

    const monsters = await Monster.find({ ownerId: user.id }).exec()
    return monsters
  } catch (error) {
    console.error('Error fetching monsters:', error)
    return []
  }
}
