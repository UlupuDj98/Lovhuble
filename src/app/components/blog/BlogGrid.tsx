"use client";

import { useState } from "react";
import { BlogCard } from "./BlogCard";
import { BlogPost } from "@/app/lib/sanity/types";

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [displayLimit, setDisplayLimit] = useState<number>(6);
  const displayedPosts = posts.slice(0, displayLimit);
  const hasMorePosts = displayLimit < posts.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {displayedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {hasMorePosts && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setDisplayLimit((prev) => prev + 6)}
            className="px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
            style={{ background: "linear-gradient(to right, #7A1F3D, #5e182f)", color: "#FFFFFF" }}
          >
            Vedi altro
          </button>
        </div>
      )}
    </>
  );
}
