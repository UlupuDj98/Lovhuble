'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, X, Plus, Minus } from 'lucide-react';
import { PriceRangeBar } from './PriceRangeBar';
import type { FilterDef } from '../../utils/product-filters';

export interface FilterState {
  onlyInStock: boolean;
  checkedOptions: Record<string, string[]>;
}

function countActive(value: FilterState, price: [number, number], maxPrice: number): number {
  const checked = Object.values(value.checkedOptions).filter(a => a.length > 0).length;
  const priceActive = price[0] > 0 || price[1] < maxPrice ? 1 : 0;
  return checked + (value.onlyInStock ? 1 : 0) + priceActive;
}

function getActiveChips(value: FilterState, price: [number, number], maxPrice: number) {
  const chips: { id: string; label: string }[] = [];
  if (price[0] > 0 || price[1] < maxPrice) {
    const fmt = (v: number) => `€${v.toLocaleString('it-IT')}`;
    chips.push({ id: 'prezzo', label: `${fmt(price[0])} – ${fmt(price[1])}` });
  }
  for (const [key, opts] of Object.entries(value.checkedOptions)) {
    for (const opt of opts) chips.push({ id: `${key}::${opt}`, label: opt });
  }
  if (value.onlyInStock) chips.push({ id: 'disponibilita', label: 'Solo disponibili' });
  return chips;
}

function removeChip(id: string, value: FilterState): FilterState {
  if (id === 'disponibilita') return { ...value, onlyInStock: false };
  const [key, opt] = id.split('::');
  return {
    ...value,
    checkedOptions: {
      ...value.checkedOptions,
      [key]: (value.checkedOptions[key] ?? []).filter(o => o !== opt),
    },
  };
}

function Accordion({ label, isOpen, onToggle, children }: {
  label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#e0e0e5]">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-[14px] text-left">
        <span className="text-[13px] font-semibold text-[#1d1d1f]">{label}</span>
        {isOpen
          ? <Minus className="w-[13px] h-[13px] text-[#1d1d1f] flex-shrink-0" strokeWidth={2} />
          : <Plus  className="w-[13px] h-[13px] text-[#1d1d1f] flex-shrink-0" strokeWidth={2} />
        }
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="c"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-[14px]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FilterBarProps {
  value: FilterState;
  onChange: (v: FilterState) => void;
  filterDefs: FilterDef[];
  price: [number, number];
  onPriceChange: (v: [number, number]) => void;
  maxPrice: number;
}

export const FilterBar = ({ value, onChange, filterDefs, price, onPriceChange, maxPrice }: FilterBarProps) => {
  const [open, setOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleOption = (filterKey: string, opt: string) => {
    const current = value.checkedOptions[filterKey] ?? [];
    const next = current.includes(opt) ? current.filter(o => o !== opt) : [...current, opt];
    onChange({ ...value, checkedOptions: { ...value.checkedOptions, [filterKey]: next } });
  };

  const reset = () => {
    onChange({ onlyInStock: false, checkedOptions: {} });
    onPriceChange([0, maxPrice]);
  };

  const activeCount = countActive(value, price, maxPrice);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-[7px] lg:gap-[8px] w-[174px] h-[42px] lg:w-auto lg:h-auto lg:px-[19px] lg:py-[11px] rounded-full bg-[#d4a5a5] text-[16px] lg:text-[18px] font-medium text-black hover:bg-[#c09090] transition-colors"
      >
        <SlidersHorizontal className="w-[14px] h-[14px] lg:w-[18px] lg:h-[18px] text-black font-bold" strokeWidth={2} />
        Filtri
        {activeCount > 0 && (
          <span className="w-[18px] h-[18px] lg:w-[25px] lg:h-[25px] rounded-full bg-[#1d1d1f] text-white text-[10px] lg:text-[13px] font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            />

            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 38 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-[24px] shadow-[0_-8px_40px_rgba(0,0,0,0.14)] flex flex-col max-h-[80vh]"
            >
              <div className="flex justify-center pt-[12px] pb-[4px] flex-shrink-0">
                <div className="w-[36px] h-[4px] rounded-full bg-[#e0e0e5]" />
              </div>

              <div className="flex items-center justify-between px-6 py-[14px] border-b border-[#e0e0e5] flex-shrink-0">
                <span className="text-[15px] font-semibold text-[#1d1d1f]">Filtri</span>
                <div className="flex items-center gap-[12px]">
                  {activeCount > 0 && (
                    <button onClick={reset} className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
                      Azzera
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="p-1 hover:opacity-60 transition-opacity">
                    <X className="w-[17px] h-[17px] text-[#1d1d1f]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-[24px]">
                <div className="border-t border-[#e0e0e5]">
                  <div className="lg:hidden">
                    <Accordion
                      label="Prezzo"
                      isOpen={!!openAccordions['prezzo']}
                      onToggle={() => toggle('prezzo')}
                    >
                      <PriceRangeBar value={price} onChange={onPriceChange} max={maxPrice} />
                    </Accordion>
                  </div>

                  {filterDefs.map(f => (
                    <Accordion
                      key={f.key}
                      label={f.label}
                      isOpen={!!openAccordions[f.key]}
                      onToggle={() => toggle(f.key)}
                    >
                      {f.key === 'disponibilita' ? (
                        <label className="flex items-center gap-[8px] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value.onlyInStock}
                            onChange={e => onChange({ ...value, onlyInStock: e.target.checked })}
                            className="accent-[#d4a5a5] w-[14px] h-[14px]"
                          />
                          <span className="text-[13px] text-[#1d1d1f]">Solo disponibili</span>
                        </label>
                      ) : (
                        <div className="flex flex-col gap-[10px]">
                          {f.options?.map(opt => (
                            <label key={opt} className="flex items-center gap-[8px] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={(value.checkedOptions[f.key] ?? []).includes(opt)}
                                onChange={() => toggleOption(f.key, opt)}
                                className="accent-[#d4a5a5] w-[14px] h-[14px]"
                              />
                              <span className="text-[13px] text-[#1d1d1f]">{opt}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </Accordion>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 px-6 py-[16px] border-t border-[#e0e0e5]">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full py-[13px] rounded-full bg-[#1d1d1f] text-white text-[14px] font-medium"
                >
                  Applica filtri{activeCount > 0 && ` (${activeCount})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

interface ActiveFilterChipsProps {
  value: FilterState;
  onChange: (v: FilterState) => void;
  price: [number, number];
  onPriceChange: (v: [number, number]) => void;
  maxPrice: number;
}

export const ActiveFilterChips = ({ value, onChange, price, onPriceChange, maxPrice }: ActiveFilterChipsProps) => {
  const chips = getActiveChips(value, price, maxPrice);
  if (chips.length === 0) return null;

  const reset = () => {
    onChange({ onlyInStock: false, checkedOptions: {} });
    onPriceChange([0, maxPrice]);
  };

  return (
    <div className="flex flex-wrap items-center gap-[8px] mt-[36px] lg:mt-[54px]">
      {chips.map(chip => (
        <button
          key={chip.id}
          onClick={() => {
            if (chip.id === 'prezzo') onPriceChange([0, maxPrice]);
            else onChange(removeChip(chip.id, value));
          }}
          className="flex items-center gap-[5px] px-[12px] py-[7px] rounded-full bg-[#1d1d1f] text-white text-[12px] font-medium"
        >
          {chip.label}
          <X className="w-[10px] h-[10px]" strokeWidth={2.5} />
        </button>
      ))}
      <button onClick={reset} className="text-[12px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors px-[4px]">
        Azzera tutto
      </button>
    </div>
  );
};
