'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<number>(0);

  const navigate = (next: number) => {
    setDirection(next > selected ? 1 : -1);
    setSelected(next);
  };

  const prev = () => navigate((selected - 1 + images.length) % images.length);
  const next = () => navigate((selected + 1) % images.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  };

  return (
    <div className="flex flex-col gap-[16px]">
      {/* Main image */}
      <div
        className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[selected]}
              alt={`${alt} — foto ${selected + 1}`}
              fill
              className="object-contain p-[28px]"
              priority={selected === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Desktop nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Foto precedente"
              className="hidden lg:flex absolute left-[12px] top-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-white/85 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-white transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)]"
            >
              <ChevronLeft className="w-[16px] h-[16px] text-[#1d1d1f]" strokeWidth={2} />
            </button>
            <button
              onClick={next}
              aria-label="Foto successiva"
              className="hidden lg:flex absolute right-[12px] top-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-white/85 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-white transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)]"
            >
              <ChevronRight className="w-[16px] h-[16px] text-[#1d1d1f]" strokeWidth={2} />
            </button>
          </>
        )}

        {/* Image counter badge */}
        <div className="absolute bottom-[14px] right-[14px] bg-black/30 backdrop-blur-sm text-white text-[11px] font-medium px-[10px] py-[4px] rounded-full">
          {selected + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails — desktop */}
      {images.length > 1 && (
        <div className="hidden lg:flex gap-[10px] justify-center">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={`Vai alla foto ${i + 1}`}
              className={`relative w-[76px] h-[76px] rounded-[14px] overflow-hidden bg-white border-2 transition-all duration-200 ${
                selected === i
                  ? 'border-[#1d1d1f] shadow-[0_2px_10px_rgba(0,0,0,0.15)]'
                  : 'border-transparent opacity-55 hover:opacity-90 hover:border-[#acacac]'
              }`}
            >
              <Image src={img} alt={`${alt} miniatura ${i + 1}`} fill className="object-contain p-[6px]" />
            </button>
          ))}
        </div>
      )}

      {/* Dots — mobile */}
      {images.length > 1 && (
        <div className="flex gap-[8px] justify-center lg:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i)}
              aria-label={`Vai alla foto ${i + 1}`}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                selected === i ? 'bg-[#1d1d1f] w-[20px]' : 'bg-[#1d1d1f]/25 w-[6px]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
