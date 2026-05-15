'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { SubCategoriesSection } from '../components/home/SubCategorySection';
import { FilterBar, FilterState } from '../components/product/FilterBar';
import { PriceRangeBar } from '../components/product/PriceRangeBar';
import { PageHeader } from '../components/PageHeader';
import { Breadcrumb } from '../components/productdetail/Breadcrumb';
import { getProductsByCategory, getCategoryName } from '../lib/medusa-data';
import type { Product } from '../data/products';

interface SubcategoryProps {
  initialProducts?: Product[]
  initialSubCategoryName?: string
  initialSubCategoryItems?: { title: string; imageSrc: string; link: string }[]
}

export const Subcategory = ({ initialProducts, initialSubCategoryName, initialSubCategoryItems }: SubcategoryProps) => {
  const router = useRouter();
  const categorySlug = typeof router.query.categoria === 'string' ? router.query.categoria : '';
  const subCategorySlug = typeof router.query.subcategoria === 'string' ? router.query.subcategoria : '';

  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts ?? []);
  const [loading, setLoading] = useState(!initialProducts);
  const [subCategoryName, setSubCategoryName] = useState(initialSubCategoryName ?? '');

  const [filters, setFilters] = useState<FilterState>({
    onlyInStock: false,
    checkedOptions: {},
  });

  const maxPrice = useMemo(
    () => allProducts.length > 0 ? Math.ceil(Math.max(...allProducts.map(p => p.price)) / 50) * 50 : 5000,
    [allProducts],
  );

  const [price, setPrice] = useState<[number, number]>([0, 5000]);

  useEffect(() => {
    setPrice([0, maxPrice]);
  }, [maxPrice]);

  useEffect(() => {
    if (!subCategorySlug || initialProducts) return;
    setLoading(true);
    Promise.all([
      getProductsByCategory(subCategorySlug),
      getCategoryName(subCategorySlug),
    ]).then(([prods, name]) => {
      setAllProducts(prods);
      setSubCategoryName(name);
    }).finally(() => setLoading(false));
  }, [subCategorySlug, initialProducts]);

  const { isInWishlist, toggleWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let list = allProducts.filter(p => p.price >= price[0] && p.price <= price[1]);
    if (filters.onlyInStock) list = list.filter(p => p.inStock);
    return list;
  }, [allProducts, price, filters.onlyInStock]);

  if (!router.isReady) return null;

  const subCategoryLabel = subCategoryName || allProducts[0]?.subCategory || subCategorySlug;
  const categoryLabel = allProducts[0]?.category ?? categorySlug;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <PageHeader
        title={subCategoryLabel}
        subtitle={`Esplora la nostra selezione di ${subCategoryLabel.toLowerCase()}`}
        categorySlug={categorySlug}
        backHref={`/prodotti/${categorySlug}`}
        backLabel={categoryLabel}
      />

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8 pt-[20px]">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: categoryLabel, href: `/prodotti/${categorySlug}` },
          { label: subCategoryLabel },
        ]} />
      </div>

      <SubCategoriesSection mainCategorySlug={categorySlug} initialItems={initialSubCategoryItems} />

      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 pt-[40px] pb-[8px]">
        <PriceRangeBar value={price} onChange={setPrice} max={maxPrice} />
      </div>

      <section className="py-[32px] lg:py-[48px]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <FilterBar value={filters} onChange={setFilters} />

          <div>
            {loading ? (
              <div className="text-center py-[80px]">
                <p className="text-[17px] text-[#6e6e73]">Caricamento prodotti...</p>
              </div>
            ) : (
              <>
                <p className="text-[12px] text-[#6e6e73] mb-[20px]">
                  {filteredProducts.length}{' '}
                  {filteredProducts.length === 1 ? 'prodotto' : 'prodotti'}
                </p>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-[80px]">
                    <p className="text-[17px] text-[#6e6e73]">
                      Nessun prodotto trovato in questa sottocategoria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[20px] -mx-2 lg:mx-0">
                    {filteredProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        className="h-[380px] lg:h-[520px]"
                        initial={{ y: 16 }}
                        animate={{ y: 0 }}
                        transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.4 }}
                      >
                        <ProductCard
                          product={product}
                          priority={i < 4}
                          wishlisted={isInWishlist(product.id)}
                          onWishlist={e => { e.preventDefault(); toggleWishlist(product); }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
