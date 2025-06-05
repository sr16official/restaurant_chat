
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image'; // Import StaticImageData if using local images, else string for URLs
import { cn } from '@/lib/utils';

interface ReviewItem {
  id: string;
  src: string; // Assuming URL strings for now
  alt: string;
  dataAiHint: string;
  text?: string; // Optional: if reviews have text
  author?: string; // Optional: if reviews have authors
}

interface ReviewCarouselProps {
  reviews?: ReviewItem[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPaused && reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isPaused, reviews]); // Depend on `reviews` itself, not just `reviews.length`

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (reviews.length === 0) {
    return (
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Guest Reviews</h2>
          <p className="text-secondary-foreground">No reviews available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          What Our Guests Say
        </h2>
        <div
          className="w-full max-w-3xl mx-auto overflow-hidden relative shadow-xl rounded-lg"
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex transition-transform ease-in-out duration-700"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0">
                <Image
                  src={review.src}
                  alt={review.alt}
                  data-ai-hint={review.dataAiHint}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover aspect-[3/2]"
                  priority={review.id === reviews[0].id}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1200px"
                />
                {/* Optional: Display review text and author if available */}
                {review.text && (
                  <div className="p-6 bg-background/80 absolute bottom-0 left-0 right-0">
                    <blockquote className="text-lg italic text-foreground">"{review.text}"</blockquote>
                    {review.author && <p className="text-right mt-2 text-sm text-muted-foreground">- {review.author}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {reviews.map((_, index) => (
              <button
                key={`dot-${index}`}
                aria-label={`Go to review ${index + 1}`}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300 ease-in-out",
                  currentIndex === index ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'
                )}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
