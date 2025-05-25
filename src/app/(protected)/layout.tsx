"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function ProtectedRoute({ children }: { children: React.ReactNode }) {

  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading , router])

  if (loading || (!loading && !user)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Authenticating</CardTitle>
            <CardDescription>Please wait while we verify your account.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Loader2 className="animate-spin text-primary w-10 h-10 text-violet-600" />
            <p className="text-center text-sm text-muted-foreground">Checking auth...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute