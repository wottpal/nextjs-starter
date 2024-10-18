export type Locale = 'en' | 'de'
export type Alternates = {
  canonical: string
  languages: Record<Locale | 'x-default', string>
}

// Modify if you want to add more collections
export type PageCollection = 'blog'
