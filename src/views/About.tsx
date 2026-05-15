import Link from 'next/link';
import { motion } from 'motion/react';
import { Heart, Shield, Sparkles, Target, Users, Award } from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Benessere al Primo Posto',
      description: 'Crediamo che il piacere e il benessere sessuale siano fondamentali per una vita appagante e felice.',
    },
    {
      icon: Shield,
      title: 'Privacy Garantita',
      description: 'La tua privacy è sacra. Spedizioni discrete, pagamenti sicuri e massima riservatezza in ogni fase.',
    },
    {
      icon: Sparkles,
      title: 'Qualità Premium',
      description: 'Selezioniamo solo i migliori brand internazionali con materiali certificati e design innovativi.',
    },
    {
      icon: Target,
      title: 'Inclusività',
      description: 'Lovehuble è per tutti. Celebriamo la diversità e crediamo che ognuno meriti di esplorare il proprio piacere.',
    },
    {
      icon: Users,
      title: 'Supporto Dedicato',
      description: 'Il nostro team è formato per offrirti consulenza discreta e professionale, sempre.',
    },
    {
      icon: Award,
      title: 'Eccellenza',
      description: 'Puntiamo all\'eccellenza in ogni dettaglio: dalla selezione prodotti al servizio clienti.',
    },
  ];

  const stats = [
    { number: '25.000+', label: 'Clienti Felici' },
    { number: '500+', label: 'Prodotti Premium' },
    { number: '4.9/5', label: 'Valutazione Media' },
    { number: '100%', label: 'Discrezione Garantita' },
  ];

  return (
    <div className="pt-[68px] lg:pt-[80px]">
      {/* Hero — stesso stile della Home */}
      <section className="relative h-[555px] lg:h-[700px] flex items-center justify-center overflow-hidden bg-[#fbfbfd]">


        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-[40px] lg:top-[60px] left-6 lg:left-8 z-10"
        >
          <Link href="/">
            <span className="inline-flex items-center gap-[6px] bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white text-[13px] lg:text-[18px] font-medium px-[12px] lg:px-[16px] py-[6px] lg:py-[8px] rounded-full">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home
            </span>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#fbfbfd] z-10" />
          <img
            src="hero.png"
            alt="Chi siamo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 max-w-[980px] mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-[48px] lg:text-[80px] font-semibold tracking-[-0.015em] text-white mb-[18px] leading-[1.05]">
              Chi Siamo
            </h1>
          </motion.div>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-[21px] lg:text-[28px] text-white/90 font-normal leading-[1.3] tracking-[-0.003em] max-w-[740px] mx-auto"
          >
            Lovehuble è la destinazione premium per chi cerca prodotti di benessere intimo di alta qualità, con discrezione e professionalità.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-[88px] lg:py-[110px] bg-[#f5f5f7]">
        <div className="max-w-[980px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[40px] lg:text-[48px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[24px] leading-[1.07]">
                La Nostra Missione
              </h2>
              <p className="text-[19px] text-[#6e6e73] leading-[1.47] font-normal mb-[20px]">
                Nato dall'idea di creare uno spazio sicuro e raffinato per l'acquisto di prodotti intimi, Lovehuble combina l'eleganza di un brand luxury con la professionalità di un servizio dedicato al tuo benessere.
              </p>
              <p className="text-[19px] text-[#6e6e73] leading-[1.47] font-normal">
                Vogliamo normalizzare la conversazione sul piacere e il benessere sessuale, eliminando tabù e offrendo un'esperienza d'acquisto premium, discreta e piacevole.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-[24px] p-[48px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              <h3 className="text-[32px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[24px] leading-[1.1]">
                Perché Lovehuble?
              </h3>
              <ul className="space-y-[16px]">
                <li className="flex items-start">
                  <div className="w-[6px] h-[6px] bg-[#1d1d1f] rounded-full mt-[10px] mr-[12px] flex-shrink-0" />
                  <span className="text-[17px] text-[#6e6e73] leading-[1.47]">
                    Selezione curata di prodotti premium certificati
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-[6px] h-[6px] bg-[#1d1d1f] rounded-full mt-[10px] mr-[12px] flex-shrink-0" />
                  <span className="text-[17px] text-[#6e6e73] leading-[1.47]">
                    Spedizioni discrete in tutta Italia
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-[6px] h-[6px] bg-[#1d1d1f] rounded-full mt-[10px] mr-[12px] flex-shrink-0" />
                  <span className="text-[17px] text-[#6e6e73] leading-[1.47]">
                    Consulenza professionale e riservata
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-[6px] h-[6px] bg-[#1d1d1f] rounded-full mt-[10px] mr-[12px] flex-shrink-0" />
                  <span className="text-[17px] text-[#6e6e73] leading-[1.47]">
                    Garanzia soddisfatti o rimborsati 30 giorni
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-[88px] lg:py-[110px] bg-[#fbfbfd]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-[64px]"
          >
            <h2 className="text-[40px] lg:text-[48px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[18px] leading-[1.07]">
              I Nostri Valori
            </h2>
            <p className="text-[19px] lg:text-[21px] text-[#6e6e73] font-normal leading-[1.4] tracking-[-0.003em] max-w-[640px] mx-auto">
              I principi che guidano ogni nostra decisione
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-[20px] p-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="w-[48px] h-[48px] bg-[#1d1d1f] rounded-[12px] flex items-center justify-center mb-[20px]">
                  <value.icon className="w-[24px] h-[24px] text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-[12px] tracking-[-0.007em]">
                  {value.title}
                </h3>
                <p className="text-[17px] text-[#6e6e73] leading-[1.47] font-normal">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-[88px] lg:py-[110px] bg-[#f5f5f7]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-[32px] lg:gap-[48px]"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-[40px] lg:text-[56px] font-semibold text-[#1d1d1f] mb-[8px] tracking-[-0.015em]">
                  {stat.number}
                </div>
                <div className="text-[15px] lg:text-[17px] text-[#6e6e73] font-normal">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
