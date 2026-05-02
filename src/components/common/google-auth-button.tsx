"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import Image from "next/image"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import API from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

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
        oauth2: {
          initCodeClient: (config: {
            client_id: string
            scope: string
            ux_mode?: "popup" | "redirect"
            callback?: (response: {
              code?: string
              error?: string
              error_description?: string
            }) => void
            error_callback?: (error: { type?: string }) => void
            select_account?: boolean
          }) => {
            requestCode: () => void
          }
        }
      }
    }
  }
}

export function GoogleAuthButton() {
  const { setSession } = useAuth()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const initialized = useRef(false)
  const codeClientRef = useRef<{ requestCode: () => void } | null>(null)
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

    codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: "openid email profile",
      ux_mode: "popup",
      select_account: true,
      callback: async (response) => {
        if (!response.code) {
          toast.error(response.error_description || response.error || "Google sign-in failed")
          setLoading(false)
          return
        }

        try {
          const res = await API.post("/api/v1/user/google", {
            code: response.code,
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
        } finally {
          setLoading(false)
        }
      },
      error_callback: (error) => {
        if (error.type !== "popup_closed") {
          toast.error("Unable to open Google sign-in")
        }
        setLoading(false)
      },
    })

    window.google.accounts.id.prompt()
    initialized.current = true
  }, [clientId, ready, router, setSession])

  const handleGoogleLogin = () => {
    if (!clientId) {
      toast.error("Google sign-in is not configured")
      return
    }

    if (!codeClientRef.current) {
      toast.error("Google sign-in is still loading")
      return
    }

    setLoading(true)
    codeClientRef.current.requestCode()
  }

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
        onClick={handleGoogleLogin}
        disabled={!ready || !clientId || loading}
      >
        {loading ? <Loader className="animate-spin" /> : <Image src="/google.svg" alt="Google" width={20} height={20} className="shrink-0" />}
        <span>{clientId ? "Sign in with Google" : "Google sign-in not configured"}</span>
      </Button>
      {!clientId ? (
        <p className="text-center text-sm text-muted-foreground">Google sign-in not configured</p>
      ) : null}
    </div>
  )
}
