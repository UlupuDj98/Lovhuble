import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { medusa } from '@/lib/medusa'

export function ResetPassword() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [invalidLink, setInvalidLink] = useState(false)

  const token = typeof router.query.token === 'string' ? router.query.token : ''
  const email = typeof router.query.email === 'string' ? router.query.email : ''

  useEffect(() => {
    if (router.isReady && (!token || !email)) {
      setInvalidLink(true)
    }
  }, [router.isReady, token, email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      toast.error('Le password non coincidono')
      return
    }
    if (password.length < 8) {
      toast.error('La password deve essere di almeno 8 caratteri')
      return
    }
    setIsLoading(true)
    try {
      await medusa.auth.updateProvider('customer', 'emailpass', { password }, token)
      toast.success('Password aggiornata con successo')
      router.push('/login')
    } catch (err: any) {
      const msg = err?.message ?? ''
      if (msg.includes('expired') || msg.includes('invalid')) {
        toast.error('Link scaduto o non valido. Richiedi un nuovo reset.')
      } else {
        toast.error('Errore durante il reset della password')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (invalidLink) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md text-center">
          <Link href="/">
            <Image src="/logo-1.png" alt="Lovehuble" width={192} height={48} className="h-12 w-auto mx-auto mb-6" />
          </Link>
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Link non valido</h2>
            <p className="text-sm text-stone-500 mb-6">
              Questo link è scaduto o non è valido. Richiedi un nuovo link di reset.
            </p>
            <Link
              href="/forgot-password"
              className="inline-block px-6 py-3 rounded-xl text-white font-semibold bg-[#D4A5A5]"
             
            >
              Richiedi nuovo link
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Nuova password</h1>
          <p className="text-sm text-stone-500 mt-1">Scegli una nuova password per il tuo account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Nuova password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Minimo 8 caratteri"
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 border border-stone-300 rounded-xl focus:outline-none focus:border-[#7A1F3D] focus:ring-1 focus:ring-[#7A1F3D]/20 transition-colors bg-white text-[#1a1a1a] disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Conferma password *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                placeholder="Ripeti la nuova password"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#7A1F3D] focus:ring-1 focus:ring-[#7A1F3D]/20 transition-colors bg-white text-[#1a1a1a] disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-white font-semibold transition-opacity disabled:opacity-60 bg-[#D4A5A5]"
          
            >
              {isLoading ? 'Salvataggio...' : 'Salva nuova password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
