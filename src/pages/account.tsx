import { SEOHead } from '@/components/SEOHead'
import { Account } from '@/views/Account'

export default function AccountPage() {
  return (
    <>
      <SEOHead title="Il tuo account — Lovehuble" noIndex />
      <Account />
    </>
  )
}
