export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
}

const PRODUCT_IMAGES = [
  '/prodotto-esempio-nobg.png',
  '/prodotto-esempio2-nobg-removebg-preview.png',
  '/prodotto-esempio3-removebg-preview.png',
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Vibratore Velvet Touch',
    slug: 'vibratore-velvet-touch',
    category: 'Vibratori',
    categorySlug: 'vibratori',
    price: 189,
    image: PRODUCT_IMAGES[0],
    images: PRODUCT_IMAGES,
    description: 'Vibratore ricaricabile di lusso con 10 livelli di intensità. Realizzato in silicone premium per il massimo piacere.',
    features: [
      'Silicone medicale',
      'Ricaricabile USB - 2 ore di autonomia',
      '10 modalità di vibrazione',
      'Impermeabile IPX7',
      'Motore silenziosissimo'
    ],
    inStock: true,
  },
  {
    id: '2',
    name: 'Set Lingerie Noir Lace',
    slug: 'set-lingerie-noir-lace',
    category: 'Lingerie',
    categorySlug: 'lingerie',
    price: 149,
    image: PRODUCT_IMAGES[1],
    images: PRODUCT_IMAGES,
    description: 'Set di lingerie in pizzo francese raffinato. Progettato per farti sentire sicura e irresistibile.',
    features: [
      'Pizzo francese fatto a mano',
      'Spalline regolabili',
      'Include reggiseno, slip e reggicalze',
      'Disponibile dalla S alla XL',
      'Lavaggio a mano delicato'
    ],
    inStock: true,
  },
  {
    id: '3',
    name: 'Collezione Oli da Massaggio Sensuali',
    slug: 'collezione-oli-da-massaggio-sensuali',
    category: 'Lubrificanti',
    categorySlug: 'lubrificanti',
    price: 79,
    image: PRODUCT_IMAGES[2],
    images: PRODUCT_IMAGES,
    description: "Set premium di oli da massaggio con oli essenziali afrodisiaci. Trasforma ogni momento in un'esperienza sensuale.",
    features: [
      '3 miscele di oli biologici (100ml ciascuna)',
      'Commestibile e sicuro per la pelle',
      'Profumazioni: Rosa, Vaniglia e Gelsomino',
      'Formula anti-macchia',
      'Vegano e cruelty-free'
    ],
    inStock: true,
  },
  {
    id: '4',
    name: 'Anello del Piacere per Coppie',
    slug: 'anello-del-piacere-per-coppie',
    category: 'Coppie',
    categorySlug: 'coppie',
    price: 89,
    image: PRODUCT_IMAGES[0],
    images: PRODUCT_IMAGES,
    description: 'Anello vibrante per coppie progettato per amplificare il piacere di entrambi i partner. Ricaricabile e impermeabile.',
    features: [
      'Design a doppia stimolazione',
      'Elastico e confortevole',
      'Ricaricabile USB',
      'Autonomia 30 minuti',
      'Silicone body-safe'
    ],
    inStock: true,
  },
  {
    id: '5',
    name: 'Set Bondage in Seta',
    slug: 'set-bondage-in-seta',
    category: 'Bondage e BDSM',
    categorySlug: 'bondage-e-bdsm',
    price: 129,
    image: PRODUCT_IMAGES[1],
    images: PRODUCT_IMAGES,
    description: "Lussuose costrizioni in seta per un'esplorazione elegante. Morbide sulla pelle, resistenti nel design.",
    features: [
      'Seta di gelso premium',
      'Polsini regolabili',
      'Include costrizioni per polsi e caviglie',
      'Sgancio rapido di sicurezza',
      'Borsa per la conservazione inclusa'
    ],
    inStock: true,
  },
  {
    id: '6',
    name: 'Stimolatore Punto G Rose',
    slug: 'stimolatore-punto-g-rose',
    category: 'Vibratori',
    categorySlug: 'vibratori',
    price: 219,
    image: PRODUCT_IMAGES[2],
    images: PRODUCT_IMAGES,
    description: 'Vibratore per punto G dal design elegante con tecnologia air-pulse. Prova un piacere di livello superiore.',
    features: [
      'Tecnologia a doppia stimolazione',
      '12 livelli di intensità',
      'Design ergonomico curvo',
      'Ricarica rapida USB-C',
      'Funzione blocco da viaggio'
    ],
    inStock: true,
  },
  {
    id: '7',
    name: 'Lubrificante Premium Base Acqua',
    slug: 'lubrificante-premium-base-acqua',
    category: 'Lubrificanti ',
    categorySlug: 'lubrificanti',
    price: 45,
    image: PRODUCT_IMAGES[0],
    images: PRODUCT_IMAGES,
    description: "Lubrificante ultra-liscio a base d'acqua con acido ialuronico. Compatibile con tutti i giocattoli e preservativi.",
    features: [
      'Formula con acido ialuronico',
      'Scorrevolezza duratura',
      'pH bilanciato',
      'Sicuro per toy e preservativi',
      'Facile da pulire'
    ],
    inStock: true,
  },
  {
    id: '8',
    name: 'Set Benda e Piuma in Raso',
    slug: 'set-benda-e-piuma-in-raso',
    category: 'Bondage e BDSM',
    categorySlug: 'bondage-e-bdsm',
    price: 59,
    image: PRODUCT_IMAGES[1],
    images: PRODUCT_IMAGES,
    description: 'Kit di privazione sensoriale con benda in raso premium e morbida piuma solleticante.',
    features: [
      'Benda in raso doppio strato',
      'Piuma naturale solleticante',
      'Cinturino elastico regolabile',
      'Design che blocca la luce',
      'Perfetto per principianti'
    ],
    inStock: true,
  },
  {
    id: '9',
    name: 'Candela Aromatica di Lusso',
    slug: 'candela-aromatica-di-lusso',
    category: 'Atmosfera',
    categorySlug: 'atmosfera',
    price: 69,
    image: PRODUCT_IMAGES[2],
    images: PRODUCT_IMAGES,
    description: "Candela da massaggio che si scioglie in olio caldo. Crea l'atmosfera e poi diventa parte dell'esperienza.",
    features: [
      'Si scioglie in olio da massaggio',
      'Cera sicura per la pelle',
      'Profumazione Vaniglia e Sandalo',
      '40 ore di combustione',
      'Elegante vasetto in vetro'
    ],
    inStock: true,
  },
  {
    id: '10',
    name: 'Vibratore per Coppie Telecomandato',
    slug: 'vibratore-per-coppie-telecomandato',
    category: 'Coppie',
    categorySlug: 'coppie',
    price: 169,
    image: PRODUCT_IMAGES[0],
    images: PRODUCT_IMAGES,
    description: 'Vibratore indossabile con telecomando wireless. Perfetto per il gioco di coppia, ovunque.',
    features: [
      'Telecomando wireless (raggio 10m)',
      'Design indossabile ergonomico',
      'Opzione controllo via app',
      '8 modalità di vibrazione',
      'Funzionamento ultra-silenzioso'
    ],
    inStock: true,
  },
  {
    id: '11',
    name: 'Body in Pizzo Rosso',
    slug: 'body-in-pizzo-rosso',
    category: 'Lingerie',
    categorySlug: 'lingerie',
    price: 119,
    image: PRODUCT_IMAGES[1],
    images: PRODUCT_IMAGES,
    description: 'Body in pizzo seducente con chiusure a pressione. La perfetta combinazione di comfort e fascino.',
    features: [
      'Pizzo floreale trasparente',
      'Chiusura a pressione sul cavallo',
      'Supporto con ferretto',
      'Spalline regolabili',
      'Disponibile dalla XS alla XXL'
    ],
    inStock: true,
  },
  {
    id: '12',
    name: 'Kit Bondage per Principianti',
    slug: 'kit-bondage-per-principianti',
    category: 'Bondage e BDSM',
    categorySlug: 'bondage-e-bdsm',
    price: 149,
    image: PRODUCT_IMAGES[2],
    images: PRODUCT_IMAGES,
    description: 'Set completo per iniziare ad esplorare il bondage. Tutto ciò che ti serve in un unico pacchetto lussuoso.',
    features: [
      'Manette, cavigliere, benda',
      'Cinghie regolabili',
      'Pelle vegana e seta',
      'Sgancio rapido di sicurezza',
      'Include guida illustrata'
    ],
    inStock: true,
  },
];

export function getProductUrl(id: string): string {
  const product = products.find(p => p.id === id);
  if (!product) return '/prodotti';
  return `/prodotti/${product.categorySlug}/${product.slug}`;
}
