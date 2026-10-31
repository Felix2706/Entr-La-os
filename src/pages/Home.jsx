import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoriesSection from '../components/home/CategoriesSection';
import PersonalizerBanner from '../components/home/PersonalizerBanner';
import TestimonialsSection from '../components/home/TestimonialsSection';
import InstagramBanner from '../components/home/InstagramBanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <PersonalizerBanner />
      <TestimonialsSection />
      <InstagramBanner />
    </>
  );
}
