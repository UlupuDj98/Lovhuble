import { motion } from 'motion/react';
import { Heart, Shield, Package, HelpCircle, BookOpen, Sparkles } from 'lucide-react';
import { ProductFinder } from '../components/ProductFinder';

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

  const faqs = [
    {
      question: 'Come funziona la garanzia di rimborso?',
      answer: 'Offriamo una garanzia soddisfatti o rimborsati di 30 giorni su tutti i prodotti. Se non sei completamente soddisfatto, puoi restituire l\'articolo per un rimborso completo.',
    },
    {
      question: 'I prodotti sono sicuri da usare?',
      answer: 'Tutti i nostri prodotti sono realizzati con materiali body-safe certificati (silicone medicale, ABS, acciaio inossidabile). Sono testati dermatologicamente e conformi alle normative europee.',
    },
    {
      question: 'Come posso tracciare il mio ordine?',
      answer: 'Riceverai un\'email con il numero di tracciamento non appena il tuo ordine viene spedito. Potrai seguire la spedizione in tempo reale.',
    },
    {
      question: 'Quali metodi di pagamento accettate?',
      answer: 'Accettiamo tutte le principali carte di credito e debito (Visa, Mastercard, American Express), PayPal e bonifico bancario.',
    },
  ];

  return (
    <div className="pt-[68px] lg:pt-[80px]">
      {/* Hero Section */}
      <section className="py-[88px] lg:py-[110px] bg-[#fbfbfd]">
        <div className="max-w-[980px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-[48px] lg:text-[64px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[18px] leading-[1.05]">
              Guida Lovehuble
            </h1>
            <p className="text-[21px] lg:text-[24px] text-[#6e6e73] font-normal leading-[1.4] tracking-[-0.003em] max-w-[640px] mx-auto">
              Tutto quello che devi sapere per vivere un'esperienza straordinaria
            </p>
          </motion.div>
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
                className="bg-[#fbfbfd] rounded-[20px] p-[32px]"
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

      {/* Product Finder Section */}
      <section className="py-[88px] lg:py-[110px] bg-[#fbfbfd]">
        <div className="max-w-[980px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-[48px] text-center"
          >
            <h2 className="text-[40px] lg:text-[48px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[18px] leading-[1.07]">
              Non Sai da Dove Iniziare?
            </h2>
            <p className="text-[19px] lg:text-[21px] text-[#6e6e73] font-normal leading-[1.4] tracking-[-0.003em] max-w-[640px] mx-auto">
              Lascia che ti aiutiamo a trovare il prodotto perfetto per le tue esigenze
            </p>
          </motion.div>
          
          <ProductFinder />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[88px] lg:py-[110px] bg-[#fbfbfd]">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-[64px]"
          >
            <h2 className="text-[40px] lg:text-[48px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[18px] leading-[1.07]">
              Domande Frequenti
            </h2>
            <p className="text-[19px] lg:text-[21px] text-[#6e6e73] font-normal leading-[1.4] tracking-[-0.003em]">
              Le risposte alle domande più comuni
            </p>
          </motion.div>

          <div className="space-y-[24px]">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-[20px] p-[32px]"
              >
                <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-[12px] tracking-[-0.007em]">
                  {faq.question}
                </h3>
                <p className="text-[17px] text-[#6e6e73] leading-[1.47] font-normal">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[88px] lg:py-[110px] bg-[#f5f5f7]">
        <div className="max-w-[820px] mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[40px] lg:text-[48px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[18px] leading-[1.07]">
              Hai altre domande?
            </h2>
            <p className="text-[19px] lg:text-[21px] text-[#6e6e73] font-normal leading-[1.4] tracking-[-0.003em] mb-[32px]">
              Il nostro team è qui per aiutarti
            </p>
            <motion.a
              href="mailto:supporto@lovehuble.com"
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-block bg-[#1d1d1f] text-white px-[28px] py-[14px] rounded-full text-[17px] font-normal"
            >
              Contattaci
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};