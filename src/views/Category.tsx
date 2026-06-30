'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/product/ProductCard';
import { SubCategoriesSection } from '../components/home/SubCategorySection';
import { FilterBar, FilterState, ActiveFilterChips } from '../components/product/FilterBar';
import { SortSelector, SortOption } from '../components/product/SortSelector';
import { PriceRangeBar } from '../components/product/PriceRangeBar';
import { PageHeader } from '../components/PageHeader';
import { getProductsByParentCategory } from '../lib/medusa-data';
import { applyFilters, getAvailableFilterDefs } from '../utils/product-filters';
import { getPageDescription } from '../data/page-descriptions';
import type { Product } from '../data/products';

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

interface CategoryProps {
  initialProducts?: Product[]
  initialSubCategoryItems?: { title: string; imageSrc: string; link: string }[]
  categorySlug?: string
  initialCategoryName?: string
}

export const Category = ({ initialProducts, initialSubCategoryItems, categorySlug: slugProp, initialCategoryName }: CategoryProps) => {
  const router = useRouter();
  const categorySlug = slugProp ?? (typeof router.query.categoria === 'string' ? router.query.categoria : '');

  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts ?? []);
  const [loading, setLoading] = useState(!initialProducts);

  const [filters, setFilters] = useState<FilterState>({
    onlyInStock: false,
    checkedOptions: {},
  });

  const [sort, setSort] = useState<SortOption>('none');

  const maxPrice = useMemo(
    () => allProducts.length > 0 ? Math.ceil(Math.max(...allProducts.map(p => p.price)) / 50) * 50 : 5000,
    [allProducts],
  );

  const [price, setPrice] = useState<[number, number]>([0, maxPrice]);

  const filterDefs = useMemo(() => getAvailableFilterDefs(allProducts), [allProducts]);

  const applyNewProducts = (prods: typeof allProducts) => {
    const newMax = prods.length > 0 ? Math.ceil(Math.max(...prods.map(p => p.price)) / 50) * 50 : 5000;
    setAllProducts(prods);
    setPrice([0, newMax]);
    setFilters({ onlyInStock: false, checkedOptions: {} });
    setSort('none');
  };

  useEffect(() => {
    if (initialProducts) {
      applyNewProducts(initialProducts);
      setLoading(false);
    }
  }, [initialProducts]);

  useEffect(() => {
    if (!categorySlug || initialProducts) return;
    setLoading(true);
    getProductsByParentCategory(categorySlug)
      .then(applyNewProducts)
      .finally(() => setLoading(false));
  }, [categorySlug, initialProducts]);

  const { isInWishlist, toggleWishlist } = useWishlist();

  const categoryProducts = useMemo(
    () => applyFilters(allProducts, price, filters, sort),
    [allProducts, price, filters, sort],
  );

  const categoryLabel = initialCategoryName || allProducts[0]?.category || slugToLabel(categorySlug);

  return (
    <div className="min-h-screen bg-[#f5f5f7] lg:pb-16">
      <PageHeader
        title={categoryLabel}
        subtitle={`Esplora la nostra selezione di ${categoryLabel.toLowerCase()}`}
        description={getPageDescription(categorySlug)}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: categoryLabel },
        ]}
      />

      <SubCategoriesSection key={categorySlug} mainCategorySlug={categorySlug} initialItems={initialSubCategoryItems} />

      <section className="py-[12px] lg:py-[10px]">
        <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
          <div className="mb-[24px]">
            <div className="flex items-center justify-center lg:justify-between">
              <div className="hidden lg:block lg:w-[580px]">
                <PriceRangeBar value={price} onChange={setPrice} max={maxPrice} />
              </div>
              <div className="flex items-center gap-[8px]">
                <FilterBar
                  value={filters}
                  onChange={setFilters}
                  filterDefs={filterDefs}
                  price={price}
                  onPriceChange={setPrice}
                  maxPrice={maxPrice}
                />
                <SortSelector value={sort} onChange={setSort} />
              </div>
            </div>
            <ActiveFilterChips
              value={filters}
              onChange={setFilters}
              price={price}
              onPriceChange={setPrice}
              maxPrice={maxPrice}
            />
          </div>

          <div>
            {loading ? (
              <div className="text-center py-[80px]">
                <p className="text-[17px] text-[#6e6e73]">Caricamento prodotti...</p>
              </div>
            ) : (
              <>
                <p className="text-[12px] text-[#6e6e73] mb-[20px]">
                  {categoryProducts.length}{' '}
                  {categoryProducts.length === 1 ? 'prodotto' : 'prodotti'}
                </p>
                {categoryProducts.length === 0 ? (
                  <div className="text-center py-[80px]">
                    <p className="text-[17px] text-[#6e6e73]">
                      Nessun prodotto trovato in questa categoria.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[20px] -mx-2 lg:mx-0">
                    {categoryProducts.map((product, i) => (
                      <div key={product.id} className="h-[380px] lg:h-[520px]">
                        <ProductCard
                          product={product}
                          priority={i < 4}
                          wishlisted={isInWishlist(product.id)}
                          onWishlist={e => { e.preventDefault(); toggleWishlist(product); }}
                        />
                      </div>
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
