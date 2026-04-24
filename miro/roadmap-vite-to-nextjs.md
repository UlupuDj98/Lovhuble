# Roadmap: Migrazione da Vite.js a Next.js (Pages Router)

## Contesto

Progetto attuale: React + Vite + React Router v7, Tailwind CSS 4, MUI, Radix UI.
Obiettivo: migrare a Next.js con Pages Router, mantenendo la stessa struttura di route e tutti i componenti esistenti.

---

## Fase 1 — Dipendenze e configurazione base

### 1.1 Aggiorna `package.json`

Rimuovere:
- `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`
- `react-router`

Aggiungere:
- `next`
- `@tailwindcss/postcss` (Tailwind 4 usa postcss in Next.js)

Scripts da aggiornare:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

### 1.2 Crea `next.config.ts`

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig
```

### 1.3 Aggiorna `postcss.config.mjs`

Tailwind 4 con Next.js usa il plugin postcss invece del plugin Vite:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### 1.4 Elimina i file Vite

- `vite.config.ts`
- `index.html` (Next.js genera il documento HTML da solo)

---

## Fase 2 — Struttura delle pagine (`src/pages/`)

Creare la directory `src/pages/`. Ogni file diventa automaticamente una route.

Mappa route attuali → file Next.js:

| Route attuale (React Router) | File Next.js Pages Router |
|---|---|
| `/` | `src/pages/index.tsx` |
| `/products` | `src/pages/products/index.tsx` |
| `/products/:id` | `src/pages/products/[id].tsx` |
| `/cart` | `src/pages/cart.tsx` |
| `/guide` | `src/pages/guide.tsx` |
| `/about` | `src/pages/about.tsx` |

Ogni file esporta il componente di pagina come default export:

```tsx
// src/pages/index.tsx
import { Home } from '../app/pages/Home'
export default function HomePage() {
  return <Home />
}
```

I componenti pagina in `src/app/pages/` restano invariati — i file in `src/pages/` sono solo i wrapper Next.js.

---

## Fase 3 — `_app.tsx` e `_document.tsx`

### 3.1 `src/pages/_app.tsx` — sostituisce `Root.tsx` + `App.tsx`

`_app.tsx` è il layout globale di Next.js. Sposta qui providers e layout:

```tsx
import type { AppProps } from 'next/app'
import { CartProvider } from '../app/context/CartContext'
import { WishlistProvider } from '../app/context/WishlistContext'
import { Navigation } from '../app/components/Navigation'
import { Footer } from '../app/components/Footer'
import { CartDrawer } from '../app/components/CartDrawer'
import { Toaster } from '../app/components/Toaster'
import '../styles/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen bg-white antialiased">
          <Toaster />
          <Navigation />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </WishlistProvider>
  )
}
```

### 3.2 `src/pages/_document.tsx` — struttura HTML

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

---

## Fase 4 — Migrazione di React Router → Next.js

### 4.1 `<Link>` e navigazione

Sostituire tutti gli import `react-router` con `next/link` e `next/router`:

| React Router | Next.js |
|---|---|
| `import { Link } from 'react-router'` | `import Link from 'next/link'` |
| `import { useNavigate } from 'react-router'` | `import { useRouter } from 'next/router'` |
| `navigate('/products')` | `router.push('/products')` |
| `useParams()` | `router.query` |
| `useLocation()` | `router.pathname` / `router.asPath` |

### 4.2 Parametri dinamici (ProductDetail)

In `src/app/pages/ProductDetail.tsx` attualmente usa `useParams()` da React Router:

```tsx
// Prima (React Router)
const { id } = useParams()

// Dopo (Next.js)
import { useRouter } from 'next/router'
const router = useRouter()
const { id } = router.query
```

### 4.3 `ScrollToTop`

Il componente `ScrollToTop.tsx` ascolta i cambi di route con React Router. In Next.js si usa `router.events`:

```tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const ScrollToTop = () => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => window.scrollTo(0, 0)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])
  return null
}
```

---

## Fase 5 — Emotion / MUI con Next.js

MUI usa Emotion per lo styling. Next.js richiede configurazione SSR per Emotion, altrimenti si hanno flash di stile.

### 5.1 Installa `@emotion/server`

```bash
pnpm add @emotion/server
```

### 5.2 Aggiorna `_document.tsx` per Emotion SSR

```tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../app/lib/createEmotionCache' // da creare

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)
    // ... configurazione standard MUI + Next.js
  }
}
```

Riferimento ufficiale: [MUI Next.js Pages Router example](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-pages-router).

---

## Fase 6 — Pulizia e file da eliminare/spostare

| File / directory | Azione |
|---|---|
| `src/main.tsx` | Eliminare (sostituito da `_app.tsx`) |
| `src/app/App.tsx` | Eliminare |
| `src/app/routes.tsx` | Eliminare |
| `src/app/components/Root.tsx` | Eliminare (logica in `_app.tsx`) |
| `src/app/components/ScrollToTop.tsx` | Aggiornare (vedi Fase 4.3) |
| `vite.config.ts` | Eliminare |
| `index.html` | Eliminare |

---

## Fase 7 — Verifica finale

- [ ] `pnpm dev` avvia senza errori
- [ ] Tutte le route rispondono: `/`, `/products`, `/products/[id]`, `/cart`, `/guide`, `/about`
- [ ] `useRouter().query.id` funziona in ProductDetail
- [ ] Scroll to top funziona alla navigazione
- [ ] MUI non produce FOUC (flash of unstyled content)
- [ ] Tailwind applica correttamente gli stili
- [ ] Dark mode (`next-themes`, già in dipendenze) funziona
- [ ] `pnpm build` completa senza errori

---

## Riepilogo dipendenze

| Pacchetto | Operazione |
|---|---|
| `next` | Aggiungere |
| `@emotion/server` | Aggiungere |
| `@tailwindcss/postcss` | Aggiungere |
| `react-router` | Rimuovere |
| `vite` | Rimuovere |
| `@vitejs/plugin-react` | Rimuovere |
| `@tailwindcss/vite` | Rimuovere |
