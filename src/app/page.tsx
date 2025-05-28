import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import FoodShowcaseSection from '@/components/sections/FoodShowcaseSection';
import AmbienceSection from '@/components/sections/AmbienceSection';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FoodShowcaseSection />
        <AmbienceSection />
        {/* Other sections can be added here */}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
