import { Link } from '@/i18n/routing'
import logoSvg from '@/public/brand/logo.svg'
import { cn } from '@/utils/cn'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import type { FC, HTMLAttributes } from 'react'

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  noLink?: boolean
  asH1?: boolean
}

export const Logo: FC<LogoProps> = async ({
  noLink = false,
  asH1 = false,
  className,
  ...props
}) => {
  const t = await getTranslations('Metadata')
  const Text = asH1 ? 'h1' : 'span'

  const content = (
    <div className={cn('flex select-none items-center gap-2.5', className)} {...props}>
      <Image src={logoSvg} height={24} className="shrink-0" alt={`${t('name')} Logo`} priority />

      <Text
        className={cn(
          'whitespace-nowrap font-medium font-sans text-foreground text-lg leading-none tracking-tight',
        )}
      >
        {t('name')}
      </Text>
    </div>
  )

  return noLink ? content : <Link href="/">{content}</Link>
}
