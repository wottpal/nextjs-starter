'use client'

import { env } from '@/config/environment'
import { usePathname, useSearchParams } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

export default function PosthogPageView(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (
      !env.NEXT_PUBLIC_PRODUCTION_MODE ||
      !env.NEXT_PUBLIC_POSTHOG_HOST ||
      !env.NEXT_PUBLIC_POSTHOG_KEY
    )
      return
    if (!pathname || !posthog) return

    let url = window.origin + pathname
    if (searchParams.toString()) {
      url = `${url}?${searchParams.toString()}`
    }
    posthog.capture('$pageview', {
      $current_url: url,
    })
  }, [pathname, searchParams, posthog])

  return null
}
