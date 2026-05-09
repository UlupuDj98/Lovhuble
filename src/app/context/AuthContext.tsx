import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { toast } from 'sonner'
import { medusa } from '@/app/lib/medusa'
import { MedusaCustomer } from '@/types/customer'

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<MedusaCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const login = async (email: string, password: string) => {
    await medusa.auth.login('customer', 'emailpass', { email, password })
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

  const register = async ({ email, password, first_name, last_name }: RegisterData) => {
    // Step 1 — crea credenziali; con type:'jwt' il SDK salva il token internamente
    await medusa.auth.register('customer', 'emailpass', { email, password })

    // Step 2 — crea profilo cliente; il SDK usa già il token salvato al passo 1
    await medusa.store.customer.create({ first_name, last_name, email })

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
