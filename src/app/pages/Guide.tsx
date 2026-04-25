import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, Shield, Package, HelpCircle, BookOpen, Sparkles } from 'lucide-react';

export const Guide = () => {
  const sections = [
    {
      icon: BookOpen,
      title: 'Come Iniziare',
      content: 'Esplora il nostro catalogo premium di prodotti per il benessere intimo. Utilizza i filtri per categoria, marca o prezzo per trovare ciò che fa per te.',
    },
    {
      icon: Shield,
      title: 'Privacy e Discrezione',
      content: 'Tutti gli ordini vengono spediti in imballaggi neutri e discreti. Nessun riferimento al contenuto o al negozio sarà visibile all\'esterno. La tua privacy è la nostra priorità.',
    },
    {
      icon: Package,
      title: 'Spedizione e Consegna',
      content: 'Spedizione gratuita per ordini superiori a €50. Consegna standard in 2-4 giorni lavorativi. Traccia il tuo ordine in tempo reale.',
    },
    {
      icon: Heart,
      title: 'Cura del Prodotto',
      content: 'Pulisci i tuoi prodotti prima e dopo ogni utilizzo con detergenti specifici. Conservali in un luogo fresco e asciutto, lontano dalla luce diretta del sole.',
    },
    {
      icon: Sparkles,
      title: 'Scegliere il Prodotto Giusto',
      content: 'Se sei alle prime armi, inizia con prodotti semplici e intuitivi. Leggi le recensioni di altri clienti e consulta le descrizioni dettagliate per fare la scelta migliore.',
    },
    {
      icon: HelpCircle,
      title: 'Hai Domande?',
      content: 'Il nostro team di supporto è disponibile per rispondere a qualsiasi domanda. Contattaci via email o chat per assistenza personalizzata.',
    },
  ];

  return (
    <div className="pt-[68px] lg:pt-[80px]">
      {/* Hero */}
      <section className="relative h-[400px] lg:h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/sfondi/lubrificanti.avif" alt="Guida Lovehuble" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-[35px] lg:top-[50px] left-6 lg:left-8 z-10"
        >
          <Link href="/">
            <span className="inline-flex items-center gap-[6px] bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white text-[13px] lg:text-[15px] font-medium px-[12px] py-[6px] rounded-full">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home
            </span>
          </Link>
        </motion.div>

        {/* Title */}
        <div className="relative z-10 w-full max-w-[980px] mx-auto px-6 lg:px-8 pb-[48px] lg:pb-[64px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[40px] lg:text-[64px] font-semibold tracking-[-0.015em] text-white mb-[10px] leading-[1.07]"
          >
            Guida Lovehuble
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[17px] lg:text-[21px] text-white/85 font-normal leading-[1.4] tracking-[-0.003em] max-w-[560px]"
          >
            Tutto quello che devi sapere per vivere un'esperienza straordinaria
          </motion.p>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="py-[88px] lg:py-[110px] bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] lg:gap-[48px]">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-[20px] p-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="w-[48px] h-[48px] bg-[#1d1d1f] rounded-[12px] flex items-center justify-center mb-[20px]">
                  <section.icon className="w-[24px] h-[24px] text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-[24px] font-semibold text-[#1d1d1f] mb-[12px] tracking-[-0.007em]">
                  {section.title}
                </h3>
                <p className="text-[17px] text-[#6e6e73] leading-[1.47] font-normal">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
