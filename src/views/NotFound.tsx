import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Heart } from 'lucide-react';

export const 
NotFound = () => (
  <div className="bg-[#f5f5f7] mt-[90px] py-[100px] lg:py-[130px] flex flex-col items-center justify-center px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-md w-full"
    >
        {/* Numero 404 */}
        <div className="relative flex flex-col items-center">
          <span className="text-[100px] lg:text-[150px] font-semibold leading-none tracking-[-0.03em] text-[#f0e0e0]">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart
              className="w-14 h-14 lg:w-16 lg:h-16 text-[#d4a5a5]"
              fill="currentColor"
              strokeWidth={0}
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-8 py-8">
          <p className="text-[11px] lg:text-[15px] text-[#6e6e73] uppercase tracking-widest mb-3">
            Pagina non trovata
          </p>
          <h1 className="text-[22px] lg:text-[32px] font-semibold text-[#1d1d1f] leading-tight tracking-[-0.02em] mb-4">
            Oops, questa pagina non esiste
          </h1>
          <p className="text-[14px] lg:text-[16px] text-[#6e6e73] leading-relaxed mb-8">
            Il link che hai seguito potrebbe essere scaduto o la pagina è stata spostata.
            Torna alla home per continuare a esplorare.
          </p>

        
            <Link
              href="/"
              className="flex-1 h-12 rounded-3xl bg-[#1d1d1f] text-white text-[16px] font-semibold flex items-center justify-center gap-2 hover:bg-[#3a3a3c] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla Home
            </Link>
          
         
        </div>
    
    </motion.div>
  </div>
);
