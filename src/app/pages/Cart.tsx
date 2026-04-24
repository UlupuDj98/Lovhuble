import { motion } from 'motion/react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-[68px] lg:pt-[80px] min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-[64px] h-[64px] mx-auto mb-[24px] bg-[#f5f5f7] rounded-full flex items-center justify-center">
              <ShoppingBag className="w-[32px] h-[32px] text-[#6e6e73]" strokeWidth={1.5} />
            </div>
            <h2 className="text-[32px] font-semibold text-[#1d1d1f] mb-[12px] tracking-[-0.009em]">
              Il tuo carrello è vuoto
            </h2>
            <p className="text-[17px] text-[#6e6e73] mb-[32px] font-normal">
              Scopri la nostra collezione curata di prodotti premium
            </p>
            <Link href="/prodotti">
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.15)' }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
                className="bg-[#1d1d1f] text-white px-[22px] py-[12px] rounded-full text-[17px] font-normal hover:bg-[#424245] transition-colors duration-200 shadow-sm"
              >
                Inizia a Fare Acquisti
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[68px] lg:pt-[80px] min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[980px] mx-auto px-6 lg:px-8 py-[64px] lg:py-[88px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[40px] lg:text-[48px] font-semibold tracking-[-0.015em] text-[#1d1d1f] mb-[48px] leading-[1.08]"
        >
          Il Tuo Carrello
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[48px]">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-[24px]">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="flex gap-[20px] bg-[#f5f5f7] rounded-[18px] p-[20px]"
              >
                <div className="w-[96px] h-[96px] flex-shrink-0 rounded-[12px] overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-[4px] tracking-[-0.003em]">
                      {item.name}
                    </h3>
                    <p className="text-[15px] font-normal text-[#1d1d1f]">
                      €{item.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-[16px] bg-white rounded-full px-[12px] py-[6px]">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-[28px] h-[28px] rounded-full hover:bg-[#f5f5f7] flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-[14px] h-[14px] text-[#1d1d1f]" strokeWidth={2.5} />
                      </motion.button>
                      <span className="text-[15px] font-normal text-[#1d1d1f] w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-[28px] h-[28px] rounded-full hover:bg-[#f5f5f7] flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-[14px] h-[14px] text-[#1d1d1f]" strokeWidth={2.5} />
                      </motion.button>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="w-[32px] h-[32px] rounded-full hover:bg-white flex items-center justify-center transition-colors group"
                    >
                      <X className="w-[18px] h-[18px] text-[#6e6e73] group-hover:text-[#1d1d1f]" strokeWidth={2} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#f5f5f7] rounded-[18px] p-[32px] sticky top-[100px]">
              <h2 className="text-[24px] font-semibold text-[#1d1d1f] mb-[24px] tracking-[-0.007em]">
                Riepilogo Ordine
              </h2>

              <div className="space-y-[16px] mb-[24px]">
                <div className="flex justify-between text-[15px] text-[#6e6e73] font-normal">
                  <span>Subtotale</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[15px] text-[#6e6e73] font-normal">
                  <span>Spedizione</span>
                  <span>Gratuita</span>
                </div>
                <div className="h-[1px] bg-black/[0.08]" />
                <div className="flex justify-between text-[19px] font-semibold text-[#1d1d1f] tracking-[-0.003em]">
                  <span>Totale</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.15)' }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.2 }}
                className="w-full bg-[#1d1d1f] text-white py-[14px] rounded-full text-[17px] font-normal hover:bg-[#424245] transition-colors duration-200 mb-[16px] shadow-sm"
              >
                Procedi al Pagamento
              </motion.button>

              <Link
                href="/prodotti"
                className="block text-center text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-[14px] font-normal"
              >
                Continua gli Acquisti
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
