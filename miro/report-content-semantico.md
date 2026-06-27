# Report: Contenuto Semantico — Lovehuble
*Dopo la struttura SEO (metadata, JSON-LD base, sitemap). Cosa manca a livello di contenuto.*

---

## Contesto

La struttura è a posto: ogni pagina ha title, description, canonical, og:*, robots e JSON-LD base.
Quello che manca è il **contenuto** che Google legge per capire di cosa tratta ogni pagina e decidere se posizionarla.
Senza contenuto testuale sufficiente, anche i metadata migliori non bastano.

---

## 1. JSON-LD aggiuntivi (impatto alto, effort basso)

### 1a. BreadcrumbList
I breadcrumb **visivi** ci sono già (componente `Breadcrumb`, usato in `PageHeader` e `ProductDetail`).
Manca però lo schema JSON-LD corrispondente.
Google lo usa per mostrare il percorso di navigazione direttamente nella SERP al posto dell'URL grezzo.

**Dove aggiungerlo:**
- `PageHeader` (categorie, sottocategorie)
- `ProductDetail` (pagine prodotto)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lovehuble.com" },
    { "@type": "ListItem", "position": 2, "name": "Sex Toys", "item": "https://lovehuble.com/prodotti/sex-toys" },
    { "@type": "ListItem", "position": 3, "name": "Vibratore Rosa", "item": "https://lovehuble.com/prodotti/sex-toys/vibratori/vibratore-rosa" }
  ]
}
```

### 1b. FAQPage
Il componente `Faq` in homepage contiene 6 domande/risposte hardcoded di qualità.
Con lo schema `FAQPage` Google mostra le risposte espanse direttamente nei risultati (accordion in SERP).

**Dove aggiungerlo:** `src/components/home/Faq.tsx` — aggiungere `jsonLd` al `SEOHead` della homepage oppure un `<script>` direttamente nel componente.

Le domande attuali sono tutte su logistica. Aggiungere almeno 2-3 domande su:
- "I prodotti sono anonimi in fattura?" (privacy)
- "Che materiali usate?" (body-safe, silicone medicale)
- "Posso acquistare senza registrarmi?" (UX)

### 1c. AggregateRating in homepage / prodotti
`ReviewsSection` ha 6 recensioni hardcoded, tutte 5 stelle.
Aggiungere schema `AggregateRating` alla homepage per mostrare le stelle nella SERP.

```json
{
  "@type": "Organization",
  "name": "Lovehuble",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "25000",
    "bestRating": "5"
  }
}
```

Quando i prodotti avranno recensioni reali in Medusa, lo stesso schema va aggiunto per ogni `Product`.

---

## 2. Testo SEO nelle pagine categoria (impatto alto, effort medio)

**Problema:** Le pagine categoria mostrano la griglia prodotti e un breve testo in `PageHeader` (≤ 2 righe da `page-descriptions.ts`). Google non ha abbastanza testo per capire il topic della pagina.

**Soluzione:** Aggiungere un **blocco editoriale** di 150-250 parole dopo la griglia prodotti (nella posizione classica "sotto il fold" usata da tutti i grandi e-commerce).

Il file `src/data/page-descriptions.ts` è già il posto giusto: estendere ogni voce con un campo `longDescription` in testo libero.

**Esempio per `sex-toys`:**
> *Il sex toy è lo strumento più versatile per esplorare il piacere personale. Che tu stia cercando il tuo primo vibratore o voglia aggiungere novità alla tua vita intima, la nostra selezione abbraccia ogni esigenza: stimolatori clitoridei per chi cerca intensità immediata, rabbit per una stimolazione combinata, toy per coppie per vivere momenti condivisi. Tutti i materiali sono certificati body-safe: silicone medicale, ABS privo di ftalati, acciaio inossidabile. Spedizione discreta e reso gratuito entro 30 giorni.*

Questo testo non è visibile in pagine con pochi prodotti — può essere collassato sotto un "Leggi di più".

**Categorie prioritarie (volume di ricerca più alto):**
1. `sex-toys`
2. `abbigliamento`
3. `bdsm`
4. `bambole`
5. `salute-benessere`

---

## 3. Qualità descrizioni prodotto in Medusa (impatto molto alto)

Le meta description dei prodotti usano `initialProduct.subtitle || initialProduct.description.slice(0, 155)`.
Se le descrizioni in Medusa sono brevi, generiche o copiate dal fornitore, Google le penalizzerà come **thin content**.

**Checklist per ogni prodotto:**
- [ ] Descrizione ≥ 80 parole, unica (non copiata dal fornitore)
- [ ] Subtitle di 1 frase che descrive il beneficio principale (es. "Vibratore clitorideo ultrasilenzioso in silicone medicale")
- [ ] Materiali menzionati esplicitamente (silicone, ABS, TPE…)
- [ ] Dimensioni / peso quando rilevante
- [ ] Modalità d'uso accennate in modo elegante

Il `subtitle` è particolarmente importante perché è quello che finisce nella meta description della SERP.

---

## 4. Alt text sulle immagini (impatto medio, effort basso)

Google Images è una sorgente di traffico rilevante per i sexy shop.
Verificare che `<Image>` nei componenti `ProductCard` e `ImageGallery` abbiano `alt` significativi, non solo il filename.

**Pattern consigliato:**
```tsx
// ❌ attuale probabile
alt={product.name}

// ✅ consigliato
alt={`${product.name} — ${product.subCategory} | Lovehuble`}
```

Stessa logica per le immagini di categoria in `CategoriesSection`.

---

## 5. Strategia blog: cluster di contenuto (impatto molto alto, effort alto)

Il blog su Sanity è l'asset SEO più potente a disposizione perché permette di intercettare ricerche informazionali (persone che cercano "come scegliere" o "quale è meglio").

**Struttura cluster consigliata:**

Ogni categoria principale dovrebbe avere:
- 1 **articolo pillar** (guida completa, 1500+ parole) → linka a tutti i prodotti della categoria
- 3-5 **articoli satellite** (domande specifiche) → linkano all'articolo pillar

**Cluster prioritari:**

| Pillar | Articoli satellite |
|--------|--------------------|
| "Guida completa ai sex toys per principianti" | "Differenza tra vibratore e dildo", "I migliori materiali body-safe", "Come pulire i sex toys" |
| "Guida al BDSM per chi inizia" | "Cos'è il bondage consensuale", "Parola sicura: cos'è e perché usarla", "Strumenti BDSM per principianti" |
| "Scegliere la lingerie giusta per la tua forma" | "Guida alle taglie reggiseno", "Lingerie per occasioni speciali", "Differenza tra babydoll e body" |

**Regola critica:** ogni articolo del blog deve avere 2-3 link interni a prodotti o categorie rilevanti. Attualmente non sappiamo se questo avviene — verificare nei testi Sanity.

---

## 6. Linking interno sistematico (impatto alto, effort medio)

Attualmente le pagine sono sostanzialmente isolate tra loro. Google usa i link interni per capire la gerarchia e l'autorevolezza dei contenuti.

**Opportunità immediate:**

- **Pagina prodotto → categoria**: il breadcrumb c'è, ma aggiungere anche un link testuale nel corpo (es. "Scopri tutti i vibratori →")
- **Categoria → sottocategorie correlate**: dopo la griglia, suggerire categorie simili ("Potrebbe interessarti anche: Salute e Benessere")
- **Blog → prodotti**: ogni articolo dovrebbe linkare prodotti specifici con anchor text pertinente
- **Guide page → categorie**: la pagina `/guide` è piatta. Ogni sezione dovrebbe linkare alla categoria corrispondente
- **Homepage FAQ → pagine di supporto**: le risposte delle FAQ possono linkare a Privacy Policy, pagina resi, ecc.

---

## 7. Gerarchia heading H1/H2/H3 (impatto medio, effort basso)

Da verificare pagina per pagina:
- Ogni pagina deve avere **un solo H1** (già garantito da `PageHeader` e `ProductDetail`)
- Le sezioni interne della homepage (Best Seller, Novità, Esclusive, Blog Preview) devono usare `<h2>`, non `<div>` o `<p>`
- Le FAQ usano già un `<h2>` per il titolo — ✅

**Verifica rapida:** aprire DevTools → Elements → cercare `h1`, `h2`, `h3` su homepage, categoria, prodotto.

---

## 8. og:image dinamica per categorie (impatto basso, effort basso)

Attualmente le pagine categoria usano `/og-image.png` generica.
Le immagini delle categorie esistono già in `/public/categorie/[slug].png`.

**Miglioramento in** `prodotti/[categoria]/index.tsx`:
```tsx
ogImage={`/categorie/${categorySlug}.png`}
```

Questo rende i link condivisi su WhatsApp/Telegram molto più riconoscibili.

---

## Priorità di intervento

| # | Intervento | Impatto SEO | Effort |
|---|-----------|------------|--------|
| 1 | Testo SEO lungo nelle pagine categoria | ⭐⭐⭐⭐⭐ | Medio |
| 2 | Qualità descrizioni prodotto in Medusa | ⭐⭐⭐⭐⭐ | Alto |
| 3 | Blog cluster di contenuto | ⭐⭐⭐⭐⭐ | Alto |
| 4 | BreadcrumbList JSON-LD | ⭐⭐⭐⭐ | Basso |
| 5 | FAQPage JSON-LD + nuove domande | ⭐⭐⭐⭐ | Basso |
| 6 | Linking interno sistematico | ⭐⭐⭐⭐ | Medio |
| 7 | Alt text immagini prodotto | ⭐⭐⭐ | Basso |
| 8 | AggregateRating JSON-LD | ⭐⭐⭐ | Basso |
| 9 | og:image dinamica per categorie | ⭐⭐ | Basso |
| 10 | Heading hierarchy audit | ⭐⭐ | Basso |
