
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import FoodShowcaseSection from '@/components/sections/FoodShowcaseSection';
import AmbienceSection from '@/components/sections/AmbienceSection';
import Footer from '@/components/layout/Footer';
import ReviewCarousel from '@/components/sections/ReviewCarousel';
import Chatbot from '@/components/chatbot/Chatbot';
import { reviewImages } from '@/constants';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FoodShowcaseSection />
        <AmbienceSection />
        <ReviewCarousel reviews={reviewImages} /> {/* Pass reviewImages to the carousel */}
        {/* Other sections can be added here */}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
