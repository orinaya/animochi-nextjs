'use client'

import { useState } from 'react'
import SignInForm from './signin-form'
import SignUpForm from './signup-form'
import {
  Button,
  ErrorMessage,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  FloatingMonster
} from '../ui'

function AuthFormContent(): React.ReactNode {
  const [isSignIn, setIsSignIn] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const handleAuthError = (errorMessage: string): void => {
    setError(errorMessage)
  }

  const handleFormSwitch = (): void => {
    setIsSignIn(!isSignIn)
    setError('') // Clear errors when switching forms
  }

  return (
    <div className='min-h-screen bg-latte-50 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Formes organiques en arrière-plan */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-peach-100 rounded-full opacity-60' />
      <div className='absolute top-40 right-20 w-24 h-24 bg-latte-200 rounded-full opacity-50' />
      <div className='absolute bottom-32 left-20 w-40 h-40 bg-strawberry-100 rounded-full opacity-40' />
      <div className='absolute bottom-20 right-16 w-28 h-28 bg-latte-200 rounded-full opacity-70' />

      {/* Monstres flottants plus discrets */}
      <FloatingMonster
        emoji='�'
        size='sm'
        className='absolute top-16 left-16 opacity-30'
        delay={0}
      />
      <FloatingMonster
        emoji='🎃'
        size='sm'
        className='absolute top-24 right-24 opacity-25'
        delay={2}
      />
      <FloatingMonster
        emoji='�'
        size='sm'
        className='absolute bottom-24 left-24 opacity-35'
        delay={4}
      />
      <FloatingMonster
        emoji='🦄'
        size='sm'
        className='absolute bottom-16 right-16 opacity-30'
        delay={6}
      />

      {/* Main Auth Card */}
      <Card variant='elevated' className='w-full max-w-md relative z-10'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-blueberry-950'>
            {isSignIn ? 'Bon retour !' : 'Rejoignez Animochi'}
          </CardTitle>
          <CardDescription className='text-base text-latte-600'>
            {isSignIn
              ? 'Connectez-vous pour retrouver vos monstres préférés'
              : 'Créez votre compte et découvrez des créatures magiques'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ErrorMessage message={error} />

          {isSignIn
            ? (
              <SignInForm onError={handleAuthError} />
            )
            : (
              <SignUpForm onError={handleAuthError} />
            )}

          <div className='mt-6 text-center'>
            <Button
              type='button'
              variant='ghost'
              color='blueberry'
              onClick={handleFormSwitch}
              className='text-sm hover:bg-latte-25'
            >
              {isSignIn
                ? "Vous n'avez pas de compte ? Créer un compte"
                : 'Vous avez déjà un compte ? Se connecter'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthFormContent
