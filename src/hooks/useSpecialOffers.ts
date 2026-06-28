import { useState, useEffect, useCallback } from 'react';
import { getFlashOffers } from '../lib/medusa-data';
import { Product } from '../data/products';

type State = {
  allProducts: Product[];
  loading: boolean;
};

export const useSpecialOffers = () => {
  const [state, setState] = useState<State>({ allProducts: [], loading: true });

  useEffect(() => {
    let cancelled = false;

    getFlashOffers()
      .then((products) => {
        if (!cancelled) setState({ allProducts: products, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ allProducts: [], loading: false });
      });

    return () => { cancelled = true; };
  }, []);

  const removeExpired = useCallback(() => {
    const now = new Date();
    setState((prev) => ({
      ...prev,
      allProducts: prev.allProducts.filter((p) => {
        return p.saleEndDate && new Date(p.saleEndDate) > now;
      }),
    }));
  }, []);

  return { ...state, removeExpired };
};
