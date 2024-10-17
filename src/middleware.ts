import { allPages } from 'content-collections'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { env } from './config/environment'
import { generateDistinctId } from './lib/posthog/utils'

export const config = {
  // Exclude API & static routes from being redirected
  matcher: ['/((?!api|_next|.*\\..*).*)'],
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
      const authValue = basicAuth.split(' ')[1]
      const [_, pwd] = atob(authValue).split(':')
      if (pwd !== env.SITE_PASSWORD) {
        url.pathname = '/api/auth/password/unauthorized'
        return wrapResponse(NextResponse.rewrite(url))
      }
    }
  }

  // Page Redirects
  const redirectedPage = allPages.find((page) => {
    if (!page.redirects?.length) return false
    return page.redirects.some((redirect) => redirect === url.pathname)
  })
  if (redirectedPage) {
    return wrapResponse(
      NextResponse.redirect(new URL(redirectedPage.slug, req.url), { status: 301 }),
    )
  }

  return wrapResponse(NextResponse.next())
}
