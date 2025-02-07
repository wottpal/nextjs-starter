import type { Locale } from './routing'

import { findPage } from '@/lib/content-collections/find-page'
import { type NextRequest, NextResponse } from 'next/server'
import { routing } from './routing'

export function redirectToAlternatePage(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl
  const reqLocale = req.cookies.get('NEXT_LOCALE')?.value
  const resLocale = res.cookies.get('NEXT_LOCALE')?.value
  const locale = (reqLocale || resLocale || routing.defaultLocale) as Locale

  // Skip, if the default locale was requested
  if (locale === routing.defaultLocale) return res

  // Skip, if the path is prefixed
  const pathIsPrefixed = new RegExp(`^/(${routing.locales.join('|')})(/.*)?$`).test(url.pathname)
  if (url.pathname === '/' || pathIsPrefixed) return res

  // 1. Find page in default locale
  const slugItems = url.pathname.split('/').slice(1)
  const { page } = findPage(routing.defaultLocale, slugItems)
  if (!page) return res

  // 2. Find alternate page in the requested locale
  const languages = page.alternates.languages
  const alternateUrl = languages[locale]
  if (!alternateUrl) return res

  // 3. Redirect to alternate page (without trailing slash)
  let alternatePath = new URL(alternateUrl).pathname
  alternatePath = alternatePath.replace(/\/$/, '')

  return NextResponse.redirect(new URL(alternatePath, url), { status: 307 })
}
