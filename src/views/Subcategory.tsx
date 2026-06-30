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
import { getProductsBySubCategory, getCategoryName } from '../lib/medusa-data';
import { applyFilters, getAvailableFilterDefs } from '../utils/product-filters';
import { getPageDescription } from '../data/page-descriptions';
import type { Product } from '../data/products';

interface SubcategoryProps {
  initialProducts?: Product[]
  initialSubCategoryName?: string
  initialSubCategoryItems?: { title: string; imageSrc: string; link: string }[]
  categorySlug?: string
  subCategorySlug?: string
}

export const Subcategory = ({ initialProducts, initialSubCategoryName, initialSubCategoryItems, categorySlug: categorySlugProp, subCategorySlug: subCategorySlugProp }: SubcategoryProps) => {
  const router = useRouter();
  const categorySlug = categorySlugProp ?? (typeof router.query.categoria === 'string' ? router.query.categoria : '');
  const subCategorySlug = subCategorySlugProp ?? (typeof router.query.subcategoria === 'string' ? router.query.subcategoria : '');

  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts ?? []);
  const [loading, setLoading] = useState(!initialProducts);
  const [subCategoryName, setSubCategoryName] = useState(initialSubCategoryName ?? '');

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

  const applyNewProducts = (prods: typeof allProducts, name: string) => {
    const newMax = prods.length > 0 ? Math.ceil(Math.max(...prods.map(p => p.price)) / 50) * 50 : 5000;
    setAllProducts(prods);
    setSubCategoryName(name);
    setPrice([0, newMax]);
    setFilters({ onlyInStock: false, checkedOptions: {} });
    setSort('none');
  };

  useEffect(() => {
    if (initialProducts) {
      applyNewProducts(initialProducts, initialSubCategoryName ?? '');
      setLoading(false);
    }
  }, [initialProducts, initialSubCategoryName]);

  useEffect(() => {
    if (!subCategorySlug || initialProducts) return;
    setLoading(true);
    Promise.all([
      getProductsBySubCategory(subCategorySlug, categorySlug),
      getCategoryName(subCategorySlug),
    ]).then(([prods, name]) => {
      applyNewProducts(prods, name);
    }).finally(() => setLoading(false));
  }, [subCategorySlug, initialProducts]);

  const { isInWishlist, toggleWishlist } = useWishlist();

  const filteredProducts = useMemo(
    () => applyFilters(allProducts, price, filters, sort),
    [allProducts, price, filters, sort],
  );

  const subCategoryLabel = subCategoryName || allProducts[0]?.subCategory || subCategorySlug;
  const categoryLabel = allProducts[0]?.category ?? categorySlug;

  return (
    <div className="min-h-screen bg-[#f5f5f7] lg:pb-20">
      <PageHeader
        title={subCategoryLabel}
        subtitle={`Esplora la nostra selezione di ${subCategoryLabel.toLowerCase()}`}
        description={getPageDescription(subCategorySlug) ?? getPageDescription(categorySlug)}
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: categoryLabel, href: `/prodotti/${categorySlug}` },
          { label: subCategoryLabel },
        ]}
      />

      <SubCategoriesSection mainCategorySlug={categorySlug} initialItems={initialSubCategoryItems} disableItemAnimations />

      <section className="py-[32px] lg:py-[10px]">
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
