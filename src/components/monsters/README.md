# Monster Card Component

## Vue d'ensemble

Le composant `MonsterCard` affiche toutes les informations détaillées d'un monstre sous forme de carte élégante et interactive.

## Fonctionnalités

### Affichage des informations

- **Nom du monstre** avec l'état émotionnel
- **Représentation visuelle** du monstre (caractère ou emoji)
- **Niveau** avec code couleur selon la progression
- **ID unique** du monstre
- **Dates de création et modification**

### États émotionnels

- 😊 **Happy** (Heureux) - Vert strawberry
- 😢 **Sad** (Triste) - Bleu blueberry
- 😠 **Angry** (Colère) - Orange peach
- 🍎 **Hungry** (Affamé) - Beige latte
- 😴 **Sleepy** (Endormi) - Bleu clair

### Actions disponibles

- **Nourrir** - Bouton rouge strawberry
- **Jouer** - Bouton bleu blueberry
- **Paramètres** - Bouton beige avec icône ⚙️

## Utilisation

```tsx
import {MonsterCard} from "@/components/monsters"

// Dans votre composant
;<MonsterCard
  id="monster_123"
  name="Dracofeu"
  draw="🐲"
  level={15}
  state="happy"
  createdAt="2025-01-15T10:30:00Z"
  updatedAt="2025-01-16T14:20:00Z"
/>
```

## Props

```typescript
interface MonsterCardProps {
  id?: string // ID unique
  _id?: string // ID alternatif (MongoDB)
  name: string // Nom du monstre (requis)
  draw: string // Représentation visuelle (requis)
  level?: number | null // Niveau (défaut: 1)
  state?: MonsterState | string // État émotionnel (défaut: 'happy')
  createdAt?: string // Date de création
  updatedAt?: string // Date de modification
  className?: string // Classes CSS supplémentaires
}
```

## Design System

### Couleurs par niveau

- **1-5** : Bleu blueberry (débutant)
- **6-10** : Rouge strawberry (intermédiaire)
- **11-20** : Orange peach (avancé)
- **21+** : Brun latte (expert)

### Responsive Design

- **Mobile** : Carte pleine largeur
- **Tablet** : 2 colonnes (md:grid-cols-2)
- **Desktop** : 3 colonnes (lg:grid-cols-3)

### Animations

- **Hover** : Ombre augmentée et transition douce
- **States** : Badges colorés avec transitions
- **Boutons** : Effets de survol avec changement de couleur

## Architecture Clean Code

Le composant respecte les principes SOLID :

- **Single Responsibility** : Affichage d'une carte monstre uniquement
- **Open/Closed** : Extensible via props et className
- **Interface Segregation** : Props spécifiques et ciblées
- **Dependency Inversion** : Dépend des types abstraits MonsterState

### Fonctions utilitaires pures

```typescript
// Mapping état → emoji (fonction pure)
const getStateEmoji = (state: MonsterState): string => { ... }

// Mapping état → couleurs CSS (fonction pure)
const getStateColor = (state: MonsterState): string => { ... }

// Formatage de date localisé (fonction pure)
const formatDate = (dateString?: string): string => { ... }
```

## Intégration avec MonstersList

Le composant s'intègre automatiquement avec `MonstersList` :

```tsx
// Dans monsters-list.tsx
{
  monsters.map((monster) => (
    <MonsterCard key={monster.id ?? monster._id ?? monster.name} {...monster} />
  ))
}
```

## Prochaines améliorations

- Actions interactives (nourrir, jouer)
- Progression en temps réel
- Animations des états
- Statistiques détaillées
- Mode édition en place
