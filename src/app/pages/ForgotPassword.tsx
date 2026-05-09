import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { medusa } from '@/app/lib/medusa'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await medusa.auth.resetPassword('customer', 'emailpass', { identifier: email })
    } catch {
      // Ignora errori — non rivelare se l'email è registrata
    } finally {
      setIsLoading(false)
      setSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo-1.png" alt="Lovehuble" className="h-12 mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Password dimenticata</h1>
          <p className="text-sm text-stone-500 mt-1">Ti invieremo un link per reimpostarla</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Email inviata</h2>
              <p className="text-sm text-stone-500">
                Se l&apos;email è associata a un account, riceverai a breve un link per reimpostare la password.
              </p>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="mt-6 text-sm text-[#7A1F3D] hover:underline"
              >
                Usa un&apos;altra email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="mario@esempio.it"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#7A1F3D] focus:ring-1 focus:ring-[#7A1F3D]/20 transition-colors bg-white text-[#1a1a1a] disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-white font-semibold transition-opacity disabled:opacity-60"
                style={{ background: 'linear-gradient(to right, #7A1F3D, #5e182f)' }}
              >
                {isLoading ? 'Invio in corso...' : 'Invia link di reset'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-stone-500 mt-6">
          Ricordi la password?{' '}
          <Link href="/login" className="text-[#7A1F3D] font-medium hover:underline">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  )
}
