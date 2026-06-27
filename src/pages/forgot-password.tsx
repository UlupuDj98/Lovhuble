import { SEOHead } from '@/components/SEOHead'
import { ForgotPassword } from '@/views/ForgotPassword'

export default function ForgotPasswordPage() {
  return (
    <>
      <SEOHead title="Recupera password — Lovehuble" noIndex />
      <ForgotPassword />
    </>
  )
}
