'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export const Newsletter = () => {
  const [form, setForm] = useState({ nome: '', cognome: '', email: '' });
  const [privacy, setPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-white py-[72px] lg:py-[96px]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-[32px]"
          >
            <h3 className="text-[28px] lg:text-[36px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[12px]">
              Grazie per l'iscrizione!
            </h3>
            <p className="text-[16px] text-[#6e6e73]">
              Riceverai presto il tuo codice sconto da 10€.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-[80px] xl:gap-[120px]">
            {/* Left: heading & subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="lg:w-[38%] mb-[40px] lg:mb-0 flex-shrink-0"
            >
              <h2 className="text-[36px] lg:text-[48px] font-semibold tracking-[-0.015em] leading-[1.1] text-[#1d1d1f] mb-[16px]">
                10€ di SCONTO<br className="hidden sm:block" /> per te!
              </h2>
              <p className="text-[16px] lg:text-[17px] text-[#6e6e73] leading-[1.6] font-normal">
                Iscriviti alla nostra newsletter e godi di sconti, regali e consigli hot
              </p>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex-1"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
                {/* Name + Surname */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                    className="w-full px-[18px] py-[15px] border border-[#d2d2d7] rounded-[12px] text-[15px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#1d1d1f] transition-colors duration-200 bg-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Cognome"
                    value={form.cognome}
                    onChange={e => setForm(f => ({ ...f, cognome: e.target.value }))}
                    className="w-full px-[18px] py-[15px] border border-[#d2d2d7] rounded-[12px] text-[15px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#1d1d1f] transition-colors duration-200 bg-white"
                    required
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  placeholder="Il tuo indirizzo e-mail"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-[18px] py-[15px] border border-[#d2d2d7] rounded-[12px] text-[15px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#1d1d1f] transition-colors duration-200 bg-white"
                  required
                />

                {/* Privacy checkbox */}
                <label className="flex items-start gap-[12px] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacy}
                    onChange={e => setPrivacy(e.target.checked)}
                    className="mt-[3px] w-[15px] h-[15px] flex-shrink-0 accent-[#1d1d1f] cursor-pointer"
                    required
                  />
                  <span className="text-[13px] text-[#6e6e73] leading-[1.6]">
                    Dichiaro di aver preso visione dell&apos;
                    <Link href="/privacy" className="font-semibold underline text-[#1d1d1f]">
                      informativa
                    </Link>
                    {' '}ai sensi dell&apos;art. 13 del reg. Ue 2016/679 ed esprimo il mio consenso a ricevere la newsletter.
                  </span>
                </label>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ opacity: 0.82 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.18 }}
                  className="w-full bg-[#1d1d1f] text-white py-[16px] rounded-[12px] text-[14px] font-semibold tracking-[0.1em] uppercase mt-[4px]"
                >
                  Iscriviti
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
