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

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-[35px] lg:top-[50px] left-6 lg:left-8 z-10"
        >
          <Link href={backHref}>
            <span className="inline-flex items-center gap-[6px] bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white text-[13px] lg:text-[18px] font-medium px-[12px] lg:px-[16px] py-[6px] lg:py-[8px] rounded-full">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {backLabel}
            </span>
          </Link>
        </motion.div>

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
