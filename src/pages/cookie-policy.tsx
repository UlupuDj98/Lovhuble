import { SEOHead } from '@/components/SEOHead'
import { CookiePolicy } from '@/views/CookiePolicy';

export default function CookiePolicyPage() {
  return (
    <>
      <SEOHead
        title="Cookie Policy — Lovehuble"
        description="Come Lovehuble utilizza i cookie per migliorare la tua esperienza di navigazione."
        canonical="/cookie-policy"
      />
      <CookiePolicy />
    </>
  )
}
