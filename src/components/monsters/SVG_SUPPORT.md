# Support SVG dans MonsterCard

## Modification effectuée

La `MonsterCard` prend maintenant en charge l'affichage des fichiers SVG dans le champ `draw` de vos monstres.

## Types de `draw` supportés

### 1. **SVG inline** (string contenant du code SVG)

```tsx
const monster = {
  name: "Dragon",
  draw: `<svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="#ff6b6b"/>
    <text x="50" y="55" text-anchor="middle" fill="white" font-size="20">🐲</text>
  </svg>`,
  level: 5,
}
```

### 2. **Chemin vers fichier SVG** (URL ou chemin relatif)

```tsx
const monster = {
  name: "Phoenix",
  draw: "/public/monsters/phoenix.svg", // ou chemin relatif
  level: 10,
}

// Ou URL externe
const monster2 = {
  name: "Griffon",
  draw: "https://example.com/monsters/griffon.svg",
  level: 8,
}
```

### 3. **Fallback texte/emoji** (comme avant)

```tsx
const monster = {
  name: "Licorne",
  draw: "🦄", // Emoji ou texte simple
  level: 3,
}
```

## Composant MonsterAvatar

Un nouveau composant `MonsterAvatar` a été créé pour gérer l'affichage des avatars de monstres :

```tsx
import {MonsterAvatar} from "@/components/monsters"

;<MonsterAvatar
  draw={monster.draw}
  name={monster.name}
  size="lg" // 'sm' | 'md' | 'lg' | 'xl'
  className="custom-styles"
/>
```

### Tailles disponibles

- `sm`: 64x64px (w-16 h-16)
- `md`: 128x128px (w-32 h-32) - par défaut
- `lg`: 192x192px (w-48 h-48)
- `xl`: 256x256px (w-64 h-64)

## Gestion d'erreurs

- **Images cassées** : Fallback automatique vers emoji 🐾
- **SVG malformé** : Affichage du texte brut ou fallback
- **Chemins invalides** : Gestion gracieuse avec fallback

## Architecture

### Logique de détection

```typescript
// 1. Détection SVG inline
if (draw.startsWith("<svg")) {
  return <div dangerouslySetInnerHTML={{__html: draw}} />
}

// 2. Détection fichier/URL
if (draw.startsWith("/") || draw.startsWith("http")) {
  return <img src={draw} alt="monster" />
}

// 3. Fallback texte/emoji
return <div>{draw}</div>
```

### Sécurité

- Utilisation de `dangerouslySetInnerHTML` uniquement pour SVG détecté
- Validation du format avant injection
- Fallback sécurisé en cas d'erreur

## Exemples d'utilisation

### Dans votre base de données

```json
{
  "monsters": [
    {
      "name": "Dragon de feu",
      "draw": "<svg viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' fill='#ff4757'/></svg>",
      "level": 15
    },
    {
      "name": "Slime vert",
      "draw": "/assets/monsters/slime.svg",
      "level": 2
    },
    {
      "name": "Fantôme",
      "draw": "👻",
      "level": 7
    }
  ]
}
```

### Rendu final

Tous ces formats s'affichent harmonieusement dans la même card avec :

- Conteneur de taille fixe (128x128px par défaut)
- Arrière-plan cohérent (`bg-latte-50`)
- Bordures arrondies (`rounded-2xl`)
- Gestion responsive et hover effects
