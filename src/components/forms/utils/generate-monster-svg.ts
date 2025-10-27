const DEFAULT_OUTLINE = '#22223b'

const GRID_SIZE = 32
const PIXEL_SIZE = 4
const VIEWBOX_SIZE = GRID_SIZE * PIXEL_SIZE
const MAX_SEED = 0xffffffff

type BodyShape = 'oval' | 'pear' | 'slim' | 'chubby'

type EarStyle = 'none' | 'round' | 'pointy' | 'bunny' | 'leaf'

type AccessoryStyle = 'none' | 'leaf' | 'flower' | 'sprout' | 'antenna'
type WingStyle = 'none' | 'round' | 'bat' | 'bee'

type PatternStyle = 'none' | 'spots' | 'stripes' | 'shell'

type TailStyle = 'none' | 'stub' | 'leaf' | 'flame'

type ThemeId = 'candy' | 'forest' | 'aqua' | 'sunny' | 'berry' | 'midnight' | 'earth'

type FootStyle = 'small' | 'wide' | 'none'

interface PaletteTheme {
  body: string[]
  belly: string[]
  accent: string[]
  eye?: string[]
  outline: string
}

interface Palette {
  body: string
  belly: string
  accent: string
  eye?: string
  outline: string
  lid: string
}

interface MonsterPreset {
  id: string
  themes: ThemeId[]
  bodyHeight: [number, number]
  bodyWidth: [number, number]
  bodyShape: BodyShape
  belly: boolean
  bellyWidth: number
  cheeks: boolean
  earStyle: EarStyle
  topAccessory: AccessoryStyle
  wings: WingStyle
  pattern: PatternStyle
  tail: TailStyle
  feet: FootStyle
  arms: boolean
  faceYOffset: number
  eyeSize: EyeSizeRange
  eyeOffset: [number, number]
  beak?: boolean
  snout?: boolean
}

interface EyeSizeRange {
  width: [number, number]
  height: [number, number]
}

interface Pixel {
  x: number
  y: number
  color: string
}

interface EyeBox {
  x: number
  y: number
  width: number
  height: number
}

interface AnimatedGroup {
  pixels: Pixel[]
  animation: string
}

const THEME_PALETTES: Record<ThemeId, PaletteTheme> = {
  candy: {
    body: ['#f7aef8', '#ffafcc', '#fdbad3'],
    belly: ['#ffe6f7', '#fff2fb'],
    accent: ['#ffcad4', '#ffe5ec'],
    eye: ['#2b2d42', '#3a3058'],
    outline: '#332d4f'
  },
  forest: {
    body: ['#a0d995', '#8bcf8a', '#74c69d'],
    belly: ['#e3f6d9', '#d7f2cb'],
    accent: ['#90b44b', '#cdf2a6'],
    eye: ['#1e2a23'],
    outline: '#2b2f2a'
  },
  aqua: {
    body: ['#69d2e7', '#6ec4ff', '#5fb0f5'],
    belly: ['#d0f4ff', '#e6fbff'],
    accent: ['#4ac1c9', '#7dddf2'],
    eye: ['#0f2540', '#182848'],
    outline: '#1f2d42'
  },
  sunny: {
    body: ['#ffb347', '#f9a620', '#ff9f1c'],
    belly: ['#ffe5b4', '#fff0d0'],
    accent: ['#ffd166', '#ffbe0b'],
    eye: ['#3d1f0f'],
    outline: '#2f1f16'
  },
  berry: {
    body: ['#8f72e0', '#7c5ce0', '#6f53c6'],
    belly: ['#dfd4ff', '#e9ddff'],
    accent: ['#ffcad4', '#f6bd60'],
    eye: ['#120d1f', '#1c1333'],
    outline: '#20143a'
  },
  midnight: {
    body: ['#4d5483', '#45506e', '#515e91'],
    belly: ['#d6dcff', '#c2c9ff'],
    accent: ['#8fb8ff', '#79a6ff'],
    eye: ['#f8f9fa', '#dfe2ff'],
    outline: '#1b1f36'
  },
  earth: {
    body: ['#e2c290', '#d4a373', '#bf8b5e'],
    belly: ['#f6e7c1', '#f2dcb3'],
    accent: ['#cbb682', '#ab8d5d'],
    eye: ['#2e1f18'],
    outline: '#2d1b10'
  }
}

const MONSTER_PRESETS: MonsterPreset[] = [
  {
    id: 'round-plush',
    themes: ['candy', 'berry'],
    bodyHeight: [20, 22],
    bodyWidth: [18, 22],
    bodyShape: 'oval',
    belly: true,
    bellyWidth: 0.65,
    cheeks: true,
    earStyle: 'round',
    topAccessory: 'none',
    wings: 'none',
    pattern: 'none',
    tail: 'none',
    feet: 'small',
    arms: true,
    faceYOffset: 0,
    eyeSize: { width: [3, 3], height: [3, 3] },
    eyeOffset: [6, 7]
  },
  {
    id: 'bunny',
    themes: ['candy', 'forest'],
    bodyHeight: [20, 22],
    bodyWidth: [16, 19],
    bodyShape: 'pear',
    belly: true,
    bellyWidth: 0.6,
    cheeks: true,
    earStyle: 'bunny',
    topAccessory: 'sprout',
    wings: 'none',
    pattern: 'none',
    tail: 'stub',
    feet: 'small',
    arms: true,
    faceYOffset: -1,
    eyeSize: { width: [3, 3], height: [3, 3] },
    eyeOffset: [6, 7]
  },
  {
    id: 'penguin',
    themes: ['aqua', 'midnight'],
    bodyHeight: [18, 21],
    bodyWidth: [16, 18],
    bodyShape: 'oval',
    belly: true,
    bellyWidth: 0.55,
    cheeks: false,
    earStyle: 'none',
    topAccessory: 'none',
    wings: 'round',
    pattern: 'none',
    tail: 'stub',
    feet: 'wide',
    arms: false,
    faceYOffset: -1,
    eyeSize: { width: [3, 3], height: [3, 3] },
    eyeOffset: [5, 6],
    beak: true
  },
  {
    id: 'bug',
    themes: ['berry', 'aqua'],
    bodyHeight: [16, 19],
    bodyWidth: [14, 17],
    bodyShape: 'slim',
    belly: false,
    bellyWidth: 0.5,
    cheeks: false,
    earStyle: 'none',
    topAccessory: 'antenna',
    wings: 'bat',
    pattern: 'spots',
    tail: 'none',
    feet: 'none',
    arms: false,
    faceYOffset: -1,
    eyeSize: { width: [3, 3], height: [2, 3] },
    eyeOffset: [6, 7]
  },
  {
    id: 'plant',
    themes: ['forest'],
    bodyHeight: [18, 22],
    bodyWidth: [16, 20],
    bodyShape: 'pear',
    belly: true,
    bellyWidth: 0.6,
    cheeks: true,
    earStyle: 'leaf',
    topAccessory: 'leaf',
    wings: 'none',
    pattern: 'spots',
    tail: 'leaf',
    feet: 'small',
    arms: true,
    faceYOffset: -1,
    eyeSize: { width: [3, 3], height: [3, 3] },
    eyeOffset: [6, 7]
  },
  {
    id: 'bear',
    themes: ['earth', 'sunny'],
    bodyHeight: [19, 22],
    bodyWidth: [20, 22],
    bodyShape: 'chubby',
    belly: true,
    bellyWidth: 0.7,
    cheeks: true,
    earStyle: 'round',
    topAccessory: 'none',
    wings: 'none',
    pattern: 'none',
    tail: 'stub',
    feet: 'wide',
    arms: true,
    faceYOffset: 0,
    eyeSize: { width: [3, 3], height: [3, 3] },
    eyeOffset: [6, 7],
    snout: true
  },
  {
    id: 'bee',
    themes: ['sunny'],
    bodyHeight: [16, 18],
    bodyWidth: [18, 20],
    bodyShape: 'oval',
    belly: false,
    bellyWidth: 0.5,
    cheeks: false,
    earStyle: 'none',
    topAccessory: 'antenna',
    wings: 'bee',
    pattern: 'stripes',
    tail: 'flame',
    feet: 'small',
    arms: false,
    faceYOffset: -1,
    eyeSize: { width: [3, 3], height: [2, 3] },
    eyeOffset: [5, 6]
  },
  {
    id: 'bat',
    themes: ['midnight', 'berry'],
    bodyHeight: [18, 20],
    bodyWidth: [18, 20],
    bodyShape: 'oval',
    belly: false,
    bellyWidth: 0.5,
    cheeks: false,
    earStyle: 'pointy',
    topAccessory: 'none',
    wings: 'bat',
    pattern: 'none',
    tail: 'none',
    feet: 'wide',
    arms: false,
    faceYOffset: -1,
    eyeSize: { width: [3, 3], height: [3, 3] },
    eyeOffset: [6, 7]
  }
]

function clamp (value: number, min: number, max: number): number {
  if (value < min) return min
  if (value > max) return max
  return value
}

function hexToRgb (hex: string): [number, number, number] {
  const normalized = hex.replace('#', '')
  const bigint = parseInt(normalized, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return [r, g, b]
}

function rgbToHex (r: number, g: number, b: number): string {
  const component = (value: number): string =>
    clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0')
  return `#${component(r)}${component(g)}${component(b)}`
}

function mixColor (base: string, target: string, amount: number): string {
  const [r1, g1, b1] = hexToRgb(base)
  const [r2, g2, b2] = hexToRgb(target)
  const r = r1 + (r2 - r1) * amount
  const g = g1 + (g2 - g1) * amount
  const b = b1 + (b2 - b1) * amount
  return rgbToHex(r, g, b)
}

function lightenColor (hex: string, amount: number): string {
  return mixColor(hex, '#ffffff', amount)
}

function darkenColor (hex: string, amount: number): string {
  return mixColor(hex, '#000000', amount)
}

function getRandomSeed (): number {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    return array[0]
  }
  return Math.floor(Math.random() * MAX_SEED)
}

function nameToSeed (name: string): number {
  return name
    .trim()
    .toLowerCase()
    .split('')
    .reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 17), 0)
}

function combineSeed (name: string, variationSeed: number): number {
  const base = nameToSeed(name) ^ variationSeed
  return base === 0 ? 0x9e3779b9 : base >>> 0
}

function createRng (seed: number): () => number {
  let state = seed >>> 0
  if (state === 0) state = 0x9e3779b9
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    state >>>= 0
    return state / MAX_SEED
  }
}

function randomInt (rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min
}

function randomChoice<T> (rng: () => number, items: T[]): T {
  return items[randomInt(rng, 0, items.length - 1)]
}

function pickPalette (preset: MonsterPreset, rng: () => number): Palette {
  const themeId = randomChoice(rng, preset.themes)
  const theme = THEME_PALETTES[themeId]
  const body = randomChoice(rng, theme.body)
  const belly = preset.belly ? randomChoice(rng, theme.belly) : lightenColor(body, 0.18)
  const accent = randomChoice(rng, theme.accent)
  const eye = theme.eye != null ? randomChoice(rng, theme.eye) : '#1c1c2b'
  const outline = theme.outline ?? DEFAULT_OUTLINE
  const lid = darkenColor(body, 0.15)
  return { body, belly, accent, eye, outline, lid }
}

function pushLayerPixel (
  layers: Pixel[][],
  layer: number,
  x: number,
  y: number,
  color: string,
  mask?: Set<string>,
  includeOutline?: boolean
): void {
  if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE) return
  layers[layer].push({ x, y, color })
  if (includeOutline === true && mask != null) {
    mask.add(`${x},${y}`)
  }
}

function buildRectMarkup (pixels: Pixel[]): string {
  return pixels
    .map(({ x, y, color }) => {
      const px = x * PIXEL_SIZE
      const py = y * PIXEL_SIZE
      return `<rect x='${px}' y='${py}' width='${PIXEL_SIZE}' height='${PIXEL_SIZE}' fill='${color}' />`
    })
    .join('\n      ')
}

function bodyWidthFactor (shape: BodyShape, progress: number): number {
  switch (shape) {
    case 'pear':
      return Math.pow(Math.sin(progress * Math.PI), 0.85) * (0.9 + progress * 0.35)
    case 'slim':
      return Math.pow(Math.sin(progress * Math.PI), 0.75) * 0.95
    case 'chubby':
      return 0.55 + 0.55 * Math.sin(progress * Math.PI * 0.9)
    default:
      return Math.sin(progress * Math.PI)
  }
}

function drawBody (
  layers: Pixel[][],
  mask: Set<string>,
  preset: MonsterPreset,
  topRow: number,
  height: number,
  width: number,
  center: number,
  color: string,
  rng: () => number
): Set<string> {
  const bodyMask = new Set<string>()

  for (let row = 0; row < height; row++) {
    const y = topRow + row
    if (y >= GRID_SIZE - 1) break
    const progress = height <= 1 ? 0.5 : row / (height - 1)
    const baseWidth = Math.max(6, Math.round(width * bodyWidthFactor(preset.bodyShape, progress)))
    const wobble = randomInt(rng, -1, 1)
    const rowWidth = clamp(baseWidth + wobble, 6, GRID_SIZE - 4)
    let start = center - Math.floor(rowWidth / 2)
    let end = start + rowWidth - 1
    if (start < 1) {
      start = 1
      end = start + rowWidth - 1
    }
    if (end > GRID_SIZE - 2) {
      end = GRID_SIZE - 2
      start = end - rowWidth + 1
    }

    for (let x = start; x <= end; x++) {
      pushLayerPixel(layers, 1, x, y, color, mask, true)
      bodyMask.add(`${x},${y}`)
    }
  }

  return bodyMask
}

function drawBelly (
  layers: Pixel[][],
  mask: Set<string>,
  center: number,
  top: number,
  height: number,
  widthFactor: number,
  color: string
): void {
  for (let row = 0; row < height; row++) {
    const y = top + row
    if (y >= GRID_SIZE - 1) break
    const progress = height <= 1 ? 0.5 : row / (height - 1)
    const rowWidth = Math.max(4, Math.round(widthFactor * Math.sin(progress * Math.PI)))
    let start = center - Math.floor(rowWidth / 2)
    let end = start + rowWidth - 1
    if (start < 1) {
      start = 1
      end = start + rowWidth - 1
    }
    if (end > GRID_SIZE - 2) {
      end = GRID_SIZE - 2
      start = end - rowWidth + 1
    }

    for (let x = start; x <= end; x++) {
      pushLayerPixel(layers, 2, x, y, color, mask)
    }
  }
}

function drawHighlights (
  layers: Pixel[][],
  bodyMask: Set<string>,
  topRow: number,
  height: number,
  bodyColor: string
): void {
  const highlightColor = lightenColor(bodyColor, 0.25)
  const shadowColor = darkenColor(bodyColor, 0.18)
  const highlightsLimit = topRow + Math.max(2, Math.round(height * 0.18))
  const shadowStart = topRow + Math.max(4, Math.round(height * 0.72))

  bodyMask.forEach((key) => {
    const [xs, ys] = key.split(',')
    const x = Number(xs)
    const y = Number(ys)
    if (y <= highlightsLimit && (x + y) % 2 === 0) {
      pushLayerPixel(layers, 3, x, y, highlightColor)
    } else if (y >= shadowStart && (x + y) % 2 === 0) {
      pushLayerPixel(layers, 3, x, y, shadowColor)
    }
  })
}

function drawPattern (
  layers: Pixel[][],
  bodyMask: Set<string>,
  pattern: PatternStyle,
  accentColor: string,
  rng: () => number,
  topRow: number,
  height: number
): void {
  if (pattern === 'none') return
  const maskEntries = Array.from(bodyMask)
  if (pattern === 'spots') {
    const spots = randomInt(rng, 3, 6)
    for (let i = 0; i < spots; i++) {
      const key = randomChoice(rng, maskEntries)
      const [xs, ys] = key.split(',')
      const x = Number(xs)
      const y = Number(ys)
      pushLayerPixel(layers, 2, x, y, accentColor)
      if (rng() > 0.5) {
        pushLayerPixel(
          layers,
          2,
          clamp(x + (rng() > 0.5 ? 1 : -1), 1, GRID_SIZE - 2),
          y,
          accentColor
        )
      }
    }
  } else if (pattern === 'stripes') {
    const stripeStep = 4
    bodyMask.forEach((key) => {
      const [xs, ys] = key.split(',')
      const y = Number(ys)
      if ((y - topRow) % stripeStep === 0) {
        const x = Number(xs)
        pushLayerPixel(layers, 2, x, y, accentColor)
      }
    })
  } else if (pattern === 'shell') {
    const shellLimit = topRow + Math.round(height * 0.35)
    bodyMask.forEach((key) => {
      const [xs, ys] = key.split(',')
      const y = Number(ys)
      if (y <= shellLimit) {
        const x = Number(xs)
        pushLayerPixel(layers, 2, x, y, accentColor)
      }
    })
  }
}

function drawCheeks (layers: Pixel[][], center: number, row: number, color: string): void {
  pushLayerPixel(layers, 2, center - 7, row, color)
  pushLayerPixel(layers, 2, center + 7, row, color)
  pushLayerPixel(layers, 2, center - 7, row + 1, color)
  pushLayerPixel(layers, 2, center + 7, row + 1, color)
}

function drawMouth (
  layers: Pixel[][],
  center: number,
  row: number,
  color: string,
  rng: () => number
): void {
  const variant = randomInt(rng, 0, 2)
  if (variant === 0) {
    pushLayerPixel(layers, 3, center - 1, row, color)
    pushLayerPixel(layers, 3, center, row, color)
    pushLayerPixel(layers, 3, center + 1, row, color)
  } else if (variant === 1) {
    pushLayerPixel(layers, 3, center, row, color)
    pushLayerPixel(layers, 3, center - 1, row + 1, color)
    pushLayerPixel(layers, 3, center + 1, row + 1, color)
  } else {
    pushLayerPixel(layers, 3, center - 1, row, color)
    pushLayerPixel(layers, 3, center + 1, row, color)
  }
}

function drawBeak (layers: Pixel[][], center: number, row: number, color: string): void {
  pushLayerPixel(layers, 3, center, row, color)
  pushLayerPixel(layers, 3, center - 1, row + 1, color)
  pushLayerPixel(layers, 3, center + 1, row + 1, color)
}

function drawSnout (layers: Pixel[][], center: number, row: number, color: string): void {
  const snoutColor = lightenColor(color, 0.25)
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = 0; dy <= 2; dy++) {
      pushLayerPixel(layers, 2, center + dx, row + dy, snoutColor)
    }
  }
  pushLayerPixel(layers, 3, center - 1, row + 1, darkenColor(color, 0.3))
  pushLayerPixel(layers, 3, center + 1, row + 1, darkenColor(color, 0.3))
}

function drawEars (
  layers: Pixel[][],
  mask: Set<string>,
  center: number,
  topRow: number,
  style: EarStyle,
  color: string
): void {
  if (style === 'none') return
  const place = (offset: number, dx: number, dy: number): void => {
    pushLayerPixel(layers, 2, center + offset + dx, topRow - dy, color, mask, true)
  }
  if (style === 'round') {
    for (let dy = 0; dy <= 2; dy++) {
      place(-6, 0, dy)
      place(-5, 0, dy)
      place(5, 0, dy)
      place(6, 0, dy)
    }
  } else if (style === 'pointy') {
    for (let dy = 0; dy <= 3; dy++) {
      const offset = dy < 2 ? 6 : 5
      place(-offset, 0, dy)
      place(offset - 1, 0, dy)
    }
  } else if (style === 'bunny') {
    for (let dy = 0; dy <= 5; dy++) {
      place(-5, 0, dy)
      place(4, 0, dy)
    }
    place(-6, 1, 1)
    place(5, -1, 1)
  } else if (style === 'leaf') {
    for (let dy = 0; dy <= 3; dy++) {
      place(-6 + dy, dy, dy)
      place(6 - dy, -dy, dy)
    }
  }
}

function drawTopAccessory (
  layers: Pixel[][],
  mask: Set<string>,
  center: number,
  topRow: number,
  color: string,
  style: AccessoryStyle
): void {
  if (style === 'none') return
  if (style === 'leaf') {
    for (let dy = 0; dy <= 3; dy++) {
      pushLayerPixel(layers, 2, center, topRow - dy - 1, color, mask, true)
      if (dy <= 2) {
        pushLayerPixel(layers, 2, center - 1, topRow - dy - 1, color, mask, true)
        pushLayerPixel(layers, 2, center + 1, topRow - dy - 1, color, mask, true)
      }
    }
  } else if (style === 'sprout') {
    pushLayerPixel(layers, 2, center, topRow - 1, color, mask, true)
    pushLayerPixel(layers, 2, center - 1, topRow - 2, color, mask, true)
    pushLayerPixel(layers, 2, center + 1, topRow - 2, color, mask, true)
  } else if (style === 'flower') {
    const petals = lightenColor(color, 0.2)
    pushLayerPixel(layers, 2, center, topRow - 1, color, mask, true)
    pushLayerPixel(layers, 3, center - 1, topRow - 2, petals)
    pushLayerPixel(layers, 3, center + 1, topRow - 2, petals)
    pushLayerPixel(layers, 3, center, topRow - 3, petals)
  } else if (style === 'antenna') {
    pushLayerPixel(layers, 2, center - 2, topRow - 1, color, mask, true)
    pushLayerPixel(layers, 2, center + 2, topRow - 1, color, mask, true)
    pushLayerPixel(layers, 2, center - 2, topRow - 2, color, mask, true)
    pushLayerPixel(layers, 2, center + 2, topRow - 2, color, mask, true)
    pushLayerPixel(layers, 2, center - 2, topRow - 3, lightenColor(color, 0.2), mask, true)
    pushLayerPixel(layers, 2, center + 2, topRow - 3, lightenColor(color, 0.2), mask, true)
  }
}

function drawArms (
  layers: Pixel[][],
  mask: Set<string>,
  center: number,
  row: number,
  color: string
): void {
  for (let dx = 0; dx <= 1; dx++) {
    pushLayerPixel(layers, 1, center - 9 + dx, row, color, mask, true)
    pushLayerPixel(layers, 1, center + 8 - dx, row, color, mask, true)
    pushLayerPixel(layers, 1, center - 9 + dx, row + 1, color, mask, true)
    pushLayerPixel(layers, 1, center + 8 - dx, row + 1, color, mask, true)
  }
}

function drawTail (
  layers: Pixel[][],
  mask: Set<string>,
  center: number,
  bottom: number,
  color: string,
  style: TailStyle
): void {
  if (style === 'none') return
  if (style === 'stub') {
    pushLayerPixel(layers, 2, center, bottom + 1, color, mask, true)
    pushLayerPixel(layers, 2, center - 1, bottom + 1, color, mask, true)
    pushLayerPixel(layers, 2, center + 1, bottom + 1, color, mask, true)
  } else if (style === 'leaf') {
    pushLayerPixel(layers, 2, center + 6, bottom - 1, color, mask, true)
    pushLayerPixel(layers, 2, center + 7, bottom, color, mask, true)
    pushLayerPixel(layers, 2, center + 8, bottom + 1, color, mask, true)
  } else if (style === 'flame') {
    pushLayerPixel(layers, 2, center, bottom + 1, color, mask, true)
    pushLayerPixel(layers, 2, center, bottom + 2, lightenColor(color, 0.2), mask, true)
  }
}

function drawFeet (
  layers: Pixel[][],
  mask: Set<string>,
  center: number,
  bottom: number,
  color: string,
  style: FootStyle
): void {
  if (style === 'none') return
  const width = style === 'wide' ? 4 : 2
  for (let dx = 0; dx < width; dx++) {
    pushLayerPixel(layers, 2, center - 6 + dx, bottom + 1, color, mask, true)
    pushLayerPixel(layers, 2, center + 3 + dx, bottom + 1, color, mask, true)
  }
}

function drawWings (
  center: number,
  topRow: number,
  height: number,
  style: WingStyle,
  color: string,
  mask: Set<string>,
  rng: () => number
): AnimatedGroup[] {
  if (style === 'none') return []
  const groups: AnimatedGroup[] = []
  const midRow = topRow + Math.round(height * 0.55)
  const amplitude = PIXEL_SIZE
  const duration = (1.4 + rng() * 0.6).toFixed(2)

  const makeWing = (direction: 'left' | 'right'): Pixel[] => {
    const pixels: Pixel[] = []
    const sign = direction === 'left' ? -1 : 1
    const offset = 9
    if (style === 'round') {
      for (let dy = -1; dy <= 2; dy++) {
        for (let dx = 0; dx <= 2; dx++) {
          const x = center + sign * (offset + dx)
          const y = midRow + dy
          pixels.push({ x, y, color })
          mask.add(`${x},${y}`)
        }
      }
    } else if (style === 'bat') {
      for (let dy = 0; dy <= 4; dy++) {
        for (let dx = 0; dx <= 3 - dy; dx++) {
          const x = center + sign * (offset + dx)
          const y = midRow + dy
          pixels.push({ x, y, color })
          mask.add(`${x},${y}`)
        }
      }
    } else if (style === 'bee') {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = 0; dx <= 2; dx++) {
          const x = center + sign * (offset + dx)
          const y = midRow + dy
          pixels.push({ x, y, color: lightenColor(color, 0.2) })
          mask.add(`${x},${y}`)
        }
      }
    }
    return pixels
  }

  const leftWing = makeWing('left')
  const rightWing = makeWing('right')
  const leftAnimation = `<animateTransform attributeName='transform' type='translate' values='0 0; 0 -${amplitude}; 0 0' dur='${duration}s' repeatCount='indefinite' begin='0s' />`
  const rightAnimation = `<animateTransform attributeName='transform' type='translate' values='0 0; 0 -${amplitude}; 0 0' dur='${duration}s' repeatCount='indefinite' begin='${(
    parseFloat(duration) / 2
  ).toFixed(2)}s' />`

  if (leftWing.length > 0) groups.push({ pixels: leftWing, animation: leftAnimation })
  if (rightWing.length > 0) groups.push({ pixels: rightWing, animation: rightAnimation })
  return groups
}

function drawEyes (
  layers: Pixel[][],
  mask: Set<string>,
  center: number,
  row: number,
  preset: MonsterPreset,
  palette: Palette,
  rng: () => number
): EyeBox[] {
  const eyeWidth = randomInt(rng, preset.eyeSize.width[0], preset.eyeSize.width[1])
  const eyeHeight = randomInt(rng, preset.eyeSize.height[0], preset.eyeSize.height[1])
  const offset = randomInt(rng, preset.eyeOffset[0], preset.eyeOffset[1])
  const left = clamp(center - offset, 1, GRID_SIZE - eyeWidth - 2)
  const right = clamp(center + offset - (eyeWidth - 1), 1, GRID_SIZE - eyeWidth - 2)
  const boxes: EyeBox[] = []

  for (let dx = 0; dx < eyeWidth; dx++) {
    for (let dy = 0; dy < eyeHeight; dy++) {
      pushLayerPixel(layers, 4, left + dx, row + dy, '#ffffff', mask)
      pushLayerPixel(layers, 4, right + dx, row + dy, '#ffffff', mask)
    }
  }

  const pupilShift = randomInt(rng, -1, 1)
  const eyeColor = palette.eye ?? palette.outline
  pushLayerPixel(
    layers,
    5,
    left + Math.floor(eyeWidth / 2) + pupilShift,
    row + eyeHeight - 1,
    eyeColor
  )
  pushLayerPixel(
    layers,
    5,
    right + Math.floor(eyeWidth / 2) + pupilShift,
    row + eyeHeight - 1,
    eyeColor
  )

  boxes.push({ x: left, y: row, width: eyeWidth, height: eyeHeight })
  boxes.push({ x: right, y: row, width: eyeWidth, height: eyeHeight })
  return boxes
}

function buildAnimatedGroup (group: AnimatedGroup): string {
  const rects = buildRectMarkup(group.pixels)
  return `
      <g>
        ${rects}
        ${group.animation}
      </g>
    `.trim()
}

function createBlinkMarkup (boxes: EyeBox[], lidColor: string, rng: () => number): string {
  if (boxes.length === 0) return ''
  return boxes
    .map((box, index) => {
      const x = box.x * PIXEL_SIZE
      const y = box.y * PIXEL_SIZE
      const width = box.width * PIXEL_SIZE
      const height = box.height * PIXEL_SIZE
      const delay = (rng() * 0.8 + index * 0.2).toFixed(2)
      const duration = (1.8 + rng() * 1.4).toFixed(2)
      return `
        <rect x='${x}' y='${y}' width='${width}' height='0' fill='${lidColor}'>
          <animate attributeName='height' values='0;0;${height};0;0' keyTimes='0;0.82;0.88;0.94;1' dur='${duration}s' repeatCount='indefinite' begin='${delay}s' />
        </rect>
      `.trim()
    })
    .join('\n      ')
}

function addOutline (layers: Pixel[][], mask: Set<string>, color: string): void {
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ] as const
  mask.forEach((key) => {
    const [xs, ys] = key.split(',')
    const x = Number(xs)
    const y = Number(ys)
    offsets.forEach(([dx, dy]) => {
      const nx = x + dx
      const ny = y + dy
      const neighbourKey = `${nx},${ny}`
      if (!mask.has(neighbourKey)) {
        pushLayerPixel(layers, 0, nx, ny, color)
      }
    })
  })
}

export function generateMonsterSvg (name: string): string {
  const variationSeed = getRandomSeed()
  const seed = combineSeed(name, variationSeed)
  const rng = createRng(seed)

  const preset = randomChoice(rng, MONSTER_PRESETS)
  const palette = pickPalette(preset, rng)

  const layers: Pixel[][] = Array.from({ length: 6 }, () => [])
  const outlineMask = new Set<string>()

  const topRow = randomInt(rng, 4, 6)
  const height = randomInt(rng, preset.bodyHeight[0], preset.bodyHeight[1])
  const width = randomInt(rng, preset.bodyWidth[0], preset.bodyWidth[1])
  const center = Math.floor(GRID_SIZE / 2)

  const bodyMask = drawBody(
    layers,
    outlineMask,
    preset,
    topRow,
    height,
    width,
    center,
    palette.body,
    rng
  )

  if (preset.belly) {
    const bellyTop = topRow + Math.floor(height * 0.45)
    const bellyHeight = Math.max(4, Math.floor(height * 0.28))
    const bellyWidth = Math.floor(width * preset.bellyWidth)
    drawBelly(layers, outlineMask, center, bellyTop, bellyHeight, bellyWidth, palette.belly)
  }

  drawHighlights(layers, bodyMask, topRow, height, palette.body)
  drawPattern(layers, bodyMask, preset.pattern, palette.accent, rng, topRow, height)

  const eyeRow = topRow + Math.floor(height * 0.3) + preset.faceYOffset
  const eyeBoxes = drawEyes(layers, outlineMask, center, eyeRow, preset, palette, rng)

  if (preset.cheeks) {
    drawCheeks(layers, center, eyeRow + 4, lightenColor(palette.accent, 0.1))
  }

  if (preset.snout === true) {
    drawSnout(layers, center, eyeRow + 4, palette.belly)
  }

  if (preset.beak === true) {
    drawBeak(layers, center, eyeRow + 3, palette.accent)
  } else {
    drawMouth(layers, center, eyeRow + 6, palette.outline, rng)
  }

  drawEars(layers, outlineMask, center, topRow, preset.earStyle, palette.accent)
  drawTopAccessory(layers, outlineMask, center, topRow, palette.accent, preset.topAccessory)

  if (preset.arms) {
    drawArms(layers, outlineMask, center, topRow + Math.floor(height * 0.55), palette.body)
  }

  const wingGroups = drawWings(
    center,
    topRow,
    height,
    preset.wings,
    palette.accent,
    outlineMask,
    rng
  )

  drawTail(layers, outlineMask, center, topRow + height, palette.accent, preset.tail)
  drawFeet(layers, outlineMask, center, topRow + height, palette.accent, preset.feet)

  addOutline(layers, outlineMask, palette.outline)

  const layerMarkup = layers
    .map((pixels, index) => {
      if (pixels.length === 0) return ''
      return `
        <g data-layer='${index}'>
          ${buildRectMarkup(pixels)}
        </g>
      `.trim()
    })
    .filter((chunk) => chunk !== '')
    .join('\n      ')

  const wingsMarkup = wingGroups.map(buildAnimatedGroup).join('\n      ')
  const blinkMarkup = createBlinkMarkup(eyeBoxes, palette.lid, rng)
  const bounceDuration = (2.4 + rng() * 2).toFixed(2)

  return `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}' role='img' aria-label='Monstre pixel ${name}' shape-rendering='crispEdges'>
  <g>
    <g>
      ${layerMarkup}
      ${wingsMarkup}
      ${blinkMarkup}
    </g>
    <animateTransform attributeName='transform' type='translate' values='0 0; 0 ${PIXEL_SIZE}; 0 0' dur='${bounceDuration}s' repeatCount='indefinite' />
  </g>
</svg>
  `.trim()
}
