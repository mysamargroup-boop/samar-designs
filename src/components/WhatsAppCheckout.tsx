"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CartItem } from '@/lib/types';
import { MessageCircle, ShoppingBag, Sparkles, CreditCard, MapPin, User, Mail, Ticket, Phone, StickyNote, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ============================================================
// CONFIGURABLE: Change this to your business WhatsApp number
// (Include country code, but no '+' or spaces)
// ============================================================
const BUSINESS_WHATSAPP_NUMBER = "918234009618";
// ============================================================

interface WhatsAppCheckoutProps {
  items: CartItem[];
  total: number;
  savings: number;
  coupon?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (orderData: any) => void;
}

export function WhatsAppCheckout({ items, total, savings, coupon, open, onOpenChange, onSuccess }: WhatsAppCheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    note: '',
    shippingAddress: '',
    shippingPincode: '',
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    // Phone: allow only digits, max 10
    if (id === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: digitsOnly }));
      return;
    }

    // Pincode: allow only digits, max 6
    if (id === 'pincode' || id === 'shippingPincode') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, [id]: digitsOnly }));
      return;
    }

    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const effectiveShippingAddress = sameAsShipping ? formData.address : formData.shippingAddress;
  const effectiveShippingPincode = sameAsShipping ? formData.pincode : formData.shippingPincode;

  const handleCheckout = () => {
    const businessPhone = BUSINESS_WHATSAPP_NUMBER;
    const itemDetails = items.map(item => `- ${item.name} (Qty: ${item.quantity}, Price: ₹${item.sale_price * item.quantity})`).join('\n');

    const message = `*New Order from Sumegha Handmades*\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `- Name: ${formData.name}\n` +
      `- Email: ${formData.email}\n` +
      `- Phone: +91 ${formData.phone}\n` +
      `- Billing Address: ${formData.address}\n` +
      `- Billing Pincode: ${formData.pincode}\n` +
      (sameAsShipping ? `` : `- Shipping Address: ${formData.shippingAddress}\n- Shipping Pincode: ${formData.shippingPincode}\n`) +
      `\n*ORDER SUMMARY:*\n${itemDetails}\n\n` +
      (coupon ? `*COUPON USED:* ${coupon.toUpperCase()}\n` : '') +
      `*SHIPPING:* FREE\n` +
      `*TOTAL PAYABLE:* ₹${total}\n\n` +
      (formData.note ? `*NOTE FOR ARTIST:* ${formData.note}\n\n` : '') +
      `Please confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${businessPhone}?text=${encodedMessage}`, '_blank');

    // Generate order ID and pass data back
    const orderId = `SH-${Date.now().toString().slice(-6)}`;
    const orderData = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
      customer: {
        ...formData,
        shippingAddress: effectiveShippingAddress,
        shippingPincode: effectiveShippingPincode,
        sameAsShipping,
      },
      items,
      total,
      savings,
      coupon
    };

    onSuccess(orderData);
    onOpenChange(false);
  };

  const isFormValid = formData.name && formData.email && formData.address && formData.pincode && formData.pincode.length === 6 &&
    (sameAsShipping || (formData.shippingAddress && formData.shippingPincode && formData.shippingPincode.length === 6));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] md:max-w-[900px] max-h-[90vh] md:max-h-[85vh] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0 bg-background transition-all duration-500">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[85vh] overflow-hidden">
          {/* Left: Form */}
          <div className="flex-1 p-6 md:p-8 space-y-5 overflow-y-auto custom-scrollbar">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Delivery Details
              </DialogTitle>
              <DialogDescription className="text-muted-foreground font-light text-[10px] uppercase tracking-widest mt-1">
                Where should we send your treasures?
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Full Name *</Label>
                  <Input id="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="rounded-xl border-primary/5 bg-white shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Phone Number</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none z-10">
                      <span className="text-sm leading-none">🇮🇳</span>
                      <span className="text-xs font-bold text-foreground/60">+91</span>
                    </div>
                    <Input id="phone" type="tel" inputMode="numeric" pattern="[0-9]*" value={formData.phone} onChange={handleChange} placeholder="9876543210" className="pl-[4.2rem] rounded-xl border-primary/5 bg-white shadow-sm" maxLength={10} />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="hello@example.com" className="pl-11 rounded-xl border-primary/5 bg-white shadow-sm" />
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-1.5">
                <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Billing Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-4 w-4 text-muted-foreground" />
                  <Textarea id="address" value={formData.address} onChange={handleChange} placeholder="House no, Street, Landmark..." className="pl-11 rounded-xl border-primary/5 bg-white shadow-sm min-h-[80px] resize-none" />
                </div>
              </div>

              {/* Pincode */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="pincode" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Pincode *</Label>
                  <Input id="pincode" type="tel" inputMode="numeric" pattern="[0-9]*" value={formData.pincode} onChange={handleChange} placeholder="6-digit code" className="rounded-xl border-primary/5 bg-white shadow-sm" maxLength={6} />
                  {formData.pincode && formData.pincode.length !== 6 && (
                    <p className="text-[9px] text-red-500 font-medium ml-1 mt-0.5">Pincode must be exactly 6 digits</p>
                  )}
                </div>
              </div>

              {/* Shipping Address Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="sameAsShipping"
                  checked={sameAsShipping}
                  onCheckedChange={(checked) => setSameAsShipping(checked === true)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="sameAsShipping" className="text-[11px] font-bold text-foreground/70 cursor-pointer">
                  Shipping address same as billing address
                </Label>
              </div>

              {/* Separate Shipping Address (shown when checkbox is unchecked) */}
              {!sameAsShipping && (
                <div className="space-y-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-700">Shipping Address</span>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="shippingAddress" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Address *</Label>
                    <Textarea id="shippingAddress" value={formData.shippingAddress} onChange={handleChange} placeholder="Shipping address..." className="rounded-xl border-primary/5 bg-white shadow-sm min-h-[70px] resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="shippingPincode" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1">Pincode *</Label>
                    <Input id="shippingPincode" type="tel" inputMode="numeric" pattern="[0-9]*" value={formData.shippingPincode} onChange={handleChange} placeholder="6-digit code" className="rounded-xl border-primary/5 bg-white shadow-sm" maxLength={6} />
                    {formData.shippingPincode && formData.shippingPincode.length !== 6 && (
                      <p className="text-[9px] text-red-500 font-medium ml-1 mt-0.5">Pincode must be exactly 6 digits</p>
                    )}
                  </div>
                </div>
              )}

              {/* Extra Notes */}
              <div className="space-y-1.5">
                <Label htmlFor="note" className="text-[10px] font-black uppercase tracking-widest text-foreground/60 ml-1 flex items-center gap-1">
                  <StickyNote className="h-3 w-3" />
                  Extra Notes
                </Label>
                <Textarea id="note" value={formData.note} onChange={handleChange} placeholder="Any special instructions, preferred color, customization..." className="rounded-xl border-primary/5 bg-white shadow-sm min-h-[60px] resize-none text-sm" />
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="bg-primary/[0.03] p-6 md:p-8 border-t md:border-t-0 md:border-l border-primary/5 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display text-xl font-black uppercase tracking-tight flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Order Summary
              </h3>

              <div className="space-y-3 max-h-[150px] overflow-y-auto scrollbar-hide pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-foreground/60">{item.name} x {item.quantity}</span>
                    <span className="text-foreground">₹{item.sale_price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-primary/5">
                {coupon && (
                  <div className="flex justify-between items-center text-[10px] font-black text-green-600 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Ticket className="h-3 w-3" /> Coupon Applied</span>
                    <span>{coupon.toUpperCase()}</span>
                  </div>
                )}

                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 flex justify-between items-center">
                  <span className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center">
                    <Sparkles className="h-3 w-3 mr-2 animate-pulse" />
                    You Save
                  </span>
                  <span className="font-black text-green-700 text-lg">₹{savings}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Total Payable</span>
                <span className="text-4xl font-black font-display text-primary">₹{total}</span>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full h-16 rounded-2xl gradient-primary text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={handleCheckout}
                  disabled={!isFormValid}
                >
                  <WhatsAppIcon className="h-5 w-5 mr-2" />
                  Confirm on WhatsApp
                </Button>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-wrap justify-center gap-6 opacity-30 grayscale saturate-0 items-center">
                    {/* Simulated Payment Icons using Lucide and styled text */}
                    <div className="flex flex-col items-center gap-1">
                      <CreditCard className="h-5 w-5" />
                      <span className="text-[7px] font-bold uppercase tracking-widest">Cards</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-5 w-8 border border-foreground/50 rounded flex items-center justify-center font-black text-[8px]">UPI</div>
                      <span className="text-[7px] font-bold uppercase tracking-widest">UPI</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-5 w-8 border border-foreground/50 rounded flex items-center justify-center font-black text-[8px]">GPay</div>
                      <span className="text-[7px] font-bold uppercase tracking-widest">Google Pay</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ShoppingBag className="h-5 w-5" />
                      <span className="text-[7px] font-bold uppercase tracking-widest">Net Banking</span>
                    </div>
                  </div>
                  <div className="text-[8px] font-bold uppercase tracking-widest opacity-20 flex items-center gap-1">
                    <Sparkles className="h-2 w-2" />
                    Trusted & Secure Transactions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
