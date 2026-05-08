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

export interface Product {
  id: string;
  name: string;
  slug: string;
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
}
