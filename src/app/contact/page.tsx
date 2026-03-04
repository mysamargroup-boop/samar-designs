"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Headphones, MessageCircle, Instagram, Mail, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const faqs = [
    {
      question: "How long does a custom bridal outfit take?",
      answer: "A custom bridal outfit typically takes 4-6 weeks to complete, depending on the complexity of the design and the level of handcrafting required. We recommend reaching out at least 2 months in advance."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship our royal ensembles worldwide. Shipping costs and delivery times vary based on the destination. Please contact us via WhatsApp for specific inquiries."
    },
    {
      question: "Can I schedule a virtual consultation?",
      answer: "Absolutely! We offer virtual consultations via WhatsApp Video to discuss your preferences and show you our current collections from the comfort of your home."
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Custom Header based on Image */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 px-6">
        <div className="flex items-center justify-between max-w-lg mx-auto w-full">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-amber-500 hover:bg-amber-50 -ml-2">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-display font-black tracking-tight text-foreground uppercase">Contact Us</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-12 space-y-12 flex flex-col items-center">
        {/* Hero Illustration Area */}
        <div className="relative group">
          <div className="w-40 h-40 rounded-full bg-amber-50 flex items-center justify-center relative z-10">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400" />
            <div className="bg-white shadow-xl rounded-full p-6">
              <Headphones className="h-12 w-12 text-amber-500" />
            </div>
          </div>
          {/* Decorative ring around the icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-dashed border-amber-100 rounded-full animate-[spin_20s_linear_infinite]" />
        </div>

        {/* Get in Touch Text */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-display font-black text-foreground">Get in Touch</h2>
          <p className="text-foreground/60 text-base leading-relaxed max-w-sm">
            Reach out for custom bridal wear, festive collections, and royal wedding ensembles.
          </p>
        </div>

        {/* Quick Connect Subsection */}
        <div className="w-full space-y-8">
          <h3 className="text-center text-xs font-bold text-amber-500 uppercase tracking-[0.3em]">Quick Connect</h3>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-16 w-16 rounded-full border-amber-100 hover:border-amber-500 hover:bg-amber-50 shadow-sm transition-all"
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              >
                <MessageCircle className="h-7 w-7 text-foreground" />
              </Button>
              <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-16 w-16 rounded-full border-amber-100 hover:border-amber-500 hover:bg-amber-50 shadow-sm transition-all"
                onClick={() => window.open('https://instagram.com', '_blank')}
              >
                <Instagram className="h-7 w-7 text-foreground" />
              </Button>
              <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">Instagram</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-16 w-16 rounded-full border-amber-100 hover:border-amber-500 hover:bg-amber-50 shadow-sm transition-all"
                onClick={() => window.open('mailto:hello@sumegha.com', '_blank')}
              >
                <Mail className="h-7 w-7 text-foreground" />
              </Button>
              <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">Email</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-full space-y-8 pt-8">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.3em]">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-none bg-white/50 backdrop-blur-sm rounded-3xl px-6 py-2 shadow-sm">
                <AccordionTrigger className="hover:no-underline text-left font-display font-bold text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/60 leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Studio Map Section */}
        <div className="w-full pt-8">
          <div className="relative h-48 w-full rounded-[2.5rem] overflow-hidden group shadow-2xl border-4 border-white">
            <Image 
              src="https://picsum.photos/seed/studio-map/800/400" 
              alt="Studio Map" 
              fill 
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-amber-900/10 pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <MapPin className="h-6 w-6 text-amber-600" />
              </div>
              <p className="text-white font-display font-bold text-lg drop-shadow-md">Visit our Studio in Jaipur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
