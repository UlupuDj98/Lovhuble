import { SEOHead } from '@/components/SEOHead'
import { Guide } from '@/views/Guide'

export default function GuidePage() {
  return (
    <>
      <SEOHead
        title="Guide all'acquisto — Lovehuble"
        description="Consigli esperti per scegliere il prodotto giusto. Dalle guide sui materiali ai consigli d'uso: tutto per vivere al meglio la tua intimità."
        canonical="/guide"
      />
      <Guide />
    </>
  )
}
