'use client'

import { Dashboard } from '@/components/screens/Dashboard'
import { getCurrentUser } from '@/services/auth.service'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  if (!user) return null

  return <Dashboard user={user} />
}

