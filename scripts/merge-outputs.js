const fs = require('fs')
const path = require('path')

/**
 * Script pour fusionner les sorties Next.js et Docusaurus pour Vercel
 * Copie la build Docusaurus dans le répertoire de sortie Next.js
 */

const nextOutput = path.join(__dirname, '..', '.next')
const docsOutput = path.join(__dirname, '..', 'documentation', 'build')
const publicDir = path.join(__dirname, '..', 'public')
const targetDir = path.join(publicDir, 'documentation')

console.log('🔄 Fusion des outputs Next.js et Docusaurus...')

// Vérifier que la build Docusaurus existe
if (!fs.existsSync(docsOutput)) {
  console.error("❌ La build Docusaurus n'existe pas. Exécutez \"npm run build:docs\" d'abord.")
  process.exit(1)
}

// Créer le dossier public/documentation si nécessaire
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
  console.log('✅ Dossier public/documentation créé')
}

// Fonction récursive pour copier les fichiers
function copyRecursive (src, dest) {
  const stats = fs.statSync(src)

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }

    const files = fs.readdirSync(src)

    files.forEach((file) => {
      const srcPath = path.join(src, file)
      const destPath = path.join(dest, file)
      copyRecursive(srcPath, destPath)
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}

// Copier le contenu de la build Docusaurus
try {
  copyRecursive(docsOutput, targetDir)
  console.log('✅ Documentation copiée dans public/documentation')
  console.log('✅ Build fusionnée avec succès!')
  console.log('📍 La documentation sera accessible sur /documentation')
} catch (error) {
  console.error('❌ Erreur lors de la copie:', error)
  process.exit(1)
}
