import { SEOHead } from '@/components/SEOHead'
import { ResetPassword } from '@/views/ResetPassword'

export default function ResetPasswordPage() {
  return (
    <>
      <SEOHead title="Nuova password — Lovehuble" noIndex />
      <ResetPassword />
    </>
  )
}
