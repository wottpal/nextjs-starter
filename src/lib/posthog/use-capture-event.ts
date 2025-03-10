'use client'
import { env } from '@/config/env'
import { posthog } from '@/config/posthog-web'
import { getCookie } from 'cookies-next'
import { isbot } from 'isbot'
import { useCallback } from 'react'
import { type PosthogEvent, TRACKING_PARAMS } from './types'

export default function useCaptureEvent() {
  const captureEvent = useCallback((event: PosthogEvent, properties?: Record<string, string>) => {
    if (!posthog) {
      throw new Error('PostHog not initialized or called outside of client component')
    }

    const url = new URL(window.location.href)

    // Skip bots
    const userAgent = navigator.userAgent
    if (isbot(userAgent)) return

    // Get session id (set via middleware)
    const distinctId = getCookie('distinct_id')

    // Collect UTM properties
    const trackingProperties: Record<string, string> = {}
    for (const param of TRACKING_PARAMS) {
      const value = url.searchParams.get(param)
      if (!value) continue
      trackingProperties[param] = value
    }

    posthog.capture(event, {
      $session_id: distinctId,
      $raw_user_agent: userAgent,
      search_params: url.search,
      ...trackingProperties,
      ...(properties || {}),
    })
    posthog.flush()
  }, [])

  if (!env.NEXT_PUBLIC_PRODUCTION_MODE) return null
  if (!posthog) return null

  return captureEvent
}
