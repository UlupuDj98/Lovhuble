import { SEOHead } from '@/components/SEOHead'
import { TerminiCondizioni } from '@/views/TerminiCondizioni';

export default function TerminiCondizioniPage() {
  return (
    <>
      <SEOHead
        title="Termini e Condizioni — Lovehuble"
        description="Condizioni generali di vendita e utilizzo del sito Lovehuble."
        canonical="/termini-e-condizioni"
      />
      <TerminiCondizioni />
    </>
  )
}
