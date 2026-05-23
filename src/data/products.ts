export interface Category {
  name: string;
  slug: string;
  image: string;
}

export interface SubCategory {
  name: string;
  slug: string;
  parentSlug: string;
  image: string;
}

export interface ProductOption {
  title: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  options: Record<string, string>;
  price: number;
  weight?: number | null;
  height?: number | null;
  width?: number | null;
  length?: number | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  subCategory: string;
  subCategorySlug: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  exclusive?: boolean;
  variantId?: string;
  material?: string | null;
  height?: number | null;
  width?: number | null;
  length?: number | null;
  weight?: number | null;
  options?: ProductOption[] | null;
  variants?: ProductVariant[] | null;
}
