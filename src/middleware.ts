import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { env } from './config/env'
import { routing } from './i18n/routing'
import { redirectToAlternatePage } from './i18n/utils'
import { generateDistinctId } from './lib/posthog/utils'

// IMPORTANT: Must be imported after 'next/server'
import createMiddleware from 'next-intl/middleware'

export const config = {
  matcher: [
    // Match all paths except for API routes and static files.
    '/((?!api|ingest|_next|_vercel|.*\\..*).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl

  const wrapResponse = async (res: NextResponse) => {
    // Posthog Distinct ID
    const distinctId = req.cookies.get('distinct_id')
    if (!distinctId) res.cookies.set('distinct_id', await generateDistinctId(req))

    return res
  }

  // Password Protection
  if (env.SITE_PASSWORD) {
    // If no auth header is present, redirect to /api/auth
    const basicAuth = req.headers.get('authorization')
    if (!basicAuth) {
      url.pathname = '/api/auth/password/authenticate'
      return wrapResponse(NextResponse.rewrite(url))
    }

    // If auth header is present, check if password is valid
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1] || ''
      const [_, pwd] = atob(authValue).split(':')
      if (pwd !== env.SITE_PASSWORD) {
        url.pathname = '/api/auth/password/unauthorized'
        return wrapResponse(NextResponse.rewrite(url))
      }
    }
  }

  // Middleware: next-intl
  let res = createMiddleware(routing)(req)

  // Manually redirect unprefixed paths to alternate pages
  res = redirectToAlternatePage(req, res)

  return wrapResponse(res)
}
