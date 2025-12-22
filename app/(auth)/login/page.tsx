'use client'

import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { LoginScreen } from '@/components/LoginScreen'

interface User {
  id: string
  name: string
  role: 'Super Admin' | 'Admin' | 'Manager' | 'Staff' | 'Cashier'
  branch?: string
  avatar?: string
}

function LoginContent() {
  const router = useRouter()
  const [redirect, setRedirect] = useState('/dashboard')

  useEffect(() => {
    // Get redirect from URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const redirectParam = params.get('redirect')
      if (redirectParam) {
        const decoded = decodeURIComponent(redirectParam)
        // If redirect is '/', use '/dashboard' instead
        setRedirect(decoded === '/' ? '/dashboard' : decoded)
      }
    }
  }, [])

  const handleLogin = (username: string, password: string) => {
    try {
      console.log('=== LOGIN STARTED ===');
      console.log('Username:', username);
      console.log('Password:', password ? '***' : 'empty');
      console.log('Redirect:', redirect);
      
      // Mock login - in production, this would call an API
      const mockUser: User = {
        id: '1',
        name: username,
        role: 'Admin',
        branch: 'Head Office'
      }
      
      // Save to localStorage
      localStorage.setItem('lms_user', JSON.stringify(mockUser))
      localStorage.setItem('lms_token', 'mock-token-' + Date.now())
      
      // Also set cookie for middleware compatibility
      document.cookie = `lms_token=mock-token-${Date.now()}; path=/; max-age=86400`
      
      // Verify it was saved
      const saved = localStorage.getItem('lms_user')
      console.log('User saved to localStorage:', saved ? 'SUCCESS' : 'FAILED')
      console.log('Saved user data:', saved)
      
      // Determine final redirect URL
      const finalRedirect = redirect === '/' ? '/dashboard' : redirect
      console.log('Final redirect URL:', finalRedirect)
      
      // Force immediate redirect using window.location
      console.log('Redirecting NOW to:', finalRedirect)
      // Remove alert for smoother UX
      window.location.href = finalRedirect
      
    } catch (error) {
      console.error('=== LOGIN ERROR ===', error)
      alert('Login failed: ' + (error as Error).message)
    }
  }

  return <LoginScreen onLogin={handleLogin} />
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}

