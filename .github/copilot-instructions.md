# Animochi - Instructions pour Agent IA

## Vue d'ensemble

Animochi est une application Next.js 15 avec React 19, utilisant TypeScript et Tailwind CSS v4. Le projet suit l'architecture App Router de Next.js avec un design system personnalisé basé sur une palette de couleurs thématiques.

## Architecture et Structure

### Structure des fichiers

- `src/app/` - App Router de Next.js (layout, pages)
- `src/components/` - Composants réutilisables (Button, etc.)
- `src/services/` - Services (actuellement vide, prêt pour logique métier)
- `public/` - Assets statiques incluant favicon personnalisé et manifest PWA

### Design System

- **Palette de couleurs personnalisée** : blueberry, strawberry, peach, latte
- Couleurs définies dans `src/app/globals.css` avec système de variants (50-950)
- Convention de nommage : `--color-[theme]-[variant]` (ex: `blueberry-950`, `strawberry-400`)

## Conventions de développement

### Principes fondamentaux

- **SOLID** : Appliquer les 5 principes SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)
- **Clean Code** : Code lisible, maintenable, avec nommage explicite et fonctions courtes
- **Clean Architecture** : Séparation claire des responsabilités, indépendance des frameworks, testabilité

## Application systématique des principes

### SOLID en pratique

- **Single Responsibility** : Un composant, module ou service ne gère qu'une responsabilité métier. Extraire la logique dérivée dans des helpers dédiés (ex: `mapUserToCardProps.ts`).
- **Open/Closed** : Prévoir des variantes via la composition ou des fonctions de mapping (`getVariant`, `createTheme`). Éviter de modifier les implémentations existantes pour ajouter un cas.
- **Liskov Substitution** : Toute implémentation d'une interface doit être interchangeables. Ne jamais restreindre les contrats ni jeter d'erreurs pour des cas supportés par l'interface.
- **Interface Segregation** : Préférer plusieurs interfaces ciblées (`UserReader`, `UserWriter`) plutôt qu'une interface large. Côté UI, séparer les props en groupes cohérents et documenter les props obligatoires.
- **Dependency Inversion** : Les use cases dépendent d'abstractions (`UserRepository`, `AuthGateway`). Injecter les implémentations concrètes dans les couches externes (pages, API routes).

```typescript
// Exemple de respect SRP + DIP
import type { UserRepository } from '@/domain/repositories/user-repository'

export class RegisterUserUseCase {
	constructor(private readonly repository: UserRepository) {}

	async execute(command: RegisterUserCommand): Promise<RegisterUserResult> {
		const user = UserFactory.fromCommand(command)
		await this.repository.save(user)
		return { id: user.id }
	}
}
```

### Clean Code au quotidien

- **Nommage explicite** : Préférer `formatDisplayName` à `formatName`. Les composants exportés doivent décrire leur rôle (`HeroSection`).
- **Fonctions pures et courtes** : Une fonction < 20 lignes, sans effets de bord. Chaîner des helpers plutôt que de créer des blocs monolithiques.
- **Gestion d'erreurs** : Utiliser des `Result` ou `Either` pour propager les échecs attendus. Centraliser les logs dans une infrastructure dédiée.
- **Tests** : Chaque use case/domain service doit disposer d'un test unitaire (`src/domain/__tests__`). Les composants avec logique conditionnelle nécessitent un test de rendu (`react-testing-library`).
- **Commentaire parcimonieux** : Commenter uniquement l'intention lorsque le code ne suffit pas. Pas de commentaires redondants.

```typescript
type Result<T, E = Error> =
	| { ok: true; value: T }
	| { ok: false; error: E }

export function validateEmail(email: string): Result<string, 'invalid-format'> {
	const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return pattern.test(email)
		? { ok: true, value: email.trim().toLowerCase() }
		: { ok: false, error: 'invalid-format' }
}
```

### Clean Architecture dans Animochi

- **Domain** (`src/domain/`) : Entités, value objects, use cases, interfaces (repositories, gateways). Zéro dépendance vers React/Next/Tailwind.
- **Application** (`src/application/`) : DTO, mappers, orchestrateurs appelant les use cases. Traduit le monde extérieur vers le domaine.
- **Infrastructure** (`src/infrastructure/`) : Implémentations concrètes (Prisma, fetch API, local storage). Dépend du domaine via les interfaces.
- **Presentation** (`src/app`, `src/components`, `src/hooks`) : UI et état local. Consomme l'application via interfaces ou hooks dédiés.
- **Flux de dépendances** : Infrastructure → Application → Domain ← Presentation. Les fichiers en couche externe importent uniquement des abstractions des couches internes.

```text
src/
	domain/
		entities/
		usecases/
		repositories/
	application/
		dtos/
		mappers/
		services/
	infrastructure/
		repositories/
		adapters/
	presentation/
		components/
		pages/
		hooks/
```

- **API Routes** : `src/app/api/**` instancie les dépendances, exécute un use case puis retourne un DTO. Aucune logique métier dans la route.
- **Composants** : Les composants server/client appellent des hooks ou services applicatifs. Ne jamais interroger directement la base de données depuis un composant.
- **Services transverses** : Ajouter un dossier `src/shared/` pour les utilitaires purement techniques (formatters, guards) utilisables par toutes les couches.
- **Revue systématique** : Lors de chaque PR, vérifier que les imports respectent le sens des dépendances et que les responsabilités restent isolées.

### TypeScript & Linting

- **Standard de code** : ts-standard (non ESLint standard)
- **Commande de lint** : `npm run lint` (auto-fix activé)
- **Alias de chemin** : `@/*` pointe vers `./src/*`
- Types stricts activés, JSX preserve pour Next.js

### Composants

- Utilise les **React Server Components** par défaut
- **Pattern de props** : interfaces explicites avec valeurs par défaut
- **Exemple** : voir `src/components/button.tsx` pour le pattern size/variant avec fonctions helper

### Styles et UI

- **Tailwind CSS v4** avec `@import "tailwindcss"` moderne
- **Fonts** : Geist Sans/Mono via `next/font/google`
- **Variables CSS** intégrées dans `@theme inline` pour les couleurs personnalisées
- **Responsive** : mobile-first avec breakpoints sm/md/lg

## Commandes de développement

```bash
# Développement avec Turbopack (plus rapide que webpack)
npm run dev

# Build de production avec Turbopack
npm run build

# Démarrage production
npm start

# Linting avec auto-fix
npm run lint
```

## Configuration spécifique

### Métadonnées PWA

- Favicon personnalisé : `/animochi-favicon.svg`
- Manifest PWA configuré dans `layout.tsx`
- Langue par défaut : français (`lang="fr"`)

### Tailwind CSS v4

- Configuration via PostCSS avec `@tailwindcss/postcss`
- Nouveau système @theme inline au lieu du fichier config traditionnel
- Variables CSS natives intégrées avec les couleurs personnalisées

## Patterns à suivre

1. **Composants** : Fonctions helper séparées pour logique conditionnelle (ex: `getSize`, `getVariant`) - respecte le Single Responsibility Principle
2. **Images** : Utiliser `next/image` avec imports SVG statiques pour les logos
3. **Styles** : Combiner classes Tailwind avec variables CSS personnalisées
4. **Types** : Props explicites avec React.ReactNode pour children
5. **Architecture** : Séparer la logique métier (services/) de la présentation (components/) et de la UI (app/)
6. **Fonctions pures** : Privilégier les fonctions sans effets de bord pour la logique métier

## Points d'attention

- Le projet utilise des versions bleeding-edge (Next.js 15, React 19, Tailwind v4)
- Turbopack activé par défaut pour dev et build
- Design system basé sur 4 couleurs thématiques principales
