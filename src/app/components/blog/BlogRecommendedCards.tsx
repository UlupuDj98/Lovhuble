"use client";

import { BlogCard } from "./BlogCard";
import { BlogPost } from "@/app/lib/sanity/types";

interface BlogRecommendedCardsProps {
  currentPostId: string;
  allPosts: BlogPost[];
}

export function BlogRecommendedCards({ currentPostId, allPosts }: BlogRecommendedCardsProps) {
  // Filtra i post escludendo quello corrente e prendi i primi 3
  const recommendedPosts = allPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, 4);

  if (recommendedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 sm:mt-20 md:mt-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d4a5a5] mb-8 sm:mb-10 md:mb-12">
        Articoli Consigliati
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {recommendedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
