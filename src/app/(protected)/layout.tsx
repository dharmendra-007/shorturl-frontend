"use client"

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function ProtectedRoute({ children }: { children: React.ReactNode }) {

  const { isAuthenticated, isEmailVerified } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
      return
    }
    if (!isEmailVerified) {
      router.push('/verify-email')
    }
  }, [isAuthenticated, isEmailVerified, router])

  if (!isAuthenticated || !isEmailVerified) {
    return null
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute
