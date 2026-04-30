import { NextRequest, NextResponse } from "next/server"
import { AUTH_COOKIE_NAME } from "@/lib/auth"

function decodeTokenPayload(token: string) {
  try {
    const payload = token.split(".")[1]
    if (!payload) return null
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/")
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")
    const decoded = JSON.parse(atob(padded))
    return decoded
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const pathname = request.nextUrl.pathname
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup")
  const isProtectedPage = pathname.startsWith("/dashboard") || pathname.startsWith("/links") || pathname.startsWith("/analytics")
  const isVerifyPage = pathname.startsWith("/verify-email")

  if (!token) {
    if (isProtectedPage || isVerifyPage) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.next()
  }

  const payload = decodeTokenPayload(token)
  const isVerified = Boolean(payload?.emailVerified)

  if (!isVerified && !isVerifyPage) {
    return NextResponse.redirect(new URL("/verify-email", request.url))
  }

  if (isVerified && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/links/:path*", "/analytics/:path*", "/login", "/signup", "/verify-email"],
}
