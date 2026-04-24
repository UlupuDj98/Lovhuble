'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'Quali sono i metodi di pagamento accettati?',
    answer:
      'Accettiamo carte di credito e debito (Visa, Mastercard, American Express), PayPal, Apple Pay e Google Pay. Tutti i pagamenti sono processati in modo sicuro e criptato.',
  },
  {
    question: 'Come viene spedito il mio ordine?',
    answer:
      'Ogni ordine viene spedito in una confezione completamente anonima e discreta, senza alcun riferimento al contenuto o al mittente. La tua privacy è la nostra priorità.',
  },
  {
    question: 'Quanto tempo ci vuole per ricevere il mio ordine?',
    answer:
      'La consegna standard in Italia richiede 2–4 giorni lavorativi. È disponibile anche la spedizione express in 24 ore per gli ordini effettuati entro le 14:00.',
  },
  {
    question: 'Posso restituire un prodotto?',
    answer:
      'Sì, offriamo una garanzia soddisfatti o rimborsati entro 30 giorni dall\'acquisto. Il prodotto deve essere integro e non utilizzato. Contattaci per avviare il reso gratuitamente.',
  },
  {
    question: 'I prodotti sono sicuri per il corpo?',
    answer:
      'Assolutamente. Selezioniamo esclusivamente prodotti certificati body-safe, realizzati con materiali ipoallergenici come silicone medicale, ABS e acciaio inossidabile.',
  },
  {
    question: 'Come posso contattare il servizio clienti?',
    answer:
      'Puoi raggiungerci via email a info@lovehuble.it o tramite la chat sul sito, disponibile dal lunedì al venerdì dalle 9:00 alle 18:00. Rispondiamo entro 24 ore.',
  },
];

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="py-[88px] lg:py-[110px] bg-[#f5f5f7]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-[40px] lg:text-[56px]  tracking-[-0.015em] leading-[1.1] mb-[56px] lg:mb-[72px]"
        >
          <span className="text-[#1d1d1f] font-semibold">FAQ. </span>
          <span className="text-[#86868b] font-inter">
            Tutto quello che devi sapere sui nostri prodotti e servizi
          </span>
        </motion.h2>

        {/* Accordion */}
        <div className="flex flex-col gap-[12px] py-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="bg-white rounded-[16px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-[24px] lg:px-[32px] py-[22px] lg:py-[24px] text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] lg:text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.003em] pr-4">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex-shrink-0"
                  >
                    <Plus
                      className="w-[20px] h-[20px] text-[#86868b] group-hover:text-[#1d1d1f] transition-colors duration-200"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="px-[24px] lg:px-[32px] pb-[24px] text-[15px] lg:text-[17px] text-[#6e6e73] leading-[1.6] font-normal">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
