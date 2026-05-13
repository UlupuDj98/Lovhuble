"use client";

import { useState } from 'react';
import { Send, FileText, X, PenTool } from 'lucide-react';

export function BlogRequestForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/send-blog-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => {
          setStatus('idle');
          setIsFormOpen(false);
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setStatus('idle');
  };

  return (
    <div className="mt-16 sm:mt-20 md:mt-24">
      {!isFormOpen ? (
        /* Card iniziale con pulsante */
        <div 
          className="rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 relative shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
        >
          {/* Immagine di sfondo */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[#d4a5a5]"
           
          >
          </div>
        

          <div className="p-6 sm:p-8 md:p-10 lg:p-12 text-center relative z-10">
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-2 sm:mb-3">
              Scrivi il tuo articolo
            </h3>
            <p className="text-sm sm:text-lg text-black mb-6 sm:mb-8 max-w-2xl mx-auto">
              Aggiungi valore alla nostra community. Condividi la tua esperienza sul benessere, l&apos;intimità e la sessualità consapevole.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-black hover:bg-[#333] text-[#d4a5a5] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-xl font-bold uppercase tracking-widest text-xs sm:text-sm transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mx-auto"
              style={{
                boxShadow: "0 10px 15px -3px #7A1F3D33",
              }}
            >
              <PenTool size={18} className="sm:w-5 sm:h-5" />
              <span>Scrivi il tuo articolo</span>
            </button>
          </div>
        </div>
      ) : (
        /* Form */
        <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
          {/* Header con tasto X */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-[#e5e5e5] relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-lg hover:bg-[#262626] transition-colors"
              aria-label="Chiudi form"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#a3a3a3] hover:text-white" />
            </button>
            <div className="flex items-center gap-3 pr-10 sm:pr-12">
              <div className="p-2 sm:p-2.5 rounded-lg bg-[#D4A5A5] flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black">
                  Proponi un Articolo
                </h3>
                <p className="text-xs sm:text-sm text-[#a3a3a3] mt-1">
                  Compila il form per proporre il tuo articolo
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-black mb-2 font-bold">
                  Nome Completo
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Es. Marco Rossi"
                  className="w-full bg-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:border-[#D4A5A5] outline-none transition-all placeholder-[#a3a3a3] shadow-[0_8px_32px_rgba(0,0,0,0.18)]"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-black mb-2 font-bold">
                  Email
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="marco@email.it"
                  className="w-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:border-[#D4A5A5] outline-none transition-all placeholder-[#a3a3a3]"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-black mb-2 font-bold">
                  Titolo dell&apos;Articolo
                </label>
                <input
                  required
                  name="title"
                  type="text"
                  placeholder="Es. Come scegliere il tuo primo sex toy"
                  className="w-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)]  rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:border-[#7A1F3D] outline-none transition-all placeholder-[#a3a3a3]"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-black mb-2 font-bold">
                  Categoria
                </label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    className="w-full appearance-none bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:border-[#d4a5a5] outline-none transition-all pr-10 sm:pr-12"
                  >
                    <option value="">Seleziona una categoria</option>
                    <option value="Guida">Guida</option>
                    <option value="Relazioni">Relazioni</option>
                    <option value="Benessere">Benessere</option>
                    <option value="BDSM">BDSM</option>
                    <option value="Salute">Salute</option>
                    <option value="Lingerie">Lingerie</option>
                    <option value="Giochi">Giochi</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 sm:right-4 flex items-center text-[#7A1F3D]">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-black mb-2 font-bold">
                  Anteprima / Sinossi
                </label>
                <textarea
                  required
                  name="excerpt"
                  rows={4}
                  placeholder="Breve descrizione dell'articolo che vuoi proporre..."
                  className="w-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:border-[#D4A5A5] outline-none transition-all placeholder-[#a3a3a3] resize-y"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs uppercase tracking-widest text-  black mb-2 font-bold">
                  Note Aggiuntive (opzionale)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Informazioni aggiuntive, link a tuoi articoli precedenti, ecc."
                  className="w-full bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm focus:border-[#d4a5a5] outline-none transition-all placeholder-[#a3a3a3] resize-y"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold uppercase tracking-widest text-xs sm:text-sm transition-all border border-[#262626] hover:border-[#404040] text-[#e5e5e5] hover:text-white bg-black"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:flex-1 bg-[#d4a5a5] hover:bg-[#b88a8a] text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold uppercase tracking-widest text-xs sm:text-sm transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span>Inviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} className="sm:w-5 sm:h-5" />
                      <span>Invia Proposta</span>
                    </>
                  )}
                </button>
              </div>

              {status === 'success' && (
                <p className="text-[#10B981] text-xs sm:text-sm text-center font-medium">
                  Richiesta inviata con successo! Ti risponderemo presto.
                </p>
              )}
              {status === 'error' && (
                <p className="text-[#EF4444] text-xs sm:text-sm text-center font-medium">
                  Errore nell&apos;invio. Riprova più tardi.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
