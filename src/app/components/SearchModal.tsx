'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { products } from '../data/products';
import { categories } from '../data/products';

const TRENDING = categories.map(c => c.name);

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
    else setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  const addRecent = (term: string) =>
    setRecent(prev => [term, ...prev.filter(t => t !== term)].slice(0, 5));

  const navigate = (href: string) => { router.push(href); onClose(); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-[3px]"
          />

          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed top-[76px] lg:top-[88px] left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-32px)] max-w-[600px]"
          >
            <div className="bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.16)] overflow-hidden border border-black/[0.06]">
              {/* Input */}
              <div className="relative border-b border-[#e0e0e5]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#86868b]" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Cerca prodotti..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && query.trim()) {
                      addRecent(query.trim());
                      navigate(`/prodotti?search=${encodeURIComponent(query.trim())}`);
                    }
                  }}
                  className="w-full pl-[44px] pr-[48px] py-[17px] text-[15px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none bg-transparent"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-[#f5f5f7] transition-colors"
                    aria-label="Cancella"
                  >
                    <X className="w-[13px] h-[13px] text-[#6e6e73]" strokeWidth={2} />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="max-h-[58vh] overflow-y-auto">

                {/* Results */}
                {query.trim() ? (
                  <div className="p-4">
                    {results.length > 0 ? (
                      <>
                        <p className="text-[10px] font-bold tracking-[0.1em] text-[#86868b] uppercase mb-3">
                          {results.length} risultat{results.length === 1 ? 'o' : 'i'}
                        </p>
                        <div className="flex flex-col gap-[4px]">
                          {results.map((product, i) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04 }}
                            >
                              <Link
                                href={`/prodotti/${product.categorySlug}/${product.slug}`}
                                onClick={() => { addRecent(query.trim()); onClose(); }}
                                className="group flex items-center gap-3 p-3 rounded-[12px] hover:bg-[#f5f5f7] transition-colors"
                              >
                                <div className="relative w-[46px] h-[46px] rounded-[10px] bg-[#f5f5f7] overflow-hidden flex-shrink-0">
                                  <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[13px] font-semibold text-[#1d1d1f] truncate leading-[1.3]">{product.name}</p>
                                  <p className="text-[11px] text-[#86868b] mt-[2px]">{product.category.trim()}</p>
                                </div>
                                <span className="text-[14px] font-semibold text-[#1d1d1f] flex-shrink-0">€{product.price}</span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        <button
                          onClick={() => { addRecent(query.trim()); navigate(`/prodotti?search=${encodeURIComponent(query.trim())}`); }}
                          className="w-full mt-3 py-[11px] rounded-[12px] bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[13px] font-medium text-[#1d1d1f] transition-colors flex items-center justify-center gap-[6px]"
                        >
                          Vedi tutti i risultati
                          <ArrowRight className="w-[13px] h-[13px]" strokeWidth={2} />
                        </button>
                      </>
                    ) : (
                      <div className="py-10 text-center">
                        <div className="w-[50px] h-[50px] rounded-full bg-[#f5f5f7] flex items-center justify-center mx-auto mb-3">
                          <Search className="w-[20px] h-[20px] text-[#86868b]" strokeWidth={1.5} />
                        </div>
                        <p className="text-[15px] font-medium text-[#1d1d1f]">Nessun risultato</p>
                        <p className="text-[13px] text-[#86868b] mt-1">Prova con un&apos;altra parola</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 flex flex-col gap-[22px]">
                    {/* Trending */}
                    <div>
                      <div className="flex items-center gap-[6px] mb-[10px]">
                        <TrendingUp className="w-[13px] h-[13px] text-[#d4a5a5]" strokeWidth={2} />
                        <p className="text-[10px] font-bold tracking-[0.1em] text-[#86868b] uppercase">Ricerche popolari</p>
                      </div>
                      <div className="flex flex-wrap gap-[8px]">
                        {TRENDING.map(term => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-[14px] py-[7px] rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[13px] font-medium text-[#1d1d1f] transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent */}
                    {recent.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-[10px]">
                          <div className="flex items-center gap-[6px]">
                            <Clock className="w-[13px] h-[13px] text-[#d4a5a5]" strokeWidth={2} />
                            <p className="text-[10px] font-bold tracking-[0.1em] text-[#86868b] uppercase">Ricerche recenti</p>
                          </div>
                          <button onClick={() => setRecent([])} className="text-[11px] text-[#86868b] hover:text-[#1d1d1f] transition-colors">
                            Cancella
                          </button>
                        </div>
                        <div className="flex flex-col gap-[2px]">
                          {recent.map((term, i) => (
                            <button
                              key={i}
                              onClick={() => setQuery(term)}
                              className="group flex items-center gap-3 px-[10px] py-[10px] rounded-[10px] hover:bg-[#f5f5f7] transition-colors text-left"
                            >
                              <Clock className="w-[13px] h-[13px] text-[#86868b] flex-shrink-0" strokeWidth={1.5} />
                              <span className="flex-1 text-[13px] text-[#1d1d1f]">{term}</span>
                              <ArrowRight className="w-[13px] h-[13px] text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
