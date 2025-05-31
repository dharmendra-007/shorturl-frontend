import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("userT")?.value

  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (e) {
    console.log(e)
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/links/:path*', '/analytics/:path*'],
};