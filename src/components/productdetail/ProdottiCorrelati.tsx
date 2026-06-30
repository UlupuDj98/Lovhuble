'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { Product } from '../../data/products';
import { getProductsByCategory, getProductsByParentCategory } from '../../lib/medusa-data';
import { ProductCard } from '../product/ProductCard';
import { useWishlist } from '../../context/WishlistContext';

interface ProdottiCorrelatiProps {
  currentProduct: Product;
  initialRelated?: Product[];
}

export const ProdottiCorrelati = ({ currentProduct, initialRelated }: ProdottiCorrelatiProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [related, setRelated] = useState<Product[]>(initialRelated ?? []);

  useEffect(() => {
    // Se initialRelated è popolato (es. navigazione a prodotto pre-renderizzato), usalo direttamente
    if (initialRelated?.length) {
      setRelated(initialRelated);
      return;
    }

    // Altrimenti fetch client-side
    setRelated([]);
    async function load() {
      // Per categorie top-level (es. bambole) subCategorySlug è vuoto: salta diritto al parent
      const sameCat = currentProduct.subCategorySlug
        ? await getProductsByCategory(currentProduct.subCategorySlug)
        : [];
      const filtered = sameCat.filter(p => p.id !== currentProduct.id);

      if (filtered.length >= 6) {
        setRelated(filtered.slice(0, 6));
        return;
      }

      const sameParent = await getProductsByParentCategory(currentProduct.categorySlug);
      const extra = sameParent.filter(
        p => p.id !== currentProduct.id && !filtered.some(f => f.id === p.id)
      );
      setRelated([...filtered, ...extra].slice(0, 6));
    }
    load().catch(console.error);
  }, [currentProduct.id, initialRelated]);

  if (related.length === 0) return null;

  return (
    <section className="py-[40px] lg:py-[55px] bg-[#fbfbfd]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-[26px] lg:text-[32px] font-semibold text-[#1d1d1f] mb-[40px] tracking-[-0.009em]"
        >
          Potrebbero Piacerti Anche
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-[14px] lg:gap-[18px]">
          {related.map((product, i) => (
            <motion.div
              key={product.id}
              className="h-[380px] lg:h-[520px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.04, duration: 0.45 }}
            >
              <ProductCard
                product={product}
                badge={product.category}
                wishlisted={isInWishlist(product.id)}
                onWishlist={e => { e.preventDefault(); toggleWishlist(product); }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
