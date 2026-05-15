import { useState, useEffect, useCallback } from 'react'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import AccountSidebar from '@/components/account/AccountSidebar'
import OrderCard from '@/components/account/OrderCard'
import { medusa } from '@/lib/medusa'
import { CustomerOrder } from '@/types/customer'

export function AccountOrdini() {
  const { customer, isLoading } = useRequireAuth()
  const [orders, setOrders] = useState<CustomerOrder[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoadingOrders(true)
      setError(null)
      const { orders: raw } = await medusa.store.order.list({
        limit: 50,
        fields: '+items.*,+items.variant.*,+fulfillments.*,+payment_collections.*,+subtotal,+discount_total',
      })
      console.log('[orders] raw:', raw)
      setOrders(raw as unknown as CustomerOrder[])
    } catch (err) {
      console.error('[orders] fetch error:', err)
      setError('Impossibile caricare gli ordini')
      setOrders([])
    } finally {
      setLoadingOrders(false)
    }
  }, [])

  useEffect(() => {
    if (customer) fetchOrders()
  }, [customer, fetchOrders])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!customer) return null

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-[68px] lg:pt-[150px]">
      <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <AccountSidebar />

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a1a]">I miei ordini</h1>
              <p className="text-stone-500 mt-1">
                {orders.length > 0 ? `${orders.length} ordini totali` : 'Nessun ordine ancora'}
              </p>
            </div>

            {loadingOrders ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-center">
                <svg className="w-14 h-14 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-stone-600 font-medium mb-2">Nessun ordine ancora</p>
                <p className="text-stone-400 text-sm mb-6">I tuoi acquisti appariranno qui</p>
                <a
                  href="/prodotti"
                  className="inline-block px-6 py-3 rounded-xl text-white font-semibold text-sm"
                  style={{ background: 'linear-gradient(to right, #d4a5a5, #c49494)' }}
                >
                  Vai allo shop
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
