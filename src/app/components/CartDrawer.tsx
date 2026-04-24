import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { getProductUrl } from '../data/products';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const CartDrawer = () => {
  const { items, removeItem, updateQuantity, totalPrice, isCartOpen, closeCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Keyboard navigation - ESC to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus drawer when opened
      drawerRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:max-w-[420px] lg:max-w-[480px] bg-white z-50 shadow-2xl flex flex-col"
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-black/[0.08]">
              <h2
                id="cart-drawer-title"
                className="text-[24px] font-semibold text-[#1d1d1f] tracking-[-0.007em]"
              >
                Il Tuo Carrello
              </h2>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.05, backgroundColor: '#f5f5f7' }}
                whileTap={{ scale: 0.95 }}
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-[20px] h-[20px] text-[#1d1d1f]" strokeWidth={2} />
              </motion.button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-center">
                  <div className="w-[64px] h-[64px] mx-auto mb-[24px] bg-[#f5f5f7] rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-[32px] h-[32px] text-[#6e6e73]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[21px] font-semibold text-[#1d1d1f] mb-[12px] tracking-[-0.003em]">
                    Il tuo carrello  vuoto
                  </h3>
                  <p className="text-[15px] text-[#6e6e73] mb-[24px] font-normal">
                    Scopri i nostri prodotti premium
                  </p>
                  <Link href="/prodotti" onClick={closeCart}>
                    <motion.button
                      whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.15)' }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#1d1d1f] text-white px-[22px] py-[12px] rounded-full text-[15px] font-normal hover:bg-[#424245] transition-colors duration-200 shadow-sm"
                    >
                      Inizia a Fare Acquisti
                    </motion.button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Cart Items - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="space-y-[20px]">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="flex gap-[16px] bg-[#f5f5f7] rounded-[16px] p-[16px]"
                      >
                        <Link
                          href={getProductUrl(item.id)}
                          onClick={closeCart}
                          className="w-[80px] h-[80px] flex-shrink-0 rounded-[12px] overflow-hidden bg-white"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <Link
                              href={getProductUrl(item.id)}
                              onClick={closeCart}
                            >
                              <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-[4px] tracking-[-0.003em] hover:text-[#6e6e73] transition-colors truncate">
                                {item.name}
                              </h3>
                            </Link>
                            <p className="text-[15px] font-normal text-[#1d1d1f]">
                              €{item.price}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-[12px] bg-white rounded-full px-[10px] py-[4px]">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-[24px] h-[24px] rounded-full hover:bg-[#f5f5f7] flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-[12px] h-[12px] text-[#1d1d1f]" strokeWidth={2.5} />
                              </motion.button>
                              <span className="text-[14px] font-normal text-[#1d1d1f] w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-[24px] h-[24px] rounded-full hover:bg-[#f5f5f7] flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-[12px] h-[12px] text-[#1d1d1f]" strokeWidth={2.5} />
                              </motion.button>
                            </div>

                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="w-[28px] h-[28px] rounded-full hover:bg-white flex items-center justify-center transition-colors group"
                            >
                              <X className="w-[16px] h-[16px] text-[#6e6e73] group-hover:text-[#1d1d1f]" strokeWidth={2} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer - Order Summary */}
                <div className="border-t border-black/[0.08] px-6 py-6 bg-[#f5f5f7]">
                  <div className="space-y-[12px] mb-[20px]">
                    <div className="flex justify-between text-[14px] text-[#6e6e73] font-normal">
                      <span>Subtotale</span>
                      <span>€{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[14px] text-[#6e6e73] font-normal">
                      <span>Spedizione</span>
                      <span>Gratuita</span>
                    </div>
                    <div className="h-[1px] bg-black/[0.08]" />
                    <div className="flex justify-between text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.003em]">
                      <span>Totale</span>
                      <span>€{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.15)' }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    className="w-full bg-[#1d1d1f] text-white py-[14px] rounded-full text-[15px] font-normal hover:bg-[#424245] transition-colors duration-200 mb-[12px] shadow-sm"
                  >
                    Procedi al Pagamento
                  </motion.button>

                  <Link
                    href="/prodotti"
                    onClick={closeCart}
                    className="block text-center text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-[13px] font-normal"
                  >
                    Continua gli Acquisti
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
