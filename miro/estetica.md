# Sistema Colori Lovehuble - Design System

## 1. Panoramica

Il sistema colori Lovehuble unisce lusso, intimità e modernità. Toni neutri eleganti creano calma e spazio, mentre un accento Dusty Rose aggiunge sensualità sofisticata. Il linguaggio cromatico privilegia minimalismo, calore e leggibilità. Grigio Atene #F5F5F7 è il fondo chiaro predefinito per l'app: superfici, pannelli e card usano questo tono per garantire comfort visivo e coerenza.

---

## 2. Colori Primari

- **Grigio Atene** — #F5F5F7 | RGB(245, 245, 247)
  Uso: sfondo principale, superfici ampie e predefinite (app surfaces, pannelli, card); riduce l'abbagliamento mantenendo luminosità.

- **Black** — #000000 | RGB(0, 0, 0)
  Uso: testo primario, titoli, icone ad alto contrasto.

- **White** — #FFFFFF | RGB(255, 255, 255)
  Uso: superfici interne elevate o su sfondi scuri (es. sezioni a contrasto, overlay di contenuto).

---

## 3. Colore Signature

- **Dusty Rose** — #D4A5A5
  Perché: evoca lusso discreto, sensualità e eleganza senza essere appariscente. Caldo, accogliente, memorabile.

  Variazioni:
  - Rose Light — #E8C9C9
  - Rose Dark — #B5838D
  - Rose Subtle — #F5E9E9

---

## 4. Neutri

- **Medium Gray** — #86868B (Testo secondario, metadata)
- **Light Gray** — #D5D5D7 (Bordi, divisioni sottili)
- **Dark Gray** — #1D1D1F (Modalità scura, superfici)

---

## 5. Colori di Sistema

- **Success** — #34C759
- **Error** — #FF3B30
- **Warning** — #FFCC00
- **Info** — #007AFF

---

## 6. Variabili CSS (Light & Dark)

```css
:root {
  --lh-offwhite: #F5F5F7;
  --lh-white: #FFFFFF;
  --lh-black: #000000;
  --lh-rose: #D4A5A5;
  --lh-rose-light: #E8C9C9;
  --lh-rose-dark: #B5838D;
  --lh-rose-subtle: #F5E9E9;
  --lh-gray-100: #D5D5D7;
  --lh-gray-500: #86868B;
  --lh-gray-900: #1D1D1F;
  --lh-success: #34C759;
  --lh-error: #FF3B30;
  --lh-warning: #FFCC00;
  --lh-info: #007AFF;
  --bg: var(--lh-offwhite);
  --surface: var(--lh-offwhite);
  --text: var(--lh-black);
  --text-sec: var(--lh-gray-500);
  --border: var(--lh-gray-100);
  --accent: var(--lh-rose);
}

:root[data-theme="dark"] {
  --bg: var(--lh-gray-900);
  --surface: #121214;
  --text: var(--lh-offwhite);
  --text-sec: #B3B3B6;
  --border: #2A2A2E;
  --accent: var(--lh-rose-dark);
}
```

---

## 7. Esempi Componenti

- **Primary Button (Rose CTA):** sfondo var(--accent) (#D4A5A5), testo var(--lh-white) (#FFFFFF), raggio 8px, padding 12x20, hover: lighten 8%.

- **Secondary Button (Outline):** bordo 1px var(--border) (#D5D5D7), testo var(--text) (#000000), hover: bg var(--lh-rose-subtle) (#F5E9E9).

- **Campo Input:** bg var(--surface) (Grigio Atene #F5F5F7), bordo 1px var(--border), focus: 2px outline var(--accent) a 2px.

- **Card:** bg var(--surface) (Grigio Atene #F5F5F7), shadow soft, raggio 12px, bordo var(--border), padding 20.

- **Badge/Tag:** bg var(--lh-rose-subtle) o stato (success/error), testo var(--text), raggio 999px.

---

## 8. Accessibilità

- Contrasto: rispettare WCAG 2.1 AA (≥4.5:1 testo normale, ≥3:1 testo grande).
- Non usare Dusty Rose per testo su Grigio Atene se il contrasto è insufficiente; preferire var(--text) su var(--accent) per CTA.
- Stati (error/success) con icone e testo per ridondanza.

---

## 9. Linee Guida Brand

### Quando usare

- **Grigio Atene / White:** sfondi e superfici (Grigio Atene default; White per superfici interne elevate o su sfondi scuri).
- **Black:** testo primario.
- **Dusty Rose:** CTA, link prioritari, evidenziazioni.
- **Grigi:** gerarchie, bordi, dark mode.

### Psicologia

- Dusty Rose = intimità, cura, raffinatezza
- Neutri = fiducia, calma

### Do

- Mantenere spazi bianchi generosi.
- Usare un solo accento per vista.

### Don't

- Saturare con Rose su ampie aree.
- Usare testo grigio su grigio con scarso contrasto.

---

## 10. Esempi Visuali Dettagliati

### Button Variants

#### Primary (Rose CTA)
- **Visual:** solido, prominente.
- **Colori:** bg #D4A5A5 (var(--accent)), testo #FFFFFF (var(--lh-white)), bordo trasparente.
- **Spazi:** padding 12x20, gap icona-testo 8.
- **Raggio:** 8px.
- **Shadow:** 0 6px 16px -6px rgba(212,165,165,0.32).
- **Stati:**
  - Hover: bg #DCB2B2 (+8% luce), shadow 0 8px 20px -6px rgba(212,165,165,0.38).
  - Active: bg #B5838D (Rose Dark), spinta 1px, shadow ridotta.
  - Focus: outline 2px #B5838D offset 2px; focus-visible obbligatorio.
  - Disabled: bg #E8C9C9, testo #FFFFFF 60%, no shadow, cursor not-allowed.
- **Accessibilità:** contrasto testo ≥4.5:1 su bg; area click ≥44x44.

#### Secondary (Outline)
- **Visual:** bordo chiaro, neutro.
- **Colori:** testo #000000, bordo #D5D5D7, bg trasparente.
- **Spazi:** padding 12x20.
- **Raggio:** 8px.
- **Shadow:** none.
- **Stati:** hover bg #F5E9E9; active bordo #B5838D; focus outline 2px #D4A5A5.
- **Accessibilità:** indice focus evidente; contrasto bordo su Grigio Atene ≥3:1.

#### Ghost
- **Visual:** testo accento, nessun bordo.
- **Colori:** testo #D4A5A5, bg trasparente.
- **Spazi:** padding 8x12.
- **Raggio:** 8px.
- **Stati:** hover bg #F5E9E9; active testo #B5838D.
- **Accessibilità:** usare solo per azioni secondarie; garantire focus ring 2px #D4A5A5.

#### Disabled
- **Visual:** attenuato.
- **Colori:** testo #86868B, bg #F5F5F7, bordo #D5D5D7.
- **Spazi / Raggio:** come variante attiva.
- **Interazione:** nessuna.
- **Accessibilità:** deve essere distinguibile anche senza colore (opacità e cursore).

---

### Input Fields

#### Default
- **Visual:** campo pieno su Grigio Atene.
- **Colori:** bg #FFFFFF o #F5F5F7 a seconda del contesto (consigliato #FFFFFF per leggibilità), bordo #D5D5D7, testo #000000, placeholder #86868B.
- **Spazi:** altezza 44, padding 12x12.
- **Raggio:** 8px.
- **Shadow:** 0 1px 0 rgba(0,0,0,0.04).

#### Focus
- **Bordi:** 1px #D4A5A5 + outline 2px #F5E9E9.
- **Shadow:** 0 0 0 4px rgba(212,165,165,0.16).
- **Accessibilità:** focus visibile, non solo colore per indicare stato.

#### Error
- **Colori:** bordo #FF3B30, help-text #FF3B30, icona stato #FF3B30.
- **BG:** #FFFFFF.
- **Accessibilità:** associare aria-invalid="true" e descrizione errore.

#### Success
- **Colori:** bordo #34C759, help-text #34C759, icona stato #34C759.
- **BG:** #FFFFFF.
- **Accessibilità:** fornire messaggi chiari e non solo colore.

---

### Cards

#### Product Card
- **Visual:** superficie chiara con immagine.
- **Colori:** bg #F5F5F7 (Grigio Atene), bordo #D5D5D7, testo #000000, prezzo in #D4A5A5.
- **Spazi:** padding 16, gap 12.
- **Raggio:** 12px.
- **Shadow:** 0 8px 24px -8px rgba(0,0,0,0.12).
- **Stati:** hover elevazione + lieve outline #F5E9E9; active press 1px.

#### Info Card
- **Colori:** bg #FFFFFF, bordo #D5D5D7, titolo #000000, descrizione #86868B.
- **Spazi:** padding 20.
- **Raggio:** 12px.
- **Shadow:** 0 4px 16px -6px rgba(0,0,0,0.10).

#### Elevated Card (premium)
- **Colori:** bg #FFFFFF con header strip gradiente rose (vedi Gradient).
- **Spazi:** padding 24.
- **Raggio:** 16px.
- **Shadow:** 0 16px 40px -10px rgba(212,165,165,0.24).
- **Accessibilità:** testo su header gradiente in #1D1D1F o #000000 con contrasto ≥4.5:1.

---

### Navigation Elements

#### Tabs
- **Colori:** testo inattivo #86868B; attivo #000000; indicator #D4A5A5 2px.
- **Spazi:** padding orizzontale 16; gap 16.
- **Raggio:** indicator 2px.
- **Stati:** hover testo #000000; focus ring 2px #D4A5A5.

#### Pills
- **Colori:** bg #F5E9E9, testo #B5838D; attivo bg #D4A5A5, testo #FFFFFF.
- **Spazi:** padding 8x12.
- **Raggio:** 999px.

#### Breadcrumbs
- **Colori:** link #D4A5A5; separatore #D5D5D7; testo corrente #000000.
- **Spazi:** gap 8.
- **Stati:** hover link #B5838D; focus underline + outline 2px #D4A5A5.
- **Accessibilità:** target touch ≥44px; aria-current sul segmento attivo.

---

### Badges & Tags

#### Status Badge
- **Colori:**
  - Success: bg #E9F9EF, testo #0E7A2B
  - Error: bg #FEECEC, testo #8E1B12
  - Warning: bg #FFF8E0, testo #7A5A00
  - Info: bg #E6F0FF, testo #0046B8
- **Raggio:** 999px
- **Spazi:** 4x8.

#### Category Tag
- **Colori:** bg #F5E9E9, testo #B5838D; bordo none.
- **Spazi:** 6x10; raggio 999px.

#### Count Badge
- **Colori:** bg #D4A5A5, testo #FFFFFF.
- **Spazi:** min 18x18, padding 0x6; raggio 999px.
- **Accessibilità:** fornire aria-label con numero.

---

### Alert / Notification Boxes

#### Success
- **Colori:** bg #E9F9EF, bordo #34C759, testo #0E7A2B, icona #34C759.

#### Error
- **Colori:** bg #FEECEC, bordo #FF3B30, testo #8E1B12, icona #FF3B30.

#### Warning
- **Colori:** bg #FFF8E0, bordo #FFCC00, testo #7A5A00, icona #FFCC00.

#### Info
- **Colori:** bg #E6F0FF, bordo #007AFF, testo #0046B8, icona #007AFF.

#### Specifiche comuni
- **Spazi:** padding 12x16; gap 8; raggio 12px.
- **Shadow:** 0 4px 16px -8px rgba(0,0,0,0.08).
- **Stati:** dismiss hover bg overlay #000000 6% su icona close.
- **Accessibilità:** ruoli ARIA (role="alert"), icone + testo per ridondanza; contrasto testo ≥4.5:1.

---

### Form Elements

#### Checkbox
- **Colori:** box bg #FFFFFF, bordo #D5D5D7; checked bg #D4A5A5, spunta #FFFFFF.
- **Dimensione:** 20x20; raggio 4px.
- **Stati:** hover bordo #B5838D; focus outline 2px #D4A5A5.

#### Radio
- **Colori:** cerchio esterno bordo #D5D5D7; checked dot #D4A5A5.
- **Dimensione:** 20; raggio 999px.

#### Toggle Switch
- **Off:** track bg #D5D5D7, knob #FFFFFF.
- **On:** track bg #D4A5A5, knob #FFFFFF con outline #B5838D 1px.
- **Dimensioni:** track 44x24; knob 20; raggio track 999px.
- **Accessibilità:** area attivabile ampia, stato visibile, testo On/Off per SR.

