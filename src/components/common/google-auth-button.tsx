"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import API from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: { credential: string }) => void
          }) => void
          prompt: () => void
        }
      }
    }
  }
}

export function GoogleAuthButton() {
  const { setSession } = useAuth()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const initialized = useRef(false)
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  useEffect(() => {
    if (!clientId || !ready || initialized.current || !window.google) return

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response) => {
        try {
          const res = await API.post("/api/v1/user/google", {
            credential: response.credential,
          })

          if (res.data.success) {
            setSession({
              token: null,
              user: res.data.user,
              isAuthenticated: true,
              isEmailVerified: true,
            })
            toast.success(res.data.message)
            router.push("/dashboard")
            router.refresh()
            return
          }

          toast.error(res.data.message)
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Google sign-in failed")
        }
      },
    })

    initialized.current = true
  }, [clientId, ready, router, setSession])

  return (
    <div className="space-y-2">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <Button
        type="button"
        variant="outline"
        className="w-full cursor-pointer gap-3 border-border/70 bg-background/80 py-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent/50"
        onClick={() => window.google?.accounts.id.prompt()}
        disabled={!ready || !clientId}
      >
        <Image src="/google.svg" alt="Google" width={20} height={20} className="shrink-0" />
        <span>{clientId ? "Sign in with Google" : "Google sign-in not configured"}</span>
      </Button>
    </div>
  )
}
