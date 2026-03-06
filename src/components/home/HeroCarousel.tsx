"use client";

import * as React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
    slides: {
        badge: string;
        title: string;
        highlight: string;
        categoryName: string;
        desc: string;
        image: string;
        linkUrl: string;
        buttonText: string;
    }[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [progress, setProgress] = React.useState(0);

    const SLIDE_DURATION = 7000;

    const plugin = React.useRef(
        Autoplay({ delay: SLIDE_DURATION, stopOnInteraction: false })
    );

    React.useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
            setProgress(0);
        });
    }, [api]);

    React.useEffect(() => {
        if (!api) return;
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + (100 / (SLIDE_DURATION / 100))));
        }, 100);
        return () => clearInterval(interval);
    }, [api, current]);

    return (
        <section className="relative w-full overflow-hidden">
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full"
            >
                <CarouselContent className="ml-0">
                    {slides.map((slide, index) => (
                        <CarouselItem key={index} className="relative pl-0">
                            <div className="relative h-[50vh] lg:h-[60vh] min-h-[400px] w-full bg-black/5">
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={slide.image}
                                        alt={slide.categoryName}
                                        fill
                                        sizes="100vw"
                                        className={cn(
                                            "object-cover transition-all duration-1000 ease-in-out",
                                            current === index ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-110"
                                        )}
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
                                </div>

                                <div className={cn(
                                    "relative z-10 h-full flex items-center justify-center p-6 sm:p-12 pb-20 sm:pb-32 text-center transition-all duration-1000 ease-out",
                                    current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                )}>
                                    <div className="max-w-4xl w-full flex flex-col items-center space-y-6">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="inline-block px-5 py-2 rounded-full border border-white/30 text-[10px] font-black uppercase tracking-[0.4em] text-white bg-white/10 backdrop-blur-md">
                                                {slide.badge}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none uppercase tracking-tighter text-white drop-shadow-lg">
                                                {slide.title}
                                            </h1>
                                            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none uppercase tracking-tighter text-primary drop-shadow-lg">
                                                {slide.highlight}
                                            </h2>
                                        </div>
                                        <p className="text-[10px] sm:text-xs lg:text-sm text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-md px-4">
                                            {slide.desc}
                                        </p>
                                        <div className="pt-4 lg:pt-8">
                                            <Link href={slide.linkUrl || `/products?category=${encodeURIComponent(slide.categoryName)}`}>
                                                <Button className="h-12 lg:h-14 px-10 lg:px-14 rounded-2xl text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] gradient-primary border-none shadow-none active:scale-95 transition-all hover:scale-105">
                                                    {slide.buttonText}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {Array.from({ length: count }).map((_, i) => (
                        <button
                            key={i}
                            className="relative h-1.5 w-10 bg-white/20 rounded-full overflow-hidden transition-all duration-300"
                            onClick={() => api?.scrollTo(i)}
                        >
                            {current === i && (
                                <div
                                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-100 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </Carousel>
        </section>
    );
}
