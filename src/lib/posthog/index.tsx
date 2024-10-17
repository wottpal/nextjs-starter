'use client'
import { useNavigationGuard } from 'next-navigation-guard'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { PosthogEvent } from './types'
import useCaptureEvent from './use-capture-event'

export default function Posthog() {
  const captureEvent = useCaptureEvent()
  const pathname = usePathname()

  // Capture $pageview for each pathname
  useEffect(() => {
    captureEvent?.(PosthogEvent.PAGEVIEW)
  }, [pathname])

  // Capture $pageleave with `next-navigation-guard`
  useNavigationGuard({
    enabled: () => {
      captureEvent?.(PosthogEvent.PAGELEAVE)
      return false
    },
  })

  return null
}
