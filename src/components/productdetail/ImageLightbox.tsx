'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

interface ImageLightboxProps {
  images: string[];
  alt: string;
  selected: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox = ({ images, alt, selected, onClose, onNavigate }: ImageLightboxProps) => {
  const touchStart = useRef<number>(0);

  const prev = () => onNavigate((selected - 1 + images.length) % images.length);
  const next = () => onNavigate((selected + 1) % images.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Contenitore immagine */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-[90vw] h-[80vh] max-w-[860px] bg-white rounded-[20px] shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden"
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Immagine */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              src={images[selected]}
              alt={`${alt} — foto ${selected + 1}`}
              fill
              className="object-contain p-[32px]"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Tasto chiudi */}
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-[14px] right-[14px] w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#1d1d1f]/8 hover:bg-[#1d1d1f]/15 transition-colors duration-200 z-10"
        >
          <X className="w-[18px] h-[18px] text-[#1d1d1f]" strokeWidth={2} />
        </button>

        {/* Frecce navigazione */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Foto precedente"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1d1d1f]/8 hover:bg-[#1d1d1f]/15 transition-colors duration-200"
            >
              <ChevronLeft className="w-[18px] h-[18px] text-[#1d1d1f]" strokeWidth={2} />
            </button>
            <button
              onClick={next}
              aria-label="Foto successiva"
              className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#1d1d1f]/8 hover:bg-[#1d1d1f]/15 transition-colors duration-200"
            >
              <ChevronRight className="w-[18px] h-[18px] text-[#1d1d1f]" strokeWidth={2} />
            </button>
          </>
        )}

        {/* Contatore */}
        {images.length > 1 && (
          <div className="absolute bottom-[14px] right-[14px] bg-black/20 backdrop-blur-sm text-[#1d1d1f] text-[11px] font-medium px-[10px] py-[4px] rounded-full">
            {selected + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
};
