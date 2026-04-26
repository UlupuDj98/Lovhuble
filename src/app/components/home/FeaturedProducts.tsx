'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { useWishlist } from '../../context/WishlistContext';

const featuredIds = ['1', '2', '3', '4', '5', '6'];
const featuredProducts = products.filter(p => featuredIds.includes(p.id));

const SCROLL_AMOUNT = 380;

export const FeaturedProducts = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const onScroll = () => {
    setCanScrollLeft((scrollRef.current?.scrollLeft ?? 0) > 0);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      active: true,
      startX: e.pageX - el.getBoundingClientRect().left,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
    el.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.active) return;
    const x = e.pageX - el.getBoundingClientRect().left;
    const delta = (x - dragState.current.startX) * 1.4;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const onMouseUp = () => {
    dragState.current.active = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved) e.preventDefault();
  };

  const { isInWishlist, toggleWishlist } = useWishlist();

  const scrollBy = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? SCROLL_AMOUNT : -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  return (
    <section className="py-[78px] lg:py-[110px] bg-[#f5f5f7]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 mb-[48px] lg:mb-[64px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-[32px] lg:text-[56px] tracking-[-0.015em] leading-[1.1]"
        >
          <span className="text-[#1d1d1f] font-semibold">Prodotti in Evidenza. </span>
          <span className="text-[#86868b] font-inter">I nostri bestseller selezionati per te</span>
        </motion.h2>
      </div>

      <div className="max-w-[1180px] mx-auto relative">
        {/* Gradient fade right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-[120px] lg:w-[200px] z-10"
          style={{ background: 'linear-gradient(to left, #f5f5f7 0%, transparent 100%)' }}
        />

        {/* Chevron left — lg only, on hover */}
        <motion.button
          aria-label="Scorri a sinistra"
          onClick={() => scrollBy('left')}
          animate={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
          transition={{ duration: 0.2 }}
          className="hidden lg:flex absolute left-[-25px] top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] items-center justify-center hover:scale-105 transition-transform duration-200"
        >
          <ChevronLeft className="w-[20px] h-[20px] text-[#1d1d1f]" strokeWidth={1.5} />
        </motion.button>

        {/* Chevron right — lg only, on hover */}
        <motion.button
          aria-label="Scorri a destra"
          onClick={() => scrollBy('right')}
          animate={{ opacity: 1, pointerEvents: 'auto' }}
          transition={{ duration: 0.2 }}
          className="hidden lg:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] items-center justify-center hover:scale-105 transition-transform duration-200"
        >
          <ChevronRight className="w-[20px] h-[20px] text-[#1d1d1f]" strokeWidth={1.5} />
        </motion.button>

        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClickCapture={onClickCapture}
          onScroll={onScroll}
          className="scrollbar-hide flex gap-[16px] lg:gap-[20px] overflow-x-auto snap-x snap-mandatory select-none"
          style={{
            paddingTop: '60px',
            paddingBottom: '80px',
            paddingLeft: '34px',
            paddingRight: '24px',
            marginTop: '-60px',
            marginBottom: '-60px',
            scrollPaddingLeft: '34px',
            cursor: 'grab',
          } as React.CSSProperties}
        >
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              className="w-[260px] h-[394px] lg:w-[340px] lg:h-[526px] flex-shrink-0 snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <ProductCard
                product={product}
                badge={product.category}
                wishlisted={isInWishlist(product.id)}
                onWishlist={e => { e.preventDefault(); toggleWishlist(product); }}
              />
            </motion.div>
          ))}
          <div className="w-[80px] lg:w-[140px] flex-shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
};
