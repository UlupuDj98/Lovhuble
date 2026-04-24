import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { products } from '../data/products';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import { Breadcrumb } from '../components/productdetail/Breadcrumb';
import { ImageGallery } from '../components/productdetail/ImageGallery';
import { ProdottiCorrelati } from '../components/productdetail/ProdottiCorrelati';

export const ProductDetail = () => {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const { slug, categoria, id } = router.query as Record<string, string>;

  const product = slug && categoria
    ? products.find(p => p.slug === slug && p.categorySlug === categoria)
    : products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <div className="text-center">
          <h2 className="text-[24px] font-semibold text-[#1d1d1f] mb-[16px]">Prodotto non trovato</h2>
          <Link href="/prodotti" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-[15px]">
            Torna ai prodotti
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Prodotti', href: '/prodotti' },
    { label: product.category, href: '/prodotti' },
    { label: product.name },
  ];

  return (
    <div className="pt-[68px] lg:pt-[130px] min-h-screen bg-[#f5f5f7]">
      {/* Breadcrumb */}
      <div className="max-w-[980px] mx-auto px-6 lg:px-8 py-[28px]">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Product Detail */}
      <section className="pb-[72px]">
        <div className="max-w-[980px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[80px]">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ImageGallery images={product.images} alt={product.name} />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col justify-center space-y-[28px]"
            >
              <div className="space-y-[10px]">
                <p className="text-[11px] text-[#6e6e73] tracking-[0.08em] uppercase font-medium">
                  {product.category}
                </p>
                <h1 className="text-[36px] lg:text-[44px] font-semibold tracking-[-0.015em] text-[#1d1d1f] leading-[1.1]">
                  {product.name}
                </h1>
                <p className="text-[26px] font-semibold text-[#1d1d1f] tracking-[-0.007em]">
                  €{product.price}
                </p>
              </div>

              <p className="text-[16px] text-[#6e6e73] leading-[1.5] font-normal">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-[14px] tracking-[-0.003em]">
                  Caratteristiche
                </h3>
                <ul className="space-y-[10px]">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-[12px]">
                      <div className="w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-[2px] shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
                        <Check className="w-[10px] h-[10px] text-[#1d1d1f]" strokeWidth={3} />
                      </div>
                      <span className="text-[14px] text-[#6e6e73] leading-[1.5] font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <div className="pt-[4px] space-y-[12px]">
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.18)' }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full py-[14px] rounded-full text-[16px] font-medium transition-all duration-300 shadow-sm ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-[#1d1d1f] text-white hover:bg-[#424245]'
                  }`}
                >
                  {added ? 'Aggiunto al Carrello ✓' : 'Aggiungi al Carrello'}
                </motion.button>

                <motion.button
                  onClick={() => toggleWishlist(product)}
                  whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.12)' }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full py-[14px] rounded-full text-[16px] font-medium transition-all duration-300 border ${
                    isInWishlist(product.id)
                      ? 'bg-[#d4a5a5] border-[#d4a5a5] text-white'
                      : 'bg-transparent border-[#d0d0d5] text-[#1d1d1f] hover:border-[#1d1d1f]'
                  }`}
                >
                  {isInWishlist(product.id) ? '♥ Nei Preferiti' : '♡ Aggiungi ai Preferiti'}
                </motion.button>

                <p className="text-[13px] text-[#6e6e73] text-center font-normal">
                  Spedizione gratuita per ordini superiori a €100
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prodotti Correlati */}
      <ProdottiCorrelati currentProduct={product} />
    </div>
  );
};
