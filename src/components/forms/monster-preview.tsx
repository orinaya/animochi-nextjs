/**
 * Props pour le composant MonsterPreview
 */
interface MonsterPreviewProps {
  /** Représentation SVG de la créature (vide si pas encore générée) */
  draw: string
}

/**
 * Composant d'aperçu visuel d'un monstre
 *
 * Affiche soit le SVG du monstre généré, soit un message d'invitation à générer.
 *
 * Respecte le principe SRP : Affichage uniquement de l'aperçu visuel
 *
 * @param {MonsterPreviewProps} props - Les propriétés du composant
 * @returns {React.ReactNode} L'aperçu du monstre ou un placeholder
 *
 * @example
 * ```tsx
 * <MonsterPreview draw={monsterSvg} />
 * ```
 */
function MonsterPreview ({ draw }: MonsterPreviewProps): React.ReactNode {
  // Si aucun SVG n'est généré, affiche un message d'invitation
  if (draw === '') {
    return (
      <div className='w-full aspect-square rounded-3xl border border-latte-200 bg-latte-25 flex items-center justify-center p-4'>
        <p className='text-center text-latte-600 px-6'>
          Générez votre créature pour prévisualiser son illustration animée ici.
        </p>
      </div>
    )
  }

  // Affiche le SVG généré
  return (
    <div className='w-full aspect-square rounded-3xl border border-latte-200 bg-latte-25 flex items-center justify-center overflow-hidden p-4'>
      <div
        className='w-full h-full flex items-center justify-center'
        dangerouslySetInnerHTML={{ __html: draw }}
      />
    </div>
  )
}

export default MonsterPreview
