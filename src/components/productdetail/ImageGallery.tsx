'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { ImageLightbox } from './ImageLightbox';
import { useDelayedLoader, LoaderOverlay } from './LoaderOverlay';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  productCategory: string;
}


const THUMB_WINDOW = 3;

export const ImageGallery = ({ images, alt, productCategory }: ImageGalleryProps) => {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const { showLoader, startLoading, stopLoading } = useDelayedLoader();
  const touchStart = useRef<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(0);
    setDirection(0);
    setThumbOffset(0);
    setMobileActive(0);
  }, [images[0]]);

  // IntersectionObserver per aggiornare il dot attivo nello slider mobile
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slides = slider.querySelectorAll<HTMLElement>('[data-slide]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setMobileActive(Number((entry.target as HTMLElement).dataset.slide));
          }
        });
      },
      { root: slider, threshold: 0.5 }
    );
    slides.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [images]);

  const navigate = (next: number) => {
    setDirection(next > selected ? 1 : -1);
    setSelected(next);
    startLoading();
    if (images.length > THUMB_WINDOW) {
      setThumbOffset(prev => {
        if (next < prev) return next;
        if (next >= prev + THUMB_WINDOW) return next - THUMB_WINDOW + 1;
        return prev;
      });
    }
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

      {/* ── MOBILE: slider orizzontale scorrevole ── */}
      <div className="relative sm:hidden">

         {/* Gradient fade right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-[10px] z-10"
          style={{ background: 'linear-gradient(to left, #f5f5f7 0%, transparent 100%)' }}
        />

        <div
          ref={sliderRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-[12px] pl-[16px] pr-[16px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {images.map((img, i) => (
            <div
              key={img}
              data-slide={i}
              className="snap-start flex-shrink-0 w-[78%] aspect-[3/4] relative rounded-[15px] overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-zoom-in"
              onClick={() => { setSelected(i); setLightboxOpen(true); }}
            >
              <Image
                src={img}
                alt={`${alt} — foto ${i + 1}`}
                fill
                sizes="84vw"
                className={productCategory === 'bambole' ? 'object-cover' : 'object-contain p-[20px]'}
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Dots sovrapposti in basso a sinistra */}
        {images.length > 1 && (
          <div className="absolute bottom-[14px] left-[28px] flex gap-[6px] items-center pointer-events-none">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-[5px] rounded-full transition-all duration-300 ${
                  mobileActive === i
                    ? 'bg-black w-[16px] border border-black shadow-[0_1px_4px_rgba(0,0,0,0.3)]'
                    : 'bg-[#f5f5f7] w-[6px]'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── DESKTOP: immagine principale ── */}
      <div
        className="hidden sm:block relative w-full sm:aspect-auto sm:h-[650px] lg:w-[500px] lg:h-[700px] rounded-[24px] overflow-hidden bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] cursor-zoom-in"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => setLightboxOpen(true)}
      >
        <div key={selected} className="absolute inset-0">
          <Image
            src={images[selected]}
            alt={`${alt} — foto ${selected + 1}`}
            fill
            sizes="500px"
            className={productCategory === 'bambole' ? 'object-cover' : 'object-contain p-[28px]'}
            priority={selected === 0}
            onLoad={stopLoading}
          />
        </div>

        {showLoader && <LoaderOverlay />}

        {/* Preload immagine successiva */}
        {images.length > 1 && (
          <span className="sr-only" aria-hidden>
            <Image
              src={images[(selected + 1) % images.length]}
              alt=""
              fill
              sizes="500px"
              priority
            />
          </span>
        )}

        {/* Desktop nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Foto precedente"
              className="flex absolute left-[12px] top-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-white/85 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-white transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)]"
            >
              <ChevronLeft className="w-[16px] h-[16px] text-[#1d1d1f]" strokeWidth={2} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Foto successiva"
              className="flex absolute right-[12px] top-1/2 -translate-y-1/2 w-[38px] h-[38px] bg-white/85 backdrop-blur-sm rounded-full items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-white transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)]"
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
        <div className="hidden lg:flex gap-[12px] justify-center items-center">
          {images.length > THUMB_WINDOW && (
            <button
              onClick={() => setThumbOffset(o => Math.max(0, o - 1))}
              disabled={thumbOffset === 0}
              aria-label="Thumbnail precedenti"
              className="flex-shrink-0 w-[32px] h-[32px] rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-[#f5f5f5] transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-[15px] h-[15px] text-[#1d1d1f]" strokeWidth={2} />
            </button>
          )}

          {(images.length > THUMB_WINDOW
            ? images.slice(thumbOffset, thumbOffset + THUMB_WINDOW)
            : images
          ).map((img, idx) => {
            const i = images.length > THUMB_WINDOW ? thumbOffset + idx : idx;
            return (
              <button
                key={i}
                onClick={() => navigate(i)}
                aria-label={`Vai alla foto ${i + 1}`}
                className={`relative w-[155px] h-[140px] rounded-[14px] overflow-hidden bg-white border-2 transition-all duration-200 ${
                  selected === i
                    ? 'border-[#1d1d1f] shadow-[0_2px_10px_rgba(0,0,0,0.15)]'
                    : 'border-transparent opacity-55 hover:opacity-90 hover:border-[#acacac]'
                }`}
              >
                <Image src={img} alt={`${alt} miniatura ${i + 1}`} fill sizes="155px" className={productCategory === 'bambole' ? 'object-cover' : 'object-contain p-[6px]'} />
              </button>
            );
          })}

          {images.length > THUMB_WINDOW && (
            <button
              onClick={() => setThumbOffset(o => Math.min(images.length - THUMB_WINDOW, o + 1))}
              disabled={thumbOffset >= images.length - THUMB_WINDOW}
              aria-label="Thumbnail successive"
              className="flex-shrink-0 w-[32px] h-[32px] rounded-full bg-white border border-[#e0e0e0] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:bg-[#f5f5f5] transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-[15px] h-[15px] text-[#1d1d1f]" strokeWidth={2} />
            </button>
          )}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            images={images}
            alt={alt}
            selected={selected}
            onClose={() => setLightboxOpen(false)}
            onNavigate={navigate}
            productCategory={productCategory}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
