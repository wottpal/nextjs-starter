export type Alternates = {
  canonical: string
  languages: Record<string, string> & Record<'x-default', string>
}

// Modify if you want to add more collections
export type PageCollection = 'blog' | 'legal'
