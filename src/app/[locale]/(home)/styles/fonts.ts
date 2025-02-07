import { cn } from '@/utils/cn'
import { Geist, Geist_Mono } from 'next/font/google'

// const dmSans = DM_Sans({
//   variable: '--font-dm-sans',
//   subsets: ['latin'],
// })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const fontStyles = cn(geistSans.variable, geistMono.variable)
