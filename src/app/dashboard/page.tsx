'use client'

import { Button } from '@/components/ui'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function DashboardPage (): Promise<React.ReactNode> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    redirect('/sign-in')
  }

  const handleSignOut = async (): Promise<void> => {
    await auth.api.signOut({
      headers: await headers()
    })
    redirect('/sign-in')
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <p>This is your dashboard.</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button
        onClick={() => {
          void handleSignOut()
        }}
      >
        Se déconnecter
      </Button>
    </div>
  )
}

export default DashboardPage
