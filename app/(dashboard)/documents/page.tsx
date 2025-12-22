'use client'

import { DocumentDownloads } from '@/components/screens/DocumentDownloads'
import { getCurrentUser } from '@/services/auth.service'
import { useEffect, useState } from 'react'

export default function DocumentsPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  if (!user) return null

  return <DocumentDownloads user={user} />
}

