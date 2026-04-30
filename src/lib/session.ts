export type SessionUser = {
  _id: string
  name: string
  email: string
  avatar?: string | null
  emailVerified?: boolean
}

export type SessionState = {
  token: string | null
  user: SessionUser | null
  isAuthenticated: boolean
  isEmailVerified: boolean
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")

  if (typeof atob === "function") {
    return atob(padded)
  }

  return Buffer.from(padded, "base64").toString("utf8")
}

export function decodeSessionFromToken(token?: string | null): SessionState {
  if (!token) {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
      isEmailVerified: false,
    }
  }

  try {
    const payload = token.split(".")[1]
    if (!payload) {
      throw new Error("Invalid token")
    }

    const parsed = JSON.parse(decodeBase64Url(payload)) as Partial<SessionUser> & {
      exp?: number
    }

    if (parsed.exp && parsed.exp * 1000 < Date.now()) {
      throw new Error("Token expired")
    }

    const user: SessionUser = {
      _id: String(parsed._id ?? ""),
      name: String(parsed.name ?? ""),
      email: String(parsed.email ?? ""),
      avatar: parsed.avatar ?? null,
      emailVerified: Boolean(parsed.emailVerified),
    }

    return {
      token,
      user,
      isAuthenticated: Boolean(user._id && user.email),
      isEmailVerified: Boolean(user.emailVerified),
    }
  } catch {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
      isEmailVerified: false,
    }
  }
}
