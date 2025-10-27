# Documentation Animochi

Ce site est construit avec [Docusaurus](https://docusaurus.io/), un générateur de sites statiques moderne.

## Installation

```bash
npm install
```

## Développement local

```bash
npm start
```

Cette commande lance un serveur de développement local et ouvre une fenêtre de navigateur. La plupart des modifications sont reflétées en direct sans avoir à redémarrer le serveur.

Ou depuis la racine du projet :

```bash
npm run dev:docs
```

## Build

```bash
npm run build
```

Cette commande génère du contenu statique dans le répertoire `build` qui peut être servi par n'importe quel service d'hébergement de contenu statique.

Ou depuis la racine du projet :

```bash
npm run build:docs
```

## Déploiement

### Déploiement sur Vercel (automatique)

La documentation est automatiquement intégrée au build Next.js principal. Lors du déploiement :

1. `npm run build` - Build Next.js
2. `npm run build:docs` - Build Docusaurus
3. `npm run merge-outputs` - Copie la doc dans `public/documentation`

La documentation sera accessible sur `https://votre-app.vercel.app/documentation/`

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
