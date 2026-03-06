"use client";

import Link from 'next/link';
import Image from 'next/image';
import { SanityCategory } from "@/sanity/lib/queries";

interface MobileCategorySliderProps {
    categories: (SanityCategory | {
        id: string;
        name: string;
        slug: string;
        description: string;
        imageUrl: string;
        subCategories: any;
    })[];
}

export function MobileCategorySlider({ categories }: MobileCategorySliderProps) {
    return (
        <section className="md:hidden py-4 bg-white/40 border-b border-white relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pr-12 snap-x snap-mandatory">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="flex flex-col items-center shrink-0 space-y-2 group snap-center"
                    >
                        <div className="relative p-[2px] bg-gradient-to-tr from-[#FFD700] via-[#FF69B4] to-[#cf1745] rounded-full shadow-sm">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                                <Image
                                    src={cat.imageUrl}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tight text-foreground/70 group-hover:text-primary transition-colors text-center w-[72px] leading-tight">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
            {/* Right side blur overlay to indicate sliding */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/20 to-transparent pointer-events-none z-10" />
        </section>
    );
}
