import type {CreateMonsterFormValues} from "@/types"

export function validateCreateMonsterForm(values: CreateMonsterFormValues): string | null {
  if (values.name.trim() === "") {
    return "Le nom de la créature est requis."
  }

  if (values.draw.trim() === "") {
    return "Vous devez générer votre créature avant de pouvoir l’enregistrer."
  }

  if (values.ownerId.trim() === "") {
    return "Identifiant propriétaire manquant pour créer la créature."
  }

  return null
}
