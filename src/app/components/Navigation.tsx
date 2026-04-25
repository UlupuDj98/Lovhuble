import Link from 'next/link';
import { ShoppingBag, Menu, X, Heart, User, LogIn, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ComponenteScorrevole from './banda-scorrevole/Componente-Scorrevole';
import { SearchModal } from './SearchModal';
import { categories, subCategories } from '../data/products';

export const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { totalItems, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  const close = () => setIsSidebarOpen(false);

  return (
    <>
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

            {/* Icons */}
            <div className="flex items-center space-x-1">

              {/* Search — always visible */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="p-2"
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
                aria-label="Cerca"
              >
                <Search className="w-[17px] h-[17px] text-[#1d1d1f]" strokeWidth={1.5} />
              </motion.button>

              {/* Wishlist — desktop only */}
              <Link href="/wishlist" className="relative group hidden lg:block" aria-label="Preferiti">
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

              {/* Cart */}
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

              {/* Hamburger — always visible */}
              <motion.button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2"
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.2 }}
                aria-label="Apri menu"
              >
                <Menu className="w-[19px] h-[19px] text-[#1d1d1f]" strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            />

            {/* Panel */}
            <motion.aside
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 38 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[300px] sm:w-[340px] bg-white flex flex-col shadow-[-8px_0_40px_rgba(0,0,0,0.12)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-[68px] lg:h-[80px] border-b border-[#e0e0e5] flex-shrink-0">
                <span className="text-[14px] font-semibold text-[#1d1d1f] tracking-[-0.01em]">Menu</span>
                <button onClick={close} className="p-1 hover:opacity-60 transition-opacity" aria-label="Chiudi menu">
                  <X className="w-[18px] h-[18px] text-[#1d1d1f]" strokeWidth={1.5} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-[32px]">

                {/* Categorie */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-[#86868b] uppercase mb-[10px]">
                    Categorie
                  </p>
                  <div className="flex flex-col gap-[2px]">
                    {categories.map(cat => {
                      const subs = subCategories.filter(s => s.parentSlug === cat.slug);
                      const isOpen = openCategory === cat.slug;
                      return (
                        <div key={cat.slug}>
                          {/* Riga categoria */}
                          <button
                            onClick={() => setOpenCategory(isOpen ? null : cat.slug)}
                            className="flex items-center justify-between w-full px-[10px] py-[10px] rounded-[10px] text-[15px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150"
                          >
                            <Link
                              href={`/prodotti/${cat.slug}`}
                              onClick={e => { e.stopPropagation(); close(); }}
                              className="flex-1 text-left"
                            >
                              {cat.name}
                            </Link>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="ml-2 flex-shrink-0"
                            >
                              <ChevronDown className="w-[14px] h-[14px] text-[#86868b]" strokeWidth={2} />
                            </motion.div>
                          </button>

                          {/* Subcategorie */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key="subs"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="overflow-hidden pl-[10px]"
                              >
                                <div className="flex flex-col gap-[2px] border-l border-[#e0e0e5] pl-[12px] ml-[4px] py-[4px]">
                                  {subs.map(sub => (
                                    <Link
                                      key={sub.slug}
                                      href={`/prodotti/${cat.slug}/${sub.slug}`}
                                      onClick={close}
                                      className="px-[8px] py-[7px] rounded-[8px] text-[13px] font-normal text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150"
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-[#86868b] uppercase mb-[10px]">
                    Informazioni
                  </p>
                  <div className="flex flex-col gap-[2px]">
                    <Link
                      href="/about"
                      onClick={close}
                      className="flex items-center px-[10px] py-[10px] rounded-[10px] text-[15px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150"
                    >
                      Chi Siamo
                    </Link>
                    <Link
                      href="/guide"
                      onClick={close}
                      className="flex items-center px-[10px] py-[10px] rounded-[10px] text-[15px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150"
                    >
                      Guida
                    </Link>
                    {/* Wishlist — mobile only */}
                    <Link
                      href="/wishlist"
                      onClick={close}
                      className="lg:hidden flex items-center gap-[8px] px-[10px] py-[10px] rounded-[10px] text-[15px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150"
                    >
                      Lista dei Desideri
                      {wishlistItems.length > 0 && (
                        <span className="ml-auto w-[20px] h-[20px] rounded-full bg-[#d4a5a5] text-white text-[10px] font-medium flex items-center justify-center">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

                {/* Account */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-[#86868b] uppercase mb-[10px]">
                    Account
                  </p>
                  <div className="flex flex-col gap-[8px]">
                    <button
                      disabled
                      className="flex items-center gap-[10px] w-full px-[14px] py-[11px] rounded-[10px] text-[14px] font-medium text-[#1d1d1f] bg-[#f5f5f7] opacity-50 cursor-not-allowed"
                    >
                      <LogIn className="w-[15px] h-[15px]" strokeWidth={1.5} />
                      Accedi
                    </button>
                    <button
                      disabled
                      className="flex items-center gap-[10px] w-full px-[14px] py-[11px] rounded-[10px] text-[14px] font-medium text-white bg-[#1d1d1f] opacity-50 cursor-not-allowed"
                    >
                      <User className="w-[15px] h-[15px]" strokeWidth={1.5} />
                      Crea Account
                    </button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
