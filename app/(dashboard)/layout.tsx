'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { MainLayout } from '@/components/layout/MainLayout'

interface User {
  id: string
  name: string
  role: string
  branch?: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = () => {
      console.log('Dashboard layout: Checking authentication...')
      const savedUser = localStorage.getItem('lms_user')
      console.log('Saved user found:', savedUser ? 'YES' : 'NO')
      
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          console.log('User data parsed:', userData)
          setUser(userData)
          setIsLoading(false)
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('lms_user')
          localStorage.removeItem('lms_token')
          router.push('/login')
        }
      } else {
        console.log('No user found, redirecting to login')
        router.push('/login')
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('lms_user')
    router.push('/login')
  }

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <MainLayout user={user} onLogout={handleLogout} currentPath={pathname}>
      {children}
    </MainLayout>
  )
}

