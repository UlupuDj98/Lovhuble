'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../data/products';
import { ProductRating } from './ProductRating';

interface ProductCardProps {
  product: Product;
  badge?: string;
  onWishlist?: (e: React.MouseEvent) => void;
  wishlisted?: boolean;
  imageSrc?: string;
}

export const ProductCard = ({ product, onWishlist, wishlisted, imageSrc }: ProductCardProps) => (
   
  <Link href={`/prodotti/${product.categorySlug}/${product.subCategorySlug}/${product.slug}`} className="block group h-full">
    <div className="bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative flex-1 min-h-0">
        <Image
          src={imageSrc ?? product.image}
          alt={product.name}
          fill
          className="object-contain p-[10px] lg:p-[20px] group-hover:scale-105 transition-transform duration-300"
        />

        <button
          aria-label="Aggiungi ai preferiti"
          onClick={onWishlist ?? (e => e.preventDefault())}
          className={`absolute top-[14px] right-[14px] w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.12)] flex items-center justify-center hover:scale-110 transition-transform duration-200 z-10 ${
            wishlisted ? 'bg-[#d4a5a5]' : 'bg-black'
          }`}
        >
          <Heart
            className={`w-[15px] h-[15px] lg:w-[22px] lg:h-[22px] ${wishlisted ? 'text-white' : 'text-white'}`}
            fill={wishlisted ? 'currentColor' : 'none'}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex-shrink-0 px-[14px] pb-[24px] pt-[4px] lg:px-[20px] lg:pb-[20px] text-center">
        <div className="mb-[8px] lg:mb-[12px]">
          <ProductRating />
        </div>
        <p className="text-[10px] lg:text-[14px]  text-[#1d1d1f] mb-[4px] lg:mb-[10px] leading-[1.3] tracking-[-0.003em]">
          {product.subCategory}
        </p>

        <p className="text-[14px] lg:text-[20px] font-semibold text-[#1d1d1f] mb-[10px] lg:mb-[20px] leading-[1.3] tracking-[-0.003em]">
          {product.name}
        </p>
        <div className="gap-[6px] lg:gap-[8px]">
          <span className="text-[16px] lg:text-[22px] font-semibold text-[#1d1d1f] text-center">€{product.price}</span>
        </div>
      </div>
    </div>
  </Link>
  
);
