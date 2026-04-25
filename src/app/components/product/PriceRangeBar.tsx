'use client';

import { useRef } from 'react';

interface PriceRangeBarProps {
  value: [number, number];
  onChange: (v: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const PriceRangeBar = ({
  value,
  onChange,
  min = 0,
  max = 5000,
  step = 50,
}: PriceRangeBarProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<'low' | 'high' | null>(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  const toPercent = (v: number) => ((v - min) / (max - min)) * 100;

  const calcSnapped = (clientX: number): number => {
    if (!trackRef.current) return min;
    const { left, width } = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - left) / width) * 100));
    const raw = min + (pct / 100) * (max - min);
    return Math.round(raw / step) * step;
  };

  const startDrag = (thumb: 'low' | 'high') => (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = thumb;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const v = calcSnapped(e.clientX);
    const [lo, hi] = valueRef.current;
    if (dragging.current === 'low') {
      onChange([Math.max(min, Math.min(v, hi - step)), hi]);
    } else {
      onChange([lo, Math.min(max, Math.max(v, lo + step))]);
    }
  };

  const stopDrag = () => { dragging.current = null; };

  const lowPct = toPercent(value[0]);
  const highPct = toPercent(value[1]);

  const fmt = (v: number) =>
    `€${v.toLocaleString('it-IT')}`;

  return (
    <div className="w-full select-none">
     <p className="text-[14px] font-medium text-[#1d1d1f] mb-[12px]">Seleziona il prezzo</p>
      {/* Current values */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[10px] font-medium text-[#6e6e73] uppercase tracking-[0.08em] mb-[4px]">Da</p>
          <p className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] leading-none tabular-nums">
            {fmt(value[0])}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-medium text-[#6e6e73] uppercase tracking-[0.08em] mb-[4px]">A</p>
          <p className="text-[18px] sm:text-[20px] font-semibold text-[#1d1d1f] leading-none tabular-nums">
            {fmt(value[1])}
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="relative px-[13px]">
        <div ref={trackRef} className="relative h-[4px] rounded-full bg-[#e0e0e5]">

          {/* Active fill */}
          <div
            className="absolute inset-y-0 rounded-full bg-[#d4a5a5] pointer-events-none"
            style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
          />

          {/* Low thumb */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                       w-[26px] h-[26px] sm:w-[22px] sm:h-[22px]
                       rounded-full bg-white border-[2px] border-[#d4a5a5]
                       shadow-[0_2px_10px_rgba(0,0,0,0.18)]
                       cursor-grab active:cursor-grabbing touch-none"
            style={{ left: `${lowPct}%` }}
            onPointerDown={startDrag('low')}
            onPointerMove={handleMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
          />

          {/* High thumb */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                       w-[26px] h-[26px] sm:w-[22px] sm:h-[22px]
                       rounded-full bg-white border-[2px] border-[#d4a5a5]
                       shadow-[0_2px_10px_rgba(0,0,0,0.18)]
                       cursor-grab active:cursor-grabbing touch-none"
            style={{ left: `${highPct}%` }}
            onPointerDown={startDrag('high')}
            onPointerMove={handleMove}
            onPointerUp={stopDrag}
            onPointerCancel={stopDrag}
          />
        </div>
      </div>

      {/* Min / Max labels */}
      <div className="flex justify-between mt-3">
        <span className="text-[11px] text-[#b0b0b5]">{fmt(min)}</span>
        <span className="text-[11px] text-[#b0b0b5]">{fmt(max)}</span>
      </div>

    </div>
  );
};
