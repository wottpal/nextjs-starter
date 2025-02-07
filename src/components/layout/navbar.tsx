import { cn } from '@/utils/cn'
import type { Page } from 'content-collections'
import type { HTMLAttributes } from 'react'
import { LanguageSelect } from './language-select'
import { Logo } from './logo'
import { Wrapper } from './wrapper'

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  page: Page
}
export async function Navbar({ page, className, ...rest }: NavbarProps) {
  return (
    <nav className={cn('mb-10 w-full bg-muted/20', className)} {...rest}>
      <Wrapper>
        <div className="flex items-center justify-between gap-6">
          <Logo />

          <LanguageSelect page={page} />
        </div>
      </Wrapper>
    </nav>
  )
}
