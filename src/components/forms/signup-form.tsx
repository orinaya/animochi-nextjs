import { useState } from 'react'
import InputField from '../ui/input'
import { Button } from '../ui'
import { authClient } from '@/lib/auth-client'

interface Credentials {
  email: string
  password: string
  confirmPassword: string
}

interface SignUpFormProps {
  onError: (error: string) => void
}

function SignUpForm({ onError }: SignUpFormProps): React.ReactNode {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (credentials.password !== credentials.confirmPassword) {
      onError('Les mots de passe ne correspondent pas')
      return
    }

    if (credentials.password.length < 6) {
      onError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    setIsLoading(true)

    void authClient.signUp.email(
      {
        email: credentials.email,
        password: credentials.password,
        name: '',
        callbackURL: '/sign-in',
      },
      {
        onRequest: (ctx) => {
          console.log('Sign-up request initiated:', ctx)
        },
        onSuccess: (ctx) => {
          console.log('Sign-up successful:', ctx)
          setIsLoading(false)
        },
        onError: (ctx) => {
          console.error('Sign-up error:', ctx)
          setIsLoading(false)
          onError(ctx.error?.message ?? 'Erreur lors de la création du compte')
        }
      }
    )
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <InputField
        type='email'
        name='email'
        label='Adresse email'
        value={credentials.email}
        required
        onChange={(e) =>
          setCredentials({
            ...credentials,
            email: e.target.value
          })}
      />
      <InputField
        type='password'
        name='password'
        label='Mot de passe'
        value={credentials.password}
        required
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value
          })}
      />
      {/* <InputField
        type='password'
        name='confirmPassword'
        label='Confirmer le mot de passe'
        value={credentials.confirmPassword}
        required
        error={
          credentials.confirmPassword !== '' && credentials.password !== credentials.confirmPassword
            ? 'Les mots de passe ne correspondent pas'
            : ''
        }
        onChange={(e) =>
          setCredentials({
            ...credentials,
            confirmPassword: e.target.value
          })}
      /> */}
      <Button
        type='submit'
        variant='primary'
        color='strawberry'
        className='w-full py-3 font-semibold'
        disabled={isLoading}
      >
        {isLoading ? 'Création en cours...' : 'Créer mon compte'}
      </Button>
    </form>
  )
}

export default SignUpForm
