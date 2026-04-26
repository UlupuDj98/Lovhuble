'use client';

import { motion } from 'motion/react';
import { products, Product } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { useWishlist } from '../../context/WishlistContext';

interface ProdottiCorrelatiProps {
  currentProduct: Product;
}

export const ProdottiCorrelati = ({ currentProduct }: ProdottiCorrelatiProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Prima stessa categoria, poi altre categorie, max 6
  const related = [
    ...products.filter(p => p.id !== currentProduct.id && p.category === currentProduct.category),
    ...products.filter(p => p.id !== currentProduct.id && p.category !== currentProduct.category),
  ].slice(0, 6);

  if (related.length === 0) return null;

  return (
    <section className="py-[64px] bg-[#fbfbfd]">
      <div className="max-w-[980px] mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-[32px] font-semibold text-[#1d1d1f] mb-[40px] tracking-[-0.009em]"
        >
          Potrebbero Piacerti Anche
        </motion.h2>

        {/* Grid: 2 col su sm, 3 col su md, 4 col su lg — 2 righe */}
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
