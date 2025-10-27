---
sidebar_position: 2
---

# Architecture du projet

Animochi suit les principes **SOLID**, **Clean Code** et **Clean Architecture** pour garantir maintenabilité, testabilité et évolutivité.

## Vue d'ensemble

```
src/
├── domain/          # Logique métier pure (indépendante des frameworks)
├── application/     # Orchestration et cas d'usage
├── infrastructure/  # Implémentations techniques (DB, API)
└── presentation/    # Interface utilisateur (React/Next.js)
```

## Principes SOLID appliqués

### Single Responsibility Principle (SRP)

Chaque module, composant ou service a **une seule responsabilité**.

**Exemple : Composant Monster Card**

```typescript
// ❌ Mauvais : Composant qui fait tout
function MonsterCard({monster}) {
  const [isHungry, setIsHungry] = useState(false)

  // Logique métier mélangée avec UI
  useEffect(() => {
    const hungerCheck = () => {
      const hoursSinceLastMeal = (Date.now() - monster.lastFed) / 3600000
      setIsHungry(hoursSinceLastMeal > 4)
    }
    hungerCheck()
  }, [monster])

  return <div>...</div>
}

// ✅ Bon : Séparation des responsabilités
function MonsterCard({monster}) {
  const state = useMonsterState(monster) // Hook dédié
  return <MonsterCardView monster={monster} state={state} />
}
```

### Open/Closed Principle (OCP)

Le code est **ouvert à l'extension, fermé à la modification**.

**Exemple : Système de variantes de boutons**

```typescript
// Les variantes sont définies via des fonctions helper
function getButtonVariant(variant: ButtonVariant): string {
  const variants = {
    primary: "bg-blueberry-500 hover:bg-blueberry-600",
    secondary: "bg-strawberry-400 hover:bg-strawberry-500",
    ghost: "bg-transparent hover:bg-latte-100",
  }
  return variants[variant] || variants.primary
}

// Ajouter une nouvelle variante ne modifie pas le composant
```

### Liskov Substitution Principle (LSP)

Les implémentations d'une interface doivent être **interchangeables**.

```typescript
// Interface de repository
interface MonsterRepository {
  findById(id: string): Promise<Monster | null>
  save(monster: Monster): Promise<void>
}

// Implémentation MongoDB
class MongoMonsterRepository implements MonsterRepository {
  async findById(id: string): Promise<Monster | null> {
    return await MonsterModel.findById(id)
  }

  async save(monster: Monster): Promise<void> {
    await MonsterModel.create(monster)
  }
}

// Peut être remplacé par une implémentation en mémoire pour les tests
class InMemoryMonsterRepository implements MonsterRepository {
  // ... même interface, implémentation différente
}
```

### Interface Segregation Principle (ISP)

Préférer **plusieurs interfaces spécifiques** plutôt qu'une interface générale.

```typescript
// ❌ Mauvais : Interface trop large
interface MonsterOperations {
  create(data: CreateMonsterData): Promise<Monster>
  update(id: string, data: UpdateMonsterData): Promise<Monster>
  delete(id: string): Promise<void>
  feed(id: string): Promise<void>
  sleep(id: string): Promise<void>
}

// ✅ Bon : Interfaces ségrégées
interface MonsterReader {
  findById(id: string): Promise<Monster | null>
  findAll(): Promise<Monster[]>
}

interface MonsterWriter {
  create(data: CreateMonsterData): Promise<Monster>
  update(id: string, data: UpdateMonsterData): Promise<Monster>
}

interface MonsterActions {
  feed(id: string): Promise<void>
  sleep(id: string): Promise<void>
}
```

### Dependency Inversion Principle (DIP)

Les modules de haut niveau ne dépendent pas des modules de bas niveau. Les deux dépendent d'**abstractions**.

```typescript
// ❌ Mauvais : Dépendance directe
class MonsterService {
  constructor() {
    this.repository = new MongoMonsterRepository() // Couplage fort
  }
}

// ✅ Bon : Injection de dépendance
class MonsterService {
  constructor(private repository: MonsterRepository) {}

  async getMonster(id: string): Promise<Monster | null> {
    return await this.repository.findById(id)
  }
}

// Utilisation
const repository = new MongoMonsterRepository()
const service = new MonsterService(repository)
```

## Clean Architecture

### Couches de l'application

#### 1. Domain (Métier)

Contient la logique métier pure, sans dépendances externes.

```typescript
// src/domain/entities/Monster.ts
export class Monster {
  constructor(
    public readonly id: string,
    public name: string,
    public type: MonsterType,
    public stats: MonsterStats
  ) {}

  canFeed(): boolean {
    const hoursSinceLastFed = this.getHoursSinceLastFed()
    return hoursSinceLastFed >= 4
  }

  private getHoursSinceLastFed(): number {
    return (Date.now() - this.lastFed) / 3600000
  }
}
```

#### 2. Application (Orchestration)

Coordonne les cas d'usage en appelant le domaine.

```typescript
// src/application/usecases/CreateMonsterUseCase.ts
export class CreateMonsterUseCase {
  constructor(private repository: MonsterRepository, private validator: MonsterValidator) {}

  async execute(command: CreateMonsterCommand): Promise<Result<Monster>> {
    const validation = this.validator.validate(command)
    if (!validation.isValid) {
      return Result.fail(validation.errors)
    }

    const monster = Monster.create(command)
    await this.repository.save(monster)
    return Result.ok(monster)
  }
}
```

#### 3. Infrastructure (Technique)

Implémente les détails techniques (base de données, API externes).

```typescript
// src/infrastructure/repositories/MongoMonsterRepository.ts
export class MongoMonsterRepository implements MonsterRepository {
  async save(monster: Monster): Promise<void> {
    await MonsterModel.create({
      _id: monster.id,
      name: monster.name,
      type: monster.type,
      stats: monster.stats,
    })
  }
}
```

#### 4. Presentation (UI)

Interface utilisateur React/Next.js.

```typescript
// src/components/monsters/monster-card.tsx
export function MonsterCard({monster}: MonsterCardProps) {
  return (
    <div className="monster-card">
      <MonsterAvatar src={monster.avatar} />
      <MonsterStats stats={monster.stats} />
    </div>
  )
}
```

## Flux de dépendances

```
Infrastructure → Application → Domain ← Presentation
```

Les couches externes dépendent des couches internes, **jamais l'inverse**.

## Patterns utilisés

### Repository Pattern

Abstraction de l'accès aux données.

```typescript
interface MonsterRepository {
  findById(id: string): Promise<Monster | null>
  findAll(): Promise<Monster[]>
  save(monster: Monster): Promise<void>
  delete(id: string): Promise<void>
}
```

### Result Pattern

Gestion des erreurs sans exceptions.

```typescript
type Result<T, E = Error> = {ok: true; value: T} | {ok: false; error: E}

export function validateEmail(email: string): Result<string, "invalid-format"> {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
    ? {ok: true, value: email.trim().toLowerCase()}
    : {ok: false, error: "invalid-format"}
}
```

### Factory Pattern

Création d'entités complexes.

```typescript
export class MonsterFactory {
  static create(command: CreateMonsterCommand): Monster {
    return new Monster(
      generateId(),
      command.name,
      command.type,
      this.generateInitialStats(command.type)
    )
  }

  private static generateInitialStats(type: MonsterType): MonsterStats {
    // Logique de génération des stats selon le type
  }
}
```

## Best Practices

### Nommage

- **Composants** : PascalCase descriptif (`MonsterCard`, `HeroSection`)
- **Fonctions** : camelCase avec verbe (`formatDisplayName`, `validateEmail`)
- **Fichiers** : kebab-case (`monster-card.tsx`, `use-monster-state.ts`)

### Fonctions pures

Privilégier les fonctions sans effets de bord :

```typescript
// ✅ Fonction pure
function calculateDamage(attack: number, defense: number): number {
  return Math.max(1, attack - defense)
}

// ❌ Fonction avec effet de bord
function calculateDamage(monster: Monster, target: Monster): number {
  const damage = Math.max(1, monster.attack - target.defense)
  target.hp -= damage // Mutation !
  return damage
}
```

### Tests

Chaque use case doit avoir son test unitaire :

```typescript
describe("CreateMonsterUseCase", () => {
  it("should create a monster with valid data", async () => {
    const repository = new InMemoryMonsterRepository()
    const useCase = new CreateMonsterUseCase(repository)

    const result = await useCase.execute({
      name: "Pikachu",
      type: "electric",
    })

    expect(result.ok).toBe(true)
    expect(result.value.name).toBe("Pikachu")
  })
})
```

## Conclusion

Cette architecture garantit :

- ✅ **Maintenabilité** : Code facile à modifier
- ✅ **Testabilité** : Isolation des dépendances
- ✅ **Évolutivité** : Ajout de fonctionnalités sans régression
- ✅ **Lisibilité** : Code auto-documenté
