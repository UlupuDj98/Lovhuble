import { useState } from 'react'
import { toast } from 'sonner'
import { useRequireAuth } from '@/app/hooks/useRequireAuth'
import AccountSidebar from '@/app/components/account/AccountSidebar'
import { medusa } from '@/app/lib/medusa'

export function AccountProfilo() {
  const { customer, isLoading, refreshCustomer } = useRequireAuth()
  const [submitting, setSubmitting] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7A1F3D] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!customer) return null

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setSubmitting(true)
    try {
      await medusa.store.customer.update({
        first_name: fd.get('first_name') as string,
        last_name: fd.get('last_name') as string,
        phone: (fd.get('phone') as string) || undefined,
      })
      await refreshCustomer()
      toast.success('Profilo aggiornato')
    } catch {
      toast.error('Errore nell\'aggiornamento del profilo')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const newPassword = fd.get('new_password') as string
    const confirm = fd.get('confirm_password') as string

    if (newPassword !== confirm) {
      toast.error('Le password non coincidono')
      return
    }
    if (newPassword.length < 8) {
      toast.error('La password deve essere di almeno 8 caratteri')
      return
    }

    setChangingPassword(true)
    try {
      await medusa.store.customer.update({ password: newPassword })
      toast.success('Password aggiornata')
      ;(e.target as HTMLFormElement).reset()
    } catch {
      toast.error('Errore nell\'aggiornamento della password')
    } finally {
      setChangingPassword(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#d4a5a5] focus:ring-1 focus:ring-[#d4a5a5]/20 transition-colors bg-white text-[#1a1a1a] disabled:opacity-60"
  const labelClass = "block text-sm font-medium text-stone-700 mb-1.5"

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-[68px] lg:pt-[150px]">
      <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <AccountSidebar />

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a1a]">Profilo</h1>
              <p className="text-stone-500 mt-1">Gestisci le tue informazioni personali</p>
            </div>

            {/* Dati personali */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-semibold text-[#1a1a1a] mb-5">Dati personali</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nome</label>
                    <input
                      name="first_name"
                      type="text"
                      defaultValue={customer.first_name}
                      required
                      disabled={submitting}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Cognome</label>
                    <input
                      name="last_name"
                      type="text"
                      defaultValue={customer.last_name}
                      required
                      disabled={submitting}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    value={customer.email}
                    disabled
                    className={`${inputClass} cursor-not-allowed bg-stone-50`}
                  />
                  <p className="text-xs text-stone-400 mt-1">L&apos;email non può essere modificata</p>
                </div>

                <div>
                  <label className={labelClass}>Telefono</label>
                  <input
                    name="phone"
                    type="tel"
                    defaultValue={customer.phone ?? ''}
                    placeholder="+39 333 1234567"
                    disabled={submitting}
                    className={inputClass}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
                    style={{ background: 'linear-gradient(to right, #d4a5a5, #c49494)' }}
                  >
                    {submitting ? 'Salvataggio...' : 'Salva modifiche'}
                  </button>
                </div>
              </form>
            </div>

            {/* Cambio password */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-semibold text-[#1a1a1a] mb-5">Cambia password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className={labelClass}>Nuova password</label>
                  <input
                    name="new_password"
                    type="password"
                    required
                    minLength={8}
                    placeholder="Minimo 8 caratteri"
                    disabled={changingPassword}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Conferma nuova password</label>
                  <input
                    name="confirm_password"
                    type="password"
                    required
                    placeholder="Ripeti la nuova password"
                    disabled={changingPassword}
                    className={inputClass}
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="px-6 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
                    style={{ background: 'linear-gradient(to right, #d4a5a5, #c49494)' }}
                  >
                    {changingPassword ? 'Aggiornamento...' : 'Aggiorna password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
