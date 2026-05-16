'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, ChevronDown, ChevronUp, Shield } from 'lucide-react';

const STORAGE_KEY = 'lovehuble_cookie_consent';

interface CookiePreferences {
  necessary: true;
  preference: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

const Toggle = ({ checked, onChange, disabled }: ToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-[26px] w-[46px] shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
      checked ? 'bg-[#1d1d1f]' : 'bg-[#d1d1d6]'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`pointer-events-none inline-block h-[22px] w-[22px] rounded-full bg-white shadow-md transform transition-transform duration-200 ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export const CookieModal = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    preference: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  const save = (overrides?: Partial<CookiePreferences>) => {
    const final = { ...prefs, necessary: true as const, ...overrides };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(final));
    setVisible(false);
  };

  const acceptAll = () =>
    save({ preference: true, analytics: true, marketing: true });

  const rejectAll = () =>
    save({ preference: false, analytics: false, marketing: false });

  const categories = [
    {
      key: 'preference' as const,
      label: 'Cookie di Preferenza',
      description: 'Ricordano le tue scelte (lingua, valuta) per migliorare la tua esperienza ad ogni visita.',
    },
    {
      key: 'analytics' as const,
      label: 'Cookie Analitici',
      description: 'Dati anonimi su come navighi il sito (Google Analytics) per aiutarci a migliorarlo.',
    },
    {
      key: 'marketing' as const,
      label: 'Cookie di Marketing',
      description: 'Consentono annunci personalizzati su altre piattaforme (Meta Pixel, Google Ads).',
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop — solo mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-[90] md:hidden"
          />

          {/* Card */}
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-[420px] z-[100]"
          >
            <div className="bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.18)] overflow-hidden">

              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#d4a5a5] flex items-center justify-center shrink-0">
                    <Cookie className="w-[18px] h-[18px] text-black" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#1d1d1f] leading-tight">
                      Gestione Cookie
                    </p>
                    <p className="text-[11px] text-[#6e6e73] mt-0.5">Lovehuble · GDPR</p>
                  </div>
                </div>
                <button
                  aria-label="Chiudi"
                  onClick={rejectAll}
                  className="w-7 h-7 rounded-full bg-[#f5f5f7] flex items-center justify-center hover:bg-[#e8e8ed] transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-[#1d1d1f]" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-4">
                <p className="text-[13px] text-[#6e6e73] leading-relaxed">
                  Utilizziamo i cookie per migliorare la tua esperienza, analizzare il traffico e mostrarti contenuti pertinenti.
                  Puoi personalizzare le tue preferenze o{' '}
                  <Link
                    href="/cookie-policy"
                    className="text-[#1d1d1f] underline underline-offset-2 font-medium hover:text-[#d4a5a5] transition-colors"
                  >
                    leggere la Cookie Policy
                  </Link>
                  .
                </p>

                {/* Categoria necessaria (sempre attiva) */}
                <div className="mt-4 flex items-center justify-between py-2.5 border-b border-[rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#6e6e73] shrink-0" />
                    <span className="text-[13px] font-medium text-[#1d1d1f]">Cookie Necessari</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#6e6e73]">Sempre attivi</span>
                    <Toggle checked={true} onChange={() => {}} disabled />
                  </div>
                </div>

                {/* Sezione espandibile */}
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      {categories.map((cat) => (
                        <div
                          key={cat.key}
                          className="py-2.5 border-b border-[rgba(0,0,0,0.05)] last:border-0"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[13px] font-medium text-[#1d1d1f]">{cat.label}</span>
                            <Toggle
                              checked={prefs[cat.key]}
                              onChange={(v) => setPrefs((p) => ({ ...p, [cat.key]: v }))}
                            />
                          </div>
                          <p className="text-[11px] text-[#6e6e73] leading-relaxed pr-14">
                            {cat.description}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toggle espandi */}
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-2 flex items-center gap-1.5 text-[12px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" /> Nascondi dettagli
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5" /> Personalizza
                    </>
                  )}
                </button>
              </div>

              {/* Azioni */}
              <div className="px-6 pb-6 flex flex-col gap-2.5">
                <button
                  onClick={acceptAll}
                  className="w-full h-11 rounded-full bg-[#1d1d1f] text-white text-[14px] font-semibold hover:bg-[#3a3a3c] transition-colors"
                >
                  Accetta tutto
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={rejectAll}
                    className="flex-1 h-10 rounded-full border border-[rgba(0,0,0,0.12)] text-[13px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                  >
                    Solo necessari
                  </button>
                  {expanded && (
                    <button
                      onClick={() => save()}
                      className="flex-1 h-10 rounded-full border border-[rgba(0,0,0,0.12)] text-[13px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                    >
                      Salva preferenze
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
