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
  material?: string;
  height?: number;
  width?: number;
  length?: number;
  weight?: number;
  options?: ProductOption[];
  variants?: ProductVariant[];
}
