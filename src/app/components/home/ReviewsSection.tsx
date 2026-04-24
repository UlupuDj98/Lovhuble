import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Sofia M.',
    rating: 5,
    text: 'Prodotti di qualità eccezionale e spedizione discreta. Finalmente un negozio che capisce davvero cosa significa privacy.',
    product: 'Vibratore Velvet Touch',
  },
  {
    name: 'Marco R.',
    rating: 5,
    text: 'Design elegante e materiali premium. Il servizio clienti è stato impeccabile, molto professionale.',
    product: 'Set Bondage in Seta',
  },
  {
    name: 'Elena G.',
    rating: 5,
    text: "Esperienza d'acquisto fantastica. Packaging lussuoso e totalmente anonimo. Consigliatissimo!",
    product: 'Set Lingerie Noir Lace',
  },
  {
    name: 'Andrea P.',
    rating: 5,
    text: 'La qualità dei prodotti supera le aspettative. Finalmente un e-commerce serio e affidabile.',
    product: 'Vibratore per Coppie',
  },
  {
    name: 'Giulia F.',
    rating: 5,
    text: 'Spedizione rapidissima e confezione impeccabile. I prodotti sono esattamente come descritti, assolutamente top.',
    product: 'Rabbit Vibrator Deluxe',
  },
  {
    name: 'Luca B.',
    rating: 5,
    text: 'Servizio discreto e professionale. Consiglio Lovehuble a chiunque cerchi qualità senza compromessi.',
    product: 'Set Manette Premium',
  },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="bg-white rounded-[16px] p-[24px] lg:px-[28px] lg:py-[40px] flex flex-col gap-[14px] h-full shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
    <div className="flex gap-[3px]">
      {[...Array(review.rating)].map((_, i) => (
        <Star key={i} className="w-[14px] h-[14px] fill-[#d4a5a5] text-[#d4a5a5]" strokeWidth={0} />
      ))}
    </div>
    <p className="text-[15px] text-[#1d1d1f] leading-[1.6] font-normal flex-1">
      {review.text}
    </p>
    <div>
      <p className="text-[15px] font-semibold text-[#1d1d1f]">{review.name}</p>
      <p className="text-[13px] text-[#86868b] font-normal mt-[2px]">{review.product}</p>
    </div>
  </div>
);

export const ReviewsSection = () => {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-[88px] lg:py-[110px] bg-[#f5f5f7]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 mb-[48px] lg:mb-[64px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-[40px] lg:text-[56px] tracking-[-0.015em] leading-[1.1]"
        >
          <span className="text-[#1d1d1f] font-semibold">Cosa Dicono i Nostri Clienti. </span>
          <span className="text-[#86868b] font-inter">La loro soddisfazione è la nostra priorità</span>
        </motion.h2>
      </div>

      {/* Desktop — infinite marquee */}
      <div className="hidden lg:block overflow-hidden py-10">
        <div
          className="flex w-max gap-[32px] hover:[animation-play-state:paused]"
          style={{ animation: 'marquee 70s linear infinite' }}
        >
          {doubled.map((review, i) => (
            <div key={i} className="w-[460px] h-[270px] flex-shrink-0">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — swipe only */}
      <div className="lg:hidden">
        <div
          className="flex gap-[12px] overflow-x-auto snap-x snap-mandatory"
          style={{
            paddingTop: '60px',
            paddingBottom: '60px',
            paddingLeft: '24px',
            paddingRight: '24px',
            marginTop: '-60px',
            marginBottom: '-60px',
            scrollPaddingLeft: '24px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } as React.CSSProperties}
        >
          {reviews.map((review, i) => (
            <div key={i} className="w-[78vw] flex-shrink-0 snap-start">
              <ReviewCard review={review} />
            </div>
          ))}
          <div className="w-[1px] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};
