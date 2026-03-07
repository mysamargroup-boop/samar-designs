
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import categoriesData from "@/lib/categories.json";
import { useRef, useState, useEffect } from 'react';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="container-normal mx-auto py-8 lg:py-16 px-4 space-y-12 lg:space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">Curated Selections</p>
          <h1 className="text-3xl lg:text-7xl font-black uppercase tracking-tight text-foreground">Our Collections</h1>
          <p className="text-foreground/50 text-xs lg:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Explore the different realms of artistry at Sumegha Handmades. From royal weddings to soulful home sanctuaries.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16 lg:space-y-24">
          {categoriesData.categories.map((collection, index) => (
            <CategorySection key={index} collection={collection} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CategorySectionProps {
  collection: {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    subCategories: { name: string; imageUrl: string }[];
  };
  index: number;
}

function CategorySection({ collection, index }: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div className="group/section">
      {/* ======== DESKTOP LAYOUT ======== */}
      <div className={`hidden lg:grid lg:grid-cols-2 gap-10 xl:gap-16 items-center ${!isEven ? 'direction-rtl' : ''}`}>
        {/* Main Category Image — always visually on the left for even, right for odd */}
        <div className={`${!isEven ? 'order-2' : 'order-1'}`}>
          <Link href={`/products?category=${encodeURIComponent(collection.name)}`} className="block group">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white transition-transform duration-700 group-hover:scale-[1.02]">
              <Image
                src={collection.imageUrl}
                alt={collection.name}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-white/70 text-[9px] font-black uppercase tracking-[0.3em] mb-2">
                  <Sparkles className="h-3 w-3" />
                  Collection
                </div>
                <h2 className="text-3xl xl:text-4xl font-black uppercase tracking-tight text-white drop-shadow-lg leading-tight">
                  {collection.name}
                </h2>
              </div>
            </div>
          </Link>
        </div>

        {/* Right Side — Description + Sub Categories */}
        <div className={`${!isEven ? 'order-1' : 'order-2'} space-y-8`}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <div className="h-px flex-1 max-w-[40px] bg-primary/30" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">0{index + 1}</span>
            </div>
            <h3 className="text-2xl xl:text-3xl font-black uppercase tracking-tight text-foreground">{collection.name}</h3>
            <p className="text-foreground/60 text-sm xl:text-base font-light leading-relaxed max-w-md">{collection.description}</p>
            <Link href={`/products?category=${encodeURIComponent(collection.name)}`}>
              <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] group/btn mt-2 hover:gap-3 transition-all">
                Explore Collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </Link>
          </div>

          {/* Sub Categories Grid */}
          {collection.subCategories.length > 0 && (
            <div className="space-y-4">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">Sub Categories</p>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {collection.subCategories.map((sub, sIdx) => (
                  <Link
                    key={sIdx}
                    href={`/products?category=${encodeURIComponent(collection.name)}`}
                    className="group/sub text-center space-y-2.5"
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md transition-all duration-500 group-hover/sub:scale-105 group-hover/sub:shadow-lg group-hover/sub:shadow-primary/10">
                      <Image src={sub.imageUrl} alt={sub.name} fill sizes="15vw" className="object-cover transition-transform duration-500 group-hover/sub:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-foreground/60 group-hover/sub:text-primary transition-colors leading-tight">
                      {sub.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======== MOBILE LAYOUT ======== */}
      <div className="lg:hidden space-y-6">
        {/* Mobile Main Category — Slider card */}
        <Link href={`/products?category=${encodeURIComponent(collection.name)}`} className="block group">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border-2 border-white">
            <Image
              src={collection.imageUrl}
              alt={collection.name}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-1.5 text-white/60 text-[8px] font-black uppercase tracking-[0.3em] mb-1">
                <Sparkles className="h-2.5 w-2.5" />
                Collection
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-lg leading-tight">
                {collection.name}
              </h2>
            </div>
          </div>
        </Link>

        <p className="text-foreground/60 text-xs font-light leading-relaxed px-1">{collection.description}</p>

        <Link href={`/products?category=${encodeURIComponent(collection.name)}`}>
          <button className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[9px] group/btn px-1 hover:gap-3 transition-all">
            Explore Full Collection
            <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </Link>

        {/* Sub Categories — Horizontal Slider */}
        {collection.subCategories.length > 0 && (
          <div className="relative">
            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-foreground/40 mb-3 px-1">Sub Categories</p>
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-hide"
            >
              {collection.subCategories.map((sub, sIdx) => (
                <Link
                  key={sIdx}
                  href={`/products?category=${encodeURIComponent(collection.name)}`}
                  className="group/sub flex-shrink-0 w-28 snap-start text-center space-y-2"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-white shadow-sm transition-all duration-300 group-hover/sub:scale-105 group-hover/sub:shadow-md">
                    <Image src={sub.imageUrl} alt={sub.name} fill sizes="30vw" className="object-cover" />
                  </div>
                  <p className="text-[7px] font-black uppercase tracking-widest text-foreground/60 group-hover/sub:text-primary transition-colors leading-tight px-0.5 truncate">
                    {sub.name}
                  </p>
                </Link>
              ))}
            </div>
            {/* Scroll indicators */}
            {canScrollRight && (
              <div className="absolute right-0 top-8 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
