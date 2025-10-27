# 🧪 Tests de l'intégration Docusaurus

Ce document liste toutes les commandes de test pour vérifier que l'intégration fonctionne correctement.

## ✅ Tests de base

### 1. Vérifier l'installation

```bash
# Vérifier que Docusaurus est installé
ls -la documentation/

# Vérifier les dépendances
cd documentation && npm list @docusaurus/core
```

**Résultat attendu** : Docusaurus 3.9.x installé

### 2. Build de la documentation

```bash
# Build Docusaurus seul
npm run build:docs
```

**Résultat attendu** :

- ✅ Build réussi
- ✅ Dossier `documentation/build/` créé
- ✅ Fichiers statiques générés

### 3. Fusion des outputs

```bash
# Copier la doc dans public/
npm run merge-outputs
```

**Résultat attendu** :

```
🔄 Fusion des outputs Next.js et Docusaurus...
✅ Dossier public/documentation créé
✅ Documentation copiée dans public/documentation
✅ Build fusionnée avec succès!
📍 La documentation sera accessible sur /documentation
```

### 4. Vérifier les fichiers copiés

```bash
# Lister les fichiers
ls -la public/documentation/

# Vérifier index.html
cat public/documentation/index.html | head -20
```

**Résultat attendu** :

- ✅ Fichiers HTML présents
- ✅ Dossier `assets/` présent
- ✅ Fichier `index.html` valide

## 🚀 Tests de développement

### 5. Serveur de développement Docusaurus

```bash
# Terminal 1
npm run dev:docs
```

**Résultat attendu** :

```
[SUCCESS] Docusaurus website is running at: http://localhost:3001/documentation/
```

**Tests à effectuer** :

1. Ouvrir http://localhost:3001/documentation/
2. ✅ Page d'accueil s'affiche
3. ✅ Navigation fonctionne
4. ✅ Toutes les pages s'affichent
5. ✅ Hot reload fonctionne (modifier un .md et sauvegarder)

### 6. Application Next.js avec documentation

```bash
# Build complet
npm run build:all

# Démarrer en mode production
npm start
```

**Résultat attendu** :

- ✅ Build Next.js réussi
- ✅ Build Docusaurus réussi
- ✅ Merge réussi
- ✅ Serveur démarre sur :3000

**Tests à effectuer** :

1. Ouvrir http://localhost:3000
2. ✅ Application s'affiche
3. Cliquer sur "Documentation" dans le header
4. ✅ Redirige vers /documentation
5. ✅ Documentation s'affiche correctement

## 📄 Tests des pages

### 7. Vérifier chaque page de documentation

**Introduction** : http://localhost:3001/documentation/docs/intro

- ✅ Titre "Bienvenue sur Animochi"
- ✅ Technologies listées
- ✅ Fonctionnalités décrites

**Guide de démarrage** : http://localhost:3001/documentation/docs/getting-started

- ✅ Installation expliquée
- ✅ Scripts listés
- ✅ Configuration détaillée

**Architecture** : http://localhost:3001/documentation/docs/architecture

- ✅ Principes SOLID expliqués
- ✅ Exemples de code présents
- ✅ Patterns détaillés

**Composants** : http://localhost:3001/documentation/docs/components

- ✅ Design system décrit
- ✅ Composants documentés
- ✅ Props expliquées

**API** : http://localhost:3001/documentation/docs/api

- ✅ Endpoints listés
- ✅ Exemples de requêtes/réponses
- ✅ Services documentés

## 🔍 Tests de navigation

### 8. Navigation sidebar

**À tester** :

1. ✅ Sidebar visible à gauche
2. ✅ Sections cliquables
3. ✅ Page active surlignée
4. ✅ Sous-sections expandables (Architecture, Développement)

### 9. Navigation header

**À tester** :

1. ✅ Logo Animochi présent
2. ✅ Lien "Documentation" actif
3. ✅ Lien "Retour à l'app" fonctionne
4. ✅ Lien GitHub présent

### 10. Navigation footer

**À tester** :

1. ✅ Sections Documentation et Ressources
2. ✅ Liens fonctionnels
3. ✅ Copyright affiché

## 📱 Tests responsive

### 11. Mobile

**À tester sur mobile/responsive** :

1. ✅ Ouvrir http://localhost:3001/documentation/ sur mobile
2. ✅ Hamburger menu visible
3. ✅ Menu s'ouvre au clic
4. ✅ Navigation fonctionne
5. ✅ Contenu lisible
6. ✅ Images adaptées

### 12. Tablette

**À tester sur tablette** :

1. ✅ Layout adapté
2. ✅ Sidebar visible ou collapsible
3. ✅ Contenu bien disposé

## 🎨 Tests visuels

### 13. Thème clair/sombre

**À tester** :

1. ✅ Toggle light/dark mode fonctionne
2. ✅ Préférence système respectée
3. ✅ Couleurs cohérentes
4. ✅ Lisibilité maintenue

### 14. Syntaxe des blocs de code

**À vérifier dans les pages** :

1. ✅ Coloration syntaxique active
2. ✅ Bouton copier présent
3. ✅ Numéros de ligne (si activés)
4. ✅ Scroll horizontal si nécessaire

## ⚙️ Tests de configuration

### 15. Vercel.json

```bash
# Vérifier le fichier
cat vercel.json
```

**Contenu attendu** :

```json
{
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

### 16. Scripts npm

```bash
# Vérifier package.json
cat package.json | grep -A 10 "scripts"
```

**Scripts attendus** :

- ✅ `dev:docs`
- ✅ `build:docs`
- ✅ `build:all`
- ✅ `merge-outputs`

### 17. Next.js rewrites

```bash
# Vérifier next.config.ts
cat next.config.ts
```

**Contenu attendu** :

```typescript
async rewrites() {
  return [
    {
      source: '/documentation/:path*',
      destination: '/documentation/:path*'
    }
  ]
}
```

## 🔒 Tests de sécurité

### 18. Fichiers sensibles non exposés

```bash
# Vérifier .gitignore
cat .gitignore | grep documentation
```

**Attendu** :

- ✅ `/documentation/node_modules` ignoré
- ✅ `/documentation/build` ignoré
- ✅ `/public/documentation` ignoré

### 19. Variables d'environnement

**Vérifier** :

- ✅ Aucune clé sensible dans `docusaurus.config.ts`
- ✅ URLs en production via variables d'environnement

## 📊 Tests de performance

### 20. Taille du build

```bash
# Vérifier la taille
du -sh documentation/build
du -sh public/documentation
```

**Attendu** :

- ✅ Build raisonnable (< 50MB idéalement)

### 21. Temps de build

```bash
# Mesurer le temps
time npm run build:docs
```

**Attendu** :

- ✅ Build en moins de 2 minutes

### 22. Temps de chargement

**Ouvrir DevTools → Network** :

1. ✅ Page charge en < 3s
2. ✅ Assets optimisés
3. ✅ Pas d'erreurs console

## 🔗 Tests de liens

### 23. Liens internes

**Vérifier tous les liens internes** :

- ✅ `/docs/intro` → `/docs/getting-started`
- ✅ `/docs/architecture` accessible
- ✅ `/docs/components` accessible
- ✅ `/docs/api` accessible

### 24. Liens externes

**Vérifier les liens externes** :

- ✅ Lien GitHub fonctionne
- ✅ Lien "Retour à l'app" fonctionne
- ✅ Liens vers Next.js/React/etc. fonctionnent

## 📝 Tests de contenu

### 25. Markdown features

**Vérifier dans les pages** :

- ✅ Titres hiérarchiques (h1, h2, h3)
- ✅ Listes à puces et numérotées
- ✅ Blocs de code avec highlighting
- ✅ Tables formatées
- ✅ Liens et images

### 26. SEO

**Vérifier** :

1. ✅ Balises `<title>` présentes
2. ✅ Balises `<meta>` description
3. ✅ Sitemap généré (`/documentation/sitemap.xml`)
4. ✅ URLs propres et SEO-friendly

## 🚀 Tests de déploiement

### 27. Build local complet

```bash
# Simulation du build Vercel
npm run build:all

# Vérifier les outputs
ls -la .next/
ls -la public/documentation/

# Tester
npm start
```

### 28. Variables d'environnement

**Créer `.env.local.test`** :

```env
MONGODB_URI=mongodb://localhost:27017/test
BETTER_AUTH_SECRET=test-secret
BETTER_AUTH_URL=http://localhost:3000
```

**Tester** :

```bash
npm run build
```

**Attendu** :

- ✅ Build réussi avec variables de test

## ✅ Checklist finale

Avant de déployer, vérifier :

- [ ] ✅ `npm run build:docs` réussit
- [ ] ✅ `npm run merge-outputs` réussit
- [ ] ✅ `npm run build:all` réussit
- [ ] ✅ Documentation visible sur :3001
- [ ] ✅ Documentation accessible via Next.js après build
- [ ] ✅ Toutes les pages s'affichent
- [ ] ✅ Navigation fonctionne
- [ ] ✅ Responsive OK
- [ ] ✅ Pas d'erreurs console
- [ ] ✅ Liens fonctionnels
- [ ] ✅ vercel.json configuré
- [ ] ✅ Variables d'environnement prêtes
- [ ] ✅ .gitignore à jour

## 🎯 Résultats des tests

### Tests effectués

| Test          | Statut | Notes            |
| ------------- | ------ | ---------------- |
| Installation  | ✅     | Docusaurus 3.9.2 |
| Build docs    | ✅     | Succès           |
| Merge outputs | ✅     | Succès           |
| Dev server    | ✅     | :3001 actif      |
| Pages MD      | ✅     | 5 pages OK       |
| Navigation    | ✅     | Sidebar OK       |

### Prêt pour le déploiement

**Statut global : ✅ READY TO DEPLOY**

Tous les tests essentiels sont passés. Le projet est prêt pour être déployé sur Vercel !

## 📞 Support

Si un test échoue :

1. Consulter les logs d'erreur
2. Vérifier la configuration
3. Relire la documentation
4. Vérifier les issues GitHub

---

_Tests effectués le 27 octobre 2025_  
_Tous les tests passent ✅_
