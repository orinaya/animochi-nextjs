---
sidebar_position: 3
---

# Composants UI

Documentation des composants réutilisables d'Animochi.

## Design System

### Palette de couleurs

Animochi utilise une palette de couleurs thématiques personnalisée :

| Thème          | Usage                                 | Variants |
| -------------- | ------------------------------------- | -------- |
| **Blueberry**  | Couleur principale, actions primaires | 50 à 950 |
| **Strawberry** | Accents, états d'alerte               | 50 à 950 |
| **Peach**      | États positifs, réussites             | 50 à 950 |
| **Latte**      | Fond, textes, neutres                 | 50 à 950 |

### Utilisation dans Tailwind

```tsx
<div className="bg-blueberry-500 text-latte-50">
  <button className="bg-strawberry-400 hover:bg-strawberry-500">Cliquez-moi</button>
</div>
```

## Composants de base

### Button

Bouton réutilisable avec variants et tailles.

#### Props

```typescript
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}
```

#### Exemples

```tsx
import { Button } from '@/components/ui/button'

// Bouton primaire
<Button variant="primary" size="md">
  Créer un monstre
</Button>

// Bouton secondaire
<Button variant="secondary" size="sm">
  Annuler
</Button>

// Bouton fantôme
<Button variant="ghost">
  En savoir plus
</Button>
```

#### Variantes

- **primary** : Action principale (bg-blueberry)
- **secondary** : Action secondaire (bg-strawberry)
- **ghost** : Action discrète (transparent)

#### Tailles

- **sm** : Petit (px-3 py-1.5 text-sm)
- **md** : Moyen (px-4 py-2 text-base)
- **lg** : Grand (px-6 py-3 text-lg)

### Card

Conteneur pour afficher du contenu groupé.

#### Props

```typescript
interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined"
}
```

#### Exemples

```tsx
import {Card} from "@/components/ui/card"

;<Card variant="elevated">
  <h3>Titre de la carte</h3>
  <p>Contenu de la carte</p>
</Card>
```

## Composants Métier

### MonsterCard

Affiche les informations d'un monstre.

#### Props

```typescript
interface MonsterCardProps {
  monster: Monster
  onAction?: (action: MonsterAction) => void
  interactive?: boolean
}
```

#### Exemple

```tsx
import {MonsterCard} from "@/components/monsters/monster-card"

;<MonsterCard monster={myMonster} interactive onAction={(action) => console.log(action)} />
```

#### Structure

```tsx
<MonsterCard>
  <MonsterAvatar />
  <MonsterInfo>
    <MonsterName />
    <MonsterType />
  </MonsterInfo>
  <MonsterStats />
  <MonsterActions />
</MonsterCard>
```

### MonsterAvatar

Avatar du monstre avec image SVG.

#### Props

```typescript
interface MonsterAvatarProps {
  src: string
  alt: string
  size?: "sm" | "md" | "lg" | "xl"
  interactive?: boolean
}
```

#### Exemple

```tsx
import {MonsterAvatar} from "@/components/monsters/monster-avatar"

;<MonsterAvatar src="/assets/images/animals/cat.svg" alt="Chat" size="lg" interactive />
```

### MonsterStats

Affiche les statistiques d'un monstre.

#### Props

```typescript
interface MonsterStatsProps {
  stats: MonsterStats
  variant?: "compact" | "detailed"
}

interface MonsterStats {
  hp: number
  attack: number
  defense: number
  speed: number
}
```

#### Exemple

```tsx
import {MonsterStats} from "@/components/monsters/monster-stats"

;<MonsterStats
  stats={{
    hp: 100,
    attack: 45,
    defense: 30,
    speed: 60,
  }}
  variant="detailed"
/>
```

### MonsterStateBadge

Badge indiquant l'état actuel du monstre.

#### Props

```typescript
interface MonsterStateBadgeProps {
  state: MonsterState
  size?: "sm" | "md"
}

type MonsterState = "asleep" | "hungry" | "happy" | "normal" | "sad"
```

#### Exemple

```tsx
import {MonsterStateBadge} from "@/components/monsters/monster-state-badge"

;<MonsterStateBadge state="hungry" size="md" />
```

#### États et couleurs

- **asleep** : Bleu (blueberry)
- **hungry** : Orange (peach)
- **happy** : Vert
- **normal** : Gris (latte)
- **sad** : Rouge (strawberry)

### MonsterActions

Boutons d'action pour interagir avec un monstre.

#### Props

```typescript
interface MonsterActionsProps {
  monsterId: string
  availableActions: MonsterAction[]
  onAction: (action: MonsterAction) => void
}

type MonsterAction = "feed" | "sleep" | "play" | "train"
```

#### Exemple

```tsx
import {MonsterActions} from "@/components/monsters/monster-actions"

;<MonsterActions
  monsterId="monster-123"
  availableActions={["feed", "play"]}
  onAction={handleAction}
/>
```

## Composants de formulaire

### AuthFormContent

Formulaire d'authentification (inscription/connexion).

#### Props

```typescript
interface AuthFormContentProps {
  mode: "signin" | "signup"
  onSubmit: (data: AuthFormData) => Promise<void>
  error?: string
}
```

#### Exemple

```tsx
import {AuthFormContent} from "@/components/forms/auth-form-content"

;<AuthFormContent mode="signup" onSubmit={handleSignup} error={errorMessage} />
```

### CreateMonsterForm

Formulaire de création de monstre.

#### Props

```typescript
interface CreateMonsterFormProps {
  onSubmit: (data: CreateMonsterData) => Promise<void>
  onCancel: () => void
}

interface CreateMonsterData {
  name: string
  type: MonsterType
  avatar: string
}
```

#### Exemple

```tsx
import {CreateMonsterForm} from "@/components/forms/create-monster-form"

;<CreateMonsterForm onSubmit={handleCreateMonster} onCancel={closeModal} />
```

## Sections

### HeroSection

Section hero de la page d'accueil.

#### Exemple

```tsx
import {HeroSection} from "@/components/sections/hero-section"

;<HeroSection />
```

### MonstersSection

Section affichant la liste des monstres.

#### Props

```typescript
interface MonstersSectionProps {
  monsters: Monster[]
  onMonsterAction?: (monsterId: string, action: MonsterAction) => void
}
```

#### Exemple

```tsx
import {MonstersSection} from "@/components/sections/monsters-section"

;<MonstersSection monsters={userMonsters} onMonsterAction={handleMonsterAction} />
```

## Hooks personnalisés

### useMonsterState

Hook pour gérer l'état d'un monstre.

```typescript
function useMonsterState(monster: Monster) {
  const [state, setState] = useState<MonsterState>("normal")

  useEffect(() => {
    // Logique de calcul de l'état
  }, [monster])

  return state
}
```

#### Utilisation

```tsx
import {useMonsterState} from "@/components/monsters/hooks/use-monster-state"

function MyComponent({monster}) {
  const state = useMonsterState(monster)

  return <MonsterStateBadge state={state} />
}
```

## Patterns de composition

### Composition over inheritance

Les composants complexes sont composés de composants simples :

```tsx
// ✅ Bon : Composition
<MonsterCard>
  <MonsterAvatar />
  <MonsterInfo />
  <MonsterStats />
  <MonsterActions />
</MonsterCard>

// ❌ Mauvais : Tout dans un seul composant
<MonsterCardAll monster={monster} />
```

### Render Props

Pour plus de flexibilité :

```tsx
<MonsterList
  monsters={monsters}
  renderItem={(monster) => <CustomMonsterCard monster={monster} />}
/>
```

## Best Practices

1. **Props explicites** : Toujours définir les interfaces de props
2. **Valeurs par défaut** : Utiliser des valeurs par défaut sensées
3. **Composition** : Favoriser la composition sur l'héritage
4. **Accessibilité** : Ajouter aria-labels et rôles appropriés
5. **Performance** : Utiliser React.memo pour les composants coûteux
6. **Types** : Utiliser TypeScript pour tous les composants

## Ressources

- [Guide Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Next.js App Router](https://nextjs.org/docs/app)
