"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist } = useStore();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/products' },
    { name: 'AI Concierge', href: '/discovery' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-black/5"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <Link href="/" className="flex-1 flex justify-center">
          <h2 className="text-charcoal text-base font-display font-bold leading-tight tracking-[0.2em] uppercase">
            Sumegha
          </h2>
        </Link>

        <div className="flex items-center space-x-1">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <span className="absolute top-2 right-2 size-1.5 bg-primary rounded-full"></span>}
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 relative">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && <span className="absolute top-2 right-2 size-1.5 bg-primary rounded-full"></span>}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-6 animate-in slide-in-from-top duration-300 md:hidden shadow-lg">
          <nav className="flex flex-col space-y-6 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}