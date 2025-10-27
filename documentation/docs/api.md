---
sidebar_position: 4
---

# API & Services

Documentation des endpoints API et services d'Animochi.

## Architecture API

Animochi utilise les **API Routes** de Next.js 15 avec l'App Router.

### Structure

```
src/app/api/
├── auth/
│   ├── [...all]/route.ts    # Better Auth endpoints
│   └── session/route.ts     # Session management
└── monsters/
    ├── route.ts             # GET /api/monsters (liste)
    │                        # POST /api/monsters (création)
    └── [id]/
        ├── route.ts         # GET /api/monsters/:id
        │                    # PUT /api/monsters/:id
        │                    # DELETE /api/monsters/:id
        └── actions/
            └── route.ts     # POST /api/monsters/:id/actions
```

## Authentication

### Better Auth

Animochi utilise [Better Auth](https://www.better-auth.com/) pour l'authentification.

#### Configuration

```typescript
// src/lib/auth.ts
import {betterAuth} from "better-auth"
import {mongodbAdapter} from "better-auth/adapters/mongodb"

export const auth = betterAuth({
  database: mongodbAdapter(clientPromise),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    },
  },
})
```

#### Endpoints

##### POST /api/auth/sign-up

Inscription d'un nouvel utilisateur.

**Body**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response**

```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "session": {
    "token": "session-token-xxx"
  }
}
```

##### POST /api/auth/sign-in

Connexion d'un utilisateur existant.

**Body**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response**

```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "session": {
    "token": "session-token-xxx",
    "expiresAt": "2025-11-03T10:00:00Z"
  }
}
```

##### POST /api/auth/sign-out

Déconnexion de l'utilisateur.

**Response**

```json
{
  "success": true
}
```

##### GET /api/auth/session

Récupération de la session active.

**Response**

```json
{
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "session": {
    "expiresAt": "2025-11-03T10:00:00Z"
  }
}
```

## Monsters API

### GET /api/monsters

Récupération de la liste des monstres de l'utilisateur connecté.

**Query Parameters**

- `limit` (optional): Nombre de monstres à retourner (défaut: 20)
- `offset` (optional): Offset pour la pagination (défaut: 0)
- `state` (optional): Filtrer par état (asleep, hungry, happy, etc.)

**Response**

```json
{
  "monsters": [
    {
      "id": "monster-123",
      "name": "Pikachu",
      "type": "electric",
      "level": 5,
      "stats": {
        "hp": 100,
        "attack": 55,
        "defense": 40,
        "speed": 90
      },
      "state": "happy",
      "avatar": "/assets/images/animals/mouse.svg",
      "createdAt": "2025-10-20T10:00:00Z",
      "updatedAt": "2025-10-27T08:30:00Z"
    }
  ],
  "total": 5,
  "limit": 20,
  "offset": 0
}
```

### POST /api/monsters

Création d'un nouveau monstre.

**Body**

```json
{
  "name": "Bulbasaur",
  "type": "grass",
  "avatar": "/assets/images/animals/frog.svg"
}
```

**Response**

```json
{
  "monster": {
    "id": "monster-456",
    "name": "Bulbasaur",
    "type": "grass",
    "level": 1,
    "stats": {
      "hp": 80,
      "attack": 40,
      "defense": 50,
      "speed": 45
    },
    "state": "normal",
    "avatar": "/assets/images/animals/frog.svg",
    "createdAt": "2025-10-27T10:00:00Z",
    "updatedAt": "2025-10-27T10:00:00Z"
  }
}
```

### GET /api/monsters/:id

Récupération d'un monstre spécifique.

**Response**

```json
{
  "monster": {
    "id": "monster-123",
    "name": "Pikachu",
    "type": "electric",
    "level": 5,
    "stats": {
      "hp": 100,
      "attack": 55,
      "defense": 40,
      "speed": 90
    },
    "state": "happy",
    "avatar": "/assets/images/animals/mouse.svg",
    "lastFed": "2025-10-27T08:00:00Z",
    "lastSlept": "2025-10-27T00:00:00Z",
    "createdAt": "2025-10-20T10:00:00Z",
    "updatedAt": "2025-10-27T08:30:00Z"
  }
}
```

### PUT /api/monsters/:id

Mise à jour d'un monstre.

**Body**

```json
{
  "name": "Pikachu Shiny",
  "avatar": "/assets/images/animals/mouse-shiny.svg"
}
```

**Response**

```json
{
  "monster": {
    "id": "monster-123",
    "name": "Pikachu Shiny",
    "avatar": "/assets/images/animals/mouse-shiny.svg"
    // ... autres champs
  }
}
```

### DELETE /api/monsters/:id

Suppression d'un monstre.

**Response**

```json
{
  "success": true,
  "message": "Monster deleted successfully"
}
```

### POST /api/monsters/:id/actions

Exécution d'une action sur un monstre.

**Body**

```json
{
  "action": "feed"
}
```

**Actions disponibles**

- `feed`: Nourrir le monstre
- `sleep`: Faire dormir le monstre
- `play`: Jouer avec le monstre
- `train`: Entraîner le monstre

**Response**

```json
{
  "monster": {
    "id": "monster-123",
    "name": "Pikachu",
    "state": "happy",
    "lastFed": "2025-10-27T10:30:00Z"
    // ... autres champs mis à jour
  },
  "effect": {
    "type": "state_change",
    "from": "hungry",
    "to": "happy",
    "message": "Pikachu est rassasié et heureux !"
  }
}
```

## Services

### MonsterService

Service métier pour la gestion des monstres.

```typescript
// src/services/monster.service.ts
export class MonsterService {
  constructor(private repository: MonsterRepository) {}

  async createMonster(data: CreateMonsterData): Promise<Monster> {
    // Validation
    const validation = validateMonsterData(data)
    if (!validation.isValid) {
      throw new ValidationError(validation.errors)
    }

    // Génération des stats initiales
    const stats = this.generateInitialStats(data.type)

    // Création
    const monster = {
      ...data,
      level: 1,
      stats,
      state: "normal" as MonsterState,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return await this.repository.save(monster)
  }

  async feedMonster(id: string): Promise<Monster> {
    const monster = await this.repository.findById(id)
    if (!monster) {
      throw new NotFoundError("Monster not found")
    }

    // Vérifier si le monstre peut être nourri
    if (!this.canFeed(monster)) {
      throw new BusinessError("Monster is not hungry yet")
    }

    // Mettre à jour l'état
    monster.state = "happy"
    monster.lastFed = new Date()
    monster.updatedAt = new Date()

    return await this.repository.update(id, monster)
  }

  private canFeed(monster: Monster): boolean {
    const hoursSinceLastFed = (Date.now() - monster.lastFed.getTime()) / 3600000
    return hoursSinceLastFed >= 4
  }

  private generateInitialStats(type: MonsterType): MonsterStats {
    // Logique de génération selon le type
    const baseStats = {
      fire: {hp: 90, attack: 60, defense: 40, speed: 65},
      water: {hp: 100, attack: 50, defense: 50, speed: 55},
      grass: {hp: 80, attack: 40, defense: 60, speed: 45},
      electric: {hp: 85, attack: 55, defense: 35, speed: 90},
    }

    return baseStats[type] || baseStats.fire
  }
}
```

### AuthService

Service d'authentification wrapper pour Better Auth.

```typescript
// src/services/auth.service.ts
export class AuthService {
  async signUp(email: string, password: string, name: string) {
    const result = await authClient.signUp.email({
      email,
      password,
      name,
    })

    if (result.error) {
      throw new AuthError(result.error.message)
    }

    return result.data
  }

  async signIn(email: string, password: string) {
    const result = await authClient.signIn.email({
      email,
      password,
    })

    if (result.error) {
      throw new AuthError(result.error.message)
    }

    return result.data
  }

  async getSession() {
    const session = await authClient.getSession()
    return session.data
  }
}
```

## Gestion des erreurs

### Types d'erreurs

```typescript
export class AppError extends Error {
  constructor(public message: string, public code: string, public statusCode: number) {
    super(message)
  }
}

export class ValidationError extends AppError {
  constructor(public errors: Record<string, string[]>) {
    super("Validation failed", "VALIDATION_ERROR", 400)
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, "NOT_FOUND", 404)
  }
}

export class AuthError extends AppError {
  constructor(message: string) {
    super(message, "AUTH_ERROR", 401)
  }
}

export class BusinessError extends AppError {
  constructor(message: string) {
    super(message, "BUSINESS_ERROR", 400)
  }
}
```

### Format de réponse d'erreur

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "name": ["Name is required"],
      "type": ["Invalid monster type"]
    }
  }
}
```

## Rate Limiting

### Configuration (à implémenter)

```typescript
// Limites recommandées
const rateLimits = {
  auth: {
    signUp: "5 per 1h",
    signIn: "10 per 15m",
  },
  monsters: {
    create: "10 per 1h",
    update: "30 per 1h",
    actions: "60 per 1h",
  },
}
```

## Webhooks (futur)

### POST /api/webhooks/monster-evolved

Notifie lorsqu'un monstre évolue.

**Payload**

```json
{
  "event": "monster.evolved",
  "timestamp": "2025-10-27T10:30:00Z",
  "data": {
    "monsterId": "monster-123",
    "previousLevel": 4,
    "newLevel": 5,
    "newStats": {
      "hp": 110,
      "attack": 60,
      "defense": 45,
      "speed": 95
    }
  }
}
```

## Best Practices

1. **Validation** : Toujours valider les données entrantes
2. **Authentification** : Vérifier la session sur chaque endpoint protégé
3. **Pagination** : Limiter les résultats avec limit/offset
4. **Caching** : Utiliser le cache pour les données peu changeantes
5. **Logging** : Logger toutes les erreurs et actions importantes
6. **Versioning** : Préfixer les routes avec /v1, /v2, etc. (futur)

## Ressources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [MongoDB avec Mongoose](https://mongoosejs.com/)
