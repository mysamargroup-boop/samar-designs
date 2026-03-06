"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

interface InstagramFeedProps {
    instaUrl: string;
    instaHandle: string;
    posts: {
        imageUrl: string;
        key: any;
    }[];
}

export function InstagramFeed({ instaUrl, instaHandle, posts }: InstagramFeedProps) {
    return (
        <section className="py-24 bg-white/40">
            <div className="container-normal px-4">
                <div className="text-center mb-16 space-y-6">
                    <Link
                        href={instaUrl}
                        target="_blank"
                        className="inline-flex items-center gap-3 text-primary text-[11px] font-black uppercase tracking-[0.6em] hover:opacity-80 transition-opacity"
                    >
                        <Instagram className="h-5 w-5" />
                        {instaHandle}
                    </Link>
                    <h2 className="text-3xl lg:text-6xl font-black uppercase tracking-tight">On the Gram</h2>
                    <p className="text-foreground/50 text-base max-w-xl mx-auto leading-relaxed">Follow our creative journey and see how our art comes to life in homes around the world.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {posts.map((post) => (
                        <a key={post.key} href={instaUrl} target="_blank" className="relative aspect-square group overflow-hidden rounded-2xl transition-all">
                            <Image
                                src={post.imageUrl}
                                alt={`Instagram post ${post.key + 1}`}
                                fill
                                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 16.66vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Instagram className="text-white h-10 w-10 drop-shadow-lg" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
