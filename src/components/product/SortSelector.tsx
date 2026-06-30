'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SortOption } from '../../utils/product-filters';

export type { SortOption };

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'rating',     label: 'Più votati' },
  { value: 'newest',     label: 'Più nuovi' },
  { value: 'price_asc',  label: 'Dal più economico' },
  { value: 'price_desc', label: 'Dal più costoso' },
];

interface SortSelectorProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

export const SortSelector = ({ value, onChange }: SortSelectorProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const selected = SORT_OPTIONS.find(o => o.value === value);
  const buttonLabel = selected?.label ?? 'Ordina per';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-center gap-[7px] lg:gap-[8px] w-[174px] h-[42px] lg:w-auto lg:h-auto lg:px-[19px] lg:py-[11px] rounded-full border border-[#d0d0d5] bg-white text-[15px] lg:text-[18px] font-bold text-black hover:border-[#1d1d1f] transition-colors"
      >
        <span className="truncate">{buttonLabel}</span>
        <ChevronDown
          className={`w-[12px] h-[12px] lg:w-[17px] lg:h-[17px] flex-shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-[6px] left-0 z-[80] bg-white border border-[#e0e0e5] rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] py-[8px] min-w-[200px]">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-[20px] py-[13px] text-[15px] transition-colors hover:bg-[#f5f5f7] ${
                value === opt.value
                  ? 'font-semibold text-[#1d1d1f]'
                  : 'font-medium text-[#3d3d3f]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
