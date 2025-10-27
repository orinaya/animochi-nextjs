# Déploiement sur Vercel

Ce guide explique comment déployer Animochi avec sa documentation Docusaurus sur Vercel.

## Configuration automatique

Le projet est configuré pour un déploiement transparent incluant :

- L'application Next.js principale
- La documentation Docusaurus intégrée
- Le routing automatique vers `/documentation`

## Fichiers de configuration

### vercel.json

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build:all",
  "outputDirectory": ".next",
  "rewrites": [
    {
      "source": "/documentation/:path*",
      "destination": "/documentation/:path*"
    }
  ]
}
```

### package.json (scripts)

```json
{
  "scripts": {
    "build:all": "npm run build && npm run build:docs && npm run merge-outputs"
  }
}
```

## Processus de build

Lors du déploiement, Vercel exécute automatiquement :

1. **`npm run build`** : Build Next.js avec Turbopack

   - Génère `.next/` avec l'application optimisée
   - Compile les Server Components et API Routes

2. **`npm run build:docs`** : Build Docusaurus

   - Génère `documentation/build/` avec la documentation statique
   - Optimise les assets et génère le sitemap

3. **`npm run merge-outputs`** : Fusion des outputs
   - Copie `documentation/build/` vers `public/documentation/`
   - La documentation devient servie comme asset statique Next.js

## Variables d'environnement

Configurez les variables suivantes dans Vercel Dashboard :

### Production

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/animochi
BETTER_AUTH_SECRET=your-production-secret-key
BETTER_AUTH_URL=https://votre-app.vercel.app
NEXT_PUBLIC_APP_URL=https://votre-app.vercel.app
```

### Preview

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/animochi-preview
BETTER_AUTH_SECRET=your-preview-secret-key
BETTER_AUTH_URL=https://preview-branch.vercel.app
NEXT_PUBLIC_APP_URL=https://preview-branch.vercel.app
```

## URLs de la documentation

Après déploiement, la documentation sera accessible à :

- **Production** : `https://votre-app.vercel.app/documentation`
- **Preview** : `https://preview-branch.vercel.app/documentation`
- **Local** : `http://localhost:3000/documentation`

## Déploiement initial

### Via Vercel Dashboard

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New" → "Project"
3. Importez votre repository GitHub
4. Vercel détectera automatiquement Next.js
5. Ajoutez les variables d'environnement
6. Cliquez sur "Deploy"

### Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## Build local de test

Avant de déployer, testez le build complet localement :

```bash
# Build complet
npm run build:all

# Vérifier les fichiers générés
ls -la public/documentation

# Tester en production locale
npm start

# Accéder à http://localhost:3000/documentation
```

## Optimisations Vercel

### Edge Functions (optionnel)

Pour des performances maximales, certaines API Routes peuvent être converties en Edge Functions :

```typescript
// src/app/api/monsters/route.ts
export const runtime = "edge"
```

### ISR (Incremental Static Regeneration)

Les pages peuvent utiliser ISR pour un meilleur cache :

```typescript
// src/app/dashboard/page.tsx
export const revalidate = 60 // Revalide toutes les 60 secondes
```

### Image Optimization

Next.js Image Optimization est automatiquement activé sur Vercel.

## Monitoring

### Analytics

Activez Vercel Analytics dans les settings du projet pour :

- Temps de chargement des pages
- Core Web Vitals
- Métriques utilisateurs réels

### Logs

Consultez les logs de build et runtime dans :

- Dashboard Vercel → Votre projet → Deployments → Logs
- Filtrez par type : Build logs, Runtime logs, Edge logs

## Dépannage

### Build échoue

**Problème** : Le build Docusaurus échoue

```bash
# Vérifier localement
npm run build:docs

# Vérifier les dépendances
cd documentation && npm install
```

**Problème** : Le merge échoue

```bash
# Vérifier que le build existe
ls -la documentation/build

# Réexécuter le merge
npm run merge-outputs
```

### Documentation non accessible

**Vérifier** :

1. Le build complet s'est exécuté : `npm run build:all`
2. Les fichiers existent dans `public/documentation/`
3. Le rewrite est configuré dans `vercel.json`
4. La page `/documentation/page.tsx` redirige correctement

### Performance

Si la documentation est lente :

1. Vérifiez la taille du build : `du -sh documentation/build`
2. Optimisez les images dans `documentation/static/img/`
3. Activez la compression dans `docusaurus.config.ts`

## Mises à jour

### Mettre à jour la documentation

1. Modifiez les fichiers dans `documentation/docs/`
2. Committez et pushez sur GitHub
3. Vercel rebuild automatiquement

### Mettre à jour Docusaurus

```bash
cd documentation
npm update @docusaurus/core @docusaurus/preset-classic
```

## Ressources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Docusaurus Deployment](https://docusaurus.io/docs/deployment)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Support

En cas de problème :

1. Consultez les logs de build Vercel
2. Vérifiez les issues GitHub du projet
3. Contactez le support Vercel si nécessaire
