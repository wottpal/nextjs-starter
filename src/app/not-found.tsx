import { redirect } from 'next/navigation'

export default async function NotFoundPage() {
  return redirect('/')
}
