import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { motion } from "motion/react";
import { PortableText } from "@portabletext/react";
import { BlogRecommendedCards } from "../components/blog/BlogRecommendedCards";
import { BlogRequestForm } from "../components/blog/BlogRequestForm";
import { BlogPost } from "@/lib/sanity/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lovehuble.com";

interface BlogPostPageProps {
  post: BlogPost;
  allPosts: BlogPost[];
}

export default function BlogPostPage({ post, allPosts }: BlogPostPageProps) {
  const [copied, setCopied] = useState(false);
  const description = post.excerpt ?? `Leggi "${post.title}" su Lovehuble — Note di benessere.`;

  const handleShare = async () => {
    const url = `${siteUrl}/blog/${post.id}`;
    if (navigator.share) {
      await navigator.share({ title: post.title, text: description, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: post.coverImage ?? undefined,
    datePublished: post.date ?? undefined,
    author: { "@type": "Person", name: post.author ?? "Lovehuble" },
    publisher: {
      "@type": "Organization",
      name: "Lovehuble",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo-retail.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.id}` },
  };

  return (
    <>
      <Head>
        <title>{post.title} | Lovehuble</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
        <link rel="canonical" href={`${siteUrl}/blog/${post.id}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
        />
      </Head>

      <article className="min-h-screen mx-auto bg-[#f5f5f7] text-[#86868b] mt-[92px] sm:mt-[100px] lg:mt-[112px]">

        {/* Cover image header */}
        <div className="relative h-[220px] sm:h-[280px] lg:h-[340px] overflow-hidden">
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/80" />
          <motion.div
            initial={{ x: -8 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-[24px] sm:top-[35px] lg:top-[50px] left-4 sm:left-6 lg:left-8 z-10"
          >
            <Link href="/blog">
              <span className="inline-flex items-center gap-[6px] bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white text-[12px] sm:text-[13px] lg:text-[15px] font-medium px-[10px] sm:px-[12px] py-[5px] sm:py-[6px] rounded-full">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Torna agli articoli
              </span>
            </Link>
          </motion.div>
        </div>

        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14 lg:py-16">

          <header className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            {post.category && (
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="h-[1px] w-5 sm:w-6 bg-[#d4a5a5]" />
                <span className="text-[#d4a5a5] text-[12px] sm:text-[14px] lg:text-[16px] uppercase tracking-widest font-bold">
                  {post.category}
                </span>
              </div>
            )}
            <h1 className="text-[22px] sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-2 sm:mb-3 text-black">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-[14px] sm:text-base lg:text-lg text-[#717182] mb-3 sm:mb-4 leading-[1.5]">{post.subtitle}</p>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[11px] sm:text-xs lg:text-sm text-[#717182]">
              {post.author && <span>Di {post.author}</span>}
              {post.author && post.date && <span className="hidden sm:inline">•</span>}
              {post.date && (
                <span>
                  {new Date(post.date).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              {post.readTime && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{post.readTime} di lettura</span>
                </>
              )}
            </div>
          </header>

          <div className="max-w-none space-y-4 sm:space-y-5 md:space-y-6 text-[14px] sm:text-base md:text-lg">
            {post.body && post.body.length > 0 ? (
              <PortableText
                value={post.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-black font-light leading-relaxed">{children}</p>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-[18px] sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mt-6 sm:mt-8 mb-3 sm:mb-4">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-[16px] sm:text-lg md:text-xl lg:text-2xl font-bold text-black mt-5 sm:mt-6 mb-2 sm:mb-3">{children}</h3>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="text-[14px] sm:text-lg lg:text-xl text-black leading-relaxed italic border-l-4 border-[#D4A5A5] pl-4 sm:pl-6 my-4 sm:my-6">
                        {children}
                      </blockquote>
                    ),
                  },
                }}
              />
            ) : post.excerpt ? (
              <p className="text-[#a3a3a3] font-light leading-relaxed">{post.excerpt}</p>
            ) : (
              <p className="text-[#a3a3a3] italic">Contenuto non ancora disponibile.</p>
            )}
          </div>

          <footer className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 pt-5 sm:pt-8 border-t border-[#e5e5e5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="text-[11px] sm:text-xs uppercase tracking-widest text-[#a3a3a3] hover:text-[#D4A5A5] transition-colors"
              >
                {copied ? "Link copiato!" : "Condividi"}
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-[#717182]">© 2026 Lovehuble</p>
          </footer>

          <BlogRecommendedCards currentPostId={post.id} allPosts={allPosts} />

          <BlogRequestForm />

        </div>
      </article>
    </>
  );
}
