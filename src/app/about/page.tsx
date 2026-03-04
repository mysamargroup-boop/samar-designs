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
      description: "Started crafting small clay pieces from a tiny corner desk.",
      icon: Star
    },
    {
      year: "2021",
      title: "First Collection",
      description: "Launched 'Blossom' which sold out in days.",
      icon: Heart
    },
    {
      year: "2023",
      title: "Studio Opening",
      description: "Expanded our creative vision into a full studio.",
      icon: ShoppingBag
    }
  ];

  const philosophies = [
    {
      title: "100% Handmade",
      description: "Every single piece is shaped, painted, and finished by hand.",
      icon: HandHeart
    },
    {
      title: "Sustainably Sourced",
      description: "We use eco-friendly materials to minimize our footprint.",
      icon: Leaf
    }
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container-normal mx-auto space-y-12 pb-24">
        <div className="relative flex items-center justify-center mb-12">
          <div className="absolute left-0">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/50 shadow-sm h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="text-center space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">The Artist</p>
            <h1 className="text-2xl lg:text-5xl font-black uppercase tracking-tighter text-foreground">Our Story</h1>
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative w-40 h-40 lg:w-64 lg:h-64 rounded-full overflow-hidden border-[4px] border-white shadow-xl">
            <Image 
              src="https://picsum.photos/seed/sumegha-artist/600/600" 
              alt="Sumegha - The Artist" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-6xl font-black text-foreground tracking-tight">Sumegha</h2>
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Creator & Artist</p>
          </div>
          <p className="text-foreground/70 text-sm lg:text-xl leading-relaxed italic max-w-xl font-cursive">
            "Every piece is a fragment of my imagination, crafted to bring beauty into your everyday life."
          </p>
        </div>

        <div className="space-y-12 pt-12">
          <div className="text-center space-y-2">
            <TrendingUp className="text-primary h-6 w-6 mx-auto opacity-30" />
            <h3 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em]">The Evolution</h3>
          </div>

          <div className="relative max-w-md mx-auto pl-10 space-y-12">
            <div className="absolute left-[16px] top-4 bottom-4 w-0.5 bg-primary/10" />
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="absolute -left-[32px] top-0 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center z-10 border border-primary/10">
                    <Icon className="h-3 w-3 text-primary" />
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <p className="text-primary font-black text-[9px] tracking-widest">{item.year}</p>
                    <h4 className="text-base font-black text-foreground uppercase tracking-tight">{item.title}</h4>
                    <p className="text-foreground/60 text-xs leading-tight">{item.description}</p>
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