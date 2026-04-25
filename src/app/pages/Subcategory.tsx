'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';
import { products, subCategories, categories } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { SubCategoriesSection } from '../components/home/SubCategorySection';
import { FilterBar, FilterState } from '../components/product/FilterBar';
import { PriceRangeBar } from '../components/product/PriceRangeBar';
import { PageHeader } from '../components/PageHeader';
import { maxPriceForSubCategory } from '../utils/price';

export const Subcategory = () => {
  const router = useRouter();
  const categorySlug = typeof router.query.categoria === 'string' ? router.query.categoria : '';
  const subCategorySlug = typeof router.query.subcategoria === 'string' ? router.query.subcategoria : '';

  const maxPrice = useMemo(
    () => maxPriceForSubCategory(subCategorySlug),
    [subCategorySlug],
  );

  const [filters, setFilters] = useState<FilterState>({
    onlyInStock: false,
    checkedOptions: {},
  });

  const [price, setPrice] = useState<[number, number]>([0, maxPrice]);

  useEffect(() => {
    setPrice([0, maxPrice]);
  }, [maxPrice]);

  const { isInWishlist, toggleWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    if (!subCategorySlug) return [];
    let list = products.filter(p => p.subCategorySlug === subCategorySlug);
    list = list.filter(p => p.price >= price[0] && p.price <= price[1]);
    if (filters.onlyInStock) list = list.filter(p => p.inStock);
    return list;
  }, [subCategorySlug, price, filters.onlyInStock]);

  if (!router.isReady) return null;

  const subCategory = subCategories.find(s => s.slug === subCategorySlug);
  const subCategoryLabel = subCategory?.name ?? subCategorySlug;
  const categoryLabel = categories.find(c => c.slug === categorySlug)?.name ?? categorySlug;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <PageHeader
        title={subCategoryLabel}
        subtitle={`Esplora la nostra selezione di ${subCategoryLabel.toLowerCase()}`}
        categorySlug={categorySlug}
        backHref={`/prodotti/${categorySlug}`}
        backLabel={categoryLabel}
      />

      {/* Altre subcategorie della stessa categoria */}
      <SubCategoriesSection mainCategorySlug={categorySlug} />

      {/* Price range */}
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 pt-[40px] pb-[8px]">
        <PriceRangeBar value={price} onChange={setPrice} max={maxPrice} />
      </div>

      {/* Products + Filters */}
      <section className="py-[32px] lg:py-[48px]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">

          <FilterBar value={filters} onChange={setFilters} />

          {/* Product Grid */}
          <div>
            <p className="text-[12px] text-[#6e6e73] mb-[20px]">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'prodotto' : 'prodotti'}
            </p>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-[80px]">
                <p className="text-[17px] text-[#6e6e73]">
                  Nessun prodotto trovato in questa categoria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[20px]">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="aspect-[270/425] lg:aspect-[340/526]"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  >
                    <ProductCard
                      product={product}
                      wishlisted={isInWishlist(product.id)}
                      onWishlist={e => { e.preventDefault(); toggleWishlist(product); }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
