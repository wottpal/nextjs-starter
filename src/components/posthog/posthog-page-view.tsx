'use client'
import { posthog } from '@/config/posthog'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PosthogPageView(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track pageviews
  useEffect(() => {
    if (!posthog) return
    if (!pathname || !searchParams) return

    let url = window.origin + pathname
    if (searchParams.toString()) {
      url = `${url}?${searchParams.toString()}`
    }

    posthog.capture('$pageview', {
      $current_url: url,
      $raw_user_agent: navigator.userAgent,
    })
  }, [pathname, searchParams])

  return null
}
