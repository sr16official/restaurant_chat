'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { foodItems, type FoodImage } from '@/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodItemImageSliderProps {
  images: FoodImage[];
  itemName: string;
}

function FoodItemImageSlider({ images, itemName }: FoodItemImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-60 bg-secondary flex items-center justify-center text-muted-foreground">
        No image available
      </div>
    );
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click or other underlying events
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className="relative w-full h-60 group overflow-hidden">
      <Image
        src={currentImage.src}
        alt={`${itemName} - ${currentImage.alt}`}
        data-ai-hint={currentImage.dataAiHint}
        fill
        className="object-cover transition-opacity duration-300 ease-in-out"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        priority={currentImageIndex === 0}
      />
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={`Previous image for ${itemName}`}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={`Next image for ${itemName}`}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, index) => (
              <button
                key={`dot-${itemName}-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                aria-label={`Go to image ${index + 1} for ${itemName}`}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300 ease-in-out",
                  index === currentImageIndex ? 'bg-primary scale-110' : 'bg-white/60 hover:bg-white/90'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FoodShowcaseSection() {
  return (
    <section id="food-showcase" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Taste Our Creations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {foodItems
            .filter(item => !item.hiddenOnMain)
            .map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <FoodItemImageSlider images={item.images} itemName={item.name} />
                <CardHeader>
                  <CardTitle className="text-2xl">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
