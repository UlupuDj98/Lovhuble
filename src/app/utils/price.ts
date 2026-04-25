import { products } from '../data/products';

export function maxPriceForCategory(categorySlug: string): number {
  const prices = products
    .filter(p => p.categorySlug === categorySlug)
    .map(p => p.price);
  return prices.length > 0 ? Math.ceil(Math.max(...prices) / 50) * 50 : 5000;
}

export function maxPriceForSubCategory(subCategorySlug: string): number {
  const prices = products
    .filter(p => p.subCategorySlug === subCategorySlug)
    .map(p => p.price);
  return prices.length > 0 ? Math.ceil(Math.max(...prices) / 50) * 50 : 5000;
}
