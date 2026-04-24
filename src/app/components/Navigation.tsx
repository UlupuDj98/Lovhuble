import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ComponenteScorrevole from './banda-scorrevole/Componente-Scorrevole';


export const Navigation = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/prodotti', label: 'Catalogo' },
    { to: '/guide', label: 'Guida' },
    { to: '/about', label: 'Chi Siamo' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f7]/70 backdrop-blur-2xl border-b border-black/[0.04]">
      <ComponenteScorrevole />
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] lg:h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              className="flex items-center"
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <img src='logo-1.png' alt="Lovehuble" className="h-[48px] lg:h-[58px]" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className="relative text-[12px] text-[#1d1d1f] hover:text-[#6e6e73] transition-colors duration-200 font-normal"
              >
                {link.label}
                {router.pathname === link.to && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-[17px] left-0 right-0 h-[1px] bg-[#1d1d1f]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <Link href="/wishlist" className="relative group" aria-label="Preferiti">
              <motion.div
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
                className="p-2"
              >
                <Heart className="w-[17px] h-[17px] text-[#1d1d1f]" strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={wishlistItems.length}
                    className="absolute top-0 right-0 w-[18px] h-[18px] bg-[#d4a5a5] text-white rounded-full flex items-center justify-center text-[10px] font-medium"
                  >
                    <motion.span
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {wishlistItems.length}
                    </motion.span>
                  </motion.div>
                )}
              </motion.div>
            </Link>
            <button onClick={openCart} className="relative group" aria-label="Apri carrello">
              <motion.div
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
                className="p-2"
              >
                <ShoppingBag className="w-[17px] h-[17px] text-[#1d1d1f]" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={totalItems}
                    className="absolute top-0 right-0 w-[18px] h-[18px] bg-[#1d1d1f] text-white rounded-full flex items-center justify-center text-[10px] font-medium"
                  >
                    <motion.span
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {totalItems}
                    </motion.span>
                  </motion.div>
                )}
              </motion.div>
            </button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5 text-[#1d1d1f]" strokeWidth={1.5} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#f5f5f7]/95 backdrop-blur-2xl border-t border-black/[0.04] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-[17px] text-[#1d1d1f] hover:text-[#6e6e73] transition-colors font-normal"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
