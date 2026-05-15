import { useState, useEffect } from 'react';
import { getProductsByCategory } from '../lib/medusa-data';
import { Product } from '../data/products';

type State = {
  allProducts: Product[];
  loading: boolean;
};

export const useSpecialOffers = () => {
  const [state, setState] = useState<State>({ allProducts: [], loading: true });

  useEffect(() => {
    let cancelled = false;

    getProductsByCategory('offerte')
      .then((products) => {
        if (!cancelled) setState({ allProducts: products.slice(0, 4), loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ allProducts: [], loading: false });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
};
