import { SEOHead } from '@/components/SEOHead'
import { AccountOrdineDettaglio } from '@/views/AccountOrdineDettaglio'

export default function OrdineDettaglioPage() {
  return (
    <>
      <SEOHead title="Dettaglio ordine — Lovehuble" noIndex />
      <AccountOrdineDettaglio />
    </>
  )
}
