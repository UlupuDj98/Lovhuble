import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Heart, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

export const Wishlist = () => {
  const { items, removeFromWishlist, isInWishlist, toggleWishlist } = useWishlist();

  const wishlistProducts = items
    .map(item => products.find(p => p.id === item.id))
    .filter(Boolean) as typeof products;

  if (items.length === 0) {
    return (
      <div className="pt-[68px] lg:pt-[80px] min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-6"
        >
          <div className="w-[64px] h-[64px] mx-auto mb-[24px] bg-white rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
            <Heart className="w-[32px] h-[32px] text-[#d4a5a5]" strokeWidth={1.5} />
          </div>
          <h2 className="text-[32px] font-semibold text-[#1d1d1f] mb-[12px] tracking-[-0.009em]">
            La tua lista è vuota
          </h2>
          <p className="text-[17px] text-[#6e6e73] mb-[32px] font-normal">
            Salva i prodotti che ami per trovarli facilmente
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.15)' }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1d1d1f] text-white px-[22px] py-[12px] rounded-full text-[17px] font-normal hover:bg-[#424245] transition-colors duration-200 shadow-sm"
            >
              Scopri i Prodotti
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-[68px] lg:pt-[80px] min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[980px] mx-auto px-6 lg:px-8 py-[64px] lg:py-[88px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline justify-between mb-[48px]"
        >
          <h1 className="text-[40px] lg:text-[48px] font-semibold tracking-[-0.015em] text-[#1d1d1f] leading-[1.08]">
            I Tuoi Preferiti
          </h1>
          <span className="text-[15px] text-[#6e6e73] font-normal">
            {items.length} {items.length === 1 ? 'prodotto' : 'prodotti'}
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[20px]">
          <AnimatePresence>
            {wishlistProducts.map((product, i) => (
              <motion.div
                key={product.id}
                className="relative aspect-[340/515]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <ProductCard
                  product={product}
                  badge={product.category}
                  wishlisted={isInWishlist(product.id)}
                  onWishlist={e => { e.preventDefault(); toggleWishlist(product); }}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-[-10px] right-[-10px] w-[28px] h-[28px] bg-[#1d1d1f] text-white rounded-full flex items-center justify-center hover:bg-[#d4a5a5] transition-colors duration-200 z-10 shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                  aria-label="Rimuovi dai preferiti"
                >
                  <X className="w-[14px] h-[14px]" strokeWidth={2.5} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-[48px] text-center"
        >
          <Link
            href="/"
            className="text-[14px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors font-normal"
          >
            Continua a Sfogliare
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
