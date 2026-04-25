'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../data/products';

interface ExclusiveProductCardProps {
  product: Product;
  badge?: string;
  onWishlist?: (e: React.MouseEvent) => void;
  wishlisted?: boolean;
  imageSrc?: string;
  gradientColor?: string;
}

export const ExclusiveProductCard = ({ product, imageSrc, gradientColor = '#ffffff' }: ExclusiveProductCardProps) => (
  <Link
    href={`/prodotti/${product.categorySlug}/${product.subCategorySlug}/${product.slug}`}
    className="block group"
  >
    <div className="relative w-full h-[380px] lg:h-[640px] rounded-[28px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
      {/* Image */}
      <Image
        src={imageSrc ?? product.image}
        alt={product.name}
        fill
        className="lg:object-cover transition-transform duration-500"
      />

      {/* Gradient overlay: solid image bg color for bottom 60%, then transparent */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${gradientColor} 0%, ${gradientColor} 23%, transparent 60%)`,
        }}
      />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4 sm:p-5 lg:p-7">
        <p className="text-[15px] sm:text-[19px] lg:text-[24px] font-bold text-black leading-[1.2] tracking-[-0.02em] max-w-[60%]">
          {product.name}
        </p>
        <button
          onClick={e => e.preventDefault()}
          className="flex-shrink-0 bg-black group-hover:bg-neutral-800 text-white text-[13px] sm:text-[15px] lg:text-[18px] font-medium px-4 py-2.5 sm:px-5 sm:py-3 lg:px-7 lg:py-4 rounded-full transition-colors duration-200 whitespace-nowrap"
        >
          Scopri
        </button>
      </div>
    </div>
  </Link>
);
