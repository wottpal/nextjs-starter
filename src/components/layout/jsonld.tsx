import type { Thing, WithContext } from 'schema-dts'

interface JsonLdProps<T extends Thing> {
  data: WithContext<T>
}

export const JsonLd = <T extends Thing>({ data }: JsonLdProps<T>) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
)
