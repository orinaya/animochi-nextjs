---
sidebar_position: 5
---

# Guide de démarrage

Guide pas à pas pour démarrer avec Animochi en tant que développeur.

## Prérequis

Avant de commencer, assurez-vous d'avoir :

- **Node.js 20+** installé ([télécharger](https://nodejs.org/))
- **npm** ou **yarn** comme gestionnaire de packages
- **MongoDB** (local ou Atlas) pour la base de données
- Un éditeur de code (**VS Code** recommandé)

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/orinaya/animochi-nextjs.git
cd animochi-nextjs
```

### 2. Installer les dépendances

```bash
npm install
```

Cela installera toutes les dépendances nécessaires :

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- MongoDB & Mongoose
- Better Auth
- Et plus encore...

### 3. Configuration de l'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Base de données MongoDB
MONGODB_URI=mongodb://localhost:27017/animochi
# ou pour MongoDB Atlas :
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/animochi

# Better Auth
BETTER_AUTH_SECRET=votre-secret-super-securise-ici
BETTER_AUTH_URL=http://localhost:3000

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Générer un secret sécurisé

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Configuration MongoDB

#### Option A : MongoDB Local

```bash
# macOS (avec Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Vérifier que MongoDB tourne
mongosh
```

#### Option B : MongoDB Atlas (Cloud)

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un cluster gratuit
3. Créez un utilisateur de base de données
4. Ajoutez votre IP à la liste blanche
5. Copiez la connection string dans `.env.local`

### 5. Initialiser la base de données

```bash
# Le projet créera automatiquement les collections au premier lancement
npm run dev
```

## Lancer l'application

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build de production

```bash
npm run build
npm start
```

## Structure du projet

```
animochi-nextjs/
├── src/
│   ├── app/              # App Router Next.js
│   │   ├── api/          # API Routes
│   │   ├── dashboard/    # Page tableau de bord
│   │   ├── creature/     # Pages détail créature
│   │   ├── sign-in/      # Page connexion
│   │   ├── layout.tsx    # Layout racine
│   │   └── page.tsx      # Page d'accueil
│   ├── components/       # Composants réutilisables
│   │   ├── ui/           # Composants UI de base
│   │   ├── forms/        # Formulaires
│   │   ├── monsters/     # Composants liés aux monstres
│   │   └── sections/     # Sections de pages
│   ├── db/               # Configuration MongoDB
│   │   ├── index.ts      # Connexion DB
│   │   └── models/       # Modèles Mongoose
│   ├── lib/              # Utilitaires
│   │   ├── auth.ts       # Configuration Better Auth
│   │   └── auth-client.ts # Client auth côté front
│   ├── types/            # Types TypeScript
│   └── services/         # Logique métier (à développer)
├── public/               # Assets statiques
│   ├── assets/
│   │   ├── images/       # Images SVG
│   │   └── fonts/        # Polices personnalisées
│   └── favicon/          # Favicons
├── documentation/        # Documentation Docusaurus
├── docs/                 # Documentation markdown
├── scripts/              # Scripts utilitaires
└── specs/                # Spécifications
```

## Premier pas : Créer un monstre

### 1. Créer un compte

Allez sur [http://localhost:3000/sign-in](http://localhost:3000/sign-in) et créez un compte.

### 2. Accéder au Dashboard

Une fois connecté, vous serez redirigé vers le dashboard.

### 3. Créer votre premier monstre

Cliquez sur "Créer un monstre" et remplissez le formulaire :

- **Nom** : Choisissez un nom unique
- **Type** : Sélectionnez parmi fire, water, grass, electric
- **Avatar** : Choisissez un avatar SVG

### 4. Interagir avec votre monstre

- **Nourrir** : Donne à manger à votre monstre
- **Dormir** : Met votre monstre au lit
- **Jouer** : Joue avec votre monstre
- **Entraîner** : Augmente les stats

## Développement

### Créer un nouveau composant

```tsx
// src/components/ui/my-component.tsx
import type React from "react"

interface MyComponentProps {
  title: string
  children: React.ReactNode
}

export function MyComponent({title, children}: MyComponentProps) {
  return (
    <div className="p-4 bg-latte-50 rounded-lg">
      <h2 className="text-xl font-bold text-blueberry-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  )
}
```

### Créer une nouvelle page

```tsx
// src/app/my-page/page.tsx
import {MyComponent} from "@/components/ui/my-component"

export default function MyPage() {
  return (
    <main className="container mx-auto py-8">
      <MyComponent title="Ma nouvelle page">
        <p>Contenu de ma page</p>
      </MyComponent>
    </main>
  )
}
```

### Créer un nouveau modèle

```typescript
// src/db/models/my-model.ts
import mongoose from "mongoose"

const myModelSchema = new mongoose.Schema({
  name: {type: String, required: true},
  value: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now},
})

export const MyModel = mongoose.models.MyModel || mongoose.model("MyModel", myModelSchema)
```

### Créer une API Route

```typescript
// src/app/api/my-endpoint/route.ts
import {NextResponse} from "next/server"

export async function GET() {
  try {
    const data = {message: "Hello from API"}
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500})
  }
}
```

## Scripts disponibles

```bash
# Développement avec Turbopack
npm run dev

# Développement de la documentation
npm run dev:docs

# Build de production
npm run build

# Build de la documentation
npm run build:docs

# Build complet (app + docs)
npm run build:all

# Démarrer en production
npm start

# Linter le code
npm run lint
```

## Debugging

### VS Code

Créez `.vscode/launch.json` :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### React DevTools

Installez l'extension [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) pour Chrome/Firefox.

### MongoDB Compass

Utilisez [MongoDB Compass](https://www.mongodb.com/products/compass) pour visualiser et gérer vos données MongoDB.

## Tests

### Configuration Jest (à venir)

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

### Exemple de test

```typescript
// src/components/__tests__/button.test.tsx
import {render, screen} from "@testing-library/react"
import {Button} from "@/components/ui/button"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("handles click events", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByText("Click me").click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Problèmes courants

### Port 3000 déjà utilisé

```bash
# Trouver le processus
lsof -ti:3000

# Tuer le processus
kill -9 <PID>

# Ou utiliser un autre port
PORT=3001 npm run dev
```

### Erreur de connexion MongoDB

Vérifiez que :

1. MongoDB est démarré : `brew services list` (macOS)
2. L'URI est correct dans `.env.local`
3. Les credentials sont valides (MongoDB Atlas)

### Erreur TypeScript

```bash
# Nettoyer le cache
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

### Problème de hot reload

```bash
# Redémarrer le serveur de dev
npm run dev
```

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://react.dev/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation MongoDB](https://www.mongodb.com/docs/)
- [Documentation Better Auth](https://www.better-auth.com/docs)

## Support

Pour toute question ou problème :

1. Consultez cette documentation
2. Vérifiez les [issues GitHub](https://github.com/orinaya/animochi-nextjs/issues)
3. Créez une nouvelle issue si nécessaire

Bon développement ! 🚀
