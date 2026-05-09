import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/app/context/AuthContext'

const inputClass = "w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#d4a5a5] focus:ring-1 focus:ring-[#d4a5a5]/20 transition-colors bg-white text-[#1a1a1a] disabled:opacity-60"

export function Login() {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const from = typeof router.query.from === 'string' ? router.query.from : '/account'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password)
      router.push(from)
    } catch {
      toast.error('Email o password errati')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Accedi al tuo account</h1>
          <p className="text-sm text-stone-500 mt-1">Bentornato in Lovehuble</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
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
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-stone-700">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#d4a5a5] hover:underline">
                  Password dimenticata?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  disabled={isLoading}
                  className={`${inputClass} pr-12`}
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-white font-semibold transition-opacity disabled:opacity-60"
              style={{ background: 'linear-gradient(to right, #d4a5a5, #c49494)' }}
            >
              {isLoading ? 'Accesso in corso...' : 'Accedi'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-stone-500 mt-6">
          Non hai un account?{' '}
          <Link href="/register" className="text-[#d4a5a5] font-medium hover:underline">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  )
}
