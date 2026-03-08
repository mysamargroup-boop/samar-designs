import CollectionProductDetailClient from './CollectionProductDetailClient';
import productsDataStatic from "@/lib/products.json";

import { clientNoCache } from '@/sanity/lib/client';

export async function generateStaticParams() {
  // Fetch from Sanity to include all new products added via CMS
  const products = await clientNoCache.fetch(`*[_type == "product"] {
    "category": category->name,
    subcategory,
    "slug": slug.current,
    "productId": productId
  }`);

  // Generate routes for BOTH slug and productId to ensure all URL formats work
  const params: { category: string; sub: string; id: string }[] = [];
  for (const p of products) {
    const category = (p.category || 'all').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const sub = (p.subcategory || 'handcrafted').toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Route for slug-based URL
    if (p.slug) {
      params.push({ category, sub, id: p.slug });
    }
    // Route for productId-based URL (backward compatibility)
    if (p.productId && p.productId !== p.slug) {
      params.push({ category, sub, id: p.productId });
    }
  }
  return params;
}

export default async function CollectionProductDetailPage({ params }: { params: Promise<{ category: string, sub: string, id: string }> }) {
  const { id } = await params;
  return <CollectionProductDetailClient id={id} />;
}
