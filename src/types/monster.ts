import {MonsterRarity} from "."

/**
 * États possibles d'un monstre
 */
export type MonsterState = "happy" | "sad" | "angry" | "hungry" | "sleepy"

/**
 * Interface de base représentant les données essentielles d'un monstre
 *
 * Cette interface contient uniquement les propriétés requises pour définir un monstre,
 * sans les métadonnées de base de données (id, dates).
 */
export interface MonsterData {
  /** Nom unique du monstre */
  name: string
  /** Représentation visuelle (SVG ou URL d'image) */
  draw: string
  /** Niveau du monstre (progression) */
  level: number
  /** État émotionnel actuel */
  state: MonsterState
  /** ID du propriétaire du monstre */
  ownerId: string
}

/**
 * Interface pour la création d'un nouveau monstre
 *
 * Alias de MonsterData pour plus de clarté dans le contexte de création.
 * Utilisé par les formulaires et la validation.
 */
export interface CreateMonsterFormValues extends MonsterData {}

/**
 * Interface représentant un monstre complet stocké en base de données
 *
 * Étend MonsterData avec les métadonnées de persistance :
 * - Identifiants (MongoDB _id et id standard)
 * - Timestamps de création et modification
 */
export interface MonsterDocument extends MonsterData {
  /** ID MongoDB (format ObjectId) */
  _id?: string
  /** ID standard (peut être utilisé côté client) */
  id?: string
  /** Date de création du monstre */
  createdAt?: string
  /** Date de dernière modification */
  updatedAt?: string
}

/**
 * Interface représentant un monstre dans l'interface utilisateur
 *
 * Version du monstre adaptée pour l'affichage :
 * - Propriétés optionnelles pour gérer les états de chargement
 * - Types plus permissifs (string | null) pour compatibilité
 */
export interface Monster {
  /** ID standard (optionnel) */
  id?: string
  /** ID MongoDB (optionnel) */
  _id?: string
  /** Nom du monstre */
  name: string
  /** Description du monstre */
  description?: string
  /** Couleur du monstre */
  color?: string
  /** Emoji représentant le monstre */
  emoji?: string
  /** Représentation visuelle */
  draw?: string
  /** Rareté du monstre */
  rarity?: MonsterRarity | string | null
  /** Niveau du monstre (optionnel pour états de chargement) */
  level?: number | null
  /** État du monstre (optionnel, peut être string pour compatibilité) */
  state?: MonsterState | string | null
  /** ID du propriétaire */
  ownerId?: string
  /** Date de création (format string ISO) */
  createdAt?: string
  /** Date de dernière modification (format string ISO) */
  updatedAt?: string
}

// ============================================================================
// CONSTANTES
// ============================================================================

/** Niveau par défaut lors de la création d'un monstre */
export const DEFAULT_MONSTER_LEVEL = 1

/** État par défaut lors de la création d'un monstre */
export const DEFAULT_MONSTER_STATE: MonsterState = "happy"

/** ID propriétaire temporaire en attente d'authentification */
export const DEFAULT_MONSTER_OWNER_ID = "pending-owner"
