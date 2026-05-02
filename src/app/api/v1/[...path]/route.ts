import { NextRequest, NextResponse } from "next/server"

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "http://localhost:8000"
const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "content-length",
  "content-encoding",
])

async function proxyRequest(request: NextRequest, pathSegments: string[]) {
  const url = new URL(`${BACKEND_BASE_URL}/api/v1/${pathSegments.join("/")}`)
  url.search = request.nextUrl.search

  const headers = new Headers(request.headers)
  headers.set("accept-encoding", "identity")

  const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer()

  const response = await fetch(url, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
  })

  const proxied = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
  })

  response.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase()

    if (lowerKey === "set-cookie") {
      proxied.headers.append(key, value)
      return
    }

    if (HOP_BY_HOP_HEADERS.has(lowerKey)) {
      return
    }

    proxied.headers.set(key, value)
  })

  return proxied
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRequest(request, path)
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRequest(request, path)
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRequest(request, path)
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRequest(request, path)
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRequest(request, path)
}

export async function OPTIONS(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  return proxyRequest(request, path)
}
