import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import AccountSidebar from '@/components/account/AccountSidebar'
import { medusa } from '@/lib/medusa'
import { formatPrice } from '@/utils/price'


const PAYMENT_LABELS: Record<string, string> = {
  pending: 'In attesa', captured: 'Pagato', authorized: 'Autorizzato',
  partially_captured: 'Parz. pagato', refunded: 'Rimborsato', canceled: 'Annullato',
}
const FULFILLMENT_LABELS: Record<string, string> = {
  not_fulfilled: 'Non spedito', fulfilled: 'Spedito',
  partially_fulfilled: 'Parz. spedito', returned: 'Reso', canceled: 'Annullato',
}
const PAYMENT_COLORS: Record<string, string> = {
  captured: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700',
  authorized: 'bg-blue-100 text-blue-700', refunded: 'bg-red-100 text-red-700',
  canceled: 'bg-stone-100 text-stone-500',
}
const FULFILLMENT_COLORS: Record<string, string> = {
  fulfilled: 'bg-blue-100 text-blue-700', not_fulfilled: 'bg-orange-100 text-orange-700',
  partially_fulfilled: 'bg-purple-100 text-purple-700', returned: 'bg-red-100 text-red-700',
  canceled: 'bg-stone-100 text-stone-500',
}

export function AccountOrdineDettaglio() {
  const router = useRouter()
  const { customer, isLoading } = useRequireAuth()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [order, setOrder] = useState<any>(null)
  const [loadingOrder, setLoadingOrder] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const orderId = typeof router.query.id === 'string' ? router.query.id : ''

  useEffect(() => {
    if (!customer || !orderId) return
    medusa.store.order
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .retrieve(orderId, { fields: '+items.*,+items.variant.*,+fulfillments.*,+payment_collections.*,+shipping_address.*' } as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any) => setOrder(data.order ?? data))
      .catch(() => setError('Ordine non trovato'))
      .finally(() => setLoadingOrder(false))
  }, [customer, orderId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!customer) return null

  const paymentColor = PAYMENT_COLORS[order?.payment_status] ?? 'bg-stone-100 text-stone-500'
  const fulfillmentColor = FULFILLMENT_COLORS[order?.fulfillment_status] ?? 'bg-stone-100 text-stone-500'
  const trackingNumber = order?.fulfillments?.[0]?.tracking_numbers?.[0]
  const trackingUrl = order?.fulfillments?.[0]?.tracking_urls?.[0]
  const addr = order?.shipping_address

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-[68px] lg:pt-[150px]">
      <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <AccountSidebar />

          <div className="flex-1 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-stone-400">
              <Link href="/account/ordini" className="hover:text-[#d4a5a5] transition-colors">
                I miei ordini
              </Link>
              <span>/</span>
              <span className="text-stone-600">
                {order ? `#${order.display_id}` : '...'}
              </span>
            </div>

            {loadingOrder ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error || !order ? (
              <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
                <p className="text-red-500 font-medium">{error ?? 'Ordine non trovato'}</p>
                <Link href="/account/ordini" className="mt-4 inline-block text-sm text-[#d4a5a5] hover:underline">
                  Torna agli ordini
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Header */}
                <div className="bg-white rounded-2xl border border-stone-200 shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-5 bg-stone-50 border-b border-stone-200">
                    <div>
                      <h1 className="text-xl font-bold text-black">Ordine #{order.display_id}</h1>
                      <p className="text-sm text-stone-400 mt-0.5">
                        {new Date(order.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentColor}`}>
                        {PAYMENT_LABELS[order.payment_status] ?? order.payment_status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${fulfillmentColor}`}>
                        {FULFILLMENT_LABELS[order.fulfillment_status] ?? order.fulfillment_status}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-5 space-y-4">
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">Prodotti</h2>
                    {order.items?.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-4">
                        {item.thumbnail ? (
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 relative">
                            <Image src={item.thumbnail} alt={item.title} fill className="object-contain" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-stone-100 flex-shrink-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-black truncate">{item.title}</p>
                          {item.variant?.title && item.variant.title !== 'Default Title' && (
                            <p className="text-sm text-stone-500">{item.variant.title}</p>
                          )}
                          <p className="text-sm text-stone-400">× {item.quantity}</p>
                          {item.metadata?.productUrl && (
                            <Link href={item.metadata.productUrl} className="text-sm text-[#D4A5A5] hover:underline">
                              Visualizza prodotto
                            </Link>
                          )}
                        </div>
                        <p className="font-semibold text-black flex-shrink-0">{formatPrice(item.total)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Totali */}
                  <div className="px-5 pb-5 border-t border-stone-100 pt-4 space-y-2">
                    {order.subtotal != null && (
                      <div className="flex justify-between text-sm text-stone-500">
                        <span>Subtotale</span>
                        <span>{formatPrice(order.subtotal)}</span>
                      </div>
                    )}
                    {order.discount_total > 0 && (
                      <div className="flex justify-between text-sm text-green-600 font-semibold">
                        <span>Sconto</span>
                        <span>-{formatPrice(order.discount_total)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-stone-500">
                      <span>Spedizione</span>
                      <span className="text-green-600 font-medium">Gratuita</span>
                    </div>
                    <div className="flex justify-between font-bold text-black text-base pt-2 border-t border-stone-100">
                      <span>Totale</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Indirizzo di spedizione */}
                {addr && (
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5">
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">Indirizzo di spedizione</h2>
                    <p className="font-medium text-black">{addr.first_name} {addr.last_name}</p>
                    <p className="text-stone-500 text-sm mt-1">{addr.address_1}</p>
                    <p className="text-stone-500 text-sm">{addr.postal_code} {addr.city}</p>
                    {addr.phone && <p className="text-stone-500 text-sm mt-1">{addr.phone}</p>}
                  </div>
                )}

                {/* Tracking */}
                {trackingNumber && (
                  <div className="bg-white rounded-2xl border border-stone-200 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5">
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">Tracciamento spedizione</h2>
                    <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                      <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-stone-600">
                        {trackingUrl ? (
                          <a href={trackingUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#d4a5a5]">
                            {trackingNumber}
                          </a>
                        ) : trackingNumber}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
