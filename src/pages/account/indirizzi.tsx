import { SEOHead } from '@/components/SEOHead'
import { AccountIndirizzi } from '@/views/AccountIndirizzi'

export default function IndirizziPage() {
  return (
    <>
      <SEOHead title="I tuoi indirizzi — Lovehuble" noIndex />
      <AccountIndirizzi />
    </>
  )
}
