import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

const STORAGE_PREFIX = 'scroll:'

function saveScroll(path: string) {
  try {
    sessionStorage.setItem(STORAGE_PREFIX + path, String(window.scrollY))
  } catch {}
}

function restoreScroll(path: string) {
  try {
    const saved = sessionStorage.getItem(STORAGE_PREFIX + path)
    if (saved === null) return

    const target = parseInt(saved, 10)

    // First attempt immediately after route change
    requestAnimationFrame(() => {
      window.scrollTo({ top: target, behavior: 'instant' })

      // Retry after 300ms to handle async content (images, fetches) that shift layout
      setTimeout(() => {
        window.scrollTo({ top: target, behavior: 'instant' })
        sessionStorage.removeItem(STORAGE_PREFIX + path)
      }, 300)
    })
  } catch {}
}

export function useScrollRestoration() {
  const router = useRouter()
  // Track whether the navigation was triggered by back/forward
  const isPopState = useRef(false)

  useEffect(() => {
    // Disable the browser's built-in scroll restoration so we control it
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const onPopState = () => {
      isPopState.current = true
    }

    const onRouteChangeStart = (url: string) => {
      saveScroll(router.asPath)
    }

    const onRouteChangeComplete = (url: string) => {
      if (isPopState.current) {
        restoreScroll(url)
      } else {
        // Normal forward navigation: scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
      isPopState.current = false
    }

    window.addEventListener('popstate', onPopState)
    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      window.removeEventListener('popstate', onPopState)
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router])
}
