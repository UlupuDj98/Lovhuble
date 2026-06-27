import { SEOHead } from '@/components/SEOHead'
import { Login } from '@/views/Login'

export default function LoginPage() {
  return (
    <>
      <SEOHead title="Accedi al tuo account — Lovehuble" noIndex />
      <Login />
    </>
  )
}
