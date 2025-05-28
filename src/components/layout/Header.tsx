import { APP_NAME } from '@/constants';
import { Utensils } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 shadow-md bg-background sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Utensils className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">{APP_NAME}</h1>
        </div>
        {/* Minimalist design, so no nav links for now unless specified */}
      </div>
    </header>
  );
}
