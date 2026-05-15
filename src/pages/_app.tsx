import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Newsletter } from '@/components/Newsletter'
import { CartDrawer } from '@/components/CartDrawer'
import { CookieModal } from '@/components/CookieModal'
import { Toaster } from '@/components/Toaster'
import { useScrollRestoration } from '@/hooks/useScrollRestoration'
import '@/styles/index.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

function AppInner({ Component, pageProps }: AppProps) {
  useScrollRestoration()

  return (
    <div className={`${inter.className} min-h-screen bg-[#f5f5f7] antialiased`}>
      <Toaster />
      <Navigation />
      <main>
        <Component {...pageProps} />
      </main>
      <Newsletter />
      <Footer />
      <CartDrawer />
      <CookieModal />
    </div>
  )
}

export default function App(props: AppProps) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <AppInner {...props} />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}
