import { useState, useEffect } from 'react';
import { getProductsByCollection } from '../lib/medusa-data';
import { Product } from '../data/products';

const MOCK_OFFERS: Product[] = [
  {
    id: 'mock-1',
    name: 'Offerta Speciale 1',
    slug: 'offerta-speciale-1',
    subtitle: 'Scopri questa offerta esclusiva a tempo limitato.',
    category: 'Offerte',
    categorySlug: 'offerte',
    subCategory: 'Offerte',
    subCategorySlug: 'offerte',
    price: 29.99,
    image: '/prodotti/offerte/offerte-1.png',
    images: ['/prodotti/offerte/offerte-1.png'],
    description: '',
    features: [],
    inStock: true,
  },
  {
    id: 'mock-2',
    name: 'Offerta Speciale 2',
    slug: 'offerta-speciale-2',
    subtitle: 'Un prodotto premium ad un prezzo imbattibile.',
    category: 'Offerte',
    categorySlug: 'offerte',
    subCategory: 'Offerte',
    subCategorySlug: 'offerte',
    price: 49.99,
    image: '/prodotti/offerte/offerte-2.png',
    images: ['/prodotti/offerte/offerte-2.png'],
    description: '',
    features: [],
    inStock: true,
  },
  {
    id: 'mock-3',
    name: 'Offerta Speciale 3',
    slug: 'offerta-speciale-3',
    subtitle: 'Solo per pochi giorni, non perdere questa occasione.',
    category: 'Offerte',
    categorySlug: 'offerte',
    subCategory: 'Offerte',
    subCategorySlug: 'offerte',
    price: 39.99,
    image: '/prodotti/offerte/offerte-3.png',
    images: ['/prodotti/offerte/offerte-3.png'],
    description: '',
    features: [],
    inStock: true,
  },
  {
    id: 'mock-4',
    name: 'Offerta Speciale 4',
    slug: 'offerta-speciale-4',
    subtitle: 'Qualità garantita ad un prezzo esclusivo.',
    category: 'Offerte',
    categorySlug: 'offerte',
    subCategory: 'Offerte',
    subCategorySlug: 'offerte',
    price: 59.99,
    image: '/prodotti/offerte/offerte-4.png',
    images: ['/prodotti/offerte/offerte-4.png'],
    description: '',
    features: [],
    inStock: true,
  },
];

type State = {
  allProducts: Product[];
  loading: boolean;
};

export const useSpecialOffers = () => {
  const [state, setState] = useState<State>({ allProducts: [], loading: true });

  useEffect(() => {
    let cancelled = false;

    getProductsByCollection('offerte')
      .then((products) => {
        if (!cancelled) {
          setState({
            allProducts: products.length > 0 ? products : MOCK_OFFERS,
            loading: false,
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ allProducts: MOCK_OFFERS, loading: false });
        }
      });

    return () => { cancelled = true; };
  }, []);

  return state;
};
