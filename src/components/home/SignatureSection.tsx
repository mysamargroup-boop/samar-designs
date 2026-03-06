"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SignatureSectionProps {
    aboutQuote?: string;
    aboutStory?: string;
}

export function SignatureSection({ aboutQuote, aboutStory }: SignatureSectionProps) {
    return (
        <section className="py-24 bg-white/40 overflow-hidden">
            <div className="container-normal px-4 flex flex-col items-center text-center space-y-8">
                <h2 className="text-7xl lg:text-9xl font-cursive text-primary lowercase tracking-tight drop-shadow-sm select-none">
                    Sumegha
                </h2>
                <div className="max-w-2xl space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40">The Heart Behind the Art</p>
                    <p className="text-xl lg:text-3xl font-light text-foreground/80 leading-relaxed italic">
                        "{aboutQuote || "Every piece I craft carries a fragment of my soul and a whisper of tradition."}"
                    </p>
                    <p className="text-sm lg:text-base text-foreground/60 leading-relaxed font-medium">
                        {aboutStory || "What started as a simple desire to preserve the warmth of human touch has evolved into a legacy of craftsmanship. Our work is a celebration of patience, precision, and the beautiful imperfections of the handmade process."}
                    </p>
                </div>
                <Link href="/about">
                    <Button variant="link" className="text-primary font-black uppercase tracking-widest text-[10px] border-b border-primary/20 pb-1 h-auto">
                        Read Our Full Story
                    </Button>
                </Link>
            </div>
        </section>
    );
}
