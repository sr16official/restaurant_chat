import type { ChatbotTableBookingInput } from '@/ai/flows/chatbot-table-booking';

export const APP_NAME = "BistroZen";

export const foodItems = [
  { 
    id: 1, 
    name: 'Seared Scallops', 
    description: 'With parsnip purée, chorizo crisp, and lemon butter.', 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'scallops seafood'
  },
  { 
    id: 2, 
    name: 'Filet Mignon', 
    description: 'Grilled to perfection, served with potato gratin and red wine reduction.', 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'steak filet mignon'
  },
  { 
    id: 3, 
    name: 'Mushroom Risotto', 
    description: 'Creamy Arborio rice with wild mushrooms and truffle oil.', 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'risotto mushroom'
  },
  { 
    id: 4, 
    name: 'Lavender Crème brûlée', 
    description: 'Classic custard dessert with a hint of lavender and caramelized sugar crust.', 
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'creme brulee dessert'
  }
];

export const heroImages = [
  { id: 'hero1', src: 'https://placehold.co/1920x1080.png', alt: 'Delicious pasta dish', dataAiHint: 'gourmet pasta' },
  { id: 'hero2', src: 'https://placehold.co/1920x1080.png', alt: 'Artfully plated seafood', dataAiHint: 'plated seafood' },
  { id: 'hero3', src: 'https://placehold.co/1920x1080.png', alt: 'Elegant dessert', dataAiHint: 'fancy dessert' },
  { id: 'hero4', src: 'https://placehold.co/1920x1080.png', alt: 'Cozy restaurant interior', dataAiHint: 'restaurant interior' },
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

export const RESTAURANT_CONTEXT = `
BistroZen is a modern European restaurant focusing on fresh, seasonal ingredients and an elegant dining experience.
Our Head Chef, Julian Everwood, is renowned for his innovative approach to classic European dishes.

Opening Hours:
- Monday to Friday: 12:00 PM to 10:00 PM (Last order at 9:30 PM)
- Saturday & Sunday: 11:00 AM to 11:00 PM (Last order at 10:30 PM)

Location: ${contactInfo.address}
Contact: Phone: ${contactInfo.phone}, Email: ${contactInfo.email}

Menu Highlights:
- Appetizers: Seared Scallops, Foie Gras Terrine, Burrata Salad.
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
