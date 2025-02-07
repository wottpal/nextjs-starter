import type { Page } from 'content-collections'
import type { HTMLAttributes } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'

interface StandardLayoutProps extends HTMLAttributes<HTMLDivElement> {
  page: Page
}
export function StandardLayout({ page, children, ...rest }: StandardLayoutProps) {
  return (
    <div className="flex grow flex-col items-center justify-between gap-8" {...rest}>
      <Navbar page={page} />

      <main className="flex w-full grow flex-col">{children}</main>

      <Footer page={page} />
    </div>
  )
}
