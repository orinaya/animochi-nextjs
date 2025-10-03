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
