import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { CartProvider } from '@/app/context/CartContext'
import { WishlistProvider } from '@/app/context/WishlistContext'
import { Navigation } from '@/app/components/Navigation'
import { Footer } from '@/app/components/Footer'
import { Newsletter } from '@/app/components/Newsletter'
import { CartDrawer } from '@/app/components/CartDrawer'
import { Toaster } from '@/app/components/Toaster'
import { LiveChat } from '@/app/components/LiveChat'
import { useScrollRestoration } from '@/app/hooks/useScrollRestoration'
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
      <LiveChat />
    </div>
  )
}

export default function App(props: AppProps) {
  return (
    <WishlistProvider>
      <CartProvider>
        <AppInner {...props} />
      </CartProvider>
    </WishlistProvider>
  )
}
