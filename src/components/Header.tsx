"use client";

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useStore();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/products' },
    { name: 'Our Story', href: '/about' },
    { name: 'AI Concierge', href: '/discovery' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-black/5 text-charcoal md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <Link href="/" className="flex-1 text-center md:text-left">
          <h2 className="text-charcoal text-base font-display font-bold leading-tight tracking-[0.3em] uppercase">
            Sumegha
          </h2>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/60 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex justify-end">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-charcoal relative">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full animate-pulse"></span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 p-8 animate-in slide-in-from-top duration-300 md:hidden shadow-xl">
          <nav className="flex flex-col space-y-6 text-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.2em] text-charcoal hover:text-primary transition-colors"
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
