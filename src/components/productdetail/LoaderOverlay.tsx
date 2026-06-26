'use client';

import { useCallback, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

export function useDelayedLoader(delay = 150) {
  const [showLoader, setShowLoader] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = useCallback(() => {
    timerRef.current = setTimeout(() => setShowLoader(true), delay);
  }, [delay]);

  const stopLoading = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowLoader(false);
  }, []);

  return { showLoader, startLoading, stopLoading };
}

interface LoaderOverlayProps {
  size?: 'sm' | 'md';
}

export function LoaderOverlay({ size = 'md' }: LoaderOverlayProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 z-10">
      <Loader className={`animate-spin text-[#1a1a1a] ${size === 'sm' ? 'w-5 h-5' : 'w-10 h-10'}`} />
      {size === 'md' && <span className="mt-3 text-sm font-medium text-[#2d2d2d]">Caricamento...</span>}
    </div>
  );
}
