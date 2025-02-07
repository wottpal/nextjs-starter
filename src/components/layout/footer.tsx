import { Link, type Locale } from '@/i18n/routing'
import { getVisiblePages } from '@/lib/content-collections/get-pages'
import { cn } from '@/utils/cn'
import type { Page } from 'content-collections'
import { getLocale } from 'next-intl/server'
import type { HTMLAttributes } from 'react'
import { Wrapper } from './wrapper'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  page: Page
}
export async function Footer({ page, className, ...rest }: FooterProps) {
  const locale = (await getLocale()) as Locale
  const legalPages = getVisiblePages(locale, ['legal'])

  return (
    <footer className={cn('mt-10 w-full bg-muted/20', className)} {...rest}>
      <Wrapper>
        <div className="flex items-center justify-center gap-6">
          {legalPages.map((page) => (
            <Link
              key={page.slug}
              href={page.slug}
              prefetch={false}
              className="text-muted-foreground text-sm"
            >
              {page.shortTitle || page.title}
            </Link>
          ))}
        </div>
      </Wrapper>
    </footer>
  )
}
