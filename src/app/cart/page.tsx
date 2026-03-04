"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { WhatsAppCheckout } from '@/components/WhatsAppCheckout';
import { toast } from '@/hooks/use-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOriginal = cart.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const totalSavings = totalOriginal - subtotal;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl lg:text-6xl font-headline font-black mb-4 uppercase tracking-tight">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto font-light">Looks like you haven't added any handmade treasures yet. Let's find something beautiful!</p>
        <Link href="/products">
          <Button size="lg" className="rounded-full gradient-primary px-10 text-[10px] font-bold uppercase tracking-widest h-14">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 pb-32">
      <div className="text-center mb-12 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Review Your Items</p>
        <h1 className="text-3xl lg:text-5xl font-black font-headline uppercase tracking-tight">Shopping Bag</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-[2rem] shadow-sm border border-primary/5 transition-all hover:shadow-md">
              {/* Image Left */}
              <div className="relative w-24 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm border border-primary/5">
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              </div>
              
              {/* Details Right */}
              <div className="flex-grow flex flex-col justify-between h-full min-h-[100px]">
                <div className="space-y-1">
                  <h3 className="text-[13px] font-black uppercase tracking-tight text-foreground leading-tight line-clamp-2">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-primary font-black text-base">₹{item.price}</p>
                    {item.originalPrice && (
                      <p className="text-muted-foreground text-[11px] line-through decoration-primary/40 font-bold">₹{item.originalPrice}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center bg-primary/5 rounded-full p-1 border border-primary/10">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-white" 
                      onClick={() => updateCartQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-black text-[12px]">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 rounded-full hover:bg-white" 
                      onClick={() => updateCartQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:bg-destructive/5 rounded-full h-8 w-8" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-primary/10 sticky top-24 space-y-6">
            <h2 className="text-xl font-headline font-black uppercase tracking-tight">Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>Shipping</span>
                <span className="text-green-600 font-black">FREE</span>
              </div>
              
              {totalSavings > 0 && (
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center">
                    <Sparkles className="h-3 w-3 mr-1.5" />
                    You Saved
                  </span>
                  <span className="font-black text-green-700">₹{totalSavings}</span>
                </div>
              )}

              <div className="pt-6 border-t border-primary/10 flex justify-between items-end">
                <span className="text-base font-black uppercase tracking-tight">Total</span>
                <div className="text-right">
                  <span className="block text-2xl font-black font-headline text-primary leading-none">₹{subtotal}</span>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full h-14 rounded-2xl gradient-primary text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 group"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Checkout on WhatsApp
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="space-y-4 pt-2">
              <p className="text-[8px] text-center text-muted-foreground leading-relaxed uppercase tracking-widest font-bold">
                Secure Checkout • Artist Confirmation • Easy Delivery
              </p>
              <div className="flex justify-center gap-4 opacity-30 grayscale items-center">
                <Image src="https://picsum.photos/seed/pay1/32/20" alt="UPI" width={32} height={20} className="rounded" />
                <Image src="https://picsum.photos/seed/pay2/32/20" alt="Card" width={32} height={20} className="rounded" />
                <Image src="https://picsum.photos/seed/pay3/32/20" alt="COD" width={32} height={20} className="rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppCheckout 
        open={isCheckoutOpen} 
        onOpenChange={setIsCheckoutOpen} 
        items={cart} 
        total={subtotal} 
        onSuccess={() => {
          clearCart();
          toast({ title: "Order sent!", description: "Check WhatsApp to finalize with the artist." });
        }}
      />
    </div>
  );
}
