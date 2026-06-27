import { SEOHead } from '@/components/SEOHead'
import { Register } from '@/views/Register'

export default function RegisterPage() {
  return (
    <>
      <SEOHead title="Crea un account — Lovehuble" noIndex />
      <Register />
    </>
  )
}
