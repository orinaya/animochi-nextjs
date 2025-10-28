import { redirect } from 'next/navigation'

/**
 * Page de redirection vers la documentation Docusaurus
 *
 * Cette page redirige automatiquement vers /documentation/index.html
 * qui est le point d'entrée de la documentation statique générée par Docusaurus.
 */
export default function DocumentationPage (): never {
  redirect('/documentation/index.html')
}
