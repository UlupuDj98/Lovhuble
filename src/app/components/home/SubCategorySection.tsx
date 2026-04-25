'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { subCategories } from '../../data/products';

const SCROLL_AMOUNT = 380;

interface SubCategoriesSectionProps {
  mainCategorySlug: string;
}

const CategoryCard = ({ title, imageSrc, link }: { title: string; imageSrc: string; link: string }) => (
  <Link href={link} className="flex flex-col items-center gap-[16px] group">
    <div className="w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] flex items-center justify-center overflow-hidden group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition-shadow duration-300">
      <Image
        src={imageSrc}
        alt={title}
        width={148}
        height={148}
        className="object-contain w-[118px] h-[118px] lg:w-[148px] lg:h-[148px] group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <span className="text-[18px] lg:text-[26px] text-[#1d1d1f] font-semibold text-center leading-[1.4] capitalize">
      {title}
    </span>
  </Link>
);

export const SubCategoriesSection = ({ mainCategorySlug }: SubCategoriesSectionProps) => {
  const items = subCategories
    .filter(s => s.parentSlug === mainCategorySlug)
    .map(s => ({ title: s.name, imageSrc: s.image, link: `/prodotti/${mainCategorySlug}/${s.slug}` }));

  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { active: true, startX: e.pageX - el.getBoundingClientRect().left, scrollLeft: el.scrollLeft, moved: false };
    el.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.active) return;
    const delta = (e.pageX - el.getBoundingClientRect().left - dragState.current.startX) * 1.4;
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

  const showDesktopControls = items.length > 4;

  if (items.length === 0) return null;

  return (
    <section className="py-[40px] lg:py-[90px] bg-[#f5f5f7]">
      <div className="max-w-[1120px] mx-auto relative">
        {showDesktopControls && (
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-[120px] lg:w-[200px] z-10"
            style={{ background: 'linear-gradient(to left, #f5f5f7 0%, transparent 100%)' }}
          />
        )}

        {showDesktopControls && (
          <motion.button
            aria-label="Scorri a sinistra"
            onClick={() => scrollBy('left')}
            animate={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
            transition={{ duration: 0.2 }}
            className="hidden lg:flex absolute left-[-25px] top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] items-center justify-center hover:scale-105 transition-transform duration-200"
          >
            <ChevronLeft className="w-[20px] h-[20px] text-[#1d1d1f]" strokeWidth={1.5} />
          </motion.button>
        )}

        {showDesktopControls && (
          <motion.button
            aria-label="Scorri a destra"
            onClick={() => scrollBy('right')}
            animate={{ opacity: 1, pointerEvents: 'auto' }}
            transition={{ duration: 0.2 }}
            className="hidden lg:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] items-center justify-center hover:scale-105 transition-transform duration-200"
          >
            <ChevronRight className="w-[20px] h-[20px] text-[#1d1d1f]" strokeWidth={1.5} />
          </motion.button>
        )}

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
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <CategoryCard {...item} />
            </motion.div>
          ))}
          {showDesktopControls && <div className="w-[80px] lg:w-[140px] flex-shrink-0" aria-hidden />}
        </div>
      </div>
    </section>
  );
};
