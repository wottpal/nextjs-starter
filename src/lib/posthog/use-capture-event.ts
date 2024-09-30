'use client'
import { env } from '@/config/environment'
import { posthog } from '@/config/posthog-web'
import { getCookie } from 'cookies-next'
import { useCallback } from 'react'

export default function useCaptureEvent() {
  const captureEvent = useCallback((event: string, properties?: Record<string, string>) => {
    if (!posthog) {
      throw new Error('PostHog not initialized or called outside of client component')
    }

    // Get session id (set via middleware)
    const distinctId = getCookie('distinct_id')

    // Determine url
    const url = new URL(window.location.href)
    let cleanUrl = url.toString().replace(url.search, '')
    if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1)

    // Collect UTM properties
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    const utmProperties: Record<string, string> = {}
    utmParams.forEach((param) => {
      const value = url.searchParams.get(param)
      if (value) {
        utmProperties[param] = value
      }
    })

    posthog.capture(event, {
      $session_id: distinctId,
      $raw_user_agent: navigator.userAgent,
      $current_url: cleanUrl,
      search_params: url.search,
      ...utmProperties,
      ...(properties || {}),
    })
    posthog.flush()
  }, [])

  if (!env.NEXT_PUBLIC_PRODUCTION_MODE) return null
  if (!posthog) return null

  return captureEvent
}
