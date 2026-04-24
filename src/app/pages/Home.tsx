import { Hero } from '../components/home/Hero';
import { MiniSocialProof } from '../components/home/MiniSocialProof';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { Faq } from '../components/home/Faq';

export const Home = () => (
  <div className="pt-[68px] lg:pt-[80px] bg-[#f5f5f7]">
    <Hero />
    <MiniSocialProof />
    <CategoriesSection />
    <FeaturedProducts />
    <ReviewsSection />
    <Faq />
  </div>
);
