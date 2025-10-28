'use server'

import { connectMongooseToDatabase, connectToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import { auth } from '@/lib/auth'
import { CreateMonsterFormValues, MonsterDocument } from '@/types/monster'
import { Types } from 'mongoose'
import { headers } from 'next/headers'

/**
 * Crée un nouveau monstre pour l'utilisateur authentifié
 *
 * Server Action qui :
 * - Vérifie l'authentification
 * - Crée un nouveau monstre dans la base de données
 * - Associe automatiquement l'utilisateur comme propriétaire
 *
 * Respecte le principe SRP : Gère uniquement la création de monstre
 * Respecte le principe DIP : Utilise l'abstraction auth et le modèle Monster
 *
 * @param {CreateMonsterFormValues} monsterData - Données du monstre à créer
 * @throws {Error} Si l'utilisateur n'est pas authentifié
 *
 * @example
 * ```tsx
 * await createMonster({
 *   name: 'Mochi',
 *   draw: '<svg>...</svg>',
 *   level: 1,
 *   state: 'happy',
 *   ownerId: 'user-id'
 * })
 * ```
 */
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

/**
 * Récupère tous les monstres de l'utilisateur authentifié
 *
 * Server Action qui :
 * - Vérifie l'authentification
 * - Récupère tous les monstres appartenant à l'utilisateur
 * - Retourne un tableau vide en cas d'erreur
 *
 * Respecte le principe SRP : Gère uniquement la récupération des monstres
 *
 * @returns {Promise<MonsterDocument[]>} Liste des monstres ou tableau vide
 * @throws Ne propage pas les erreurs, retourne un tableau vide
 *
 * @example
 * ```tsx
 * const monsters = await getMonsters()
 * console.log(`${monsters.length} monstres trouvés`)
 * ```
 */
export async function getMonsters (): Promise<MonsterDocument[]> {
  try {
    await connectMongooseToDatabase()

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

/**
 * Récupère un monstre spécifique par son ID
 *
 * Server Action qui :
 * - Vérifie l'authentification
 * - Vérifie que l'ID est un ObjectId MongoDB valide
 * - Récupère le monstre uniquement s'il appartient à l'utilisateur
 * - Retourne null en cas d'erreur ou si non trouvé
 *
 * Respecte le principe SRP : Gère uniquement la récupération d'un monstre
 *
 * @param {string} id - ID du monstre à récupérer (tableau pour Next.js dynamic routes)
 * @returns {Promise<MonsterDocument | null>} Le monstre trouvé ou null
 *
 * @example
 * ```tsx
 * const monster = await getMonsterById('507f1f77bcf86cd799439011')
 * if (monster) {
 *   console.log(`Monstre ${monster.name} trouvé`)
 * }
 * ```
 */
// export async function getMonsterById (id: string): Promise<MonsterDocument | null> {
//   try {
//     // Connexion à la base de données
//     await connectMongooseToDatabase()

//     // Vérification de l'authentification
//     const session = await auth.api.getSession({
//       headers: await headers()
//     })
//     if (session === null || session === undefined) {
//       throw new Error('User not authenticated')
//     }

//     const { user } = session

//     // Extraction de l'ID depuis le tableau de route dynamique
//     const _id = id

//     // Validation du format ObjectId MongoDB
//     if (!Types.ObjectId.isValid(_id)) {
//       console.error('Invalid monster ID format')
//       return null
//     }

//     // Récupération du monstre avec vérification de propriété
//     const monster = await Monster.findOne({ ownerId: user.id, _id }).exec()

//     // Sérialisation JSON pour éviter les problèmes de typage Next.js
//     return JSON.parse(JSON.stringify(monster))
//   } catch (error) {
//     console.error('Error fetching monster by ID:', error)
//     return null
//   }
// }

// export async function getMonsterById (id: string): Promise<MonsterDocument | null> {
//   try {
//     await connectMongooseToDatabase()

//     const session = await auth.api.getSession({
//       headers: await headers()
//     })
//     if (session === null || session === undefined) throw new Error('User not authenticated')

//     const { user } = session

//     // Extraction de l'ID depuis le tableau de route dynamique
//     const _id = id

//     // Validation du format ObjectId MongoDB
//     if (!Types.ObjectId.isValid(_id)) {
//       console.error('Invalid monster ID format')
//       return null
//     }

//     // Récupération du monstre avec vérification de propriété
//     const monster = await Monster.findOne({ ownerId: user.id, _id }).exec()

//     // Sérialisation JSON pour éviter les problèmes de typage Next.js
//     return JSON.parse(JSON.stringify(monster))
//   } catch (error) {
//     console.error('Error fetching monsters:', error)
//     return null
//   }
// }

/**
 * Récupère un monstre spécifique par son ID
 *
 * Server Action qui :
 * - Vérifie l'authentification
 * - Vérifie que l'ID est un ObjectId MongoDB valide
 * - Récupère le monstre uniquement s'il appartient à l'utilisateur
 * - Retourne null en cas d'erreur ou si non trouvé
 *
 * Respecte le principe SRP : Gère uniquement la récupération d'un monstre
 *
 * @param {string} id - ID du monstre à récupérer (tableau pour Next.js dynamic routes)
 * @returns {Promise<MonsterDocument | null>} Le monstre trouvé ou null
 *
 * @example
 * ```tsx
 * const monster = await getMonsterById('507f1f77bcf86cd799439011')
 * if (monster) {
 *   console.log(`Monstre ${monster.name} trouvé`)
 * }
 * ```
 */
export async function getMonsterById (id: string): Promise<MonsterDocument | null> {
  try {
    await connectToDatabase()
    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (session === null || session === undefined) throw new Error('User not authenticated')
    const { user } = session
    const _id = id[0]
    if (!Types.ObjectId.isValid(_id)) {
      console.error('Invalid monster ID format:', _id)
      return null
    }
    const monster = await Monster.findOne({ _id: id, ownerId: user.id }).exec()
    return monster
  } catch (error) {
    console.error('Error fetching monsters:', error)
    return null
  }
}
