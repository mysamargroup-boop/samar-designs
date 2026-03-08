"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Heart, Menu, X, Home, Shapes, Info, Phone, Gem, BookText, Trash2, Plus, Minus, ArrowRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from '@/components/ui/scroll-area';
import type { SanityCategory } from "@/sanity/lib/queries";

export function Header({ categories }: { categories?: SanityCategory[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const { cart, wishlist, removeFromCart, updateCartQuantity } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Collections', href: '/collections', icon: Shapes },
    { name: 'Gallery', href: '/products', icon: Shapes },
    ...(categories || []).map((c) => ({ name: c.name, href: `/products?category=${encodeURIComponent(c.name)}`, icon: Shapes })),
    { name: 'Our Story', href: '/about', icon: Info },
    { name: 'Blog', href: '/blog', icon: BookText },
    { name: 'AI Concierge', href: '/discovery', icon: Gem },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const subtotal = cart.reduce((sum, item) => sum + (item.sale_price * item.quantity), 0);
  const isScrolled = scrollY > 24;
  const headerProgress = Math.min(scrollY / 220, 1);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-500',
        isScrolled
          ? 'bg-white/72 backdrop-blur-2xl border-primary/10 shadow-[0_20px_45px_rgba(24,17,19,0.12)]'
          : 'bg-white/82 backdrop-blur-lg border-gray-100'
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{
          background: `linear-gradient(90deg, rgba(207,23,69,${0.08 + headerProgress * 0.12}) 0%, rgba(255,255,255,0) 45%, rgba(255,182,193,${0.12 + headerProgress * 0.1}) 100%)`,
        }}
      />

      <div className={cn('container-normal relative', isScrolled ? 'py-1.5 lg:py-2' : 'py-2 lg:py-3')}>
        <div className="grid grid-cols-3 items-center w-full">
          {/* Mobile Menu Button - Left Column */}
          <div className="flex items-center justify-start">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-black/5 text-foreground lg:hidden h-10 w-10 -ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Logo in Center */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center group">
              <div
                className="relative h-10 lg:h-12 w-64 lg:w-[380px] transition-transform duration-500"
                style={{ transform: `scale(${1 - headerProgress * 0.06})` }}
              >
                <Image
                  src="/logo.png"
                  alt="Sumegha Handmades"
                  fill
                  className="object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="flex justify-end items-center gap-1 sm:gap-2 -mr-2">
            {/* Desktop Search */}
            <div className="hidden lg:flex items-center relative mr-2">
              <div className={cn(
                "flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-2 transition-all duration-300",
                isSearchFocused ? "w-64 border-primary/30 bg-white shadow-lg" : "w-48"
              )}>
                <Search className="h-4 w-4 text-primary opacity-60" />
                <input
                  type="text"
                  placeholder="Search masterpices..."
                  className="bg-transparent border-none outline-none text-[11px] font-medium w-full placeholder:text-muted-foreground/50"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
              </div>
            </div>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-foreground relative h-10 w-10 sm:h-12 sm:w-12 transition-transform hover:scale-110">
                <Heart className="h-7 w-7 sm:h-9 sm:w-9" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white border-2 border-white">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5 text-foreground relative h-10 w-10 sm:h-12 sm:w-12 transition-transform hover:scale-110">
                  <ShoppingBag className="h-7 w-7 sm:h-9 sm:w-9" />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white border-2 border-white">
                      {cart.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[80vw] sm:max-w-md p-0 rounded-l-[2rem] border-none shadow-[0_0_50px_rgba(0,0,0,0.2)] flex flex-col transition-transform duration-500 ease-in-out">
                <SheetHeader className="p-6 pb-2">
                  <SheetTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                    Shopping Bag
                  </SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-10 w-10 text-primary/30" />
                    </div>
                    <p className="text-sm text-muted-foreground font-light max-w-[200px]">Your bag is empty. Let&apos;s add some art!</p>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="flex-1 px-6">
                      <div className="space-y-6 py-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4 group">
                            <div className="relative h-24 w-20 rounded-xl overflow-hidden border border-primary/5 shrink-0">
                              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                              <div className="space-y-1">
                                <div className="flex justify-between items-start gap-2">
                                  <h4 className="text-xs font-black uppercase tracking-tight leading-tight line-clamp-2">{item.name}</h4>
                                  <button onClick={() => removeFromCart(item.id)} className="text-destructive/40 hover:text-destructive transition-colors">
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <p className="text-sm font-black text-primary">Rs. {item.sale_price}</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center bg-primary/5 rounded-full p-0.5 border border-primary/10">
                                  <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 hover:bg-white rounded-full transition-colors"><Minus className="h-3 w-3" /></button>
                                  <span className="w-6 text-center text-[10px] font-black">{item.quantity}</span>
                                  <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 hover:bg-white rounded-full transition-colors"><Plus className="h-3 w-3" /></button>
                                </div>
                                <span className="text-[10px] font-black text-foreground/40">Rs. {item.sale_price * item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-6 bg-white border-t border-primary/5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground">
                        <span>Net Total</span>
                        <span className="text-xl text-primary">Rs. {subtotal}</span>
                      </div>
                      <Link href="/cart" className="block w-full">
                        <Button className="w-full h-14 rounded-xl gradient-primary text-[10px] font-bold uppercase tracking-widest group">
                          View Full Bag & Checkout
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <nav className={cn('hidden lg:flex items-center justify-center transition-all duration-500', isScrolled ? 'space-x-9 mt-2 pt-2 border-t border-primary/10' : 'space-x-12 mt-4 pt-3 border-t border-gray-50')}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-[11px] font-bold uppercase tracking-[0.3em] transition-all relative group',
                  isActive ? 'text-primary' : 'text-foreground/60 hover:text-primary'
                )}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-[1.5px] bg-primary transition-all',
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  )}
                />
              </Link>
            );
          })}
        </nav>
      </div >

      <div
        className="pointer-events-none h-[2px] w-full origin-left bg-gradient-to-r from-primary/50 via-primary/20 to-transparent transition-transform duration-300"
        style={{ transform: `scaleX(${0.2 + headerProgress * 0.8})` }}
      />

      {
        isOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 p-8 animate-in slide-in-from-top duration-300 lg:hidden shadow-2xl z-50">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-sm font-bold uppercase tracking-[0.2em]',
                      isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5 text-foreground hover:text-primary'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', isActive ? 'opacity-100' : 'opacity-60')} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )
      }
    </header >
  );
}