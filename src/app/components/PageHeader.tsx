'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const categoryBg: Record<string, string> = {
  'sex-toys':         '/sfondi/sextoys.avif',
  'abbigliamento':    '/sfondi/lingerie.jpg',
  'bdsm':             '/sfondi/bsdm.avif',
  'salute-benessere': '/sfondi/lubrificanti.avif',
  'giochi':           '/sfondi/giochi.avif',
  'speciali':         '/sfondi/speciali.webp',
};

interface PageHeaderProps {
  title: string;
  subtitle: string;
  categorySlug: string;
  backHref: string;
  backLabel: string;
}

export const PageHeader = ({ title, subtitle, categorySlug, backHref, backLabel }: PageHeaderProps) => {
  const bgImage = categoryBg[categorySlug];

  return (
    <section className="relative pt-[68px] lg:pt-[80px]">
      <div className="relative h-[260px] lg:h-[340px] overflow-hidden">
        <img src={bgImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/80" />
        
        {/* Title + subtitle */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[980px] mx-auto px-6 lg:px-8 pb-[40px] lg:pb-[56px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[40px] lg:text-[64px] font-semibold tracking-[-0.015em] text-white mb-[10px] leading-[1.07]"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[17px] lg:text-[21px] text-white/85 font-normal leading-[1.4] tracking-[-0.003em] max-w-[560px]"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
