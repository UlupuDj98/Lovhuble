Ho eliminato tutte le collection da medusa. Ora abbiamo solo delle categorie di prodotti.
Le categorie si dividono in sotto-categorie.
Ogni categoria padre ha una lista di sotto-categorie associate.
Nellca categoria padre non ci sono prodotti, solo le sotto-categorie.
Nelle sotto-categorie ci sono i prodotti.

da medusa-data.ts tutto quello che riguardava le collection deve essere rimosso poiche inutilizzato

I componenti Navigation.tsx e Footer.tsx devono essere aggiornati, poiche hanno a che fare sicuramente con le collection

I componenti in Home.tsx
CategoriesSection.tsx (deve riflettere le categorie principali e non le collection)
FeaturedProducts.tsx (deve mostrare i primi 6 prodotti della cateogria /best-seller)
Novita.tsx (deve mostrare i primi 6 prodotti della categoria /novita)
PromoBanner.tsx (deve mostrare i primi 4 prodotti della categoria /offerte)

Il componente views/Category.tsx deve essere aggiornato per riflettere le categorie principali e non le collection
Il componente views/SubCategory.tsx deve essere aggiornato per riflettere le sotto-categorie e non le collection

All interno di Category.tsx bisogna mostrare i prodotti di tutte le subcategorie associate alla categoria principale in quanto le categorie principali non hanno prodotti direttamente associati




Abbiamo un problema quando clicchiamo su ogni prodotto.
Quando viene formulata la rotta non viene mai inclusa la categoria principale:
invece di fare:
http://localhost:3000/prodotti/sex-toys/sex-toys-donna/uovo-vibrante-wireless
fa:
http://localhost:3000/prodotti/sex-toys-donna/uovo-vibrante-wireless


Nella pagina ProductDetail.tsx probabilmente non viene applicata la ISR in quanto se clicco su prodotti correlati lo slug si aggiorna ma la pagina non viene ricaricata.