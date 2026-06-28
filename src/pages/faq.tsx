import { SEOHead } from '@/components/SEOHead'
import { Faq } from '@/components/home/Faq'

export default function FaqPage() {
  return (
    <>
      <SEOHead
        title="FAQ — Domande Frequenti | Lovehuble"
        description="Tutto quello che devi sapere su pagamenti, spedizioni, resi, materiali e privacy. Risposte alle domande più frequenti su Lovehuble."
        canonical="/faq"
      />
      <div className="pt-[55px] lg:pt-[80px]">
        <Faq showAll />
      </div>
    </>
  )
}
