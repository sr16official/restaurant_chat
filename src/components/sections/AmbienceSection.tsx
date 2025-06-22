
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Keep one import for Image
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ambienceImages = [
  {
    id: 'ambience1',
    src: '/images/the_chatter_house_vibe1.jpg.webp',
    alt: 'Warm and inviting interior of The Chatter House restaurant',
    dataAiHint: 'restaurant interior cozy dining',
  },

  {
    id: 'ambience4',
    src: '/images/ambeince_4.jpg',
    alt: 'Bartenders at the The Chatter Houseer House bar area',
    dataAiHint: 'bartenders bar',
  },
  {
    id: 'ambience5',
    src: '/images/ambeince_5.jpg',
    alt: 'Outdoor seating area with plants and string lights',
    dataAiHint: 'outdoor seating patio lights plants',
  },
  {
    id: 'ambience6',
    src: '/images/the_chatter_house_vibe3.webp',
    alt: 'Close-up of table setting with cutlery and glassware',
    dataAiHint: 'table setting cutlery glassware',
  },
  

];

export default function AmbienceSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startAutoslide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === ambienceImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
  };

  const stopAutoslide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    // Start autoslide when the component mounts
    startAutoslide();

    // Clear the interval when the component unmounts
    return () => {
      stopAutoslide();
    };
  }, []); // Empty dependency array means this effect runs only once on mount and cleanup on unmount

  // Pause/Resume autoslide on hover
  // (Handled by adding onMouseEnter and onMouseLeave to the container div)


  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? ambienceImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === ambienceImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="ambience" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary">
              Our Ambience
            </h2>
            <p className="text-lg text-secondary-foreground leading-relaxed">
              Step into a realm of warmth and sophistication at The Chatter House. Our carefully curated decor blends modern elegance with cozy charm, creating an inviting atmosphere perfect for any occasion.
            </p>
            <p className="text-lg text-secondary-foreground leading-relaxed">
              Whether it's an intimate dinner, a celebratory gathering, or a casual rendezvous, our space is designed to make you feel right at home, yet transported to a world of culinary delight. Soft lighting, comfortable seating, and tasteful art pieces complete the experience.
            </p>
          </div>

          <div
            className="relative w-3/4 aspect-[3/4] rounded-lg overflow-hidden shadow-2xl group"
            onMouseEnter={stopAutoslide}
            onMouseLeave={startAutoslide}
            ref={containerRef}
          >

            {ambienceImages.map((image, index) => (
              <Image
                key={image.id}
                src={image.src}
                alt={image.alt}
                data-ai-hint={image.dataAiHint}
                fill
                className={cn(
                  "object-cover transition-opacity duration-700 ease-in-out",
                  index === currentImageIndex ? "opacity-100 z-0" : "opacity-0"
                )}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-7 w-7" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="h-7 w-7" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
              {ambienceImages.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={cn(
                    "h-3 w-3 rounded-full transition-all duration-300 ease-in-out",
                    index === currentImageIndex ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
