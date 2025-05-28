
import Image from 'next/image';
import { foodItems } from '@/constants';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FoodShowcaseSection() {
  return (
    <section id="food-showcase" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Taste Our Creations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {foodItems.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              {item.images && item.images.length > 0 && (
                <div className="relative w-full h-60">
                  <Image
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    data-ai-hint={item.images[0].dataAiHint}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
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
