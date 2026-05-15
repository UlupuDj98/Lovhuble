import Link from 'next/link';
import { motion } from 'motion/react';

const sections = [
  {
    title: '1. Accettazione dei Termini',
    content: `Utilizzando il sito lovehuble.com e acquistando i nostri prodotti, accetti integralmente i presenti Termini e Condizioni. Se non sei d'accordo con una qualsiasi parte di questi termini, ti invitiamo a non utilizzare il sito.`,
  },
  {
    title: '2. Identità del Venditore',
    content: `Lovehuble S.r.l., con sede in Italia, P.IVA [XXXXXXXX], è il soggetto giuridico responsabile delle vendite effettuate tramite questo sito. Per informazioni: info@lovehuble.com.`,
  },
  {
    title: '3. Prodotti e Prezzi',
    content: `I prezzi esposti sono in Euro e includono l'IVA. Ci riserviamo il diritto di modificare i prezzi in qualsiasi momento senza preavviso; tuttavia il prezzo applicato sarà quello indicato al momento della conferma dell'ordine. Eventuali errori di prezzo saranno comunicati prima dell'elaborazione del pagamento.`,
  },
  {
    title: '4. Ordini e Contratto',
    content: `Il contratto di vendita si perfeziona al momento della conferma dell'ordine inviata via email. Ci riserviamo il diritto di rifiutare o annullare ordini per motivi legati a disponibilità del prodotto, errori nei dati forniti o sospetta attività fraudolenta.`,
  },
  {
    title: '5. Pagamenti',
    content: `Accettiamo carte di credito/debito (Visa, Mastercard, Amex), PayPal e altri metodi indicati al checkout. I pagamenti sono processati tramite gateway sicuri con crittografia SSL. I dati della tua carta non vengono mai memorizzati sui nostri server.`,
  },
  {
    title: '6. Spedizione e Consegna',
    content: `Gli ordini vengono elaborati entro 1-2 giorni lavorativi. La spedizione standard è gratuita per ordini superiori a €50. I tempi di consegna stimati sono 2-4 giorni lavorativi su territorio italiano. Non siamo responsabili per ritardi causati da corrieri o eventi eccezionali.`,
  },
  {
    title: '7. Diritto di Recesso',
    content: `In conformità al Codice del Consumo (D.Lgs. 206/2005), hai diritto di recedere dall'acquisto entro 14 giorni dalla ricezione del prodotto, senza necessità di fornire motivazioni. I prodotti devono essere restituiti integri, nella confezione originale e non utilizzati. Le spese di restituzione sono a carico del cliente.`,
  },
  {
    title: '8. Esclusioni dal Recesso',
    content: `Non è possibile esercitare il diritto di recesso per prodotti sigillati che non possono essere restituiti per motivi igienici, qualora la confezione sia stata aperta dopo la consegna, in conformità all'art. 59, lett. e) del D.Lgs. 206/2005.`,
  },
  {
    title: '9. Garanzia Legale',
    content: `Tutti i prodotti godono della garanzia legale di conformità di 24 mesi prevista dalla legge italiana. In caso di difetto di conformità, hai diritto alla riparazione, alla sostituzione, alla riduzione del prezzo o alla risoluzione del contratto.`,
  },
  {
    title: '10. Limitazione di Responsabilità',
    content: `Lovehuble non è responsabile per danni indiretti, incidentali o consequenziali derivanti dall'uso dei prodotti. La nostra responsabilità massima è limitata al valore dell'ordine in questione.`,
  },
  {
    title: '11. Proprietà Intellettuale',
    content: `Tutti i contenuti del sito (testi, immagini, loghi, grafica) sono di proprietà di Lovehuble o dei rispettivi titolari. È vietata qualsiasi riproduzione o utilizzo non autorizzato.`,
  },
  {
    title: '12. Legge Applicabile e Foro Competente',
    content: `I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il Tribunale del luogo di residenza del consumatore, in conformità alla normativa vigente. Per la risoluzione alternativa delle controversie è possibile accedere alla piattaforma ODR della Commissione Europea.`,
  },
];

export const TerminiCondizioni = () => {
  return (
    <div className="pt-[68px] lg:pt-[80px]">
      {/* Hero */}
      <section className="relative h-[300px] lg:h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero.png" alt="Termini e Condizioni" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        </div>

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

        <div className="relative z-10 w-full max-w-[980px] mx-auto px-6 lg:px-8 pb-[48px] lg:pb-[64px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[40px] lg:text-[64px] font-semibold tracking-[-0.015em] text-white mb-[10px] leading-[1.07]"
          >
            Termini e Condizioni
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[17px] lg:text-[21px] text-white/85 font-normal leading-[1.4] tracking-[-0.003em] max-w-[560px]"
          >
            Le regole che disciplinano l'utilizzo del sito e gli acquisti
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-[88px] lg:py-[110px] bg-[#f5f5f7]">
        <div className="max-w-[780px] mx-auto px-6 lg:px-8">
          <p className="text-[15px] text-[#6e6e73] mb-[56px]">
            Ultimo aggiornamento: 25 aprile 2026
          </p>
          <div className="space-y-[48px]">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-[10px] tracking-[-0.005em]">
                  {section.title}
                </h2>
                <p className="text-[16px] text-[#6e6e73] leading-[1.65] font-normal">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
