
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function AmbienceSection() {
  return (
    <section id="ambience" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Our Ambience
            </h2>
            <p className="text-lg text-secondary-foreground mb-4">
              Step into a realm of warmth and sophistication at BistroZen. Our carefully curated decor blends modern elegance with cozy charm, creating an inviting atmosphere perfect for any occasion.
            </p>
            <p className="text-lg text-secondary-foreground">
              Whether it's an intimate dinner, a celebratory gathering, or a casual rendezvous, our space is designed to make you feel right at home, yet transported to a world of culinary delight. Soft lighting, comfortable seating, and tasteful art pieces complete the experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"> {/* Adjusted grid for images */}
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="https://placehold.co/1200x900.png"
                    alt="Warm and inviting interior of BistroZen restaurant"
                    data-ai-hint="restaurant interior cozy dining"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="https://placehold.co/1200x900.png"
                    alt="Elegant dining area with wooden tables and ambient lighting"
                    data-ai-hint="restaurant tables elegant lighting"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden shadow-xl sm:col-span-2 md:col-span-1"> {/* Third image, adjusted to fit grid. Can be md:col-span-1 to make it same size as others on medium screens or sm:col-span-2 to make it full width on small screens under the first two. Let's try md:col-span-1 to keep it consistent with the others in a 2-column setup for images on md+ screens */}
              <CardContent className="p-0">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="https://placehold.co/1200x900.png"
                    alt="Detailed view of restaurant decor with shelving and ambient lighting"
                    data-ai-hint="restaurant decor shelves"
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
