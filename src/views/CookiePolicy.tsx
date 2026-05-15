import Link from 'next/link';
import { motion } from 'motion/react';

const sections = [
  {
    title: '1. Cosa Sono i Cookie',
    content: `I cookie sono piccoli file di testo che i siti web memorizzano sul tuo dispositivo quando li visiti. Servono a far funzionare il sito in modo efficiente, ricordare le tue preferenze e fornirci informazioni utili per migliorare l'esperienza di navigazione.`,
  },
  {
    title: '2. Cookie Tecnici (Necessari)',
    content: `Sono indispensabili per il funzionamento del sito. Includono cookie di sessione per mantenere il carrello attivo, cookie di autenticazione per tenerti connesso al tuo account e cookie di sicurezza per proteggere contro le frodi. Non richiedono il tuo consenso e non possono essere disabilitati.`,
  },
  {
    title: '3. Cookie di Preferenza',
    content: `Ci permettono di ricordare le tue scelte, come la lingua preferita, la valuta selezionata o le preferenze di visualizzazione. Migliorano la tua esperienza evitandoti di reimpostare le stesse opzioni ad ogni visita. Puoi disabilitarli senza compromettere le funzionalità principali del sito.`,
  },
  {
    title: '4. Cookie Analitici',
    content: `Utilizziamo Google Analytics per raccogliere dati aggregati e anonimi su come gli utenti navigano il sito: pagine più visitate, tempo di permanenza, provenienza geografica. Questi dati ci aiutano a migliorare i contenuti e la struttura del sito. I dati sono anonimizzati prima dell'invio a Google.`,
  },
  {
    title: '5. Cookie di Marketing',
    content: `Con il tuo consenso, utilizziamo cookie di terze parti (Meta Pixel, Google Ads) per mostrarti annunci personalizzati su altre piattaforme. Questi cookie tracciano le pagine che hai visitato per proporti contenuti pertinenti ai tuoi interessi. Puoi revocare il consenso in qualsiasi momento.`,
  },
  {
    title: '6. Cookie di Terze Parti',
    content: `Alcune funzionalità del sito sono fornite da terze parti (widget social, video embedded, mappe). Questi soggetti potrebbero installare i propri cookie soggetti alle rispettive privacy policy, che ti invitiamo a consultare: Google (policies.google.com), Meta (facebook.com/policy/cookies).`,
  },
  {
    title: '7. Durata dei Cookie',
    content: `I cookie di sessione vengono eliminati alla chiusura del browser. I cookie persistenti rimangono sul tuo dispositivo per un periodo definito: cookie di preferenza fino a 12 mesi, cookie analitici fino a 13 mesi, cookie di marketing fino a 90 giorni.`,
  },
  {
    title: '8. Come Gestire i Cookie',
    content: `Puoi gestire le tue preferenze tramite il banner cookie presente sul sito o in qualsiasi momento accedendo alle impostazioni del tuo browser. Ricorda che disabilitare i cookie potrebbe compromettere alcune funzionalità del sito. Trovi le istruzioni per i principali browser su: support.google.com/chrome, support.mozilla.org, support.apple.com.`,
  },
  {
    title: '9. Consenso e Revoca',
    content: `Al primo accesso al sito ti chiediamo di esprimere le tue preferenze tramite il banner cookie. Puoi modificare le tue scelte in qualsiasi momento cliccando su "Gestisci Cookie" nel footer del sito. La revoca del consenso non pregiudica la liceità del trattamento effettuato prima della revoca.`,
  },
  {
    title: '10. Aggiornamenti',
    content: `Potremmo aggiornare questa Cookie Policy in caso di modifiche normative o all'utilizzo dei cookie. La data di ultima modifica è indicata in calce. Ti consigliamo di consultare periodicamente questa pagina per tenerti aggiornato.`,
  },
];

export const CookiePolicy = () => {
  return (
    <div className="pt-[68px] lg:pt-[80px]">
      {/* Hero */}
      <section className="relative h-[300px] lg:h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero.png" alt="Cookie Policy" className="w-full h-full object-cover" />
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
            Cookie Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[17px] lg:text-[21px] text-white/85 font-normal leading-[1.4] tracking-[-0.003em] max-w-[560px]"
          >
            Come utilizziamo i cookie per migliorare la tua esperienza
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
