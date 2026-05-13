'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/app/lib/sanity/types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <Link href={`/blog/${post.id}`} className="block group h-full w-[90%] sm:w-full mx-auto">
    <div className="flex flex-col rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] overflow-hidden bg-white transition-all duration-300 h-[340px] sm:h-[420px] md:h-[450px] lg:h-[620px] border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      {/* IMAGE HALF */}
      <div className="relative h-[45%] w-full overflow-hidden bg-white">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/* TEXT HALF */}
      <div className="h-[55%] px-3 sm:px-4 md:px-5 lg:px-6 flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-2 lg:space-y-4 text-center">
        <h3 className="text-[15px] sm:text-[18px] md:text-[19px] lg:text-[30px] font-bold text-black leading-[1.1] tracking-[-0.03em]">
          {post.title}
        </h3>

        <p className="text-[11px] sm:text-[13px] md:text-[14px] lg:text-[17px] text-gray-600 leading-[1.5]">
          {post.subtitle}
        </p>

        <p className="text-[11px] sm:text-[13px] md:text-sm lg:text-md text-gray-500">
          {post.author}
        </p>

        <div className="h-px bg-[#1d1d1f]/20"></div>
        <span className="inline-block text-black text-[13px] sm:text-[15px] md:text-[17px] lg:text-xl font-semibold underline mt-1 sm:mt-2">
          Leggi l&apos;articolo completo
        </span>
      </div>

    </div>
  </Link>
);
