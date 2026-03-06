"use client";

import Link from 'next/link';
import Image from 'next/image';
import { SanityCategory } from "@/sanity/lib/queries";

interface CategoryGridProps {
    categories: (SanityCategory | {
        id: string;
        name: string;
        slug: string;
        description: string;
        imageUrl: string;
        subCategories: any;
    })[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <section className="py-20 bg-white/40 border-y border-white">
            <div className="container-normal px-4 text-center">
                <div className="flex flex-col items-center gap-2 mb-12">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">Discover Our</h4>
                    <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight">Artistic Categories</h2>
                </div>
                <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-12 pb-6 px-4">
                    {categories.map((cat, index) => (
                        <Link key={index} href={`/products?category=${encodeURIComponent(cat.name)}`} className="group block text-center space-y-4 w-full sm:w-48">
                            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white transition-all duration-500 group-hover:scale-105 group-hover:border-primary/20">
                                <Image
                                    src={cat.imageUrl}
                                    alt={cat.name}
                                    fill
                                    sizes="(max-width: 639px) 30vw, 20vw"
                                    className="object-cover"
                                />
                            </div>
                            <span className="block text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-foreground/70 group-hover:text-primary leading-tight px-1 truncate sm:whitespace-normal">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
