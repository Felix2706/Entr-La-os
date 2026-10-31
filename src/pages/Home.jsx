import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoriesSection from '../components/home/CategoriesSection';
import PersonalizerBanner from '../components/home/PersonalizerBanner';
import TestimonialsSection from '../components/home/TestimonialsSection';
import InstagramBanner from '../components/home/InstagramBanner';
import RibbonDivider from '../components/shared/RibbonDivider';

export default function Home() {
  return (
    <>
      <HeroSection />
      <RibbonDivider className="-my-4 relative z-20" />
      <FeaturedProducts />
      <RibbonDivider className="my-2 opacity-70" />
      <CategoriesSection />
      <RibbonDivider className="my-2 opacity-50" />
      <PersonalizerBanner />
      <TestimonialsSection />
      <InstagramBanner />
    </>
  );
}
