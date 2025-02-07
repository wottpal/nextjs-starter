export type Alternates = {
  canonical: string
  languages: Record<string, string> & Record<'x-default', string>
}

// Modify to add more collections
export type PageCollection = 'legal' | 'blog'
