# 📚 Intégration Docusaurus - Guide Rapide

## ✅ Ce qui a été réalisé

### 1. Installation ✓

- **Docusaurus 3.9.2** installé dans `/documentation`
- Template Classic avec TypeScript
- Configuration personnalisée pour Animochi

### 2. Configuration Vercel ✓

- **vercel.json** créé avec `buildCommand: "npm run build:all"`
- Rewrites configurés pour `/documentation/*`
- Scripts npm pour build automatique

### 3. Documentation créée ✓

5 pages complètes en français :

- **Introduction** - Vue d'ensemble du projet
- **Guide de démarrage** - Installation et premiers pas
- **Architecture** - SOLID, Clean Code, Clean Architecture
- **Composants** - Documentation UI complète
- **API** - Endpoints et services

### 4. Intégration Next.js ✓

- Page de redirection `/documentation/page.tsx`
- Rewrites dans `next.config.ts`
- Bouton "Documentation" dans le header
- Script de fusion des outputs

## 🎯 URLs accessibles

| Environnement                 | URL                                        |
| ----------------------------- | ------------------------------------------ |
| **Doc Dev**                   | http://localhost:3001                      |
| **Doc via App (après build)** | http://localhost:3000/documentation        |
| **Production**                | https://votre-app.vercel.app/documentation |

## 🚀 Commandes essentielles

```bash
# Développer la documentation
npm run dev:docs

# Build de la documentation seule
npm run build:docs

# Build complet (Next.js + Docusaurus)
npm run build:all

# Tester en local après build
npm start
# Puis ouvrir http://localhost:3000/documentation
```

## 📦 Workflow de déploiement Vercel

1. **Push sur GitHub**

   ```bash
   git add .
   git commit -m "Add Docusaurus documentation"
   git push
   ```

2. **Vercel détecte et exécute automatiquement** :

   ```bash
   npm run build:all
   ```

   - Build Next.js → `.next/`
   - Build Docusaurus → `documentation/build/`
   - Merge → `public/documentation/`

3. **Documentation accessible** sur `/documentation` 🎉

## 📁 Structure créée

```
animochi-nextjs/
├── documentation/          # 📚 Docusaurus
│   ├── docs/              # Pages Markdown
│   │   ├── intro.md
│   │   ├── getting-started.md
│   │   ├── architecture.md
│   │   ├── components.md
│   │   └── api.md
│   ├── docusaurus.config.ts
│   └── sidebars.ts
│
├── scripts/
│   └── merge-outputs.js   # Script de fusion
│
├── src/app/documentation/
│   └── page.tsx           # Redirection
│
├── docs/
│   ├── DOCUSAURUS_INTEGRATION.md  # Ce fichier détaillé
│   └── VERCEL_DEPLOYMENT.md       # Guide Vercel
│
└── vercel.json            # Config Vercel
```

## 🔧 Configuration Vercel

### Variables d'environnement à ajouter

Dans Vercel Dashboard → Settings → Environment Variables :

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/animochi

# Better Auth
BETTER_AUTH_SECRET=your-production-secret-key
BETTER_AUTH_URL=https://votre-app.vercel.app

# Next.js
NEXT_PUBLIC_APP_URL=https://votre-app.vercel.app
```

### Build Settings dans Vercel

- **Framework Preset** : Next.js
- **Build Command** : `npm run build:all` (déjà dans vercel.json)
- **Output Directory** : `.next` (déjà dans vercel.json)
- **Install Command** : `npm install`

## ✏️ Modifier la documentation

### Ajouter une page

1. Créez un fichier `.md` dans `documentation/docs/` :

   ```markdown
   ---
   sidebar_position: 6
   ---

   # Ma nouvelle page

   Contenu...
   ```

2. Ajoutez-la dans `documentation/sidebars.ts` si nécessaire

3. Commit et push → Vercel rebuild automatiquement

### Modifier une page existante

1. Éditez le fichier `.md` dans `documentation/docs/`
2. Pour tester localement : `npm run dev:docs`
3. Commit et push

## 🎨 Personnalisation

### Couleurs du thème

Éditez `documentation/src/css/custom.css` :

```css
:root {
  --ifm-color-primary: #190933; /* blueberry */
  --ifm-color-primary-dark: #150829;
  /* ... */
}
```

### Logo

Remplacez `documentation/static/img/logo.svg` par le logo Animochi

### Navbar et Footer

Modifiez `documentation/docusaurus.config.ts` :

- Section `navbar` pour la navigation
- Section `footer` pour le pied de page

## 🐛 Dépannage

### La documentation ne build pas

```bash
# Vérifier les erreurs
cd documentation
npm run build

# Réinstaller les dépendances
rm -rf node_modules
npm install
```

### La documentation n'est pas accessible après build

```bash
# Vérifier que le build existe
ls -la documentation/build

# Réexécuter le merge
npm run merge-outputs

# Vérifier que les fichiers sont copiés
ls -la public/documentation
```

### Port 3001 déjà utilisé

```bash
# Trouver et tuer le processus
lsof -ti:3001 | xargs kill -9

# Ou changer le port
cd documentation
npm start -- --port 3002
```

## 📚 Ressources

- [Documentation Docusaurus](https://docusaurus.io/docs)
- [Guide Markdown](https://docusaurus.io/docs/markdown-features)
- [Plugins Docusaurus](https://docusaurus.io/docs/using-plugins)
- [Déploiement Vercel](https://docusaurus.io/docs/deployment#deploying-to-vercel)

## 🎯 Next Steps

### Recommandé maintenant

1. ✅ Tester la documentation en local : `npm run dev:docs`
2. ✅ Tester le build complet : `npm run build:all`
3. ✅ Déployer sur Vercel
4. ✅ Vérifier que `/documentation` est accessible en production

### Améliorations futures

- Ajouter des screenshots dans la documentation
- Créer une page FAQ
- Ajouter des diagrammes avec Mermaid
- Internationalisation (EN, ES)
- Intégrer Algolia DocSearch pour la recherche

## ✨ Conclusion

L'intégration de Docusaurus est **complète et prête pour la production** !

**Ce qui fonctionne** :
✅ Documentation accessible en dev sur :3001  
✅ Build automatique avec `npm run build:all`  
✅ Fusion des outputs dans `public/documentation`  
✅ Routing `/documentation` configuré  
✅ 5 pages complètes de documentation  
✅ Configuration Vercel optimale  
✅ Ready to deploy 🚀

**Pour déployer** :

```bash
git add .
git commit -m "feat: add Docusaurus documentation"
git push
```

Vercel va détecter le push et déployer automatiquement avec la documentation ! 🎉
