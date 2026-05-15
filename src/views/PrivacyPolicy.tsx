import Link from 'next/link';
import { motion } from 'motion/react';

const sections = [
  {
    title: '1. Titolare del Trattamento',
    content: `Lovehuble S.r.l., con sede legale in Italia, è il titolare del trattamento dei dati personali raccolti tramite questo sito. Per qualsiasi richiesta relativa alla privacy puoi contattarci all'indirizzo: privacy@lovehuble.com.`,
  },
  {
    title: '2. Dati Raccolti',
    content: `Raccogliamo i dati che ci fornisci direttamente (nome, indirizzo email, indirizzo di spedizione, dati di pagamento) al momento della registrazione o dell'acquisto. Raccogliamo inoltre dati di navigazione (indirizzo IP, browser, pagine visitate) tramite cookie e tecnologie simili.`,
  },
  {
    title: '3. Finalità del Trattamento',
    content: `I tuoi dati vengono trattati per: (a) elaborare e gestire gli ordini; (b) fornire assistenza clienti; (c) inviare comunicazioni commerciali previo tuo consenso; (d) adempiere a obblighi di legge; (e) migliorare i nostri servizi tramite analisi statistiche aggregate e anonime.`,
  },
  {
    title: '4. Base Giuridica',
    content: `Il trattamento si basa sull'esecuzione del contratto di vendita (art. 6.1.b GDPR), sul tuo consenso per le comunicazioni marketing (art. 6.1.a GDPR) e sul legittimo interesse per la prevenzione delle frodi e il miglioramento del servizio (art. 6.1.f GDPR).`,
  },
  {
    title: '5. Conservazione dei Dati',
    content: `I dati relativi agli ordini sono conservati per 10 anni in conformità agli obblighi fiscali italiani. I dati di marketing vengono eliminati entro 24 mesi dall'ultimo consenso attivo. I dati di navigazione sono conservati per un massimo di 13 mesi.`,
  },
  {
    title: '6. Condivisione con Terzi',
    content: `Non vendiamo i tuoi dati. Li condividiamo solo con: corrieri per la spedizione degli ordini, processori di pagamento certificati PCI-DSS, fornitori di servizi cloud che agiscono come responsabili del trattamento sotto contratto, e autorità competenti quando richiesto dalla legge.`,
  },
  {
    title: '7. Trasferimento Internazionale',
    content: `Alcuni fornitori di servizi potrebbero essere situati al di fuori dello Spazio Economico Europeo. In tal caso, assicuriamo che il trasferimento avvenga tramite Clausole Contrattuali Standard approvate dalla Commissione Europea o altri meccanismi adeguati.`,
  },
  {
    title: '8. I Tuoi Diritti',
    content: `Hai diritto di: accedere ai tuoi dati, richiederne la rettifica o la cancellazione, limitarne il trattamento, ricevere i dati in formato portabile, opporti al trattamento basato su legittimo interesse. Per esercitare questi diritti scrivi a privacy@lovehuble.com. Hai altresì il diritto di proporre reclamo al Garante per la protezione dei dati personali.`,
  },
  {
    title: '9. Sicurezza',
    content: `Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati da accessi non autorizzati, divulgazione, alterazione o distruzione. Le trasmissioni sono crittografate tramite protocollo TLS/HTTPS.`,
  },
  {
    title: '10. Aggiornamenti',
    content: `Ci riserviamo il diritto di aggiornare questa informativa. Le modifiche sostanziali saranno comunicate via email o con avviso prominente sul sito. La data dell'ultimo aggiornamento è indicata in calce alla pagina.`,
  },
];

export const PrivacyPolicy = () => {
  return (
    <div className="pt-[68px] lg:pt-[80px]">
      {/* Hero */}
      <section className="relative h-[300px] lg:h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero.png" alt="Privacy Policy" className="w-full h-full object-cover" />
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[17px] lg:text-[21px] text-white/85 font-normal leading-[1.4] tracking-[-0.003em] max-w-[560px]"
          >
            Come trattiamo e proteggiamo i tuoi dati personali
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
