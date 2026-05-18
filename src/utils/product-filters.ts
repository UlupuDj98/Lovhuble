import type { Product } from '../data/products';
import type { FilterState } from '../components/product/FilterBar';

export function applyFilters(products: Product[], price: [number, number], filters: FilterState): Product[] {
  let list = products.filter(p => p.price >= price[0] && p.price <= price[1]);
  if (filters.onlyInStock) list = list.filter(p => p.inStock);
  for (const [key, selected] of Object.entries(filters.checkedOptions)) {
    if (!selected.length) continue;
    if (key === 'materiale') {
      list = list.filter(p => selected.some(s => p.material?.toLowerCase() === s.toLowerCase()));
    } else if (key === 'lunghezza') {
      list = list.filter(p => p.length != null && selected.some(s =>
        s === '< 15 cm' ? p.length! < 15 :
        s === '15–20 cm' ? p.length! >= 15 && p.length! <= 20 :
        s === '> 20 cm' ? p.length! > 20 : false
      ));
    } else if (key === 'diametro') {
      list = list.filter(p => p.width != null && selected.some(s =>
        s === '< 3 cm' ? p.width! < 3 :
        s === '3–4 cm' ? p.width! >= 3 && p.width! <= 4 :
        s === '> 4 cm' ? p.width! > 4 : false
      ));
    }
  }
  return list;
}
