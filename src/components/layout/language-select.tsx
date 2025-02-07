'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Locale, routing } from '@/i18n/routing'
import { cn } from '@/utils/cn'
import type { Page } from 'content-collections'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { HTMLAttributes } from 'react'

interface LanguageSelectProps extends HTMLAttributes<HTMLButtonElement> {
  page: Page
}
export function LanguageSelect({ page, className, ...rest }: LanguageSelectProps) {
  const { locales } = routing
  const locale = useLocale()
  const router = useRouter()

  function onChange(newLocale: Locale) {
    if (locale === newLocale) return

    // Find alternate page in the requested locale (fallback to default locale)
    const languages = page.alternates.languages
    const alternateUrl = languages[newLocale] || languages[locale]
    if (!alternateUrl) return

    // Redirect to alternate page (without trailing slash)
    let alternatePath = new URL(alternateUrl).pathname
    alternatePath = alternatePath.replace(/\/$/, '')

    router.push(alternatePath)
  }

  return (
    <Select onValueChange={onChange} defaultValue={locale} value={locale}>
      <SelectTrigger
        className={cn(
          'w-auto min-w-[9rem] gap-2 bg-transparent font-medium hocus:text-foreground text-base text-muted-foreground/75 capitalize transition-all',
          className,
        )}
        {...rest}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent align="end">
        {locales.map((l) => (
          <SelectItem key={l} value={l} className="capitalize">
            {new Intl.DisplayNames(locale, { type: 'language' }).of(l)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
