import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'sonner'
import { medusa } from '@/lib/medusa'
import { MedusaCustomer } from '@/types/customer'

const JWT_STORAGE_KEY = 'lovehuble_auth_token'

interface AuthContextType {
  customer: MedusaCustomer | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (data: RegisterData) => Promise<void>
  refreshCustomer: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
  phone: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [customer, setCustomer] = useState<MedusaCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isRedirectingRef = useRef(false)
  // Ref per leggere il customer corrente dentro callback senza stale closure
  const customerRef = useRef<MedusaCustomer | null>(null)
  useEffect(() => { customerRef.current = customer }, [customer])

  const refreshCustomer = useCallback(async () => {
    try {
      const { customer: c } = await medusa.store.customer.retrieve()
      setCustomer(c as unknown as MedusaCustomer)
    } catch {
      setCustomer(null)
    }
  }, [])

  // Idrata la sessione al mount
  useEffect(() => {
    refreshCustomer().finally(() => setIsLoading(false))
  }, [refreshCustomer])

  // Intercetta 401 da rotte autenticate: token scaduto → logout + redirect.
  // Usa customerRef invece di localStorage: gestisce sia token corrotto che token eliminato.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const savedFetch = window.fetch

    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const response = await savedFetch(...args)
      const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url

      if (
        response.status === 401 &&
        url.includes('/api/medusa/') &&
        !url.includes('/api/medusa/auth/') &&
        customerRef.current !== null &&
        !isRedirectingRef.current
      ) {
        isRedirectingRef.current = true
        localStorage.removeItem(JWT_STORAGE_KEY)
        setCustomer(null)
        toast.error('Sessione scaduta. Effettua di nuovo il login.')
        window.location.href = '/login'
      }

      return response
    }

    return () => {
      window.fetch = savedFetch
    }
  }, [])

  // Controlla ad ogni navigazione se il token è stato eliminato da localStorage.
  // Se customer è in memoria ma il token non c'è più → svuota lo stato.
  useEffect(() => {
    const handleRouteChange = () => {
      if (customerRef.current !== null && !localStorage.getItem(JWT_STORAGE_KEY)) {
        setCustomer(null)
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  const login = async (email: string, password: string) => {
    // Passa per il nostro handler che gestisce rate limit e account lockout
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      const err = new Error(data.message || 'Login fallito') as Error & { status: number }
      err.status = res.status
      throw err
    }
    const { token } = await res.json()
    // Il SDK legge il token da questo localStorage key ad ogni richiesta
    if (typeof window !== 'undefined') {
      localStorage.setItem(JWT_STORAGE_KEY, token)
    }
    await refreshCustomer()
  }

  const logout = async () => {
    try {
      await medusa.auth.logout()
    } catch {
      // ignora errori di logout lato server
    } finally {
      setCustomer(null)
    }
  }

  const register = async ({ email, password, first_name, last_name, phone }: RegisterData) => {
    // Step 1 — crea credenziali; con type:'jwt' il SDK salva il token internamente
    // Medusa v2 restituisce 401 (non 409) se l'email è già registrata
    try {
      await medusa.auth.register('customer', 'emailpass', { email, password })
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status
      if (status === 401) {
        const e = new Error('Email già registrata') as Error & { alreadyExists: boolean }
        e.alreadyExists = true
        throw e
      }
      throw err
    }

    // Step 2 — crea profilo cliente; il SDK usa già il token salvato al passo 1
    await medusa.store.customer.create({ first_name, last_name, email, phone })

    // Step 3 — login per ottenere un token di sessione completo
    await login(email, password)
    toast.success('Benvenuto in Lovehuble!')
  }

  return (
    <AuthContext.Provider value={{ customer, isLoading, login, logout, register, refreshCustomer }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
