export interface Category {
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  name: string;
  slug: string;
  parentSlug: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  subCategory: string;
  subCategorySlug: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  exclusive?: boolean;
}

export const categories: Category[] = [
  { name: 'Sex Toys',               slug: 'sex-toys',        image: '/categorie/sex-toys.png' },
  { name: 'Abbigliamento e Lingerie', slug: 'abbigliamento',  image: '/categorie/abbigliamento.png' },
  { name: 'BDSM',                   slug: 'bdsm',            image: '/categorie/bdsm.png' },
  { name: 'Salute e Benessere',     slug: 'salute-benessere', image: '/categorie/salute-benessere.png' },
  { name: 'Giochi e Gadget',        slug: 'giochi',          image: '/categorie/giochi.png' },
  { name: 'Speciali',               slug: 'speciali',        image: '/prodotti/prodotti-esclusivi/esclusiva1.jpg' },
];

const ST = [
  '/prodotti/sex-toys/prodotto-esempio-nobg.png',
  '/prodotti/sex-toys/prodotto-esempio2-nobg-removebg-preview.png',
  '/prodotti/sex-toys/prodotto-esempio3-removebg-preview.png',
];

const BDSM_IMG = [
  '/prodotti/bdsm/bdsm-1.png',
  '/prodotti/bdsm/bdsm-2.png',
  '/prodotti/bdsm/bdsm-3.png',
];

const LING = [
  '/prodotti/lingerie/lingerie-1.png',
  '/prodotti/lingerie/lingerie-2.png',
  '/prodotti/lingerie/lingerie-3.png',
];

const LUBE = [
  '/prodotti/lubrificanti/lubrificante-1.png',
  '/prodotti/lubrificanti/lubrificante-2.png',
  '/prodotti/lubrificanti/lubrificante-3.png',
];

const GIOCHI_IMG = [
  '/prodotti/giochi/giochi-1.png',
  '/prodotti/giochi/giochi-2.png',
  '/prodotti/giochi/giochi-3.png',
];

const EXCL = [
  '/prodotti/prodotti-esclusivi/esclusiva1.jpg',
  '/prodotti/prodotti-esclusivi/esclusiva2.jpg',
  '/prodotti/prodotti-esclusivi/esclusiva3.jpg',
];

export const subCategories: SubCategory[] = [
  // Sex Toys
  { name: 'Per Donna',    slug: 'sex-toys-donna',  parentSlug: 'sex-toys', image: ST[0] },
  { name: 'Per Uomo',     slug: 'sex-toys-uomo',   parentSlug: 'sex-toys', image: ST[1] },
  { name: 'Per Coppia',   slug: 'sex-toys-coppia', parentSlug: 'sex-toys', image: ST[2] },
  // Abbigliamento e Lingerie
  { name: 'Lingerie Classica',  slug: 'lingerie-classica',  parentSlug: 'abbigliamento', image: LING[0] },
  { name: 'Sexy Apparel',       slug: 'sexy-apparel',       parentSlug: 'abbigliamento', image: LING[1] },
  { name: 'Accessori',          slug: 'accessori-lingerie', parentSlug: 'abbigliamento', image: LING[2] },
  { name: 'Costumi e Roleplay', slug: 'costumi-roleplay',   parentSlug: 'abbigliamento', image: LING[0] },
  // BDSM
  { name: 'Bondage',               slug: 'bondage',             parentSlug: 'bdsm', image: BDSM_IMG[0] },
  { name: 'Impatto e Sensazione',  slug: 'impatto-sensazione',  parentSlug: 'bdsm', image: BDSM_IMG[1] },
  { name: 'Mobili e Attrezzature', slug: 'mobili-attrezzature', parentSlug: 'bdsm', image: BDSM_IMG[2] },
  // Salute e Benessere
  { name: 'Lubrificanti',   slug: 'lubrificanti', parentSlug: 'salute-benessere', image: LUBE[0] },
  { name: 'Massaggio',      slug: 'massaggio',    parentSlug: 'salute-benessere', image: LUBE[1] },
  { name: 'Cura del Corpo', slug: 'cura-corpo',   parentSlug: 'salute-benessere', image: LUBE[2] },
  // Giochi e Gadget
  { name: 'Giochi da Tavolo', slug: 'giochi-tavolo', parentSlug: 'giochi', image: GIOCHI_IMG[0] },
  { name: 'Gadget e Regali',  slug: 'gadget-regali', parentSlug: 'giochi', image: GIOCHI_IMG[1] },
  // Speciali
  { name: 'Bambole', slug: 'bambole', parentSlug: 'speciali', image: EXCL[0] },
];



export const products: Product[] = [
  // ── Sex Toys – Per Donna ──────────────────────────────────────────────
  {
    id: '1',
    name: 'Vibratore Velvet Touch',
    slug: 'vibratore-velvet-touch',
    category: 'Sex Toys',
    categorySlug: 'sex-toys',
    subCategory: 'Per Donna',
    subCategorySlug: 'sex-toys-donna',
    price: 189,
    image: ST[0],
    images: ST,
    description: 'Vibratore ricaricabile di lusso con 10 livelli di intensità. Realizzato in silicone premium per il massimo piacere.',
    features: [
      'Silicone medicale',
      'Ricaricabile USB – 2 ore di autonomia',
      '10 modalità di vibrazione',
      'Impermeabile IPX7',
      'Motore silenziosissimo',
    ],
    inStock: true,
  },
  {
    id: '6',
    name: 'Stimolatore Punto G Rose',
    slug: 'stimolatore-punto-g-rose',
    category: 'Sex Toys',
    categorySlug: 'sex-toys',
    subCategory: 'Per Donna',
    subCategorySlug: 'sex-toys-donna',
    price: 219,
    image: ST[2],
    images: ST,
    description: 'Vibratore per punto G dal design elegante con tecnologia air-pulse. Prova un piacere di livello superiore.',
    features: [
      'Tecnologia a doppia stimolazione',
      '12 livelli di intensità',
      'Design ergonomico curvo',
      'Ricarica rapida USB-C',
      'Funzione blocco da viaggio',
    ],
    inStock: true,
  },
  {
    id: '20',
    name: 'Uovo Vibrante Wireless',
    slug: 'uovo-vibrante-wireless',
    category: 'Sex Toys',
    categorySlug: 'sex-toys',
    subCategory: 'Per Donna',
    subCategorySlug: 'sex-toys-donna',
    price: 99,
    image: ST[1],
    images: ST,
    description: 'Uovo vibrante compatto con controllo wireless. Silenzioso e potente, ideale per uso discreto.',
    features: [
      'Controllo wireless fino a 10 m',
      '9 modalità di vibrazione',
      'Silicone body-safe',
      'Impermeabile IPX6',
      'Ricaricabile via USB',
    ],
    inStock: true,
  },
  // ── Sex Toys – Per Uomo ───────────────────────────────────────────────
  {
    id: '21',
    name: 'Masturbatore Automatico Pro',
    slug: 'masturbatore-automatico-pro',
    category: 'Sex Toys',
    categorySlug: 'sex-toys',
    subCategory: 'Per Uomo',
    subCategorySlug: 'sex-toys-uomo',
    price: 149,
    image: ST[0],
    images: ST,
    description: 'Masturbatore automatico con motore potente e texture interna multistrato. Design realistico e impermeabile.',
    features: [
      'Motore automatico a 5 velocità',
      'Texture interna multistrato',
      'Silicone TPE ultra-morbido',
      'Facile da pulire',
      'Ricaricabile USB-C',
    ],
    inStock: true,
  },
  {
    id: '22',
    name: 'Anello Penieno Vibrante',
    slug: 'anello-penieno-vibrante',
    category: 'Sex Toys',
    categorySlug: 'sex-toys',
    subCategory: 'Per Uomo',
    subCategorySlug: 'sex-toys-uomo',
    price: 59,
    image: ST[2],
    images: ST,
    description: 'Anello penieno in silicone elastico con vibratore integrato. Ritarda l\'eiaculazione e intensifica il piacere.',
    features: [
      'Silicone elastico e confortevole',
      'Vibratore removibile ricaricabile',
      '7 modalità di vibrazione',
      'Facile da indossare',
      'Impermeabile IPX7',
    ],
    inStock: true,
  },
  // ── Sex Toys – Per Coppia ─────────────────────────────────────────────
  {
    id: '4',
    name: 'Anello del Piacere per Coppie',
    slug: 'anello-del-piacere-per-coppie',
    category: 'Sex Toys',
    categorySlug: 'sex-toys',
    subCategory: 'Per Coppia',
    subCategorySlug: 'sex-toys-coppia',
    price: 89,
    image: ST[0],
    images: ST,
    description: 'Anello vibrante per coppie progettato per amplificare il piacere di entrambi i partner. Ricaricabile e impermeabile.',
    features: [
      'Design a doppia stimolazione',
      'Elastico e confortevole',
      'Ricaricabile USB',
      'Autonomia 30 minuti',
      'Silicone body-safe',
    ],
    inStock: true,
  },
  {
    id: '10',
    name: 'Vibratore per Coppie Telecomandato',
    slug: 'vibratore-per-coppie-telecomandato',
    category: 'Sex Toys',
    categorySlug: 'sex-toys',
    subCategory: 'Per Coppia',
    subCategorySlug: 'sex-toys-coppia',
    price: 169,
    image: ST[1],
    images: ST,
    description: 'Vibratore indossabile con telecomando wireless. Perfetto per il gioco di coppia, ovunque.',
    features: [
      'Telecomando wireless (raggio 10 m)',
      'Design indossabile ergonomico',
      'Opzione controllo via app',
      '8 modalità di vibrazione',
      'Funzionamento ultra-silenzioso',
    ],
    inStock: true,
  },
  // ── Abbigliamento e Lingerie – Lingerie Classica ─────────────────────
  {
    id: '13',
    name: 'Completo Intimo in Pizzo Nero',
    slug: 'completo-intimo-pizzo-nero',
    category: 'Abbigliamento e Lingerie',
    categorySlug: 'abbigliamento',
    subCategory: 'Lingerie Classica',
    subCategorySlug: 'lingerie-classica',
    price: 79,
    image: LING[0],
    images: LING,
    description: 'Completo intimo in pizzo elasticizzato di alta qualità. Reggiseno con ferretto e slip coordinato.',
    features: [
      'Pizzo elasticizzato premium',
      'Disponibile nelle taglie XS–XL',
      'Reggiseno con ferretto push-up',
      'Slip con cinturini regolabili',
      'Lavabile in lavatrice a 30 °C',
    ],
    inStock: true,
  },
  {
    id: '14',
    name: 'Baby-Doll in Chiffon Rosa',
    slug: 'baby-doll-chiffon-rosa',
    category: 'Abbigliamento e Lingerie',
    categorySlug: 'abbigliamento',
    subCategory: 'Lingerie Classica',
    subCategorySlug: 'lingerie-classica',
    price: 65,
    image: LING[1],
    images: LING,
    description: 'Baby-doll trasparente in chiffon leggero con slip coordinato. Elegante e seducente.',
    features: [
      'Chiffon ultra-leggero',
      'Slip coordinato incluso',
      'Fiocco decorativo sul décolleté',
      'Taglie XS–L',
      'Consegna in sacchetto regalo',
    ],
    inStock: true,
  },
  // ── Abbigliamento e Lingerie – Sexy Apparel ──────────────────────────
  {
    id: '15',
    name: 'Body in Vinile Lucido',
    slug: 'body-vinile-lucido',
    category: 'Abbigliamento e Lingerie',
    categorySlug: 'abbigliamento',
    subCategory: 'Sexy Apparel',
    subCategorySlug: 'sexy-apparel',
    price: 119,
    image: LING[2],
    images: LING,
    description: 'Body attillato in vinile lucido con aperture strategiche. Perfetto per serate speciali.',
    features: [
      'Vinile morbido e resistente',
      'Chiusura con bottoni a pressione',
      'Aperture regolabili',
      'Taglie XS–XL',
      'Effetto secondo pelle',
    ],
    inStock: true,
  },
  // ── Abbigliamento e Lingerie – Costumi e Roleplay ─────────────────────
  {
    id: '16',
    name: 'Costume Infermiera Deluxe',
    slug: 'costume-infermiera-deluxe',
    category: 'Abbigliamento e Lingerie',
    categorySlug: 'abbigliamento',
    subCategory: 'Costumi e Roleplay',
    subCategorySlug: 'costumi-roleplay',
    price: 89,
    image: LING[0],
    images: LING,
    description: 'Costume da infermiera in raso con dettagli in pizzo. Include abito, grembiule e copricapo.',
    features: [
      'Set completo 3 pezzi',
      'Raso lucido con pizzo bianco',
      'Taglie S–XL',
      'Chiusura con zip sul retro',
      'Include copricapo abbinato',
    ],
    inStock: true,
  },
  // ── BDSM – Bondage ────────────────────────────────────────────────────
  {
    id: '5',
    name: 'Set Bondage in Seta',
    slug: 'set-bondage-in-seta',
    category: 'BDSM',
    categorySlug: 'bdsm',
    subCategory: 'Bondage',
    subCategorySlug: 'bondage',
    price: 129,
    image: BDSM_IMG[0],
    images: BDSM_IMG,
    description: 'Lussuose costrizioni in seta per un\'esplorazione elegante. Morbide sulla pelle, resistenti nel design.',
    features: [
      'Seta di gelso premium',
      'Polsini regolabili',
      'Include costrizioni per polsi e caviglie',
      'Sgancio rapido di sicurezza',
      'Borsa per la conservazione inclusa',
    ],
    inStock: true,
  },
  {
    id: '12',
    name: 'Kit Bondage per Principianti',
    slug: 'kit-bondage-per-principianti',
    category: 'BDSM',
    categorySlug: 'bdsm',
    subCategory: 'Bondage',
    subCategorySlug: 'bondage',
    price: 149,
    image: BDSM_IMG[1],
    images: BDSM_IMG,
    description: 'Set completo per iniziare ad esplorare il bondage. Tutto ciò che ti serve in un unico pacchetto lussuoso.',
    features: [
      'Manette, cavigliere, benda',
      'Cinghie regolabili',
      'Pelle vegana e seta',
      'Sgancio rapido di sicurezza',
      'Include guida illustrata',
    ],
    inStock: true,
  },
  // ── BDSM – Impatto e Sensazione ───────────────────────────────────────
  {
    id: '8',
    name: 'Set Benda e Piuma in Raso',
    slug: 'set-benda-e-piuma-in-raso',
    category: 'BDSM',
    categorySlug: 'bdsm',
    subCategory: 'Impatto e Sensazione',
    subCategorySlug: 'impatto-sensazione',
    price: 59,
    image: BDSM_IMG[2],
    images: BDSM_IMG,
    description: 'Kit di privazione sensoriale con benda in raso premium e morbida piuma solleticante.',
    features: [
      'Benda in raso doppio strato',
      'Piuma naturale solleticante',
      'Cinturino elastico regolabile',
      'Design che blocca la luce',
      'Perfetto per principianti',
    ],
    inStock: true,
  },
  {
    id: '23',
    name: 'Frustino in Pelle Premium',
    slug: 'frustino-pelle-premium',
    category: 'BDSM',
    categorySlug: 'bdsm',
    subCategory: 'Impatto e Sensazione',
    subCategorySlug: 'impatto-sensazione',
    price: 69,
    image: BDSM_IMG[0],
    images: BDSM_IMG,
    description: 'Frustino artigianale in vera pelle con manico avvolto in cordino. Flessibile e resistente.',
    features: [
      'Pelle bovina conciata al vegetale',
      'Manico in cordino di cotone',
      'Lunghezza 55 cm',
      'Strisce terminali morbide',
      'Borsa in velluto inclusa',
    ],
    inStock: true,
  },
  // ── Salute e Benessere – Lubrificanti ────────────────────────────────
  {
    id: '7',
    name: 'Lubrificante Premium Base Acqua',
    slug: 'lubrificante-premium-base-acqua',
    category: 'Salute e Benessere',
    categorySlug: 'salute-benessere',
    subCategory: 'Lubrificanti',
    subCategorySlug: 'lubrificanti',
    price: 45,
    image: LUBE[0],
    images: LUBE,
    description: 'Lubrificante ultra-liscio a base d\'acqua con acido ialuronico. Compatibile con tutti i giocattoli e preservativi.',
    features: [
      'Formula con acido ialuronico',
      'Scorrevolezza duratura',
      'pH bilanciato',
      'Sicuro per toy e preservativi',
      'Facile da pulire',
    ],
    inStock: true,
  },
  {
    id: '24',
    name: 'Lubrificante al Silicone Durata Lunga',
    slug: 'lubrificante-silicone-durata-lunga',
    category: 'Salute e Benessere',
    categorySlug: 'salute-benessere',
    subCategory: 'Lubrificanti',
    subCategorySlug: 'lubrificanti',
    price: 55,
    image: LUBE[1],
    images: LUBE,
    description: 'Lubrificante al silicone puro per una scivolosità prolungata. Resistente all\'acqua, non si asciuga.',
    features: [
      'Silicone puro inerte',
      'Non si asciuga durante l\'uso',
      'Resistente all\'acqua',
      'Inodore e insapore',
      'Flacone con pompa dosatrice',
    ],
    inStock: true,
  },
  // ── Salute e Benessere – Massaggio ───────────────────────────────────
  {
    id: '3',
    name: 'Collezione Oli da Massaggio Sensuali',
    slug: 'collezione-oli-da-massaggio-sensuali',
    category: 'Salute e Benessere',
    categorySlug: 'salute-benessere',
    subCategory: 'Massaggio',
    subCategorySlug: 'massaggio',
    price: 79,
    image: LUBE[2],
    images: LUBE,
    description: 'Set premium di oli da massaggio con oli essenziali afrodisiaci. Trasforma ogni momento in un\'esperienza sensuale.',
    features: [
      '3 miscele di oli biologici (100 ml ciascuna)',
      'Commestibile e sicuro per la pelle',
      'Profumazioni: Rosa, Vaniglia e Gelsomino',
      'Formula anti-macchia',
      'Vegano e cruelty-free',
    ],
    inStock: true,
  },
  {
    id: '9',
    name: 'Candela Aromatica da Massaggio',
    slug: 'candela-aromatica-da-massaggio',
    category: 'Salute e Benessere',
    categorySlug: 'salute-benessere',
    subCategory: 'Massaggio',
    subCategorySlug: 'massaggio',
    price: 69,
    image: LUBE[0],
    images: LUBE,
    description: 'Candela da massaggio che si scioglie in olio caldo. Crea l\'atmosfera e diventa parte dell\'esperienza.',
    features: [
      'Si scioglie in olio da massaggio',
      'Cera sicura per la pelle',
      'Profumazione Vaniglia e Sandalo',
      '40 ore di combustione',
      'Elegante vasetto in vetro',
    ],
    inStock: true,
  },
  // ── Giochi e Gadget – Giochi da Tavolo ───────────────────────────────
  {
    id: '18',
    name: 'Carte Sensuali per Coppie',
    slug: 'carte-sensuali-coppie',
    category: 'Giochi e Gadget',
    categorySlug: 'giochi',
    subCategory: 'Giochi da Tavolo',
    subCategorySlug: 'giochi-tavolo',
    price: 29,
    image: GIOCHI_IMG[0],
    images: GIOCHI_IMG,
    description: '100 carte con sfide e penitenze erotiche per ravvivare la relazione. Adatto a coppie di ogni tipo.',
    features: [
      '100 carte plastificate',
      'Tre livelli di intensità',
      'Adatto a tutte le coppie',
      'Design elegante',
      'Scatola regalo inclusa',
    ],
    inStock: true,
  },
  {
    id: '19',
    name: 'Dadi Erotici Set Premium',
    slug: 'dadi-erotici-set-premium',
    category: 'Giochi e Gadget',
    categorySlug: 'giochi',
    subCategory: 'Giochi da Tavolo',
    subCategorySlug: 'giochi-tavolo',
    price: 19,
    image: GIOCHI_IMG[1],
    images: GIOCHI_IMG,
    description: 'Set di 6 dadi erotici in legno con azioni e parti del corpo. Il classico gioco in versione premium.',
    features: [
      '6 dadi in legno massello',
      'Simboli incisi e colorati',
      'Sacchettino in velluto',
      'Istruzioni multilingua',
      'Ottimo regalo per coppie',
    ],
    inStock: true,
  },
  // ── Giochi e Gadget – Gadget e Regali ────────────────────────────────
  {
    id: '25',
    name: 'Kit Addio al Celibato Deluxe',
    slug: 'kit-addio-celibato-deluxe',
    category: 'Giochi e Gadget',
    categorySlug: 'giochi',
    subCategory: 'Gadget e Regali',
    subCategorySlug: 'gadget-regali',
    price: 49,
    image: GIOCHI_IMG[2],
    images: GIOCHI_IMG,
    description: 'Kit completo per addio al celibato con gadget divertenti e simpatici. Perfetto per un\'occasione indimenticabile.',
    features: [
      'Fascia con velo inclusa',
      'Set di 10 gadget a tema',
      'Giochi a schede con sfide',
      'Confezione regalo pronta',
      'Adatto a gruppi numerosi',
    ],
    inStock: true,
  },
  // ── Speciali ──────────────────────────────────────────────────────────
  {
    id: '101',
    name: 'Éléonore – Bambola di Lusso in Silicone Platino',
    slug: 'eleonore-bambola-lusso-silicone-platino',
    category: 'Speciali',
    categorySlug: 'speciali',
    subCategory: 'Bambole',
    subCategorySlug: 'bambole',
    price: 4990,
    image: EXCL[0],
    images: EXCL,
    description: 'Éléonore è la nostra bambola di punta: scolpita artigianalmente in silicone platino di grado medicale con scheletro articolato in acciaio inox. Ogni dettaglio è curato a mano dai nostri maestri artigiani.',
    features: [
      'Silicone platino di grado medicale (shore 15A)',
      'Scheletro articolato in acciaio inox a 160 punti',
      'Altezza 165 cm, peso 38 kg',
      'Occhi in vetro borosilicato colorato a mano',
      'Parrucca in capelli naturali 100% Remy',
      'Personalizzazione carnagione, colore occhi e capelli',
      'Certificato di autenticità numerato',
    ],
    inStock: true,
    exclusive: true,
  },
  {
    id: '102',
    name: 'Sophia – Bambola Premium in TPE Ultra-Soft',
    slug: 'sophia-bambola-premium-tpe-ultra-soft',
    category: 'Speciali',
    categorySlug: 'speciali',
    subCategory: 'Bambole',
    subCategorySlug: 'bambole',
    price: 2490,
    image: EXCL[1],
    images: EXCL,
    description: 'Sophia combina la morbidezza del TPE di ultima generazione con un\'estetica da alta moda. Il suo corpo proporzionato e la texture ultra-realistica la rendono un\'esperienza senza paragoni.',
    features: [
      'TPE ultra-soft di nuova generazione',
      'Scheletro in lega di alluminio leggero',
      'Altezza 158 cm, peso 29 kg',
      'Testa intercambiabile inclusa',
      'Funzione di riscaldamento integrata (37 °C)',
      'Kit di manutenzione professionale incluso',
      'Spedizione in cassa discreta con lucchetto',
    ],
    inStock: true,
    exclusive: true,
  },
  {
    id: '103',
    name: 'Luna – Bambola Compatta Silicone Full-Body',
    slug: 'luna-bambola-compatta-silicone-full-body',
    category: 'Speciali',
    categorySlug: 'speciali',
    subCategory: 'Bambole',
    subCategorySlug: 'bambole',
    price: 1890,
    image: EXCL[2],
    images: EXCL,
    description: 'Luna è progettata per chi cerca realismo in un formato più maneggevole. Il silicone full-body replica fedelmente la texture della pelle umana su ogni centimetro della sua figura.',
    features: [
      'Silicone full-body doppio strato',
      'Altezza 148 cm, peso 22 kg',
      'Scheletro flessibile a memoria di forma',
      'Dettagli venosi e cutanei micro-incisi',
      'Tre aperture funzionali in silicone morbido',
      'Borsa da trasporto in ecopelle inclusa',
      'Garanzia artigianale 2 anni',
    ],
    inStock: true,
    exclusive: true,
  },
  {
    id: '104',
    name: 'Aurore – Edizione Couture con Abito Haute Couture',
    slug: 'aurore-edizione-couture',
    category: 'Speciali',
    categorySlug: 'speciali',
    subCategory: 'Bambole',
    subCategorySlug: 'bambole',
    price: 5990,
    image: EXCL[0],
    images: EXCL,
    description: 'Aurore è l\'apice della nostra linea Couture: ogni esemplare è unico, numerato e accompagnato da un abito cucito su misura da sartoria italiana. Arte e sensualità fuse in un\'unica opera.',
    features: [
      'Silicone platino shore 10A – massima morbidezza',
      'Abito in seta artigianale cucito su misura',
      'Altezza 162 cm, peso 36 kg',
      'Numero di serie inciso sul piede sinistro',
      'Occhi dipinti a mano da artista certificato',
      'Consegna white-glove a domicilio',
      'Produzione in edizione limitata (50 esemplari/anno)',
    ],
    inStock: true,
    exclusive: true,
  },
];

export function getProductUrl(idOrProduct: string | Product): string {
  const product = typeof idOrProduct === 'string'
    ? products.find(p => p.id === idOrProduct)
    : idOrProduct;
  if (!product) return '/prodotti';
  return `/prodotti/${product.categorySlug}/${product.subCategorySlug}/${product.slug}`;
}

export const exclusiveProducts: Product[] = products.filter(p => p.exclusive);
