import { motion } from 'motion/react';
import Link from 'next/link';

export const Hero = () => (
  <section className="relative h-[692px] lg:h-[744px] flex items-center justify-center overflow-hidden bg-[#fbfbfd]">
    <motion.div
      initial={{ scale: 1.05, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute inset-0 z-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#fbfbfd] z-10" />
      <img
        src='hero.png'
        alt="Lovehuble Products"
        className="w-full h-full object-cover"
      />
    </motion.div>

    <div className="relative z-20 text-center px-6 max-w-[980px] mx-auto">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="text-[48px] lg:text-[80px] font-semibold tracking-[-0.015em] text-white mb-[18px] leading-[1.05] lg:leading-[1.05]">
          Scopri il piacere,<br className="hidden lg:block" />
          senza compromessi.
        </h1>
      </motion.div>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-[21px] lg:text-[28px] text-white/90 mb-[32px] font-normal leading-[1.3] tracking-[-0.003em] max-w-[640px] mx-auto"
      >
        Prodotti selezionati per il tuo benessere, con discrezione totale.
      </motion.p>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="bg-[#d4a5a5] text-black px-[22px] py-[12px] font-semibold rounded-full text-[17px]  shadow-sm"
          >
            Acquista Ora
          </motion.button>
        </Link>
      </motion.div>
    </div>
  </section>
);
