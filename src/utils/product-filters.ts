import type { Product } from '../data/products';
import type { FilterState } from '../components/product/FilterBar';

export type SortOption = 'none' | 'rating' | 'newest' | 'price_asc' | 'price_desc';

export interface FilterDef {
  key: string;
  label: string;
  options?: string[];
}

export function getAvailableFilterDefs(products: Product[]): FilterDef[] {
  if (products.length === 0) return [{ key: 'disponibilita', label: 'Disponibilità' }];

  const defs: FilterDef[] = [];

  // Option-based filters (e.g. Stimolazione from product.options[])
  const optionMap = new Map<string, Set<string>>();
  for (const p of products) {
    for (const opt of p.options ?? []) {
      const key = opt.title.toLowerCase();
      if (!optionMap.has(key)) optionMap.set(key, new Set());
      opt.values.forEach(v => optionMap.get(key)!.add(v));
    }
  }

  const stimValues = optionMap.get('stimolazione');
  if (stimValues && stimValues.size > 0) {
    defs.push({ key: 'stimolazione', label: 'Stimolazione', options: [...stimValues] });
  }

  if (products.some(p => p.length != null)) {
    defs.push({ key: 'lunghezza', label: 'Lunghezza', options: ['< 15 cm', '15–20 cm', '> 20 cm'] });
  }

  if (products.some(p => p.width != null)) {
    defs.push({ key: 'diametro', label: 'Diametro', options: ['< 3 cm', '3–4 cm', '> 4 cm'] });
  }

  const materials = [...new Set(products.filter(p => p.material).map(p => p.material!))];
  if (materials.length > 0) {
    defs.push({ key: 'materiale', label: 'Materiale', options: materials });
  }

  defs.push({ key: 'disponibilita', label: 'Disponibilità' });

  return defs;
}

export function applyFilters(
  products: Product[],
  price: [number, number],
  filters: FilterState,
  sort: SortOption = 'rating',
): Product[] {
  let list = products.filter(p => p.price >= price[0] && p.price <= price[1]);
  if (filters.onlyInStock) list = list.filter(p => p.inStock);

  for (const [key, selected] of Object.entries(filters.checkedOptions)) {
    if (!selected.length) continue;
    if (key === 'materiale') {
      list = list.filter(p => selected.some(s => p.material?.toLowerCase() === s.toLowerCase()));
    } else if (key === 'lunghezza') {
      list = list.filter(p => p.length != null && selected.some(s =>
        s === '< 15 cm'  ? p.length! < 15 :
        s === '15–20 cm' ? p.length! >= 15 && p.length! <= 20 :
        s === '> 20 cm'  ? p.length! > 20 : false
      ));
    } else if (key === 'diametro') {
      list = list.filter(p => p.width != null && selected.some(s =>
        s === '< 3 cm' ? p.width! < 3 :
        s === '3–4 cm' ? p.width! >= 3 && p.width! <= 4 :
        s === '> 4 cm' ? p.width! > 4 : false
      ));
    } else {
      // Generic: match against product options (e.g. stimolazione)
      list = list.filter(p => {
        const vals = p.options?.find(o => o.title.toLowerCase() === key)?.values ?? [];
        return selected.some(s => vals.some(v => v.toLowerCase() === s.toLowerCase()));
      });
    }
  }

  if (sort === 'price_asc')  return [...list].sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') return [...list].sort((a, b) => b.price - a.price);
  return list;
}
