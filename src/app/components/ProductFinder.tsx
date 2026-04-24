import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Heart, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { getProductUrl } from '../data/products';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
    icon?: any;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Per chi stai cercando?",
    options: [
      { text: "Solo per me", value: "solo", icon: Heart },
      { text: "Per me e il partner", value: "coppia", icon: Users },
      { text: "Un regalo", value: "regalo", icon: Sparkles },
    ]
  },
  {
    id: 2,
    question: "Che tipo di esperienza desideri?",
    options: [
      { text: "Delicata e romantica", value: "delicata" },
      { text: "Intensa e potente", value: "intensa" },
      { text: "Esplorativa e giocosa", value: "esplorativa" },
    ]
  },
  {
    id: 3,
    question: "Qual è il tuo livello di esperienza?",
    options: [
      { text: "Principiante", value: "principiante" },
      { text: "Intermedio", value: "intermedio" },
      { text: "Esperto", value: "esperto" },
    ]
  },
  {
    id: 4,
    question: "Cosa ti interessa maggiormente?",
    options: [
      { text: "Vibratori e stimolatori", value: "vibratori" },
      { text: "Lingerie e abbigliamento", value: "lingerie" },
      { text: "Accessori e bondage", value: "bondage" },
      { text: "Lubrificanti e creme", value: "lubrificanti" },
    ]
  }
];

const getRecommendations = (answers: Record<number, string>) => {
  // Logica di raccomandazione basata sulle risposte
  const recommendations = [];
  
  if (answers[4] === 'vibratori') {
    if (answers[2] === 'delicata') {
      recommendations.push({ id: 1, name: 'Wand Massager Premium', category: 'Vibratori' });
    } else if (answers[2] === 'intensa') {
      recommendations.push({ id: 2, name: 'Rabbit Vibrator Deluxe', category: 'Vibratori' });
    }
  } else if (answers[4] === 'lingerie') {
    recommendations.push({ id: 3, name: 'Set Lingerie Pizzo', category: 'Lingerie' });
  } else if (answers[4] === 'bondage') {
    if (answers[3] === 'principiante') {
      recommendations.push({ id: 7, name: 'Kit Bondage Principianti', category: 'Bondage' });
    } else {
      recommendations.push({ id: 8, name: 'Set Manette Premium', category: 'Bondage' });
    }
  } else if (answers[4] === 'lubrificanti') {
    recommendations.push({ id: 9, name: 'Lubrificante Siliconico Premium', category: 'Lubrificanti' });
  }
  
  // Aggiungi raccomandazioni generiche se non ci sono match specifici
  if (recommendations.length === 0) {
    recommendations.push(
      { id: 1, name: 'Wand Massager Premium', category: 'Vibratori' },
      { id: 9, name: 'Lubrificante Siliconico Premium', category: 'Lubrificanti' }
    );
  }
  
  return recommendations;
};

export const ProductFinder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
    }, 400);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const recommendations = showResults ? getRecommendations(answers) : [];

  return (
    <section className="py-[80px] bg-[#fbfbfd] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1d1d1f 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="max-w-[980px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#f5f5f7]" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-[32px] border border-black/[0.06]" />

          {/* Content */}
          <div className="relative z-10">
            {!isOpen ? (
              <motion.div
                layout
                className="p-[48px] lg:p-[64px] text-center"
              >
                <div className="inline-flex items-center gap-[8px] px-[12px] py-[6px] bg-black/[0.04] rounded-full mb-[24px] border border-black/[0.06]">
                  <Sparkles className="w-[14px] h-[14px] text-[#6e6e73]" strokeWidth={2} />
                  <span className="text-[13px] text-[#6e6e73] font-normal">Strumento di ricerca personalizzato</span>
                </div>

                <h2 className="text-[40px] lg:text-[56px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[16px] leading-[1.07]">
                  Trova il prodotto perfetto per te
                </h2>
                <p className="text-[19px] lg:text-[21px] text-[#6e6e73] font-normal leading-[1.4] tracking-[-0.003em] max-w-[600px] mx-auto mb-[40px]">
                  Rispondi a poche domande e ti aiuteremo a scoprire i prodotti più adatti alle tue esigenze
                </p>

                <motion.button
                  onClick={() => setIsOpen(true)}
                  whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-[12px] px-[32px] py-[16px] bg-[#1d1d1f] text-white rounded-full text-[17px] font-normal shadow-sm hover:bg-[#424245] transition-all"
                >
                  Inizia il test
                  <ChevronRight className="w-[20px] h-[20px] group-hover:translate-x-[2px] transition-transform" strokeWidth={2.5} />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="p-[32px] lg:p-[48px]"
              >
                {!showResults ? (
                  <>
                    {/* Progress bar */}
                    <div className="mb-[48px]">
                      <div className="flex items-center justify-between mb-[12px]">
                        <span className="text-[14px] text-black/60 font-normal">
                          Domanda {currentQuestion + 1} di {questions.length}
                        </span>
                        <span className="text-[14px] text-black/60 font-normal">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="h-[4px] bg-black/[0.08] rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-[#bf5af2] to-[#ff2e97] shadow-[0_0_12px_rgba(191,90,242,0.6)]"
                        />
                      </div>
                    </div>

                    {/* Question */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-[32px] lg:text-[40px] font-semibold text-black mb-[40px] leading-[1.1] tracking-[-0.015em]">
                          {questions[currentQuestion].question}
                        </h3>

                        <div className="space-y-[16px]">
                          {questions[currentQuestion].options.map((option, index) => {
                            const Icon = option.icon;
                            const isSelected = answers[questions[currentQuestion].id] === option.value;
                            
                            return (
                              <motion.button
                                key={option.value}
                                onClick={() => handleAnswer(option.value)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.01, x: 4 }}
                                whileTap={{ scale: 0.99 }}
                                className={`w-full flex items-center gap-[16px] p-[24px] rounded-[18px] text-left transition-all ${
                                  isSelected
                                    ? 'bg-[#1d1d1f] border-2 border-[#1d1d1f] shadow-lg'
                                    : 'bg-white border-2 border-black/[0.08] hover:border-black/[0.15] hover:bg-white'
                                }`}
                              >
                                {Icon && (
                                  <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0 ${
                                    isSelected ? 'bg-white/[0.15]' : 'bg-black/[0.04]'
                                  }`}>
                                    <Icon className={`w-[24px] h-[24px] ${isSelected ? 'text-white' : 'text-[#6e6e73]'}`} strokeWidth={2} />
                                  </div>
                                )}
                                <span className={`text-[19px] font-normal flex-1 ${isSelected ? 'text-white' : 'text-[#1d1d1f]'}`}>
                                  {option.text}
                                </span>
                                <ChevronRight className={`w-[20px] h-[20px] transition-all ${
                                  isSelected ? 'opacity-100 text-white' : 'opacity-0 text-[#6e6e73]'
                                }`} strokeWidth={2} />
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-[48px]">
                      <motion.button
                        onClick={handlePrevious}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={currentQuestion === 0}
                        className={`flex items-center gap-[8px] px-[20px] py-[10px] rounded-full text-[15px] font-normal transition-all ${
                          currentQuestion === 0
                            ? 'bg-black/[0.05] text-black/30 cursor-not-allowed border border-black/[0.06]'
                            : 'bg-white text-black hover:bg-white/80 border border-black/[0.10] shadow-sm'
                        }`}
                      >
                        <ChevronLeft className="w-[18px] h-[18px]" strokeWidth={2} />
                        Indietro
                      </motion.button>

                      <motion.button
                        onClick={handleClose}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-[20px] py-[10px] text-[#6e6e73] hover:text-[#1d1d1f] text-[15px] font-normal transition-colors"
                      >
                        Chiudi
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center mb-[48px]">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-[80px] h-[80px] mx-auto mb-[24px] rounded-full bg-gradient-to-br from-[#bf5af2] to-[#ff2e97] flex items-center justify-center shadow-[0_8px_32px_rgba(191,90,242,0.4)]"
                      >
                        <Sparkles className="w-[40px] h-[40px] text-white" strokeWidth={2} />
                      </motion.div>
                      
                      <h3 className="text-[40px] lg:text-[48px] font-semibold text-black mb-[16px] leading-[1.07] tracking-[-0.015em]">
                        Ecco i nostri suggerimenti
                      </h3>
                      <p className="text-[19px] text-black/70 font-normal leading-[1.4] tracking-[-0.003em]">
                        Basati sulle tue preferenze, abbiamo selezionato questi prodotti per te
                      </p>
                    </div>

                    <div className="space-y-[16px] mb-[40px]">
                      {recommendations.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Link
                            href={getProductUrl(String(product.id))}
                            className="group block"
                          >
                            <motion.div
                              whileHover={{ scale: 1.01, x: 4 }}
                              whileTap={{ scale: 0.99 }}
                              className="flex items-center justify-between p-[24px] bg-white border-2 border-black/[0.08] rounded-[18px] hover:border-black/[0.15] hover:shadow-sm transition-all"
                            >
                              <div>
                                <p className="text-[12px] text-[#6e6e73] tracking-wide uppercase font-normal mb-[4px]">
                                  {product.category}
                                </p>
                                <h4 className="text-[19px] font-semibold text-[#1d1d1f] mb-[4px]">
                                  {product.name}
                                </h4>
                              </div>
                              <ChevronRight className="w-[20px] h-[20px] text-[#6e6e73] group-hover:text-[#1d1d1f] group-hover:translate-x-[2px] transition-all" strokeWidth={2} />
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-[12px] items-center justify-center">
                      <motion.button
                        onClick={handleReset}
                        whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.15)' }}
                        whileTap={{ scale: 0.98 }}
                        className="px-[24px] py-[12px] bg-[#1d1d1f] text-white rounded-full text-[15px] font-normal shadow-sm hover:bg-[#424245] transition-all"
                      >
                        Rifai il test
                      </motion.button>
                      
                      <Link href="/prodotti">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-[24px] py-[12px] bg-white text-[#1d1d1f] rounded-full text-[15px] font-normal hover:bg-white/80 transition-all border border-black/[0.10] shadow-sm"
                        >
                          Vedi tutti i prodotti
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};