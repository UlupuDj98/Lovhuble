'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Star } from 'lucide-react';

const stats = [
  {
    target: 25000,
    format: (v: number) => Math.round(v).toLocaleString('it-IT') + '+',
    label: 'Clienti Soddisfatti',
    delay: 0.2,
  },
  {
    target: 4.9,
    format: (v: number) => v.toFixed(1),
    label: 'Valutazione Media',
    delay: 0.3,
    star: true,
  },
  {
    target: 100,
    format: (v: number) => Math.round(v) + '%',
    label: 'Spedizione Discreta',
    delay: 0.4,
  },
  {
    target: 30,
    format: (v: number) => Math.round(v) + 'gg',
    label: 'Garanzia Rimborso',
    delay: 0.5,
  },
];

export const MiniSocialProof = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setValues(stats.map((s) => s.target * progress));

      if (step >= steps) {
        clearInterval(timer);
        setValues(stats.map((s) => s.target));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section ref={ref} className="py-[56px] border-b border-[#d2d2d7]/30">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: stat.delay, duration: 0.6 }}
                className={
                  stat.star
                    ? 'flex items-center justify-center mb-[4px]'
                    : 'text-[28px] lg:text-[40px] font-semibold text-[#1d1d1f] mb-[4px] tracking-[-0.015em]'
                }
              >
                {stat.star ? (
                  <>
                    <span className="text-[32px] lg:text-[40px] font-semibold text-[#1d1d1f] tracking-[-0.015em]">
                      {stat.format(values[i])}
                    </span>
                    <Star
                      className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] fill-[#1d1d1f] text-[#1d1d1f] ml-[6px]"
                      strokeWidth={0}
                    />
                  </>
                ) : (
                  stat.format(values[i])
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
};
