import type { ChatbotTableBookingInput } from '@/app/api/table-booking/route';
export const APP_NAME = "The Chatter House";

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
  hiddenOnMain?: boolean;
}

// Reservation-related types and interfaces
export interface ReservationInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  reservationDate: string;
  reservationTime: string;
  partySize: number;
  specialRequests?: string;
}

export interface Reservation extends ReservationInput {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'| 'no-show';
  confirmationCode: string;
  createdAt: Date;
  updatedAt: Date;
  adminNotes?: string;
}

// Quick Links Configuration
export interface QuickLink {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string; // Lucide icon name
  color: string;
  isExternal?: boolean;
}

export const quickLinks: QuickLink[] = [
  {
    id: 'reservations',
    title: 'Make a Reservation',
    description: 'Book your table instantly',
    href: '/reservations',
    icon: 'Calendar',
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'menu',
    title: 'View Menu',
    description: 'Explore our delicious offerings',
    href: '#menu',
    icon: 'BookOpen',
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'contact',
    title: 'Contact Us',
    description: 'Get in touch with our team',
    href: '#contact',
    icon: 'Phone',
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    id: 'delivery',
    title: 'Order Online',
    description: 'Food delivery to your door',
    href: '#delivery',
    icon: 'Truck',
    color: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 'reviews',
    title: 'Customer Reviews',
    description: 'See what others are saying',
    href: '#reviews',
    icon: 'Star',
    color: 'bg-yellow-500 hover:bg-yellow-600'
  },
  {
    id: 'gallery',
    title: 'Photo Gallery',
    description: 'Browse our restaurant photos',
    href: '#gallery',
    icon: 'Camera',
    color: 'bg-pink-500 hover:bg-pink-600'
  }
];

export const foodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Gourmet Pizza',
    description: 'Artisan pizza with a medley of fresh toppings, mozzarella, and a zesty tomato sauce.',
    images: [
      {
        src: '/images/pinar-kucuk-Ae7jQFDTPk4-unsplash.jpg',
        alt: 'Gourmet Pizza with various toppings',
        dataAiHint: 'artisan pizza toppings'
      },
      {
        src: '/images/shourav-sheikh-a66sGfOnnqQ-unsplash.jpg',
        alt: 'Close-up of pizza slice',
        dataAiHint: 'pizza slice cheese'
      },
       {
        src: '/images/saundarya-srinivasan-60nzTP7_hMQ-unsplash.jpg',
        alt: 'Pizza as part of a food spread',
        dataAiHint: 'pizza food spread'
      }
    ],
  },
  {
    id: 2,
    name: 'Spaghetti',
    description: 'Classic spaghetti tossed in a rich tomato and herb sauce, served with a side of crispy garlic bread.',
    images: [{
      src: '/images/sphagetti_2.jpg',
      alt: 'Plate of spaghetti with garlic bread',
      dataAiHint: 'spaghetti garlic bread'
    },
    {
      src: '/images/sphagetti.jpg',
      alt: 'Plate of spaghetti with garlic bread',
      dataAiHint: 'spaghetti garlic bread'
    },
    {
      src: '/images/pasta_spaghetti.jpg',
      alt: 'Plate of spaghetti with garlic bread',
      dataAiHint: 'spaghetti garlic bread'
    }
    ],
  },
  {
    id: 3,
    name: 'Mushroom Risotto',
    description: 'Creamy Arborio rice with wild mushrooms and truffle oil.',
    images: [{
      src: '/images/mushroom_rissoto_1.jpg',
      alt: 'Mushroom Risotto',
      dataAiHint: 'risotto mushroom'
    },
   {
      src: '/images/mushroom_rissoto_2.jpg',
      alt: 'Mushroom Risotto',
      dataAiHint: 'risotto mushroom'
    },
    {
      src: '/images/mushroom_rissoto_3.jpg',
      alt: 'Mushroom Risotto',
      dataAiHint: 'risotto mushroom'
    }],
  },
  {
    id: 4,
    name: 'Charred Chicken',
    description: 'Perfectly grilled chicken with aromatic herbs and a delicious side of seasonal vegetables.',
    images: [{
      src: '/images/chicken.jpg',
      alt: 'Charred Chicken with herbs and vegetables',
      dataAiHint: 'grilled chicken herbs vegetables'
    }],
  },
  {
    id: 5,
    name: 'Butter Chicken',
    description: 'Delicious butter chichken.',
    images: [{
      src: '/images/butter chicken/perspective-studio-zRZxs9tDha0-unsplash.jpg',
      alt: 'Charred Chicken with herbs and vegetables',
      dataAiHint: 'grilled chicken herbs vegetables'
    },
    {
      src: '/images/butter chicken/raman-sqcH2q7lkvo-unsplash.jpg',
      alt: 'butter chicken',
      dataAiHint: 'Butter Chicken'
    }
  ],
  },
  {
    id: 6,
    name: 'Thai Curry',
    description: 'Perfectly grilled chicken with aromatic herbs and a delicious side of seasonal vegetables.',
    images: [{
      src: '/images/Thai_curry/thai curry 2.jpg',
      alt: 'Charred Chicken with herbs and vegetables',
      dataAiHint: 'grilled chicken herbs vegetables'
    },
  {
      src: '/images/Thai_curry/thai curry.jpg',
      alt: 'butter chicken',
      dataAiHint: 'Butter Chicken'
    }],
  },
  {
    id: 7,
    name: 'Kebabs',
    description: 'Authentic Chicken and mutton kebabs.',
    images: [{
      src: '/images/Kebabs/victoria-shes-UC0HZdUitWY-unsplash.jpg',
      alt: 'Mutton Kebab',
      dataAiHint: 'grilled chicken herbs vegetables'
    },
  {
      src: '/images/Kebabs/markus-winkler-WHtVB-RiW2I-unsplash.jpg',
      alt: 'Chicken Kebab',
      dataAiHint: 'Kebab'
    }],
  },
  {
    id: 8,
    name: 'Tostada',
    description: 'Crunchy Chicken tostada.',
    images: [{
      src: '/images/tostada/istockphoto-933856112-612x612.jpg',
      alt: 'Tostada',
      dataAiHint: 'tostada'
    },
  {
      src: '/images/Kebabs/markus-winkler-WHtVB-RiW2I-unsplash.jpg',
      alt: 'tostada',
      dataAiHint: 'tostada'
    }],
  },
  {
    id: 9,
    name: 'Pancake',
    description: 'Delicious Pancake.',
    images: [{
      src: '/images/Pancake.jpg',
      alt: 'Pancake',
      dataAiHint: 'Pancake'}],
    hiddenOnMain:true,

  }

];

export const heroImages = [
  { id: 'hero1', src: '/images/Pancake.jpg', alt: 'Delicious pancakes with syrup', dataAiHint: 'pancakes breakfast' },
  { id: 'hero2', src: '/images/burger2.jpg', alt: 'Gourmet burger with fries', dataAiHint: 'gourmet burger' },
  { id: 'hero3', src: '/images/salad.jpg', alt: 'Fresh garden salad', dataAiHint: 'fresh salad' },
  { id: 'hero4', src: '/images/chad-montano-MqT0asuoIcU-unsplash.jpg', alt: 'Cozy restaurant interior', dataAiHint: 'restaurant interior' },
  { id: 'hero5', src: '/images/mushroom_rissoto_2.jpg', alt: 'Elegant interior of The Chatter House with warm lighting and booth seating', dataAiHint: 'restaurant interior lighting' },
];

export const contactInfo = {
  address: "123 Foodie Lane, Gourmet City, FS 45678",
  phone: "(123) 456-7890",
  email: "info@thechatterhouse.com",
  reservationEmail: "reservations@thechatterhouse.com",
  openingHours: [
    { day: "Monday - Friday", hours: "12:00 PM - 10:00 PM" },
    { day: "Saturday - Sunday", hours: "11:00 AM - 11:00 PM" },
  ]
};

// Updated delivery app links with actual URLs (replace with your real restaurant URLs)
export const deliveryAppLinks = [
  { 
    name: "Swiggy", 
    url: "https://www.swiggy.com/restaurants/the-chatter-house", // Replace with your actual Swiggy URL
    color: "orange"
  },
  { 
    name: "Zomato", 
    url: "https://www.zomato.com/mumbai/the-chatter-house", // Replace with your actual Zomato URL
    color: "red"
  },
  { 
    name: "Uber Eats", 
    url: "https://www.ubereats.com/store/the-chatter-house", // Replace with your actual Uber Eats URL
    color: "black"
  },
];

// Updated social media links with proper icons that exist in Lucide React
export const socialMediaLinks = [
  { 
    name: "Facebook", 
    url: "https://www.facebook.com/thechatterhouse", // Replace with your actual Facebook page
    iconName: "Facebook" 
  },
  { 
    name: "Instagram", 
    url: "https://www.instagram.com/thechatterhouse", // Replace with your actual Instagram handle
    iconName: "Instagram" 
  },
  { 
    name: "Twitter", 
    url: "https://www.twitter.com/thechatterhouse", // Replace with your actual Twitter handle
    iconName: "Twitter" 
  },
  { 
    name: "YouTube", 
    url: "https://www.youtube.com/@thechatterhouse", // Replace with your actual YouTube channel
    iconName: "Youtube" 
  },
];

export const reviewImages = [
  { id: 'review1', src: '/images/reviews/image1.png', alt: 'Happy customers dining', dataAiHint: 'happy customers restaurant' },
  { id: 'review2', src: '/images/reviews/image2.png', alt: 'A beautifully presented dish', dataAiHint: 'plated dish review' },
  { id: 'review3', src: '/images/reviews/image3.png', alt: 'Restaurant exterior at night', dataAiHint: 'restaurant exterior night' },
  { id: 'review4', src: '/images/reviews/image4.png', alt: 'Smiling chef in kitchen', dataAiHint: 'chef kitchen smiling' },
];

export const RESTAURANT_CONTEXT = `
The Chatter House is a modern European restaurant focusing on fresh, seasonal ingredients and an elegant dining experience.
Our Head Chef, Julian Everwood, is renowned for his innovative approach to classic European dishes.

Opening Hours:
- Monday to Friday: 12:00 PM to 10:00 PM (Last order at 9:30 PM)
- Saturday & Sunday: 11:00 AM to 11:00 PM (Last order at 10:30 PM)

Location: ${contactInfo.address}
Contact: Phone: ${contactInfo.phone}, Email: ${contactInfo.email}
Reservations: ${contactInfo.reservationEmail}

Menu Highlights:
- Appetizers: Gourmet Pizza, Foie Gras Terrine, Burrata Salad
- Main Courses: Filet Mignon, Pan-Seared Duck Breast, Mushroom Risotto, Catch of the Day, Charred Chicken
- Desserts: Lavender Crème brûlée, Chocolate Marquise, Artisan Cheese Platter

Dietary Information:
- We offer a variety of vegetarian, vegan, and gluten-free options. Please inform your server of any allergies or dietary restrictions.
- Our kitchen handles nuts, dairy, gluten, and other allergens. While we take precautions, cross-contamination is possible.

Amenities:
- Full bar with artisanal cocktails, extensive wine list, and craft beers
- Private dining room available for up to 20 guests (reservations required)
- Outdoor patio seating (seasonal, weather permitting)
- Wheelchair accessible

Reservations:
- Highly recommended, especially on weekends
- Can be made via our online reservation system, chatbot, by phone, or through our website
- For parties larger than 8, please call us directly at ${contactInfo.phone}
- Reservations can be made up to 90 days in advance

Parking:
- Street parking is available
- Valet parking available on Friday and Saturday evenings from 6:00 PM

Dress Code: Smart casual

Atmosphere: Elegant yet relaxed, perfect for special occasions, business dinners, or a sophisticated night out.
We do not allow pets, except for certified service animals.

Table Booking Policy:
- Reservations are held for 15 minutes past the reserved time
- Cancellations must be made at least 2 hours in advance
- No-shows may be subject to a cancellation fee
- Large parties (8+) may require a deposit
`;

// Enhanced booking types with validation
export type BookingField = keyof Omit<ChatbotTableBookingInput, 'context'>;
export type BookingState =
  | 'idle'
  | 'collectingName'
  | 'collectingPhone'
  | 'collectingDate'
  | 'collectingTime'
  | 'collectingPartySize'
  | 'confirmingBooking'
  | 'error'
  | 'success';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: Date;
  bookingData?: Partial<ChatbotTableBookingInput>;
  error?: string;
}

// Validation helpers
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PARTY_SIZE_MIN: 1,
  PARTY_SIZE_MAX: 20,
  LARGE_PARTY_THRESHOLD: 8,
  MAX_ADVANCE_DAYS: 90,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  TIME_REGEX: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const RESTAURANT_HOURS = {
  WEEKDAY: {
    OPEN: { hours: 12, minutes: 0 }, // 12:00 PM
    CLOSE: { hours: 22, minutes: 0 }, // 10:00 PM
    LAST_ORDER: { hours: 21, minutes: 30 } // 9:30 PM
  },
  WEEKEND: {
    OPEN: { hours: 11, minutes: 0 }, // 11:00 AM
    CLOSE: { hours: 23, minutes: 0 }, // 11:00 PM
    LAST_ORDER: { hours: 22, minutes: 30 } // 10:30 PM
  }
};

// Time slots for reservation system
export const generateTimeSlots = (date: Date): string[] => {
  const slots: string[] = [];
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  const hours = isWeekend ? RESTAURANT_HOURS.WEEKEND : RESTAURANT_HOURS.WEEKDAY;
  const startTime = hours.OPEN.hours * 60 + hours.OPEN.minutes;
  const endTime = hours.LAST_ORDER.hours * 60 + hours.LAST_ORDER.minutes;
  
  for (let time = startTime; time <= endTime; time += 30) {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    slots.push(timeString);
  }
  
  return slots;
};

// Reservation status configuration
export const RESERVATION_STATUS = {
  PENDING: { label: 'Pending', color: 'yellow', description: 'Awaiting confirmation' },
  CONFIRMED: { label: 'Confirmed', color: 'green', description: 'Reservation confirmed' },
  CANCELLED: { label: 'Cancelled', color: 'red', description: 'Reservation cancelled' },
  COMPLETED: { label: 'Completed', color: 'blue', description: 'Service completed' },
  NO_SHOW: { label: 'No Show', color: 'gray', description: 'Customer did not arrive' }
} as const;

// Admin configuration
export const ADMIN_CONFIG = {
  ITEMS_PER_PAGE: 20,
  AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
  NOTIFICATION_DURATION: 5000, // 5 seconds
  EXPORT_FORMATS: ['csv', 'excel', 'pdf'] as const
};

export type { FoodImage };