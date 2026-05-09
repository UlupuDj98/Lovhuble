import Medusa from '@medusajs/js-sdk'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/medusa`
  }
  return process.env.NEXT_PUBLIC_MEDUSA_URL ?? 'http://localhost:9000'
}

export const medusa = new Medusa({
  baseUrl: getBaseUrl(),
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_KEY ?? '',
  auth: {
    type: 'jwt',
    jwtTokenStorageKey: 'lovehuble_auth_token',
    // 'local' = localStorage → persiste tra refresh di pagina
    // Lato server Next.js non esiste localStorage: il SDK fa automaticamente fallback a 'memory'
    jwtTokenStorageMethod: 'local',
  },
})
