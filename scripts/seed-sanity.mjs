/**
 * Seed script: uploads static blog data to Sanity.
 * Run with: node scripts/seed-sanity.mjs
 * Requires SANITY_API_TOKEN env var with write permissions.
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'bxw6wro2',
  dataset: 'production',
  apiVersion: '2026-05-13',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const BLOGS = [
  {
    id: '1',
    title: 'Guida Completa ai Sex Toys: Scegli il Tuo Primo Sesso Giocattolo',
    subtitle: 'Tutto quello che devi sapere prima di fare il tuo primo acquisto nel mondo del piacere.',
    author: 'Dr. Sara Rossi',
    category: 'Guida',
    readTime: '8 min',
    publishDate: '2024-05-15',
    excerpt: 'La scelta del primo sex toy può sembrare intimidante, ma con le giuste informazioni diventa un\'avventura eccitante.',
  },
  {
    id: '2',
    title: 'Comunicazione di Coppia: Come Parlare di Desiderio e Piacere',
    subtitle: 'Strategie efficaci per aprire il dialogo intimo con il tuo partner e migliorare la relazione.',
    author: 'Marco Bianchi',
    category: 'Relazioni',
    readTime: '6 min',
    publishDate: '2024-05-12',
    excerpt: 'La comunicazione è la base di ogni relazione sana, soprattutto quando si parla di intimità e desideri.',
  },
  {
    id: '3',
    title: 'BDSM per Principianti: Esplora in Sicurezza il Mondo del Kink',
    subtitle: 'Introduzione sicura e consensuale alle pratiche BDSM per chi vuole iniziare questo viaggio.',
    author: 'Aria Black',
    category: 'BDSM',
    readTime: '10 min',
    publishDate: '2024-05-10',
    excerpt: 'Il mondo BDSM può sembrare misterioso e intimidante, ma con la giusta preparazione e consapevolezza può essere esplorато in modo sicuro.',
  },
  {
    id: '4',
    title: 'Salute Sessuale: Consigli per Mantenere il Benessere Intimo',
    subtitle: 'Guida pratica alla cura del corpo e alla prevenzione per una vita sessuale sana e felice.',
    author: 'Dr. Giulia Verdi',
    category: 'Salute',
    readTime: '7 min',
    publishDate: '2024-05-08',
    excerpt: 'La salute sessuale è un aspetto fondamentale del benessere generale che spesso viene trascurato.',
  },
  {
    id: '5',
    title: 'Lingerie Seducente: Come Scegliere il Capo Perfetto per Te',
    subtitle: 'Guida completa ai diversi tipi di intimo per valorizzare il tuo corpo e aumentare la fiducia.',
    author: 'Elena Rosa',
    category: 'Lingerie',
    readTime: '5 min',
    publishDate: '2024-05-05',
    excerpt: 'La lingerie non è solo abbigliamento, ma uno strumento di espressione personale e di seduzione.',
  },
  {
    id: '6',
    title: 'Giochi di Coppia: 10 Idee per Ravvivare la Passione',
    subtitle: 'Suggerimenti creativi e divertenti per aggiungere spezia alla tua vita intima e riscoprire il desiderio.',
    author: 'Alex Passion',
    category: 'Giochi',
    readTime: '6 min',
    publishDate: '2024-05-03',
    excerpt: 'La routine può uccidere la passione, ma con un po\' di creatività e gioco puoi riaccendere la fiamma.',
  },
];

const toPortableText = (text) => [
  {
    _type: 'block',
    _key: Math.random().toString(36).slice(2),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
  },
];

async function seed() {
  console.log('Starting Sanity seed...');

  for (const blog of BLOGS) {
    const doc = {
      _type: 'blogPost',
      _id: `blog-${blog.id}`,
      title: blog.title,
      subtitle: blog.subtitle,
      slug: { _type: 'slug', current: blog.id },
      author: blog.author,
      category: blog.category,
      readTime: blog.readTime,
      publishedAt: new Date(blog.publishDate).toISOString(),
      excerpt: blog.excerpt,
      body: toPortableText(blog.excerpt),
    };

    await client.createOrReplace(doc);
    console.log(`✓ Created: ${blog.title}`);
  }

  console.log('\nSeed complete! Add images and body content via lovehuble.sanity.studio');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
