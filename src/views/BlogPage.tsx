import Head from "next/head";
import { BlogGrid } from "../components/blog/BlogGrid";
import { BlogRequestForm } from "../components/blog/BlogRequestForm";
import { BlogPost } from "@/lib/sanity/types";

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <>
      <Head>
        <title>Blog | Lovehuble</title>
        <meta name="description" content="Articoli e guide su benessere, sessualità e relazioni. Scopri i consigli di Lovehuble per vivere al meglio la tua intimità." />
        <meta property="og:title" content="Blog | Lovehuble" />
        <meta property="og:description" content="Articoli e guide su benessere, sessualità e relazioni. Scopri i consigli di Lovehuble per vivere al meglio la tua intimità." />
        <meta property="og:type" content="website" />
      </Head>
    <div className="min-h-screen bg-[#f5f5f7] text-[#86868b] mt-[80px] sm:mt-[100px] lg:mt-[112px]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-[28px] sm:text-[38px] md:text-[48px] lg:text-[60px] font-semibold text-black mb-10 sm:mb-12 lg:mb-20 leading-[1.1]">Il nostro Blog. <span className="text-[#86868B] font-normal">Scopri gli ultimi articoli e consigli sul benessere e la sessualità.</span></h1>
        <BlogGrid posts={posts} />
        <BlogRequestForm />
      </div>
    </div>
    </>
  );
}
