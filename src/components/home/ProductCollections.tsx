"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCollectionsProps {
    productsByCategory: Record<string, Product[]>;
}

export function ProductCollections({ productsByCategory }: ProductCollectionsProps) {
    return (
        <>
            {Object.entries(productsByCategory).map(([catName, catProducts], idx) => (
                <section key={catName} className={cn(
                    "py-24 relative overflow-hidden",
                    idx % 2 === 0 ? "bg-white/20" : "bg-white/40"
                )}>
                    <div className="container-normal relative z-10 px-4">
                        <div className="flex items-center justify-between mb-12">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">{idx % 2 === 0 ? "Curated" : "Premium"} Selection</h4>
                                <h2 className="text-2xl lg:text-5xl font-black uppercase tracking-tight text-foreground leading-tight">{catName}</h2>
                            </div>
                            <Link href={`/products?category=${encodeURIComponent(catName)}`} className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px] group border-b border-primary/20 pb-1">
                                <span className="whitespace-nowrap">VIEW COLLECTION</span>
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                            {catProducts.slice(0, 4).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}
