import { SEOHead } from '@/components/SEOHead'
import { AccountProfilo } from '@/views/AccountProfilo'

export default function ProfiloPage() {
  return (
    <>
      <SEOHead title="Profilo — Lovehuble" noIndex />
      <AccountProfilo />
    </>
  )
}
