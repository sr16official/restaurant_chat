'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { heroImages, APP_NAME } from '@/constants';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('food-showcase');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[calc(100vh-88px)] min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      {heroImages.map((image, index) => (
        <Image
          key={image.id}
          src={image.src}
          alt={image.alt}
          data-ai-hint={image.dataAiHint}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animation: index === currentImageIndex ? `fadeInOut 5s infinite` : 'none' }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
      <div className="relative z-10 p-4">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-fadeInUp">
          Welcome to {APP_NAME}
        </h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-300">
          Discover an unforgettable culinary journey with our exquisite European dishes.
        </p>
        <Button 
          size="lg" 
          onClick={scrollToMenu} 
          className="animate-fadeInUp animation-delay-600 bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label="View Our Menu"
        >
          View Our Menu <ChevronDown className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
