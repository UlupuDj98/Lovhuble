'use client';

import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

function makeSplineTransparent(spline: any) {
  const r = spline._renderer ?? spline.renderer;
  if (r?.setClearColor) {
    r.setClearColor(0x000000, 0);
    r.setClearAlpha(0);
  }
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsVisible(true);
      return;
    }
    const onScroll = () => {
      if (window.scrollY > 300) setIsVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: isOpen ? 0 : 0.2, type: 'spring' }}
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-2 md:bottom-4 right-0 md:right-4 z-40 w-34 h-38 lg:h-46 lg:w-46 cursor-pointer"
          >
            <div className="pointer-events-none w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
              <Spline
                scene="https://prod.spline.design/L6jfvIUqWgt8HXRY/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
                onLoad={makeSplineTransparent}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-40 md:bottom-48 right-6 md:right-8 z-40 w-[calc(100vw-3rem)] md:w-[380px] rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-black/[0.06] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[#1d1d1f]" />
              </button>
            </div>
            <div className="p-5 border-b border-black/[0.06] bg-[#f5f5f7]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#d4a5a5] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#f5f5f7]" />
                </div>
                <div>
                  <div className="text-[#1d1d1f] font-semibold text-[15px]">Supporto Clienti</div>
                  <div className="text-[12px] text-[#86868b] font-normal">Online · Risponde in ~2min</div>
                </div>
              </div>
            </div>

            <div className="p-5 h-[300px] overflow-y-auto bg-white">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 mb-4"
              >
                <div className="w-8 h-8 rounded-full bg-[#d4a5a5] flex-shrink-0" />
                <div className="flex-1">
                  <div className="bg-[#f5f5f7] rounded-2xl rounded-tl-sm px-4 py-3">
                    <p className="text-[#1d1d1f] text-[14px] leading-relaxed">
                      Ciao! 👋 Sono qui per aiutarti. Hai domande sui prodotti, sulla spedizione o hai bisogno di consigli personalizzati?
                    </p>
                  </div>
                  <div className="text-[11px] text-[#86868b] mt-1.5 ml-2">Ora</div>
                </div>
              </motion.div>
            </div>

            <div className="p-4 border-t border-black/[0.06] bg-[#f5f5f7]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder:text-[#86868b] text-[14px] focus:outline-none focus:border-[#d4a5a5] transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      setMessage('');
                    }
                  }}
                />
                <button
                  disabled={!message.trim()}
                  className="px-4 py-3 rounded-xl bg-[#1d1d1f] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#d4a5a5] transition-colors duration-300"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="text-[11px] text-[#86868b] mt-3 text-center">
                Le tue conversazioni sono private e crittografate 🔒
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
