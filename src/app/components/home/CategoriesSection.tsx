'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories as rawCategories } from '../../data/products';

const categories = rawCategories.map(c => ({
  title: c.name,
  imageSrc: c.image,
  link: `/prodotti/${c.slug}`,
}));

const SCROLL_AMOUNT = 380;

const CategoryCard = ({ category }: { category: typeof categories[0] }) => (
  <Link href={category.link} className="flex flex-col items-center gap-[16px] group">
    <div className="w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex items-center justify-center overflow-hidden group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300">
      <Image
        src={category.imageSrc}
        alt={category.title}
        width={148}
        height={148}
        className="object-contain w-[118px] h-[118px] lg:w-[148px] lg:h-[148px] group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <span className="text-[18px] lg:text-[26px] text-[#1d1d1f] font-semibold text-center leading-[1.4] capitalize">
      {category.title}
    </span>
  </Link>
);

export const CategoriesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const [canScrollLeft, setCanScrollLeft] = useState(false);

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

  const onScroll = () => {
    setCanScrollLeft((scrollRef.current?.scrollLeft ?? 0) > 0);
  };

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
          <span className="text-[#1d1d1f] font-semibold">Esplora per Categoria. </span>
          <span className="text-[#86868b] font-inter">Trova esattamente ciò che desideri</span>
        </motion.h2>
      </div>

      <div className="max-w-[1120px] mx-auto relative">
        {/* Gradient fade right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-[120px] lg:w-[200px] z-10"
          style={{ background: 'linear-gradient(to left, #f5f5f7 0%, transparent 100%)' }}
        />

        {/* Chevron left — lg only, visibile solo dopo scroll */}
        <motion.button
          aria-label="Scorri a sinistra"
          onClick={() => scrollBy('left')}
          animate={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
          transition={{ duration: 0.2 }}
          className="hidden lg:flex absolute left-[-25px] top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] items-center justify-center hover:scale-105 transition-transform duration-200"
        >
          <ChevronLeft className="w-[20px] h-[20px] text-[#1d1d1f]" strokeWidth={1.5} />
        </motion.button>

        {/* Chevron right — lg only */}
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
          className="scrollbar-hide flex gap-[32px] lg:gap-[56px] overflow-x-auto snap-x snap-mandatory select-none"
          style={{
            paddingTop: '60px',
            paddingBottom: '60px',
            paddingLeft: '24px',
            paddingRight: '24px',
            marginTop: '-60px',
            marginBottom: '-60px',
            scrollPaddingLeft: '24px',
            cursor: 'grab',
          } as React.CSSProperties}
        >
          {categories.map((category, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
          <div className="w-[80px] lg:w-[140px] flex-shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
};
