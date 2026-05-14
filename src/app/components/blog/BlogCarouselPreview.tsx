'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { client } from '@/app/lib/sanity/client';
import { blogPostsQuery } from '@/app/lib/sanity/queries';
import { BlogPost } from '@/app/lib/sanity/types';

const SCROLL_AMOUNT = 380;

export const BlogCarouselPreview = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  useEffect(() => {
    client.fetch<BlogPost[]>(blogPostsQuery).then(setPosts).catch(() => {});
  }, []);

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

  const scrollBy = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? SCROLL_AMOUNT : -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  if (posts.length === 0) return null;

  return (
    <section className="pt-[58px] pb-[58px] sm:pt-[64px] sm:pb-[84px] md:pt-[70px] md:pb-[100px] lg:py-[110px] bg-[#1a1a1a]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 mb-[48px] lg:mb-[64px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-[32px] lg:text-[56px] tracking-[-0.015em] leading-[1.1]"
        >
          <span className="text-white font-semibold">Blog.</span>
          <span className="text-[#86868b] font-inter"> Articoli e guide per approfondire</span>
        </motion.h2>
        
      </div>

      <div className="max-w-[1180px] mx-auto relative">
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-[120px] lg:w-[200px] z-10"
          style={{ background: 'linear-gradient(to left, #1a1a1a 0%, transparent 100%)' }}
        />

        <motion.button
          aria-label="Scorri a sinistra"
          onClick={() => scrollBy('left')}
          animate={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? 'auto' : 'none' }}
          transition={{ duration: 0.2 }}
          className="hidden lg:flex absolute left-[-25px] top-1/2 -translate-y-1/2 z-20 w-[44px] h-[44px] bg-white rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] items-center justify-center hover:scale-105 transition-transform duration-200"
        >
          <ChevronLeft className="w-[20px] h-[20px] text-[#1d1d1f]" strokeWidth={1.5} />
        </motion.button>

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
          className="scrollbar-hide flex sm:gap-[14px] md:gap-[24px] lg:gap-[20px] overflow-x-auto snap-x snap-mandatory select-none"
          style={{
            paddingTop: '60px',
            paddingBottom: '80px',
            paddingLeft: '34px',
            paddingRight: '34px',
            marginTop: '-60px',
            marginBottom: '-60px',
            scrollPaddingLeft: '34px',
            cursor: 'grab',
          } as React.CSSProperties}
        >
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              className="w-[300px] h-[360px] sm:w-[310px] md:h-[380px] lg:w-[450px] lg:h-[600px] flex-shrink-0 snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
          <div className="w-[80px] lg:w-[140px] flex-shrink-0" aria-hidden />
          
        </div>
        
         <Link
          href="/blog"
          className="inline-flex items-center gap-[6px] mt-[2px] sm:mt-[28px] lg:mt-[40px] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] text-white underline underline-offset-4 hover:text-[#86868b] transition-colors duration-200 pl-[24px] lg:pl-[34px]"
        >
          Visita il Blog <ArrowRight className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px]" />
        </Link>
    
      </div>
     
    </section>
  );
};
