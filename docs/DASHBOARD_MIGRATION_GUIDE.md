# Guide de Migration - Dashboard Refactorisé

## Résumé des changements

La page Dashboard a été entièrement refactorisée pour respecter les principes SOLID et Clean Architecture. Cette migration améliore la maintenabilité, la testabilité et la réutilisabilité du code.

## Changements majeurs

### 1. Extraction des hooks personnalisés

#### Avant

```tsx
const [isModalOpen, setIsModalOpen] = useState(false)
const handleLogout = () => {
  /* ... */
}
```

#### Après

```tsx
import {useModal, useAuth, useMonsterCreation} from "./hooks"

const {isOpen, open, close} = useModal()
const {logout} = useAuth()
const {handleSubmit} = useMonsterCreation()
```

**Avantages** :

- Réutilisabilité des hooks
- Testabilité isolée
- Séparation des responsabilités

### 2. Découpage en sous-composants

#### Avant (DashboardContent monolithique)

```tsx
function DashboardContent() {
  return (
    <div>
      <h1>Bienvenue {session.user.email}</h1>
      <Button onClick={handleCreate}>Créer</Button>
      <Button onClick={handleLogout}>Déconnexion</Button>
      {/* ... reste du code ... */}
    </div>
  )
}
```

#### Après (Composition)

```tsx
function DashboardContent({session, monsters}) {
  return (
    <div>
      <DashboardHeader session={session} />
      <DashboardActions onCreateMonster={open} onLogout={logout} />
      <MonstersList monsters={monsters} />
      <CreateMonsterModal {...modalProps} />
    </div>
  )
}
```

**Avantages** :

- Chaque composant a une responsabilité unique
- Facilite les tests unitaires
- Améliore la lisibilité

### 3. Extraction des utilitaires

#### Avant (fonctions dans MonsterCard)

```tsx
function MonsterCard() {
  const getStateEmoji = (state) => {
    /* ... */
  }
  const formatDate = (date) => {
    /* ... */
  }
  // ... reste du composant
}
```

#### Après (utilitaires séparés)

```tsx
// Dans utils/monster-state-helpers.ts
export function getStateEmoji(state) {
  /* ... */
}

// Dans utils/date-formatter.ts
export function formatDate(date) {
  /* ... */
}

// Dans MonsterCard
import {getStateEmoji} from "./utils"
```

**Avantages** :

- Réutilisabilité des fonctions
- Testabilité isolée
- Respect du principe DRY

### 4. Amélioration du formulaire

#### Avant (logique mélangée)

```tsx
function CreateMonsterForm() {
  const [fields, setFields] = useState({name: "", draw: ""})
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerateMonster = () => {
    // Logique de génération inline
    const svg = generateMonsterSvg(fields.name)
    setFields({...fields, draw: svg})
  }

  // ... beaucoup de code
}
```

#### Après (hooks et sous-composants)

```tsx
function CreateMonsterForm() {
  const {fields, updateField, setDraw} = useMonsterFormState()
  const {isGenerating, generate} = useMonsterGenerator()

  return (
    <form>
      <FormError message={error} />
      <InputField {...fieldProps} />
      <MonsterPreview draw={fields.draw} />
      <FormActions {...actionsProps} />
    </form>
  )
}
```

**Avantages** :

- Logique métier isolée dans les hooks
- UI séparée en sous-composants réutilisables
- Facilite les modifications futures

## Migration pas à pas

### Étape 1 : Créer les hooks

1. Créer `src/components/dashboard/hooks/`
2. Extraire la logique dans des hooks dédiés
3. Créer le fichier barrel `index.ts`

### Étape 2 : Créer les sous-composants

1. Identifier les sections responsables d'une seule chose
2. Créer un fichier par sous-composant
3. Ajouter les interfaces TypeScript

### Étape 3 : Créer les utilitaires

1. Créer `src/components/monsters/utils/`
2. Extraire les fonctions pures
3. Documenter avec JSDoc

### Étape 4 : Refactoriser le composant principal

1. Importer les hooks et sous-composants
2. Remplacer le code inline par les nouveaux éléments
3. Vérifier que tout fonctionne

### Étape 5 : Ajouter la documentation

1. JSDoc sur chaque fonction/composant
2. Commentaires explicatifs dans le code
3. Documentation architecture globale

## Impact sur le code existant

### Imports à mettre à jour

Si vous utilisiez directement `DashboardContent`, aucun changement nécessaire. Les props sont identiques.

Si vous testiez `DashboardContent`, vous pouvez maintenant tester les hooks et sous-composants individuellement.

### Nouveaux fichiers créés

- 6 hooks personnalisés
- 4 sous-composants dashboard
- 3 sous-composants forms
- 6 sous-composants monsters
- 4 fichiers utilitaires
- 1 fichier de validation documenté

### Fichiers modifiés

- `dashboard-content.tsx` : Simplifié, utilise composition
- `create-monster-modal.tsx` : Utilise hooks
- `create-monster-form.tsx` : Utilise hooks et sous-composants
- `monster-card.tsx` : Utilise sous-composants et utils
- `monsters-list.tsx` : Utilise sous-composants
- `page.tsx` : Ajout de commentaires

## Tests

### Avant (difficile)

```tsx
// Impossible de tester la logique de génération sans monter le composant entier
test("should generate monster", () => {
  render(<CreateMonsterForm />)
  // ... beaucoup de setup
})
```

### Après (facile)

```tsx
// Test du hook isolé
test("useMonsterGenerator generates SVG", () => {
  const {result} = renderHook(() => useMonsterGenerator())
  const svg = result.current.generate("Mochi")
  expect(svg).toContain("<svg")
})

// Test du composant UI isolé
test("MonsterPreview shows placeholder when empty", () => {
  render(<MonsterPreview draw="" />)
  expect(screen.getByText(/Générez votre créature/)).toBeInTheDocument()
})
```

## Checklist de migration

- [x] Créer les hooks personnalisés
- [x] Créer les sous-composants
- [x] Créer les utilitaires
- [x] Refactoriser les composants principaux
- [x] Ajouter la documentation JSDoc
- [x] Vérifier qu'il n'y a pas d'erreurs TypeScript
- [ ] Ajouter les tests unitaires
- [ ] Ajouter les tests d'intégration
- [ ] Mettre à jour la documentation utilisateur

## Rollback

Si nécessaire, tous les fichiers originaux peuvent être restaurés via Git :

```bash
git checkout HEAD~1 -- src/components/dashboard/
git checkout HEAD~1 -- src/components/forms/
git checkout HEAD~1 -- src/components/monsters/
```

## Support

Pour toute question sur cette migration, consultez :

- `docs/DASHBOARD_ARCHITECTURE.md` : Architecture détaillée
- Les commentaires JSDoc dans chaque fichier
- Les exemples d'usage dans les docstrings
