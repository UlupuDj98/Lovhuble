import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/app/context/AuthContext'

export function useRequireAuth() {
  const { customer, isLoading, refreshCustomer } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !customer) {
      router.push(`/login?from=${encodeURIComponent(router.pathname)}`)
    }
  }, [customer, isLoading, router])

  return { customer, isLoading, refreshCustomer }
}
