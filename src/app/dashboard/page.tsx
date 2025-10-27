import { getMonsters } from '@/actions/monsters.action'
import DashboardContent from '@/components/dashboard/dashboard-content'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

async function DashboardPage (): Promise<React.ReactNode> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const monsters = await getMonsters()
  const plainMonsters = JSON.parse(JSON.stringify(monsters))
  if (session === null || session === undefined) {
    redirect('/sign-in')
  }

  return (
    <DashboardContent session={session} monsters={plainMonsters} />
  )
}

export default DashboardPage
