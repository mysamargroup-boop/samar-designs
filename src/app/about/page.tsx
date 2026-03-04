
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star, Heart, ShoppingBag, TrendingUp, HandHeart, Leaf, Flower2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const journey = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started crafting small clay pieces from a tiny corner desk in my bedroom.",
      icon: Star
    },
    {
      year: "2021",
      title: "First Collection",
      description: "Launched the 'Blossom' collection which sold out in just a few days.",
      icon: Heart
    },
    {
      year: "2023",
      title: "Studio Opening",
      description: "Moved into a dedicated studio space to expand our creative vision.",
      icon: ShoppingBag
    }
  ];

  const philosophies = [
    {
      title: "100% Handmade",
      description: "Every single piece is shaped, painted, and finished by hand, ensuring unique character.",
      icon: HandHeart
    },
    {
      title: "Sustainably Sourced",
      description: "We use eco-friendly materials and packaging to minimize our footprint on the earth.",
      icon: Leaf
    },
    {
      title: "Made with Love",
      description: "Joy is baked into every creation, intended to bring a smile to whoever holds it.",
      icon: Flower2
    }
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container-normal mx-auto space-y-12 pb-24">
        {/* Navigation & Header */}
        <div className="relative flex items-center justify-center mb-16">
          <div className="absolute left-0">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/50 hover:bg-white shadow-sm h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="text-center space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">The Artist</p>
            <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-foreground">Our Story</h1>
          </div>
        </div>

        {/* Artist Header Section */}
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-[6px] border-white shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/sumegha-artist/600/600" 
              alt="Sumegha - The Artist" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl lg:text-6xl font-black text-foreground tracking-tight">Sumegha</h2>
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-xs">Creator & Artist</p>
          </div>
          <p className="text-foreground/70 text-lg lg:text-2xl leading-relaxed italic max-w-2xl px-4 font-cursive">
            "Every piece is a fragment of my imagination, crafted with patience and love to bring a touch of beauty into your everyday life."
          </p>
        </div>

        {/* Our Journey Section */}
        <div className="space-y-16 pt-16">
          <div className="text-center space-y-4">
            <TrendingUp className="text-primary h-8 w-8 mx-auto opacity-30" />
            <h3 className="text-xl font-black text-foreground uppercase tracking-[0.3em]">The Evolution</h3>
          </div>

          <div className="relative max-w-xl mx-auto pl-12 space-y-16">
            {/* Timeline Line */}
            <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-primary/20" />
            
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative group">
                  {/* Icon Circle */}
                  <div className="absolute -left-[44px] top-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center z-10 border-2 border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Icon className="h-4 w-4 text-primary group-hover:text-white" />
                  </div>
                  
                  <div className="space-y-3 pt-1">
                    <p className="text-primary font-black text-xs tracking-widest">{item.year}</p>
                    <h4 className="text-xl font-black text-foreground leading-tight uppercase tracking-tight">{item.title}</h4>
                    <p className="text-foreground/60 text-sm lg:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Philosophy Section */}
        <div className="bg-white/40 backdrop-blur-md rounded-[3rem] p-8 md:p-16 shadow-2xl border border-white/50 space-y-16 mt-24 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <Heart className="text-primary h-8 w-8 mx-auto fill-primary/20" />
            <h3 className="text-xl font-black text-foreground uppercase tracking-[0.3em]">Philosophy</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {philosophies.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-3xl bg-white/50 border border-white/80 group transition-all hover:bg-white hover:shadow-xl text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-primary/10 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-3 pt-1">
                    <h4 className="text-lg font-black text-foreground uppercase tracking-widest">{item.title}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed max-w-md">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
