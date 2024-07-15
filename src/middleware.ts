import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { env } from './config/environment'

export const config = {
  // Exclude API & static routes from being redirected
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl

  // Password Protection
  if (env.SITE_PASSWORD) {
    // If no auth header is present, redirect to /api/auth
    const basicAuth = req.headers.get('authorization')
    if (!basicAuth) {
      url.pathname = '/api/auth/password/authenticate'
      return NextResponse.rewrite(url)
    }

    // If auth header is present, check if password is valid
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [_, pwd] = atob(authValue).split(':')
      if (pwd !== env.SITE_PASSWORD) {
        url.pathname = '/api/auth/password/unauthorized'
        return NextResponse.rewrite(url)
      }
    }
  }

  return NextResponse.next()
}
