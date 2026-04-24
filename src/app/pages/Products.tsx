'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
 
export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const categories = ['Tutti', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let list = selectedCategory === 'Tutti'
      ? [...products]
      : products.filter(p => p.category === selectedCategory);

    list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  return (
    <div className="pt-[68px] lg:pt-[80px] min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <section className="py-[64px] lg:py-[120px] bg-white">
        <div className="max-w-[980px] mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[48px] lg:text-[64px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[16px] leading-[1.07]"
          >
            La Nostra Collezione
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[19px] lg:text-[21px] text-[#6e6e73] font-normal leading-[1.4] tracking-[-0.003em] max-w-[560px] mx-auto"
          >
            Scopri la nostra gamma di prodotti per il piacere intimo e accessori sensuali
          </motion.p>
        </div>
      </section>

      {/* Controls */}
      <section className="py-20">
        <div className="max-w-[980px] mx-auto px-6 lg:px-8">
          {/* Search */}
          <div className="mb-[24px]">
            <div className="relative max-w-[480px] mx-auto ">
              <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#6e6e73]" strokeWidth={2} />
              <input
                type="text"
                placeholder="Cerca prodotti..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-[46px] pr-[16px] py-[11px] bg-white rounded-full text-[14px] text-[#1d1d1f] placeholder-[#6e6e73] focus:outline-none shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-shadow focus:shadow-[0_2px_20px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>

          {/* Sort + Filter row */}
          <div className="flex items-center justify-between mt-[40px] mb-[30px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-[13px] text-[#6e6e73]">Ordina per:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as typeof sortBy)}
                  className="pl-[14px] pr-[32px] py-[7px] bg-white rounded-full text-[13px] text-[#1d1d1f] focus:outline-none shadow-[0_2px_8px_rgba(0,0,0,0.07)] cursor-pointer appearance-none"
                >
                  <option value="default">Predefinito</option>
                  <option value="price-asc">Prezzo: basso → alto</option>
                  <option value="price-desc">Prezzo: alto → basso</option>
                  <option value="name">Nome A-Z</option>
                </select>
                <ChevronDown className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#6e6e73] pointer-events-none" strokeWidth={2} />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-[7px] px-[16px] py-[7px] rounded-full text-[13px] transition-all ${
                showFilters ? 'bg-[#1d1d1f] text-white' : 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_2px_14px_rgba(0,0,0,0.12)]'
              }`}
            >
              <SlidersHorizontal className="w-[14px] h-[14px]" strokeWidth={2} />
              Filtri
            </button>
          </div>

          {/* Price filter */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-[20px] p-[20px] bg-white rounded-[18px] shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            >
              <div className="max-w-[400px]">
                <label className="block text-[13px] font-semibold text-[#1d1d1f] mb-[10px]">
                  Range di Prezzo: €{priceRange[0]} – €{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="range-pink w-full"
                />
              </div>
            </motion.div>
          )}

          {/* Category pills */}
          <div className="flex flex-wrap gap-[8px] mb-[16px] justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-[16px] py-[7px] rounded-full text-[13px] font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#1d1d1f] text-white'
                    : 'bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_2px_14px_rgba(0,0,0,0.12)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-[12px] text-[#6e6e73] text-center">
            {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'prodotto' : 'prodotti'}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-[88px] lg:pb-[110px]">
        <div className="max-w-[980px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[20px]">
            {filteredAndSortedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                className="aspect-[340/515]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
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

    </div>
  );
};
