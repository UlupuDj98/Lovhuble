import { SEOHead } from '@/components/SEOHead'
import { About } from '@/views/About'

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="Chi siamo — Lovehuble"
        description="Lovehuble nasce dalla convinzione che il benessere intimo sia parte del benessere totale. Scopri la nostra storia e i nostri valori."
        canonical="/about"
      />
      <About />
    </>
  )
}
