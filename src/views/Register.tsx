import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

const inputClass = "w-full px-4 py-3 border border-stone-300 rounded-xl focus:outline-none focus:border-[#d4a5a5] focus:ring-1 focus:ring-[#d4a5a5]/20 transition-colors bg-white text-[#1a1a1a] disabled:opacity-60"

export function Register() {
  const router = useRouter()
  const { register } = useAuth()

  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ first_name: '', last_name: '', email: '', password: '', confirm: '' })

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const passwordRules = [
    { label: 'Almeno 8 caratteri', test: (v: string) => v.length >= 8 },
    { label: 'Almeno una maiuscola', test: (v: string) => /[A-Z]/.test(v) },
    { label: 'Almeno un numero', test: (v: string) => /[0-9]/.test(v) },
  ]

  const validatePassword = (v: string) => {
    const failing = passwordRules.filter(r => !r.test(v))
    return failing.length > 0 ? failing.map(r => r.label).join(', ') : ''
  }

  const validators: Record<string, (v: string) => string> = {
    first_name: v => !v.trim() ? 'Campo obbligatorio' : '',
    last_name: v => !v.trim() ? 'Campo obbligatorio' : '',
    email: v => v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Email non valida' : '',
    password: validatePassword,
    confirm: v => v && v !== form.password ? 'Le password non coincidono' : '',
  }

  const handleBlur = (field: string) => {
    setErrors(prev => ({ ...prev, [field]: validators[field]?.(form[field as keyof typeof form]) ?? '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      toast.error('Le password non coincidono')
      return
    }
    const pwdError = validatePassword(form.password)
    if (pwdError) {
      toast.error(`Password non valida: ${pwdError}`)
      return
    }
    setIsLoading(true)
    try {
      await register({
        email: form.email,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
      })
      router.push('/account')
    } catch (err: unknown) {
      const e = err as { message?: string; status?: number; alreadyExists?: boolean }
      if (e.alreadyExists || e.status === 409 || e.message?.toLowerCase().includes('exist')) {
        toast.error('Email già registrata. Prova ad accedere.')
      } else if (e.message?.toLowerCase().includes('password')) {
        toast.error(e.message)
      } else {
        toast.error('Errore durante la registrazione')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4 py-34">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Crea il tuo account</h1>
          <p className="text-sm text-stone-500 mt-1">Unisciti alla community Lovehuble</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Nome *</label>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={e => set('first_name', e.target.value)}
                  onBlur={() => handleBlur('first_name')}
                  required
                  placeholder="Mario"
                  disabled={isLoading}
                  className={`${inputClass} ${errors.first_name ? 'border-red-400' : ''}`}
                />
                {errors.first_name && <p className="mt-1 text-xs text-red-500">{errors.first_name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Cognome *</label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={e => set('last_name', e.target.value)}
                  onBlur={() => handleBlur('last_name')}
                  required
                  placeholder="Rossi"
                  disabled={isLoading}
                  className={`${inputClass} ${errors.last_name ? 'border-red-400' : ''}`}
                />
                {errors.last_name && <p className="mt-1 text-xs text-red-500">{errors.last_name}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                required
                placeholder="mario@esempio.it"
                disabled={isLoading}
                className={`${inputClass} ${errors.email ? 'border-red-400' : ''}`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  required
                  minLength={8}
                  placeholder="Minimo 8 caratteri"
                  disabled={isLoading}
                  className={`${inputClass} pr-12 ${errors.password ? 'border-red-400' : ''}`}
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
              {form.password.length > 0 && (
                <ul className="mt-2 space-y-0.5">
                  {passwordRules.map(rule => (
                    <li key={rule.label} className={`text-xs flex items-center gap-1.5 ${rule.test(form.password) ? 'text-green-600' : 'text-stone-400'}`}>
                      <span>{rule.test(form.password) ? '✓' : '○'}</span>
                      {rule.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Conferma password *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={e => set('confirm', e.target.value)}
                onBlur={() => handleBlur('confirm')}
                required
                placeholder="Ripeti la password"
                disabled={isLoading}
                className={`${inputClass} ${errors.confirm ? 'border-red-400' : ''}`}
              />
              {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-white font-semibold transition-opacity disabled:opacity-60"
              style={{ background: 'linear-gradient(to right, #d4a5a5, #c49494)' }}
            >
              {isLoading ? 'Registrazione in corso...' : 'Crea account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-stone-500 mt-6">
          Hai già un account?{' '}
          <Link href="/login" className="text-[#d4a5a5] font-medium hover:underline">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  )
}
