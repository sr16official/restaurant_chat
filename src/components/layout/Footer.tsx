import { contactInfo, APP_NAME } from '@/constants';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4 md:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">{APP_NAME}</h3>
          <p className="text-sm">
            Experience the art of modern European cuisine.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-1 shrink-0" />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex items-center">
              <Phone className="h-5 w-5 mr-2 shrink-0" />
              <a href={`tel:${contactInfo.phone}`} className="hover:text-primary">{contactInfo.phone}</a>
            </li>
            <li className="flex items-center">
              <Mail className="h-5 w-5 mr-2 shrink-0" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">{contactInfo.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
          <ul className="space-y-2 text-sm">
            {contactInfo.openingHours.map((item) => (
              <li key={item.day} className="flex items-center">
                <Clock className="h-5 w-5 mr-2 shrink-0" />
                <span><strong>{item.day}:</strong> {item.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center mt-10 pt-8 border-t border-border">
        <p className="text-sm">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
