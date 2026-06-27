# Roadmap SEO & Metadata — Lovehuble

## Contesto
- Framework: **Next.js Pages Router** → i metadata si gestiscono con `next/head` in ogni pagina, NON con `export const metadata` (quello è App Router)
- Stato attuale: **zero metadata SEO** in nessuna pagina. Nessuna favicon nel `/public`
- Vincolo di brand: tono elegante e sensuale, mai volgare. Usare "benessere intimo", "piacere personale", "salute sessuale", "prodotti per adulti" — non linguaggio esplicito

---

## Step 0 — Componente `<SEOHead>` condiviso *(prerequisito)*

Creare `src/components/SEOHead.tsx` per evitare ripetizioni tra le pagine.

```tsx
// Props minime
interface SEOHeadProps {
  title: string          // es. "Sex Toys premium | Lovehuble"
  description: string    // max ~155 caratteri
  canonical?: string     // URL canonico assoluto
  ogImage?: string       // URL immagine Open Graph (1200×630)
  noIndex?: boolean      // true per checkout, account, carrello
}
```

Il componente wrappa `<Head>` di `next/head` e gestisce:
- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:type`, `og:url`
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- `<meta name="robots" content="noindex,nofollow">` quando `noIndex=true`

---

## Step 1 — Favicon set completo

**Problema:** `/public` contiene solo `logo-1.png`, nessun file favicon.

**Attenzione — logo con sfondo trasparente:**
- `logo-1.png` ha sfondo trasparente con testo nero → invisibile su dark mode e tab scure
- `apple-touch-icon`: Apple riempie la trasparenza di nero → testo nero su nero, illeggibile
- `og:image`: social media (Facebook, WhatsApp) non gestiscono la trasparenza
- Il wordmark è testo lungo: a 16×16 o 32×32px diventa illeggibile → usare solo la lettera iniziale per le dimensioni piccole

**Raccomandazione prima della generazione:**
1. Preparare una versione favicon con **background `#FFFFFF` o `#F5F5F7`** (grey brand) e ritagliata sull'iniziale "L" o "h" per le dimensioni ≤32px
2. Per `apple-touch-icon` e `og:image` usare il logo intero con sfondo solido
3. Su realfavicongenerator.net: impostare background color = `#FFFFFF` nel pannello delle opzioni

**Soluzione:** Generare il set completo da `logo-1.png`:

File da aggiungere in `/public`:
- `favicon.ico` (32×32, legacy)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `site.webmanifest`

Tool gratuito: **realfavicongenerator.net** — caricare `logo-1.png` e scaricare il pacchetto.

Poi in `_document.tsx` aggiungere nel `<Head>`:
```tsx
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon-32x32.png" type="image/png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

---

## Step 2 — Pagine statiche (metadata fissi)

Queste pagine non hanno dati dinamici; i metadata si scrivono direttamente nel file `.tsx`.

| Pagina | File | Title | Description | noIndex |
|--------|------|--------|-------------|---------|
| Homepage | `index.tsx` | `Lovehuble — Shop online per il tuo benessere intimo` | `Scopri la selezione curata di Lovehuble: sex toys, lingerie e accessori per adulti. Spedizione discreta, qualità premium.` | no |
| Chi siamo | `about.tsx` | `Chi siamo — Lovehuble` | `Lovehuble nasce dalla convinzione che il benessere intimo sia parte del benessere totale. Scopri la nostra storia e i nostri valori.` | no |
| Guide | `guide.tsx` | `Guide all'acquisto — Lovehuble` | `Consigli esperti per scegliere il prodotto giusto. Dalle guide sui materiali ai consigli d'uso: tutto per vivere al meglio la tua intimità.` | no |
| Blog | `blog/index.tsx` | `Blog sul benessere intimo — Lovehuble` | `Articoli, consigli e approfondimenti sul piacere, la salute sessuale e il benessere intimo. Aggiornato ogni settimana.` | no |
| Wishlist | `wishlist.tsx` | `Lista desideri — Lovehuble` | `I tuoi prodotti preferiti salvati in un unico posto.` | **sì** |
| Carrello | `cart.tsx` | `Carrello — Lovehuble` | `Riepilogo dei tuoi articoli selezionati.` | **sì** |
| Checkout | `checkout.tsx` | `Checkout — Lovehuble` | `Completa il tuo ordine in modo sicuro.` | **sì** |
| Login | `login.tsx` | `Accedi al tuo account — Lovehuble` | — | **sì** |
| Registrazione | `register.tsx` | `Crea un account — Lovehuble` | — | **sì** |
| Password dimenticata | `forgot-password.tsx` | `Recupera password — Lovehuble` | — | **sì** |
| Reset password | `reset-password.tsx` | `Nuova password — Lovehuble` | — | **sì** |
| Account | `account.tsx` | `Il tuo account — Lovehuble` | — | **sì** |
| Profilo | `account/profilo.tsx` | `Profilo — Lovehuble` | — | **sì** |
| Ordini | `account/ordini.tsx` | `I tuoi ordini — Lovehuble` | — | **sì** |
| Dettaglio ordine | `account/ordini/[id].tsx` | `Ordine #[id] — Lovehuble` | — | **sì** |
| Indirizzi | `account/indirizzi.tsx` | `I tuoi indirizzi — Lovehuble` | — | **sì** |
| Privacy Policy | `privacy-policy.tsx` | `Privacy Policy — Lovehuble` | `Informativa sul trattamento dei dati personali ai sensi del GDPR.` | no |
| Cookie Policy | `cookie-policy.tsx` | `Cookie Policy — Lovehuble` | `Come Lovehuble utilizza i cookie per migliorare la tua esperienza di navigazione.` | no |
| Termini e Condizioni | `termini-e-condizioni.tsx` | `Termini e Condizioni — Lovehuble` | `Condizioni generali di vendita e utilizzo del sito Lovehuble.` | no |
| 404 | `404.tsx` | `Pagina non trovata — Lovehuble` | — | **sì** |

---

## Step 3 — Pagine dinamiche (metadata da getStaticProps)

### 3a. Categoria — `/prodotti/[categoria]`
File: `prodotti/[categoria]/index.tsx`

Il campo `initialCategoryName` è già disponibile da `getStaticProps`.

```tsx
// title:       "{Nome Categoria} — Lovehuble"
// description: "Esplora la nostra selezione di {nome categoria}: prodotti per adulti di qualità premium con spedizione discreta."
// canonical:   `https://lovehuble.com/prodotti/${categorySlug}`
// ogImage:     immagine di categoria da public/categorie/{slug}.png se esiste
```

### 3b. Sottocategoria — `/prodotti/[categoria]/[subcategoria]`
File: `prodotti/[categoria]/[subcategoria]/index.tsx`

Il campo `initialSubCategoryName` è già disponibile.

```tsx
// title:       "{Nome Sottocategoria} — {Nome Categoria} | Lovehuble"
// description: "Scopri la collezione {nome sottocategoria} di Lovehuble: qualità, discrezione e spedizione sicura."
// canonical:   `https://lovehuble.com/prodotti/${categoria}/${subcategoria}`
```

### 3c. Prodotto — `/prodotti/[categoria]/[subcategoria]/[slug]`
File: `prodotti/[categoria]/[subcategoria]/[slug].tsx`

Il campo `initialProduct` contiene `name`, `description`, `image`.

```tsx
// title:       "{product.name} — Lovehuble"
// description: product.subtitle ?? product.description.slice(0, 155)
// canonical:   `https://lovehuble.com/prodotti/${categoria}/${subcategoria}/${slug}`
// ogImage:     product.image
// og:type:     "product" (+ structured data JSON-LD, vedi Step 4)
```

### 3d. Bambole — `/prodotti/bambole/[slug]`
File: `prodotti/bambole/[slug].tsx`

Stessa logica di 3c, canonical punta a `/prodotti/bambole/${slug}`.

### 3e. Articolo blog — `/blog/[id]`
File: `blog/[id].tsx`

Il campo `post` contiene `title`, `subtitle`, `excerpt`, `coverImage`.

```tsx
// title:       "{post.title} — Blog Lovehuble"
// description: post.excerpt ?? post.subtitle
// canonical:   `https://lovehuble.com/blog/${post.id}`
// ogImage:     post.coverImage
// og:type:     "article"
```

---

## Step 4 — Structured Data JSON-LD (bonus SEO)

Da aggiungere nelle pagine prodotto per apparire nei rich results di Google:

```tsx
// In <Head>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.image,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": `https://lovehuble.com/prodotti/${categoria}/${subcategoria}/${slug}`
      }
    })
  }}
/>
```

Per la homepage aggiungere `WebSite` con `SearchAction` (sitelinks search box).

---

## Step 5 — robots.txt e sitemap

**robots.txt** — creare `public/robots.txt`:
```
User-agent: *
Disallow: /account
Disallow: /cart
Disallow: /checkout
Disallow: /api/
Allow: /

Sitemap: https://lovehuble.com/sitemap.xml
```

**sitemap.xml** — creare `src/pages/sitemap.xml.tsx` come pagina dinamica con `getServerSideProps` che genera la sitemap con tutte le URL prodotto/categoria/blog.

Oppure usare il pacchetto `next-sitemap` (più rapido):
```bash
npm install next-sitemap
# poi creare next-sitemap.config.js
```

---

## Ordine di priorità consigliato

1. **Step 0** — `SEOHead` component (foundation, sblocca tutto il resto)
2. **Step 1** — Favicon (visibilità immediata in browser e SERP)
3. **Step 3c / 3d** — Metadata prodotti (pagine più importanti per la SEO)
4. **Step 2** — Pagine statiche (quick wins)
5. **Step 3a / 3b** — Categorie e sottocategorie
6. **Step 3e** — Blog
7. **Step 4** — JSON-LD prodotti
8. **Step 5** — robots.txt + sitemap

---

## Note sul tono SEO per Lovehuble

Google può penalizzare o escludere dall'indicizzazione contenuti per adulti espliciti.
Linee guida per i testi:

- ✅ "benessere intimo", "piacere personale", "salute sessuale", "prodotti per adulti"
- ✅ "lingerie", "accessori per coppia", "massaggiatore personale"  
- ✅ "discrezione garantita", "spedizione in packaging neutro"
- ❌ Mai termini volgari o esplicitamente sessuali nelle meta description/title
- ❌ Evitare parole che attivano i filtri SafeSearch in modo aggressivo

Il dominio `lovehuble.com` è già neutro e sicuro dal punto di vista SEO.
