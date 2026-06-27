import { useState, useEffect } from 'react'

export function useComparePrice(variantId: string | undefined): number | null {
  const [comparePrice, setComparePrice] = useState<number | null>(null)

  useEffect(() => {
    if (!variantId) {
      setComparePrice(null)
      return
    }

    const controller = new AbortController()

    fetch(`/api/medusa/store/variants/compare-prices?variant_ids=${variantId}`, {
      headers: { 'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_KEY ?? '' },
      signal: controller.signal,
    })
      .then(r => r.json())
      .then(data => setComparePrice(data?.compare_prices?.[variantId] ?? null))
      .catch(() => {})

    return () => controller.abort()
  }, [variantId])

  return comparePrice
}
