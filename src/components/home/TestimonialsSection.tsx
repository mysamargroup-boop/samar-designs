"use client";

import { Quote, Star } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface TestimonialsSectionProps {
    testimonials: {
        name: string;
        role: string;
        content: string;
        stars: number;
    }[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    return (
        <section className="py-24 bg-white/60 overflow-hidden">
            <div className="container-normal px-4">
                <div className="text-center mb-16 space-y-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-primary">Our Collectors</p>
                    <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tight">Kind Words & Stories</h2>
                </div>

                <Carousel className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
                    <CarouselContent>
                        {testimonials.map((t, i) => (
                            <CarouselItem key={i}>
                                <div className="flex flex-col items-center text-center space-y-10 px-8">
                                    <Quote className="h-16 w-16 text-primary opacity-20" />
                                    <div className="flex text-amber-400 gap-2 justify-center">
                                        {Array.from({ length: t.stars }).map((_, s) => (
                                            <Star key={s} className="h-6 w-6 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-2xl lg:text-4xl text-foreground/80 leading-relaxed italic font-light max-w-3xl">
                                        "{t.content}"
                                    </p>
                                    <div className="space-y-2">
                                        <h4 className="text-base font-black uppercase tracking-[0.3em] text-primary">{t.name}</h4>
                                        <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-[0.3em]">{t.role}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
