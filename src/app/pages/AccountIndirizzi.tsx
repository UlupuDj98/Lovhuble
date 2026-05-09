import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { useRequireAuth } from '@/app/hooks/useRequireAuth'
import AccountSidebar from '@/app/components/account/AccountSidebar'
import AddressCard from '@/app/components/account/AddressCard'
import AddressForm from '@/app/components/account/AddressForm'
import { medusa } from '@/app/lib/medusa'
import { CustomerAddress } from '@/types/customer'

type Mode = 'list' | 'add' | 'edit'

export function AccountIndirizzi() {
  const { customer, isLoading } = useRequireAuth()
  const [addresses, setAddresses] = useState<CustomerAddress[]>([])
  const [loadingAddresses, setLoadingAddresses] = useState(true)
  const [mode, setMode] = useState<Mode>('list')
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | undefined>()
  const [submitting, setSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const refreshAddresses = useCallback(async () => {
    try {
      const { addresses: raw } = await medusa.store.customer.listAddress()
      setAddresses(raw as unknown as CustomerAddress[])
    } catch {
      setAddresses([])
    } finally {
      setLoadingAddresses(false)
    }
  }, [])

  useEffect(() => {
    if (customer) refreshAddresses()
  }, [customer, refreshAddresses])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!customer) return null

  const handleSubmit = async (data: Omit<CustomerAddress, 'id'> & { id?: string }) => {
    setSubmitting(true)
    try {
      const body = {
        first_name: data.first_name,
        last_name: data.last_name,
        company: data.company || undefined,
        address_1: data.address_1,
        address_2: data.address_2 || undefined,
        city: data.city,
        province: data.province,
        country_code: data.country_code.toLowerCase(),
        postal_code: data.postal_code,
        phone: data.phone || undefined,
        is_default_shipping: data.is_default_shipping,
        is_default_billing: data.is_default_shipping,
      }

      if (mode === 'add') {
        await medusa.store.customer.createAddress(body)
        toast.success('Indirizzo aggiunto')
      } else if (mode === 'edit' && editingAddress?.id) {
        await medusa.store.customer.updateAddress(editingAddress.id, body)
        toast.success('Indirizzo aggiornato')
      }

      await refreshAddresses()
      setMode('list')
      setEditingAddress(undefined)
    } catch (err: unknown) {
      console.error('[createAddress] error:', err)
      const msg = (err as { message?: string })?.message
      toast.error(msg ? `Errore: ${msg}` : 'Errore nel salvataggio dell\'indirizzo')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await medusa.store.customer.deleteAddress(id)
      await refreshAddresses()
      toast.success('Indirizzo eliminato')
    } catch {
      toast.error('Errore nell\'eliminazione')
    } finally {
      setDeletingId(null)
    }
  }

  const handleSetDefault = async (address: CustomerAddress) => {
    setDeletingId(address.id)
    try {
      await medusa.store.customer.updateAddress(address.id, {
        is_default_shipping: true,
        is_default_billing: true,
      })
      await refreshAddresses()
      toast.success('Indirizzo predefinito aggiornato')
    } catch {
      toast.error('Errore nell\'aggiornamento')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-[68px] lg:pt-[150px]">
      <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <AccountSidebar />

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a1a]">Indirizzi</h1>
                <p className="text-stone-500 mt-1">{addresses.length} indirizzi salvati</p>
              </div>
              {mode === 'list' && (
                <button
                  onClick={() => setMode('add')}
                  className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold bg-black"
                 
                >
                  + Aggiungi indirizzo
                </button>
              )}
            </div>

            {(mode === 'add' || mode === 'edit') && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                <h2 className="text-lg font-semibold text-[#1a1a1a] mb-5">
                  {mode === 'add' ? 'Nuovo indirizzo' : 'Modifica indirizzo'}
                </h2>
                <AddressForm
                  address={editingAddress}
                  onSubmit={handleSubmit}
                  onCancel={() => { setMode('list'); setEditingAddress(undefined) }}
                  isLoading={submitting}
                />
              </div>
            )}

            {mode === 'list' && (
              loadingAddresses ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 border-2 border-[#d4a5a5] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : addresses.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 p-12 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-center">
                  <svg className="w-14 h-14 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-stone-600 font-medium mb-2">Nessun indirizzo salvato</p>
                  <p className="text-stone-400 text-sm">Aggiungi un indirizzo per velocizzare il checkout</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map(addr => (
                    <AddressCard
                      key={addr.id}
                      address={addr}
                      isLoading={deletingId === addr.id}
                      onEdit={() => { setEditingAddress(addr); setMode('edit') }}
                      onDelete={() => handleDelete(addr.id)}
                      onSetDefault={addr.is_default_shipping ? undefined : () => handleSetDefault(addr)}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
