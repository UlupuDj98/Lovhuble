import { SEOHead } from '@/components/SEOHead'
import { PrivacyPolicy } from '@/views/PrivacyPolicy';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy — Lovehuble"
        description="Informativa sul trattamento dei dati personali ai sensi del GDPR."
        canonical="/privacy-policy"
      />
      <PrivacyPolicy />
    </>
  )
}
