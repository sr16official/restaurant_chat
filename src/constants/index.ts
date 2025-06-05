
import type { ChatbotTableBookingInput } from '@/ai/flows/chatbot-table-booking';

export const APP_NAME = "BistroZen";

interface FoodImage {
  src: string;
  alt: string;
  dataAiHint: string;
}

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  images: FoodImage[];
}

export const foodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Gourmet Pizza',
    description: 'Artisan pizza with a medley of fresh toppings, mozzarella, and a zesty tomato sauce.',
    images: [
      {
        src: 'https://placehold.co/600x400.png',
        alt: 'Gourmet Pizza with various toppings',
        dataAiHint: 'artisan pizza toppings'
      },
      {
        src: 'https://placehold.co/600x400.png',
        alt: 'Close-up of pizza slice',
        dataAiHint: 'pizza slice cheese'
      },
       {
        src: 'https://placehold.co/600x400.png',
        alt: 'Pizza as part of a food spread',
        dataAiHint: 'pizza food spread'
      }
    ],
  },
  {
    id: 2,
    name: 'Spaghetti with Garlic Bread',
    description: 'Classic spaghetti tossed in a rich tomato and herb sauce, served with a side of crispy garlic bread.',
    images: [{
      src: 'https://placehold.co/600x400.png',
      alt: 'Plate of spaghetti with garlic bread',
      dataAiHint: 'spaghetti garlic bread'
    }],
  },
  {
    id: 3,
    name: 'Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and truffle oil.',
    images: [{
      src: 'https://placehold.co/600x400.png',
      alt: 'Mushroom Risotto',
      dataAiHint: 'risotto mushroom'
    }],
  },
  {
    id: 4,
    name: 'Lavender Crème brûlée',
    description: 'Classic custard dessert with a hint of lavender and caramelized sugar crust.',
    images: [{
      src: 'https://placehold.co/600x400.png',
      alt: 'Lavender Crème brûlée',
      dataAiHint: 'creme brulee dessert'
    }],
  }
];

export const heroImages = [
  { id: 'hero1', src: 'https://placehold.co/1920x1080.png', alt: 'Delicious pasta dish', dataAiHint: 'gourmet pasta' },
  { id: 'hero2', src: 'https://placehold.co/1920x1080.png', alt: 'Artfully plated seafood', dataAiHint: 'plated seafood' },
  { id: 'hero3', src: 'https://placehold.co/1920x1080.png', alt: 'Elegant dessert', dataAiHint: 'fancy dessert' },
  { id: 'hero4', src: 'https://placehold.co/1920x1080.png', alt: 'Cozy restaurant interior', dataAiHint: 'restaurant interior' },
  { id: 'hero5', src: 'https://placehold.co/1920x1080.png', alt: 'Elegant interior of BistroZen with warm lighting and booth seating', dataAiHint: 'restaurant interior lighting' },
];

export const contactInfo = {
  address: "123 Foodie Lane, Gourmet City, FS 45678",
  phone: "(123) 456-7890",
  email: "info@bistrozen.com",
  openingHours: [
    { day: "Monday - Friday", hours: "12:00 PM - 10:00 PM" },
    { day: "Saturday - Sunday", hours: "11:00 AM - 11:00 PM" },
  ]
};

export const reviewImages = [
  { id: 'review1', src: 'https://placehold.co/1200x800.png', alt: 'Happy customers dining', dataAiHint: 'happy customers restaurant' },
  { id: 'review2', src: 'https://placehold.co/1200x800.png', alt: 'A beautifully presented dish', dataAiHint: 'plated dish review' },
  { id: 'review3', src: 'https://placehold.co/1200x800.png', alt: 'Restaurant exterior at night', dataAiHint: 'restaurant exterior night' },
  { id: 'review4', src: 'https://placehold.co/1200x800.png', alt: 'Smiling chef in kitchen', dataAiHint: 'chef kitchen smiling' },
];


export const RESTAURANT_CONTEXT = `
BistroZen is a modern European restaurant focusing on fresh, seasonal ingredients and an elegant dining experience.
Our Head Chef, Julian Everwood, is renowned for his innovative approach to classic European dishes.

Opening Hours:
- Monday to Friday: 12:00 PM to 10:00 PM (Last order at 9:30 PM)
- Saturday & Sunday: 11:00 AM to 11:00 PM (Last order at 10:30 PM)

Location: ${contactInfo.address}
Contact: Phone: ${contactInfo.phone}, Email: ${contactInfo.email}

Menu Highlights:
- Appetizers: Gourmet Pizza, Foie Gras Terrine, Burrata Salad.
- Main Courses: Filet Mignon, Pan-Seared Duck Breast, Mushroom Risotto, Catch of the Day.
- Desserts: Lavender Crème brûlée, Chocolate Marquise, Artisan Cheese Platter.

Dietary Information:
- We offer a variety of vegetarian, vegan, and gluten-free options. Please inform your server of any allergies or dietary restrictions.
- Our kitchen handles nuts, dairy, gluten, and other allergens. While we take precautions, cross-contamination is possible.

Amenities:
- Full bar with artisanal cocktails, extensive wine list, and craft beers.
- Private dining room available for up to 20 guests (reservations required).
- Outdoor patio seating (seasonal, weather permitting).
- Wheelchair accessible.

Reservations:
- Highly recommended, especially on weekends.
- Can be made via our chatbot, by phone, or through our website (once booking page is live).
- For parties larger than 8, please call us directly.

Parking:
- Street parking is available.
- Valet parking available on Friday and Saturday evenings from 6 PM.

Dress Code: Smart casual.

Atmosphere: Elegant yet relaxed, perfect for special occasions, business dinners, or a sophisticated night out.
We do not allow pets, except for certified service animals.
`;

export type BookingField = keyof Omit<ChatbotTableBookingInput, 'context'>;
export type BookingState =
  | 'idle'
  | 'collectingName'
  | 'collectingPhone'
  | 'collectingDate'
  | 'collectingTime'
  | 'collectingPartySize'
  | 'confirmingBooking';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: Date;
}

export type { FoodImage };
