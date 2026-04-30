"use client"

import { createContext, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { SessionState } from "@/lib/session"
import API from "@/lib/axios"

interface AuthContextType {
  user: SessionState["user"]
  loading: boolean
  isAuthenticated: boolean
  isEmailVerified: boolean
  loginLoading: boolean
  signupLoading: boolean
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  logout: () => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  setSession: (session: SessionState) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({
  children,
  initialSession,
}: {
  children: React.ReactNode
  initialSession: SessionState
}) => {
  const [session, setSessionState] = useState<SessionState>(initialSession)
  const [loading] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [signupLoading, setSignUpLoading] = useState(false)
  const router = useRouter()

  const setSession = (nextSession: SessionState) => {
    setSessionState(nextSession)
  }

  const login = async (email: string, password: string, rememberMe = false) => {
    setLoginLoading(true)
    try {
      const response = await API.post("/api/v1/user/login", { email, password, rememberMe })
      if (response.data.success) {
        const nextUser = response.data.user as SessionState["user"] | undefined
        setSession({
          token: null,
          user: nextUser ?? session.user,
          isAuthenticated: true,
          isEmailVerified: Boolean(nextUser?.emailVerified ?? true),
        })
        toast.success(response.data.message)
        router.push("/")
        router.refresh()
        return
      }

      toast.error(response.data.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Network error")
    } finally {
      setLoginLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setSignUpLoading(true)
    try {
      const response = await API.post("/api/v1/user/", { name, email, password })
      if (response.data.success) {
        toast.success(response.data.message)
        router.push("/login")
        router.refresh()
        return
      }

      toast.error(response.data.message)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Network error")
    } finally {
      setSignUpLoading(false)
    }
  }

  const logout = async () => {
    try {
      const response = await API.post("/api/v1/user/logout", {})
      setSession({
        token: null,
        user: null,
        isAuthenticated: false,
        isEmailVerified: false,
      })
      toast.success(response.data.message)
      router.push("/")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Network error")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        loading,
        isAuthenticated: session.isAuthenticated,
        isEmailVerified: session.isEmailVerified,
        login,
        logout,
        signup,
        loginLoading,
        signupLoading,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
