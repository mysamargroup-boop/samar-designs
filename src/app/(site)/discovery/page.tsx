"use client";

import { useState } from 'react';
import { Sparkles, Send, Loader2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/types';

const WORKER_API_URL = 'https://samar-designs-api.mysamargroup.workers.dev';

interface DiscoveryResult {
  assistantResponse: string;
  suggestedProducts: {
    productId: string;
    name: string;
    description: string;
    sale_price: number;
    regular_price?: number;
    imageUrl: string;
    categories: string[];
  }[];
}

export default function DiscoveryPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiscoveryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${WORKER_API_URL}/api/ai-discovery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || `Server error (${response.status})`);
      }

      const data: DiscoveryResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error("Discovery error:", err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Convert AI suggestions to Product format for ProductCard
  const suggestedAsProducts: Product[] = (result?.suggestedProducts || []).map((p) => ({
    id: p.productId,
    name: p.name,
    description: p.description,
    sale_price: p.sale_price,
    regular_price: p.regular_price || p.sale_price * 1.3,
    imageUrl: p.imageUrl,
    category: p.categories?.[0] || 'Handmade',
    images: [p.imageUrl],
    tags: p.categories || [],
    inStock: true,
    badge: 'AI Pick',
  }));

  const suggestions = [
    "A gift for someone who loves pottery and nature",
    "Bohemian wall art for a bright living room",
    "Unique jewelry with traditional touch",
    "Handmade decor for a cozy study room"
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl overflow-hidden min-h-[80vh]">
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Sumegha AI</span>
        </div>
        <h1 className="text-4xl lg:text-7xl font-black font-headline tracking-tight uppercase leading-none">AI Art Concierge</h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
          Describe what you're looking for, the occasion, or the vibe you want to achieve, and let our AI curate the perfect handmade selection for you.
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-20">
        <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'A unique gift for my sister who loves earthy tones and ceramics'..."
            className="h-16 lg:h-20 px-6 rounded-[2rem] text-base lg:text-lg shadow-xl shadow-primary/5 border-primary/20 focus:ring-primary bg-white/50 backdrop-blur-sm"
            disabled={loading}
          />
          <Button
            type="submit"
            className="h-16 lg:h-20 px-10 rounded-[2rem] gradient-primary shadow-xl shadow-primary/20 text-sm font-black uppercase tracking-widest shrink-0"
            disabled={loading || !query.trim()}
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
            <span className="ml-2 hidden sm:inline">Discover</span>
          </Button>
        </form>

        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => setQuery(s)}
              className="text-[11px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-full border border-primary/10 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary hover:border-primary/20 hover:scale-105"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-in fade-in duration-500">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse" />
            <Loader2 className="h-12 w-12 text-primary animate-spin relative z-10" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary animate-pulse">Our AI is curating your perfect collection...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-2xl mx-auto text-center space-y-4 animate-in fade-in duration-500">
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 space-y-4">
            <p className="text-red-600 font-medium">{error}</p>
            <Button variant="outline" onClick={() => setError(null)} className="rounded-full border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest">
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Result State */}
      {result && !loading && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* AI Response */}
          <div className="bg-gradient-to-br from-primary/5 to-white p-8 lg:p-12 rounded-[3rem] shadow-xl shadow-primary/5 border border-primary/10 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
              <Sparkles className="h-32 w-32 text-primary" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              <div className="bg-white p-4 rounded-full shadow-lg text-primary mb-2">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-black font-headline tracking-tight uppercase">
                Sumegha AI Suggestion
              </h3>
              <p className="text-lg lg:text-xl leading-relaxed text-foreground/80 font-light max-w-2xl italic">
                "{result.assistantResponse}"
              </p>
            </div>
          </div>

          {/* Product Suggestions Grid */}
          {suggestedAsProducts.length > 0 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl lg:text-4xl font-black uppercase tracking-tight">Curated For You</h3>
                <p className="text-sm text-muted-foreground">Handpicked by our AI based on your preferences</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                {suggestedAsProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* No Products Found */}
          {suggestedAsProducts.length === 0 && (
            <div className="text-center space-y-6">
              <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 text-xs font-bold uppercase tracking-widest" onClick={() => window.location.href = '/products'}>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Browse Our Full Gallery
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
