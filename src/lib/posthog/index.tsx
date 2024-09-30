'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import useCaptureEvent from './use-capture-event'

export default function Posthog() {
  const captureEvent = useCaptureEvent()
  const pathname = usePathname()

  // Capture pageview for each pathname
  useEffect(() => {
    captureEvent?.('$pageview')
  }, [pathname])

  return null
}
