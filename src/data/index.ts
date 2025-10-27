import { type Monster, type GameAction, type Benefit, type Animal } from '@/types'

export const monsters: Monster[] = [
  {
    id: 'blubbi',
    name: 'Blubbi',
    description: 'Créature aquatique paisible qui adore nager et collectionner les perles bleues.',
    color: 'blueberry',
    emoji: '🐙',
    rarity: 'Commun',
  },
  {
    id: 'strawbinx',
    name: 'Strawbinx',
    description: 'Petit monstre gourmand aux joues roses qui raffole des fruits sucrés.',
    color: 'strawberry',
    emoji: '🍓',
    rarity: 'Rare',
  },
  {
    id: 'peachiko',
    name: 'Peachiko',
    description: "Créature solaire énergique qui brille comme un petit soleil d'été.",
    color: 'peach',
    emoji: '🌞',
    rarity: 'Épique',
  },
  {
    id: 'latteon',
    name: 'Latteon',
    description: 'Monstre mystique rare qui contrôle les énergies cosmiques.',
    color: 'latte',
    emoji: '✨',
    rarity: 'Légendaire',
  }
]

export const gameActions: GameAction[] = [
  {
    id: 'feed',
    title: 'Nourrir',
    description:
      'Donnez des repas délicieux et équilibrés pour maintenir la santé de votre compagnon.',
    icon: '🍽️',
    color: 'strawberry',
  },
  {
    id: 'play',
    title: 'Jouer',
    description: 'Participez à des mini-jeux amusants pour divertir et stimuler votre créature.',
    icon: '🎾',
    color: 'blueberry',
  },
  {
    id: 'heal',
    title: 'Soigner',
    description: 'Utilisez des potions et des sorts de guérison pour traiter les petits bobos.',
    icon: '💊',
    color: 'peach',
  },
  {
    id: 'educate',
    title: 'Éduquer',
    description: 'Enseignez de nouveaux tours et compétences à votre compagnon virtuel.',
    icon: '📚',
    color: 'latte',
  },
  {
    id: 'explore',
    title: 'Explorer',
    description: "Partez à l'aventure dans des mondes magiques remplis de surprises.",
    icon: '🗺️',
    color: 'blueberry',
  },
  {
    id: 'customize',
    title: 'Personnaliser',
    description: "Décorez l'habitat de votre créature avec des objets uniques et colorés.",
    icon: '🎨',
    color: 'strawberry',
  }
]

export const benefits: Benefit[] = [
  {
    id: 'gameplay',
    title: 'Gameplay Immersif',
    description:
      'Interagissez avec votre créature en temps réel grâce à des mécaniques de jeu riches et engageantes.',
    icon: '🎮',
    color: 'blueberry',
  },
  {
    id: 'emotional',
    title: 'Lien Émotionnel',
    description:
      'Développez une relation unique avec votre compagnon qui évolue selon vos interactions et votre attention.',
    icon: '💖',
    color: 'strawberry',
  },
  {
    id: 'evolution',
    title: 'Évolution Continue',
    description:
      'Votre créature grandit, apprend et développe sa personnalité au fil de vos aventures partagées.',
    icon: '🌟',
    color: 'peach',
  }
]

export const animals: Animal[] = [
  {
    id: '1',
    name: 'Le panda roux',
    firstName: 'Milo',
    type: 'Aventurier',
    image: '/assets/images/animals/panda-roux.png',
  },
  {
    id: '2',
    name: 'Le corbeau',
    firstName: 'Nook',
    type: 'Sorcier',
    image: '/assets/images/animals/corbeau.png',
  },
  {
    id: '4',
    name: 'Le cerf',
    firstName: 'Céleste',
    type: 'Chevalier',
    image: '/assets/images/animals/cerf.png',
  },
  {
    id: '5',
    name: 'Le blaireau',
    firstName: 'Eugène',
    type: 'Explorateur',
    image: '/assets/images/animals/blaireau.png',
  },
  {
    id: '6',
    name: 'Le hérisson',
    firstName: 'Hugo',
    type: 'Aventurier',
    image: '/assets/images/animals/herisson.png',
  },
  {
    id: '7',
    name: 'Le cerf',
    firstName: 'Esquie',
    type: 'Dieu',
    image: '/assets/images/animals/esquie.png',
  },
  {
    id: '8',
    name: 'Le hibou',
    firstName: 'Hélène',
    type: 'Bibliothécaire',
    image: '/assets/images/animals/hibou.png',
  },
  {
    id: '9',
    name: 'Le lion',
    firstName: 'Léo',
    type: 'Ranger',
    image: '/assets/images/animals/lion.png',
  },
  {
    id: '10',
    name: 'Le morse',
    firstName: 'Marcel',
    type: 'Viking',
    image: '/assets/images/animals/morse.png',
  },
  {
    id: '11',
    name: 'Le panda roux',
    firstName: 'Maya',
    type: 'Tueuse',
    image: '/assets/images/animals/panda-roux-2.png',
  },
  {
    id: '12',
    name: 'Le pingouin',
    firstName: 'Oswald',
    type: 'Magicien',
    image: '/assets/images/animals/pingouin.png',
  },
  {
    id: '13',
    name: 'Le raton laveur',
    firstName: 'Nook',
    type: 'Inventeur',
    image: '/assets/images/animals/raton.png',
  },
  {
    id: '14',
    name: 'Le renard',
    firstName: 'Zoro',
    type: 'Samouraï',
    image: '/assets/images/animals/renard.png',
  },
  {
    id: '15',
    name: 'Le requin',
    firstName: 'Roland',
    type: 'Marin',
    image: '/assets/images/animals/requin.png',
  },
  {
    id: '16',
    name: 'La souris',
    firstName: 'Sophie',
    type: 'Patissière',
    image: '/assets/images/animals/souris.png',
  },
  {
    id: '17',
    name: 'Le tapir',
    firstName: 'Théo',
    type: 'Barde',
    image: '/assets/images/animals/tapir.png',
  },
  {
    id: '18',
    name: 'Le lapin',
    firstName: 'Luna',
    type: 'Jardinière',
    image: '/assets/images/animals/lapin.png',
  }
]
