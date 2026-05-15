import { Hero } from '../components/home/Hero';
import { MiniSocialProof } from '../components/home/MiniSocialProof';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { Faq } from '../components/home/Faq';
import { Novita } from '../components/home/Novita';
import { Esclusive } from '../components/home/Esclusive';
import PromoBanner from '../components/home/PromoBanner';
import { BlogCarouselPreview } from '../components/blog/BlogCarouselPreview';
import type { Product } from '../data/products';
import type { BlogPost } from '../lib/sanity/types';

interface HomeProps {
  initialCategories?: { title: string; imageSrc: string; link: string }[];
  initialFeatured?: Product[];
  initialNovita?: Product[];
  initialEsclusive?: Product[];
  initialBlogPosts?: BlogPost[];
}

export const Home = ({ initialCategories, initialFeatured, initialNovita, initialEsclusive, initialBlogPosts }: HomeProps) => (
  <div className="pt-[68px] lg:pt-[80px] bg-[#f5f5f7]">
    <Hero />
    <MiniSocialProof />
    <CategoriesSection initialItems={initialCategories} />
    <PromoBanner />
    <FeaturedProducts initialProducts={initialFeatured} />
    <Esclusive initialProducts={initialEsclusive} />
    <Novita initialProducts={initialNovita} />
    <ReviewsSection />
    <BlogCarouselPreview initialPosts={initialBlogPosts} />
    <Faq />
  </div>
);
