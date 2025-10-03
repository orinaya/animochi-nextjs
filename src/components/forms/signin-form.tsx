import { useState } from 'react'
import InputField from '../ui/input'
import { Button } from '../ui'
import { authClient } from '@/lib/auth-client'

interface Credentials {
  email: string
  password: string
}

interface SignInFormProps {
  onError: (error: string) => void
}

function SignInForm ({ onError }: SignInFormProps): React.ReactNode {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setIsLoading(true)

    void authClient.signIn.email(
      {
        email: credentials.email,
        password: credentials.password,
        callbackURL: '/dashboard',
      },
      {
        onRequest: (ctx) => {
          console.log('Sign-in request initiated:', ctx)
        },
        onSuccess: (ctx) => {
          console.log('Sign-in successful:', ctx)
          setIsLoading(false)
        },
        onError: (ctx) => {
          console.error('Sign-in error:', ctx)
          setIsLoading(false)
          onError(ctx.error?.message ?? 'Erreur lors de la connexion')
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
      <Button
        type='submit'
        variant='primary'
        color='strawberry'
        className='w-full py-3 font-semibold'
        disabled={isLoading}
      >
        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
      </Button>
    </form>
  )
}

export default SignInForm
