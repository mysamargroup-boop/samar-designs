"use client";

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Sparkles, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = PlaceHolderImages.map((img, i) => ({
    id: img.id,
    name: img.description.split(' ').slice(0, 3).join(' '),
    description: img.description,
    price: [1299, 1599, 899, 650][i % 4],
    imageUrl: img.imageUrl,
    category: ['Lippan Art', 'Nameplates', 'Folk Art', 'Decor'][i % 4]
  }));

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-JpPH3cpfoZ5jyZj3LtwEfqTqZJp1azGRFH5Gncj8nwyFsfQdMbcCoyhzK9ckQSoYCSkeP2zRUVqJF3daNOXPw3XhY2m3voi9AbX6IVOjSlK-iEIqIfRuxsFbp8chWQskVhmKnzPwpS1tuOhdixcKv0uYCL41LnfdnrOG4KbqVsbSBV9QJj6t5P9s9ZA80yuz8PNpHg7DHC7ASsM-BwG7VLMN-Gxroe1nlLpt8TTT1H-mdQrAw5YwMOd_Dedsv7KlXTd66spuAgEQ"
            alt="Hero background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white space-y-8 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
            Aesthetic Living
          </div>
          <h1 className="text-4xl lg:text-6xl font-black font-display leading-tight uppercase tracking-tight">
            Modern Artistry, Curated for Your Home
          </h1>
          <p className="text-lg opacity-90 font-light max-w-xl mx-auto">
            Experience contemporary design through bespoke handmade elegance. Every piece is a testament to sophisticated simplicity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/products" className="w-full sm:w-auto">
              <Button className="w-full h-12 px-10 rounded-lg text-xs font-bold uppercase tracking-widest bg-primary hover:bg-primary/90">
                View Collection
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto h-12 px-10 rounded-lg text-xs font-bold uppercase tracking-widest bg-white text-charcoal hover:bg-gray-100 flex items-center gap-2"
              onClick={() => window.open('https://wa.me/919876543210', '_blank')}
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              Order on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h4 className="text-sm font-bold uppercase tracking-widest">Featured Works</h4>
            <Link href="/products" className="text-primary text-[10px] font-bold uppercase tracking-widest border-b border-primary/20 pb-0.5 hover:border-primary transition-all">
              See All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 bg-white/40">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100 space-y-6">
            <Layout className="h-8 w-8 text-primary/30 mx-auto" />
            <h4 className="text-sm font-bold uppercase tracking-[0.2em]">The Philosophy</h4>
            <p className="text-charcoal/60 text-sm leading-relaxed font-light italic">
              "Rooted in contemporary aesthetics and traditional soul, we believe in the power of handmade elements to transform spaces into personal sanctuaries of elegance."
            </p>
            <div className="w-10 h-[1px] bg-primary/30 mx-auto" />
          </div>
        </div>
      </section>

      {/* Experience Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h4 className="text-xs font-bold text-center mb-16 uppercase tracking-[0.2em]">The Experience</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              { id: '01', title: "Curate", desc: "Select from our gallery of hand-designed artisan creations." },
              { id: '02', title: "Connect", desc: "Direct consultation for bespoke modifications and orders." },
              { id: '03', title: "Cherish", desc: "Bespoke delivery of a piece crafted specifically for your home." }
            ].map((step) => (
              <div key={step.id} className="flex items-start gap-5">
                <div className="flex-shrink-0 size-10 rounded-full border border-primary/20 flex items-center justify-center text-xs font-bold text-primary bg-white shadow-sm">
                  {step.id}
                </div>
                <div className="pt-1">
                  <h5 className="font-bold text-xs uppercase tracking-wide mb-1">{step.title}</h5>
                  <p className="text-charcoal/50 text-[10px] font-light leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-charcoal text-white p-12 lg:p-20 rounded-[2rem] text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -mr-8 -mt-8">
              <Sparkles className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-[0.2em]">Ask the Art Concierge</h3>
            <p className="text-white/60 text-xs font-light tracking-wide max-w-md mx-auto">
              Not sure which piece fits your aesthetic? Our AI Assistant can curate a selection based on your preferences.
            </p>
            <Link href="/discovery" className="inline-block">
              <Button className="h-12 px-10 rounded-lg text-xs font-bold uppercase tracking-widest bg-primary hover:bg-primary/90">
                Start Discovery
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
