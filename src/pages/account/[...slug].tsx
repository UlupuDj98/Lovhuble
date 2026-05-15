import Link from 'next/link'
import AccountSidebar from '@/components/account/AccountSidebar'
import { useRequireAuth } from '@/hooks/useRequireAuth'

export default function AccountNotFound() {
  const { customer, isLoading } = useRequireAuth()

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
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-6xl font-bold text-stone-200 mb-4">404</p>
              <h1 className="text-xl font-semibold text-[#1a1a1a] mb-2">Pagina non trovata</h1>
              <p className="text-stone-500 text-sm mb-6">Questa sezione non esiste.</p>
              <Link
                href="/account"
                className="inline-block px-6 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(to right, #d4a5a5, #c49494)' }}
              >
                Torna al tuo account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
