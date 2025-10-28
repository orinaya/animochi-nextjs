import { connectMongooseToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function GET (): Promise<Response> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    return new Response('Unauthorized', { status: 401 })
  }

  await connectMongooseToDatabase()
  const monsters = await Monster.find({ ownerId: session.user.id }).exec()

  // Sérialisation JSON pour éviter les problèmes de typage Next.js
  return Response.json(monsters)
}
