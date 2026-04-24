import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const stats = [
  { value: '25.000+', label: 'Clienti Soddisfatti', delay: 0.2 },
  { value: '4.9', label: 'Valutazione Media', delay: 0.3, star: true },
  { value: '100%', label: 'Spedizione Discreta', delay: 0.4 },
  { value: '30gg', label: 'Garanzia Rimborso', delay: 0.5 },
];

export const MiniSocialProof = () => (
  <section className="py-[56px] border-b border-[#d2d2d7]/30">
    <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, duration: 0.6 }}
              className={
                stat.star
                  ? 'flex items-center justify-center mb-[4px]'
                  : 'text-[32px] lg:text-[40px] font-semibold text-[#1d1d1f] mb-[4px] tracking-[-0.015em]'
              }
            >
              {stat.star ? (
                <>
                  <span className="text-[32px] lg:text-[40px] font-semibold text-[#1d1d1f] tracking-[-0.015em]">
                    {stat.value}
                  </span>
                  <Star
                    className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] fill-[#1d1d1f] text-[#1d1d1f] ml-[6px]"
                    strokeWidth={0}
                  />
                </>
              ) : (
                stat.value
              )}
            </motion.div>
            <div className="text-[14px] lg:text-[15px] text-[#6e6e73] font-normal">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);
