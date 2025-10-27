# Architecture du Dashboard - Documentation

## Vue d'ensemble

Le Dashboard a été entièrement refactorisé pour respecter les principes SOLID et Clean Architecture. Chaque composant a une responsabilité unique et bien définie.

## Structure des fichiers

```
src/
├── app/
│   └── dashboard/
│       └── page.tsx                          # Server Component - Point d'entrée
│
├── components/
│   ├── dashboard/
│   │   ├── dashboard-content.tsx             # Client Component - Orchestrateur principal
│   │   ├── dashboard-header.tsx              # Affichage de l'en-tête
│   │   ├── dashboard-actions.tsx             # Boutons d'action
│   │   ├── create-monster-modal.tsx          # Modale de création
│   │   └── hooks/
│   │       ├── index.ts                      # Barrel export
│   │       ├── use-modal.ts                  # Gestion état modal
│   │       ├── use-auth.ts                   # Opérations d'authentification
│   │       ├── use-monster-creation.ts       # Logique de création
│   │       ├── use-escape-key.ts             # Gestion touche Escape
│   │       ├── use-body-scroll-lock.ts       # Blocage scroll
│   │       └── use-backdrop-click.ts         # Clic sur backdrop
│   │
│   ├── forms/
│   │   ├── create-monster-form.tsx           # Formulaire de création
│   │   ├── form-error.tsx                    # Affichage erreurs
│   │   ├── form-actions.tsx                  # Boutons du formulaire
│   │   ├── monster-preview.tsx               # Aperçu du monstre
│   │   ├── hooks/
│   │   │   ├── index.ts
│   │   │   ├── use-monster-form-state.ts     # État du formulaire
│   │   │   └── use-monster-generator.ts      # Génération de monstre
│   │   └── validators/
│   │       └── create-monster-validation.ts  # Validation formulaire
│   │
│   └── monsters/
│       ├── monsters-list.tsx                 # Liste des monstres
│       ├── monsters-list-header.tsx          # En-tête de liste
│       ├── monsters-empty-state.tsx          # État vide
│       ├── monster-card.tsx                  # Carte d'un monstre
│       ├── monster-avatar.tsx                # Avatar du monstre
│       ├── monster-state-badge.tsx           # Badge d'état
│       ├── monster-stats.tsx                 # Statistiques
│       ├── monster-timestamps.tsx            # Dates création/modification
│       ├── monster-actions-buttons.tsx       # Boutons d'action
│       └── utils/
│           ├── index.ts
│           ├── monster-state-helpers.ts      # Helpers pour états
│           ├── date-formatter.ts             # Formatage dates
│           └── monster-id-helper.ts          # Gestion IDs
│
└── actions/
    └── monsters.action.ts                    # Server Actions documentées
```

## Principes SOLID appliqués

### Single Responsibility Principle (SRP)

- **DashboardHeader** : Affiche uniquement l'en-tête
- **DashboardActions** : Gère uniquement les boutons d'action
- **MonsterPreview** : Affiche uniquement l'aperçu
- **FormError** : Affiche uniquement les erreurs
- Chaque hook a une seule responsabilité

### Open/Closed Principle (OCP)

- Composants extensibles via props
- Pas de modification nécessaire pour ajouter des variantes
- Composition plutôt que modification

### Liskov Substitution Principle (LSP)

- Tous les composants respectent leurs contrats d'interface
- Props typées avec TypeScript strict

### Interface Segregation Principle (ISP)

- Interfaces de props ciblées et minimales
- Pas de props inutiles imposées

### Dependency Inversion Principle (DIP)

- Les composants dépendent d'abstractions (hooks)
- Les hooks encapsulent la logique complexe
- Server Actions utilisent des abstractions (auth, models)

## Clean Architecture

### Présentation (UI)

- Composants React purs
- Pas de logique métier
- Orchestration via composition

### Application (Hooks)

- `useModal`, `useAuth`, `useMonsterCreation`
- `useMonsterFormState`, `useMonsterGenerator`
- Gestion d'état et effets de bord

### Domain (Utilities)

- `monster-state-helpers` : Logique métier des états
- `date-formatter` : Transformation de données
- `create-monster-validation` : Règles métier

### Infrastructure (Actions)

- Server Actions pour accès base de données
- Authentification
- Persistance

## Flux de données

```
┌─────────────────────────────────────────────────────────────┐
│ DashboardPage (Server Component)                            │
│ - Récupère session & monstres                               │
│ - Vérifie authentification                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ DashboardContent (Client Component)                         │
│ - Orchestre l'affichage                                     │
│ - Utilise hooks personnalisés                               │
└────┬─────────────┬──────────────┬─────────────┬─────────────┘
     │             │              │             │
     ▼             ▼              ▼             ▼
┌─────────┐  ┌──────────┐  ┌───────────┐  ┌──────────────┐
│ Header  │  │ Actions  │  │ Monsters  │  │ Modal        │
│         │  │          │  │ List      │  │              │
└─────────┘  └──────────┘  └───────────┘  └──────────────┘
                                │
                                ▼
                          ┌──────────────┐
                          │ MonsterCard  │
                          │ (composition)│
                          └──────────────┘
```

## Tests recommandés

### Hooks

- `useModal` : Tester open/close/toggle
- `useMonsterCreation` : Tester soumission et gestion erreurs
- `useMonsterGenerator` : Tester génération et validation

### Composants

- `MonsterCard` : Tester affichage avec différents états
- `MonstersList` : Tester état vide et liste peuplée
- `CreateMonsterForm` : Tester validation et soumission

### Utilities

- `monster-state-helpers` : Tester tous les états possibles
- `date-formatter` : Tester formats valides/invalides
- `validateCreateMonsterForm` : Tester toutes les règles

## Performance

### Optimisations appliquées

- `useCallback` pour stabilité des fonctions
- Découpage en petits composants pour re-renders ciblés
- Server Components pour données initiales
- Client Components uniquement pour interactivité

### Points d'attention

- Éviter prop drilling : utiliser composition
- Mémoïser les calculs lourds si nécessaire
- Lazy load les modales si trop volumineuses

## Évolutions futures

### À court terme

- Ajouter tests unitaires pour tous les hooks
- Implémenter Error Boundaries
- Ajouter loading states plus granulaires

### À moyen terme

- Optimistic updates pour création monstre
- Cache des monstres côté client
- Pagination si liste > 50 monstres

### À long terme

- State management global (Zustand/Jotai) si nécessaire
- WebSocket pour mises à jour temps réel
- Service Worker pour mode offline
