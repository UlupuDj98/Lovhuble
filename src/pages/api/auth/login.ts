import type { NextApiRequest, NextApiResponse } from 'next'

const WINDOW_MS = 15 * 60 * 1000 // 15 minuti
const MAX_IP_REQUESTS = 10
const MAX_FAILED_LOGINS = 5

const ipAttempts = new Map<string, { count: number; resetAt: number }>()
const emailLockouts = new Map<string, { count: number; lockedUntil: number }>()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  const email = (req.body?.email as string | undefined)?.toLowerCase().trim()
  const now = Date.now()

  // Rate limit per IP
  const ipEntry = ipAttempts.get(ip)
  if (ipEntry && now < ipEntry.resetAt) {
    if (ipEntry.count >= MAX_IP_REQUESTS) {
      return res.status(429).json({ message: 'Troppe richieste. Riprova tra 15 minuti.' })
    }
    ipEntry.count++
  } else {
    ipAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
  }

  // Account lockout per email
  if (email) {
    const lockEntry = emailLockouts.get(email)
    if (lockEntry && lockEntry.lockedUntil > now) {
      return res.status(429).json({ message: 'Account bloccato per troppi tentativi. Riprova tra 15 minuti.' })
    }
  }

  // Forward a Medusa
  const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_URL ?? 'http://localhost:9000'
  const medusaKey = process.env.NEXT_PUBLIC_MEDUSA_KEY ?? ''

  let medusaRes: Response
  try {
    medusaRes = await fetch(`${medusaUrl}/auth/customer/emailpass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': medusaKey,
      },
      body: JSON.stringify(req.body),
    })
  } catch {
    return res.status(502).json({ message: 'Errore del server. Riprova più tardi.' })
  }

  const data = await medusaRes.json()

  // Aggiorna lockout in base alla risposta di Medusa
  if (email) {
    if (medusaRes.status === 401) {
      const current = emailLockouts.get(email) ?? { count: 0, lockedUntil: 0 }
      const newCount = current.count + 1
      emailLockouts.set(email, {
        count: newCount,
        lockedUntil: newCount >= MAX_FAILED_LOGINS ? now + WINDOW_MS : 0,
      })
    } else if (medusaRes.status < 400) {
      emailLockouts.delete(email)
    }
  }

  return res.status(medusaRes.status).json(data)
}
