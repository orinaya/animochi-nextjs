# 🐾 Animochi - Application de Monstres Virtuels

Une application moderne de créatures virtuelles développée avec Next.js 15 et React 19, dans le cadre du projet fil rouge M1 DevFront.

## 🎯 Vue d'ensemble

Animochi est une plateforme interactive permettant aux utilisateurs de découvrir, collectionner et interagir avec des créatures virtuelles adorables. L'application propose une expérience utilisateur moderne avec un design system personnalisé et des animations fluides.

## ✨ Fonctionnalités

### 🏠 Page d'accueil

- **Section Hero** : Présentation accueillante avec call-to-action
- **Avantages** : Mise en avant des bénéfices de l'application
- **Galerie de Monstres** : Présentation des créatures avec système de rareté
- **Actions de jeu** : Fonctionnalités principales de l'application
- **Newsletter** : Inscription aux actualités

### 🔐 Authentification

- **Connexion/Inscription** : Interface moderne avec validation
- **Better Auth** : Intégration pour la gestion des utilisateurs
- **Design personnalisé** : Formulaires avec animations et feedback visuel

### 🎨 Design System

- **Palette de couleurs** : 4 couleurs thématiques (blueberry, strawberry, peach, latte)
- **Composants modulaires** : Architecture SOLID et Clean Code
- **Animations** : Transitions fluides et micro-interactions
- **Responsive** : Design adaptatif mobile-first

## 🚀 Technologies

### Frontend

- **Next.js 15.5.4** avec App Router et Turbopack
- **React 19.1.0** avec Server Components
- **TypeScript 5** en mode strict
- **Tailwind CSS 4** avec variables CSS personnalisées

### Backend & Auth

- **Better Auth 1.3.24** pour l'authentification
- **MongoDB 6.20.0** pour la base de données
- **React Icons 5.5.0** pour les icônes

### Développement

- **ts-standard** pour le linting TypeScript
- **Geist Fonts** (Sans & Mono) de Vercel
- **PostCSS** avec support Tailwind CSS 4

## 🛠️ Installation et démarrage

### Prérequis

- Node.js 18+
- npm ou yarn
- MongoDB (local ou cloud)

### Installation

```bash
# Cloner le repository
git clone https://github.com/orinaya/animochi-nextjs.git
cd animochi-nextjs

# Installer les dépendances
npm install

# Démarrer le serveur de développement avec Turbopack
npm run dev
```

### Scripts disponibles

```bash
npm run dev           # Développement avec Turbopack (plus rapide)
npm run dev:docs      # Développement de la documentation Docusaurus
npm run build         # Build de production avec Turbopack
npm run build:docs    # Build de la documentation Docusaurus
npm run build:all     # Build complet (Next.js + Docusaurus + merge)
npm run start         # Démarrage en production
npm run lint          # Linting avec auto-fix (ts-standard)
```

## 📁 Architecture du projet

```
src/
├── app/                    # App Router Next.js
│   ├── globals.css        # Styles globaux et variables CSS
│   ├── layout.tsx         # Layout principal avec métadonnées
│   ├── page.tsx           # Page d'accueil
│   └── documentation/     # Redirection vers docs Docusaurus
├── components/
│   ├── forms/             # Composants de formulaires
│   │   ├── auth-form-content.tsx
│   │   ├── signin-form.tsx
│   │   └── signup-form.tsx
│   ├── sections/          # Sections de la page d'accueil
│   │   ├── hero-section.tsx
│   │   ├── benefits-section.tsx
│   │   ├── monsters-section.tsx
│   │   ├── actions-section.tsx
│   │   └── newsletter-section.tsx
│   ├── ui/                # Composants UI réutilisables
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── error-message.tsx
│   │   └── floating-monster.tsx
│   ├── header.tsx         # En-tête de navigation
│   └── footer.tsx         # Pied de page
├── data/                  # Données statiques
│   ├── benefits.ts
│   ├── monsters.ts
│   └── actions.ts
├── services/              # Logique métier (prévu pour évolution)
└── types/                 # Types TypeScript
    └── index.ts

documentation/             # Documentation Docusaurus 3.9
├── docs/                  # Pages de documentation
│   ├── intro.md          # Introduction
│   ├── getting-started.md # Guide de démarrage
│   ├── architecture.md   # Architecture SOLID/Clean
│   ├── components.md     # Documentation composants
│   └── api.md            # Documentation API
├── src/                   # Code source Docusaurus
├── static/                # Assets statiques
└── docusaurus.config.ts   # Configuration

public/
├── animochi-favicon.svg   # Favicon personnalisé
├── manifest.json          # Manifest PWA
└── documentation/         # Build Docusaurus (généré)
```

## 🎨 Design System

### Couleurs principales

- **Blueberry** (`#190933`) : Couleur principale pour textes et éléments importants
- **Strawberry** (`#ee9e8e`) : Couleur d'accent et actions
- **Peach** (`#ffdbc3`) : Couleur secondaire et fond doux
- **Latte** (`#fff5e0`) : Couleur de fond et éléments neutres

### Composants

- **Button** : 4 variants × 4 couleurs avec animations
- **Input** : Labels flottants et validation visuelle
- **Card** : Containers modulaires avec variants
- **Monster Cards** : Système de rareté avec badges colorés

## 🎯 Principes de développement

### Architecture

- **SOLID** : Respect des 5 principes SOLID
- **Clean Code** : Code lisible et maintenable
- **Clean Architecture** : Séparation des responsabilités
- **Component-Driven** : Développement par composants

### Standards

- **TypeScript strict** : Types explicites et sécurité
- **ts-standard** : Linting automatique sans ESLint
- **Mobile-first** : Design responsive prioritaire
- **Performance** : Turbopack et optimisations Next.js

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env.local` :

```env
# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/animochi

# Better Auth (à configurer)
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

### Favicon

Le favicon SVG personnalisé est configuré dans `layout.tsx` et situé dans `public/animochi-favicon.svg`.

## 📖 Documentation

### Documentation complète

La documentation complète est disponible via **Docusaurus 3.9** et accessible à :

- **Développement** : `http://localhost:3000/documentation` (après `npm run dev:docs`)
- **Production** : `https://votre-app.vercel.app/documentation`

#### Sections disponibles

- **Introduction** : Vue d'ensemble du projet
- **Guide de démarrage** : Installation et premiers pas
- **Architecture** : Principes SOLID, Clean Code et Clean Architecture
- **Composants** : Documentation complète des composants UI
- **API** : Documentation des endpoints et services

#### Développer la documentation

```bash
# Lancer en développement
npm run dev:docs

# Build de la documentation
npm run build:docs
```

### Ressources du projet

- **Spécifications** : Voir `specs/M1dfs – Fil Rouge Next.pdf`
- **Instructions IA** : `.github/copilot-instructions.md`

### Ressources Next.js

- [Documentation Next.js](https://nextjs.org/docs)
- [Tutorial interactif](https://nextjs.org/learn)
- [Repository GitHub](https://github.com/vercel/next.js)

## 🚀 Déploiement

### Vercel (recommandé)

Le projet est configuré pour un déploiement automatique sur Vercel incluant la documentation Docusaurus.

#### Configuration automatique

Le fichier `vercel.json` et les scripts npm gèrent automatiquement :

1. Build de l'application Next.js
2. Build de la documentation Docusaurus
3. Fusion des outputs dans `public/documentation`

#### Déploiement

```bash
# Via Vercel CLI
npm i -g vercel
vercel

# Ou via GitHub
# Connectez simplement votre repo à Vercel
```

La documentation sera automatiquement accessible sur `/documentation`.

#### Scripts de build pour Vercel

Le build complet s'exécute via :

```bash
npm run build:all
```

Ce script exécute dans l'ordre :

1. `npm run build` - Build Next.js
2. `npm run build:docs` - Build Docusaurus
3. `npm run merge-outputs` - Copie la doc dans public/

### Autres plateformes

Voir la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

## 👥 Contribution

Ce projet est développé dans le cadre du M1 DevFront. Les contributions suivent les principes SOLID et Clean Code établis.

---

**Animochi** - _Découvrez un monde de créatures magiques_ 🌟
