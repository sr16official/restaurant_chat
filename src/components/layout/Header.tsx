import { APP_NAME } from '@/constants';
import { Utensils } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-8 shadow-md bg-background sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2" aria-label={`${APP_NAME} home page`}>
          <Utensils className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">{APP_NAME}</h1>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
