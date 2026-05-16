import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Heart, ShoppingCart, Package, RotateCcw, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState, useEffect } from 'react';
import { Breadcrumb } from '../components/productdetail/Breadcrumb';
import { ImageGallery } from '../components/productdetail/ImageGallery';
import { ProdottiCorrelati } from '../components/productdetail/ProdottiCorrelati';
import { getProductByHandle } from '../lib/medusa-data';
import type { Product, ProductVariant } from '../data/products';

interface ProductDetailProps {
  initialProduct?: Product | null;
  initialRelated?: Product[];
}

const COLOR_MAP: Record<string, string> = {
  Rosa: '#F472B6', Viola: '#8B5CF6', Bordeaux: '#7C1D2E',
  Nero: '#1d1d1f', Bianco: '#F8F8F8', Rosso: '#EF4444',
  Verde: '#22C55E', Marrone: '#92400E', Lilla: '#A78BFA',
}

const POPULAR_VALUES = new Set(['M', 'S/M', '100ml'])

function formatPrice(n: number): string {
  const rounded = Math.round(n * 100) / 100
  return rounded % 1 === 0
    ? rounded.toFixed(0)
    : rounded.toFixed(2).replace('.', ',')
}

function formatWeight(g: number): string {
  return g >= 1000 ? `${(g / 1000).toFixed(1).replace('.', ',')} kg` : `${g} g`
}

function getDeliveryDate(): string {
  const d = new Date()
  let added = 0
  while (added < 2) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) added++
  }
  const days = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']
  return `${days[d.getDay()]} ${d.getDate()}`
}

export const ProductDetail = ({ initialProduct, initialRelated }: ProductDetailProps) => {
  const router = useRouter();
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<Product | null>(initialProduct ?? null);
  const [loading, setLoading] = useState(!initialProduct);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeVariant, setActiveVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { slug, categoria, subcategoria } = router.query as Record<string, string>;

  // Sincronizza il prodotto quando initialProduct cambia (navigazione client-side tra prodotti)
  useEffect(() => {
    if (!initialProduct) return;
    setProduct(initialProduct);
    setSelectedOptions({});
    setActiveVariant(null);
    setQuantity(1);
    setLoading(false);
  }, [initialProduct?.id]);

  // Fetch prodotto quando lo slug non è ancora pre-renderizzato (fallback)
  useEffect(() => {
    if (initialProduct || !slug || !router.isReady) return;
    setLoading(true);
    setSelectedOptions({});
    setActiveVariant(null);
    setQuantity(1);
    getProductByHandle(slug)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [slug, router.isReady, initialProduct]);

  useEffect(() => {
    if (!product?.variants?.length) return;
    const first = product.variants[0];
    if (first.options && Object.keys(first.options).length > 0) {
      setSelectedOptions({ ...first.options });
    }
    setActiveVariant(first);
  }, [product]);

  useEffect(() => {
    if (!product?.variants?.length || !Object.keys(selectedOptions).length) return;
    const found = product.variants.find(v =>
      Object.entries(selectedOptions).every(([key, val]) => v.options[key] === val)
    );
    if (found) setActiveVariant(found);
  }, [selectedOptions, product]);

  if (!router.isReady || loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-[17px] text-[#6e6e73]">Caricamento...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <div className="text-center">
          <h2 className="text-[24px] font-semibold text-[#1d1d1f] mb-[16px]">Prodotto non trovato</h2>
          <Link href="/" className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-[15px]">
            Torna ai prodotti
          </Link>
        </div>
      </div>
    );
  }

  const hasRealVariants = !!(
    product.options?.length &&
    !(product.options.length === 1 && product.options[0].title === 'Tipo')
  );

  const displayPrice = activeVariant?.price ?? product.price;

  const handleAddToCart = () => {
    addItem({
      variantId: activeVariant?.id ?? product.variantId ?? '',
      name: hasRealVariants && activeVariant
        ? `${product.name} — ${activeVariant.title}`
        : product.name,
      price: displayPrice,
      image: product.images[0] ?? product.image,
      productUrl: `/prodotti/${catSlug}/${subCatSlug}/${product.slug}`,
      quantity,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  const catSlug = product.categorySlug || categoria || ''
  const catLabel = product.category || categoria || ''
  const subCatSlug = product.subCategorySlug || subcategoria || ''
  const subCatLabel = product.subCategory || subcategoria || ''

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: catLabel, href: `/prodotti/${catSlug}` },
    { label: subCatLabel, href: `/prodotti/${catSlug}/${subCatSlug}` },
    { label: product.name },
  ];

  const hasDimensions = product.height != null || product.width != null || product.length != null;
  const hasSpecs = !!(product.material || product.weight != null || hasDimensions);

  return (
    <div className="pt-[68px] lg:pt-[130px] min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8 pb-[28px] pt-[46px] lg:pt-[36px]">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* ── Sezione principale ─────────────────────────────────────────── */}
      <section className="pb-[72px]">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[80px]">

            {/* Galleria */}
            <motion.div
              initial={{ x: -30 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              key={product.id}
            >
              <ImageGallery images={product.images} alt={product.name} />
            </motion.div>

            {/* Info prodotto */}
            <motion.div
              initial={{ x: 30 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col justify-center  space-y-[28px] lg:space-y-[20px]"
            >
              {/* Badge + categoria + titolo */}
              <div className="space-y-[8px] ">
                <div className='rounded-3xl bg-[#D4A5A5] py-1 px-3 w-fit'>
                <p className="text-[13px] text-black tracking-[0.1em] uppercase font-semibold">
                  {product.category}
                </p>
                </div>
                <h1 className="text-[32px] lg:text-[40px] font-bold tracking-[-0.02em] text-[#1d1d1f] leading-[1.1]">
                  {product.name}
                </h1>
              </div>


              {/* Descrizione */}
              <p className="text-[15px] md:text-[16px]  text-[#6e6e73] leading-[1.65]">
                {product.subtitle}
              </p>

              {/* Prezzo */}
              <motion.p
                key={displayPrice}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[32px] lg:text-[40px] font-bold text-[#1d1d1f] tracking-[-0.01em]"
              >
                €{formatPrice(displayPrice)}
              </motion.p>


              {/* Segnali urgenza */}
              <div className="space-y-[8px]">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[18px] h-[18px] flex items-center justify-center rounded-full bg-green-500 text-white text-[10px] font-bold flex-shrink-0">✓</span>
                  <span className="text-[14px] md:text-[16px] text-[#1d1d1f]">
                    Ordina entro le <strong>15:00</strong> · Ricevi <strong>{getDeliveryDate()}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[15px]">👁</span>
                  <span className="text-[14px] md:text-[16px] text-[#6e6e73]">18 persone stanno guardando questo prodotto</span>
                </div>
              </div>

              

              {/* Selettore varianti */}
              {hasRealVariants && (
                <div className="space-y-[20px]">
                  {[...product.options!].sort((a, b) => a.title === 'Colore' ? -1 : b.title === 'Colore' ? 1 : 0).map(opt => {
                    const isColor = opt.title === 'Colore'
                    return (
                      <div key={opt.title}>
                        <p className="text-[14px] font-semibold text-[#1d1d1f] mb-[12px]">
                          {opt.title}:
                        </p>
                        {isColor ? (
                          <div className="flex flex-wrap gap-[18px]">
                            {opt.values.map(value => {
                              const isSelected = selectedOptions[opt.title] === value
                              const bg = COLOR_MAP[value] ?? '#888'
                              const needsBorder = value === 'Bianco'
                              return (
                                <button
                                  key={value}
                                  onClick={() => setSelectedOptions(prev => ({ ...prev, [opt.title]: value }))}
                                  className="flex flex-col items-center gap-[6px] group"
                                >
                                  <div
                                    className={`w-[34px] h-[34px] rounded-full transition-all duration-200 ${
                                      isSelected
                                        ? 'ring-2 ring-offset-2 ring-[#1d1d1f] scale-110'
                                        : 'ring-1 ring-[#d0d0d5] hover:scale-105'
                                    } ${needsBorder ? 'border border-[#d0d0d5]' : ''}`}
                                    style={{ backgroundColor: bg }}
                                  />
                                  <span className={`text-[11px] transition-colors ${isSelected ? 'text-[#1d1d1f] font-medium' : 'text-[#6e6e73]'}`}>
                                    {value}
                                  </span>
                                </button>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-[8px]">
                            {opt.values.map(value => {
                              const isSelected = selectedOptions[opt.title] === value
                              const isPopular = POPULAR_VALUES.has(value)
                              return (
                                <div key={value} className="relative">
                                  {isPopular && (
                                    <span className="absolute -top-[9px] left-1/2 -translate-x-1/2 text-[9px] font-bold text-white bg-[#FF6B35] px-[6px] py-[1px] rounded-full whitespace-nowrap z-10">
                                      popular
                                    </span>
                                  )}
                                  <button
                                    onClick={() => setSelectedOptions(prev => ({ ...prev, [opt.title]: value }))}
                                    className={`px-[14px] h-[44px] min-w-[52px] rounded-[10px] text-[13px] font-semibold border-2 transition-all duration-200 ${
                                      isSelected
                                        ? 'bg-[#1d1d1f] text-white border-[#1d1d1f]'
                                        : 'bg-white text-[#1d1d1f] border-[#d0d0d5] hover:border-[#1d1d1f]'
                                    }`}
                                  >
                                    {value}
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Quantità + disponibilità */}
              <div className="flex items-center gap-21 md:gap-46">
                <div className="flex items-center border-2 border-[#d0d0d5] rounded-[12px] overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-[42px] h-[42px] flex items-center justify-center text-[20px] font-light text-[#1d1d1f] hover:bg-[#f0f0f5] transition-colors"
                  >
                    −
                  </button>
                  <span className="w-[42px] text-center text-[15px] font-semibold text-[#1d1d1f]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-[42px] h-[42px] flex items-center justify-center text-[20px] font-light text-[#1d1d1f] hover:bg-[#f0f0f5] transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-[7px]">
                  <div className="w-[8px] h-[8px] rounded-full bg-green-500" />
                  <span className="text-[13px] font-medium text-green-600">Disponibile</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-[10px]">
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.01, boxShadow: '0 8px 30px rgba(29, 29, 31, 0.2)' }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-1 flex items-center justify-center gap-[8px] py-[15px] rounded-[14px] text-[15px] font-semibold transition-all duration-300 ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-[#1d1d1f] text-white hover:bg-[#424245]'
                  }`}
                >
                  <ShoppingCart className="w-[16px] h-[16px]" strokeWidth={2.5} />
                  {added ? 'Aggiunto ✓' : 'Aggiungi al Carrello'}
                </motion.button>

                <motion.button
                  onClick={() => toggleWishlist(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`w-[52px] h-[52px] flex items-center justify-center rounded-[14px] border-2 transition-all duration-300 ${
                    isInWishlist(product.id)
                      ? 'bg-[#d4a5a5] border-[#d4a5a5] text-white'
                      : 'bg-white border-[#d0d0d5] text-[#1d1d1f] hover:border-[#1d1d1f]'
                  }`}
                >
                  <Heart
                    className="w-[18px] h-[18px]"
                    strokeWidth={2}
                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                  />
                </motion.button>
              </div>

                   {/** Trust Badges */}
                   <div className="space-y-[11px] pt-[2px] mt-4">
                    <div className='flex items-center gap-[10px]'>
                      <Package className="w-[20px] h-[20px] text-[#6e6e73] flex-shrink-0" strokeWidth={1.8} />
                      <span className="text-[14px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Pacco 100% anonimo</span>
                      </span>
                    </div>
                    <div className='flex items-center gap-[10px]'>
                      <RotateCcw className="w-[20px] h-[20px] text-[#6e6e73] flex-shrink-0" strokeWidth={1.8} />
                      <span className="text-[14px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Garanzia rimborso 30 giorni</span>
                      </span>
                    </div>
                    <div className='flex items-center gap-[10px]'>
                      <ShieldCheck className="w-[20px] h-[20px] text-[#6e6e73] flex-shrink-0" strokeWidth={1.8} />
                      <span className="text-[14px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Materiale body-safe certificato</span>
                      </span>
                    </div>
                    <div className='flex items-center gap-[10px]'>
                      <Lock className="w-[20px] h-[20px] text-[#6e6e73] flex-shrink-0" strokeWidth={1.8} />
                      <span className="text-[14px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Pagamento sicuro</span>
                      </span>
                    </div>
                    </div>


              {/* Divisore */}
              <hr className="border-[#e0e0e5]" />

              {/* Specifiche tecniche inline con icone */}


              {/* Mobile: colonna verticale */}
              {hasSpecs && (
                <div className="md:hidden space-y-[9px] pt-[2px]">
                  {product.material && (
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[22px] w-[22px] text-center flex-shrink-0">🧪</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Materiale</span> · {product.material}
                      </span>
                    </div>
                  )}
                  {product.weight != null && (
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[22px] w-[22px] text-center flex-shrink-0">⚖️</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Peso</span> · {formatWeight(product.weight)}
                      </span>
                    </div>
                  )}
                  {product.height != null && (
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[22px] w-[22px] text-center flex-shrink-0">📏</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Altezza</span> · {product.height} cm
                      </span>
                    </div>
                  )}
                  {product.width != null && (
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[22px] w-[22px] text-center flex-shrink-0">↔️</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Larghezza</span> · {product.width} cm
                      </span>
                    </div>
                  )}
                  {product.length != null && (
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[22px] w-[22px] text-center flex-shrink-0">📦</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Profondità</span> · {product.length} cm
                      </span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

        

           
          </div>

              {/* Desktop: una riga orizzontale su tutta la larghezza */}
              {hasSpecs && (
                <div className="hidden md:flex justify-between w-full mt-12">
                  {product.material && (
                    <div className="flex items-center gap-[7px]">
                      <span className="text-[16px] w-[16px] text-center flex-shrink-0">🧪</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Materiale</span> · {product.material}
                      </span>
                    </div>
                  )}
                  {product.weight != null && (
                    <div className="flex items-center gap-[7px]">
                      <span className="text-[16px] w-[16px] text-center flex-shrink-0">⚖️</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Peso</span> · {formatWeight(product.weight)}
                      </span>
                    </div>
                  )}
                  {product.height != null && (
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[16px] w-[16px] text-center flex-shrink-0">📏</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Altezza</span> · {product.height} cm
                      </span>
                    </div>
                  )}
                  {product.width != null && (
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[16px] w-[16px] text-center flex-shrink-0">↔️</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Larghezza</span> · {product.width} cm
                      </span>
                    </div>
                  )}
                  {product.length != null && (
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[16px] w-[16px] text-center flex-shrink-0">📦</span>
                      <span className="text-[16px] text-[#6e6e73]">
                        <span className="text-[#1d1d1f] font-medium">Profondità</span> · {product.length} cm
                      </span>
                    </div>
                  )}
                </div>
              )}

         <div className='mt-14 space-y-3'>
           <h4 className='text-[24px] text-[#1d1d1f] font-semibold'>Descrizione:</h4>
          <p className="text-[14px] md:text-[16px]  text-[#6e6e73] leading-[1.65] whitespace-pre-line">
              {product.description}
            </p>
          
          </div>


                    
        </div>
      </section>

      <ProdottiCorrelati currentProduct={product} initialRelated={initialRelated} />
    </div>
  );
};
