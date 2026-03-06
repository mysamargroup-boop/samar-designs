"use client";

import * as React from "react";
import productsData from "@/lib/products.json";
import categoriesData from "@/lib/categories.json";
import placeholderData from "@/lib/placeholder-images.json";
import { Product } from "@/lib/types";

// Sanity imports
import { getAllProducts, getAllCategories, getAllTestimonials, getSiteSettings } from "@/sanity/lib/queries";
import type { SanityCategory, SanityTestimonial, SanitySiteSettings } from "@/sanity/lib/queries";

// Section Components
import { MobileCategorySlider } from "@/components/home/MobileCategorySlider";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { SpotlightGallery } from "@/components/home/SpotlightGallery";
import { ProductCollections } from "@/components/home/ProductCollections";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SignatureSection } from "@/components/home/SignatureSection";
import { DiscoveryCTA } from "@/components/home/DiscoveryCTA";

export default function Home() {
  // Sanity data states
  const [sanityProducts, setSanityProducts] = React.useState<Product[] | null>(null);
  const [sanityCategories, setSanityCategories] = React.useState<SanityCategory[] | null>(null);
  const [sanityTestimonials, setSanityTestimonials] = React.useState<SanityTestimonial[] | null>(null);
  const [sanitySettings, setSanitySettings] = React.useState<SanitySiteSettings | null>(null);

  // Fetch Sanity data on mount
  React.useEffect(() => {
    async function fetchSanityData() {
      try {
        const [products, categories, testimonials, settings] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
          getAllTestimonials(),
          getSiteSettings(),
        ]);
        if (products && products.length > 0) setSanityProducts(products);
        if (categories && categories.length > 0) setSanityCategories(categories);
        if (testimonials && testimonials.length > 0) setSanityTestimonials(testimonials);
        if (settings) setSanitySettings(settings);
      } catch (error) {
        console.log("Sanity fetch failed, using local data:", error);
      }
    }
    fetchSanityData();
  }, []);

  // Use Sanity data if available, otherwise fallback to local JSON
  const products: Product[] = sanityProducts || productsData.products as Product[];

  const categories = sanityCategories || categoriesData.categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    imageUrl: cat.imageUrl,
    subCategories: cat.subCategories,
  }));

  const productsByCategory: Record<string, Product[]> = products.reduce((acc: Record<string, Product[]>, product: Product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Fallback testimonials
  const fallbackTestimonials = [
    {
      name: "Anjali Mehta",
      role: "Home Stylist",
      content: "The Lippan Art piece I bought is the soul of my living room. Every guest asks about it!",
      stars: 5
    },
    {
      name: "Rohan Sharma",
      role: "Gifting Enthusiast",
      content: "The personalized nameplate exceeded my expectations. Sumegha's attention to detail is unmatched.",
      stars: 5
    },
    {
      name: "Priya Das",
      role: "Bridal Client",
      content: "My bridal trunk box is a treasure. It's royal, elegant, and perfectly handcrafted.",
      stars: 5
    }
  ];

  const testimonials = sanityTestimonials || fallbackTestimonials;

  const instagramPostsFallback = placeholderData.placeholderImages.filter(img => img.id.startsWith('insta-'));

  // Fallback spotlight images
  const fallbackSpotlightImages = [
    { url: "https://picsum.photos/seed/spot1/1000/1000", title: "Artisanal Details" },
    { url: "https://picsum.photos/seed/spot2/1000/1000", title: "Premium Finishes" },
    { url: "https://picsum.photos/seed/spot3/1000/1000", title: "Bespoke Creations" },
    { url: "https://picsum.photos/seed/spot4/1000/1000", title: "Handcrafted Love" },
  ];

  const spotlightImages = sanitySettings?.spotlightImages?.map(s => ({
    url: s.imageUrl,
    title: s.title,
  })) || fallbackSpotlightImages;

  // Hero slides: use Sanity settings if available, else derive from categories
  const heroSlides = sanitySettings?.heroSlides?.map(slide => ({
    badge: slide.badge || "COLLECTION HIGHLIGHT",
    title: slide.title || "",
    highlight: slide.highlight || "",
    categoryName: slide.title + " " + slide.highlight,
    desc: slide.description || "",
    image: slide.imageUrl || "",
    linkUrl: slide.linkUrl || "",
    buttonText: slide.buttonText || "Shop Now",
  })) || categories.map((cat, idx) => ({
    badge: "COLLECTION HIGHLIGHT",
    title: cat.name.split(' ')[0].toUpperCase(),
    highlight: cat.name.split(' ').slice(1).join(' ').toUpperCase(),
    categoryName: cat.name,
    desc: cat.description,
    image: cat.imageUrl || `https://picsum.photos/seed/hero-${idx}/1920/1080`,
    linkUrl: `/products?category=${encodeURIComponent(cat.name)}`,
    buttonText: `Shop ${cat.name}`,
  }));

  // Instagram
  const instaUrl = sanitySettings?.instagramUrl || "https://instagram.com/sumegha_handmades";
  const instaHandle = sanitySettings?.instagramHandle || "@sumegha_handmades";
  const sanityInstaPosts = sanitySettings?.instagramPosts;

  const instaPosts = (sanityInstaPosts && sanityInstaPosts.length > 0)
    ? sanityInstaPosts.map((url, i) => ({ imageUrl: url, key: i }))
    : instagramPostsFallback.map((post, i) => ({ imageUrl: post.imageUrl, key: i }));

  const patternUrl = placeholderData.placeholderImages.find(img => img.id === 'hero-pattern')?.imageUrl || '';

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <MobileCategorySlider categories={categories} />
      <HeroCarousel slides={heroSlides} />
      <CategoryGrid categories={categories} />
      <SpotlightGallery images={spotlightImages} />
      <ProductCollections productsByCategory={productsByCategory} />
      <InstagramFeed instaUrl={instaUrl} instaHandle={instaHandle} posts={instaPosts} />
      <TestimonialsSection testimonials={testimonials} />
      <SignatureSection aboutQuote={sanitySettings?.aboutQuote} aboutStory={sanitySettings?.aboutStory} />
      <DiscoveryCTA patternUrl={patternUrl} />
    </div>
  );
}
