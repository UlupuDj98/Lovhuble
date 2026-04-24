Suddividere le pagine dei prodotti in categorie
-La rotta deve essere /prodotti
-La rotta del singolo prodotto deve essere:
-/prodotti/categoria/[slug-prodotto]
Tutto questo serve a favorire la SEO

-All interno del componente ProductDetail.tsx dobbiamo implementare:
-UI e UX intonata al design system dei componenti in Home.tsx
In particolare guarda il componente FeaturedProducts.tsx
-Le card da adottare sono in ProductCard.tsx
Crea una directory in components chiamata productdetail, li ci metti tutti i componenti che servono per il componente ProductDetail.tsx
-Devi creare un breadcump per la navigazione da mettere al posto di <- Torna ai prodotti
-Devi creare il componente breadcumb per le fotografie del prodotto che permette di navigare tra le foto da desktop e da mobilee

Per facilitare il lavoro prima lavora la lista prodotti in product.ts dove metti 3 immagini su ogni prodotti (per ogni prodotto inserisci le stesse 3 che trovi in public/)

-Devi usare sempre e solo le 3 fotografie del prodotto public/prodotto-esempio-nobg.png public/prodotto-esempio2-nobg.webp public/prodotto-esempio3.webp

Sotto crea un componente chiamato ProdottiCorrelati.tsx che e' una grid di prodotti a 2 righe e 4 colonne per schermi lg. Per gli altri schermi trova la proporzione migliore

