import { useState, useEffect, useCallback } from 'react'
import { useRequireAuth } from '@/app/hooks/useRequireAuth'
import AccountSidebar from '@/app/components/account/AccountSidebar'
import AccountStats from '@/app/components/account/AccountStats'
import OrderCard from '@/app/components/account/OrderCard'
import { medusa } from '@/app/lib/medusa'
import { CustomerOrder } from '@/types/customer'

export function Account() {
  const { customer, isLoading } = useRequireAuth()
  const [orders, setOrders] = useState<CustomerOrder[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  const fetchOrders = useCallback(async () => {
    try {
      const { orders: raw } = await medusa.store.order.list({
        limit: 10,
        fields: '+items.*,+items.variant.*,+fulfillments.*,+subtotal,+discount_total',
      })
      setOrders(raw as unknown as CustomerOrder[])
    } catch {
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

  const orderCount = orders.length
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0)
  const recentOrders = orders.slice(0, 3)

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-[70px] lg:pt-[150px]">
      <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <AccountSidebar />

          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a1a]">
                Ciao, {customer.first_name}!
              </h1>
              <p className="text-stone-500 mt-1">Ecco il riepilogo del tuo account</p>
            </div>

            <AccountStats
              customer={customer}
              orderCount={orderCount}
              totalSpent={totalSpent}
            />

            <div>
              <div className="flex items-center justify-between mb-4 mt-10">
                <h2 className="text-lg font-semibold text-[#1a1a1a]">Ordini recenti</h2>
                {orders.length > 3 && (
                  <a href="/account/ordini" className="text-sm text-[#d4a5a5] hover:underline">
                    Vedi tutti
                  </a>
                )}
              </div>

              {loadingOrders ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-2 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : recentOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-center">
                  <svg className="w-12 h-12 text-stone-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-stone-500 font-medium">Nessun ordine ancora</p>
                  <a href="/prodotti" className="mt-4 inline-block text-sm text-[#d4a5a5] hover:underline">
                    Inizia a fare shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map(order => (
                    <OrderCard key={order.id} order={order} compact />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
