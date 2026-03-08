import CollectionProductDetailClient from './CollectionProductDetailClient';
import productsDataStatic from "@/lib/products.json";

import { clientNoCache } from '@/sanity/lib/client';

export async function generateStaticParams() {
  // Fetch from Sanity to include all new products added via CMS
  const products = await clientNoCache.fetch(`*[_type == "product"] {
    "category": category->name,
    subcategory,
    "id": slug.current
  }`);

  return products.map((p: any) => ({
    category: (p.category || 'all').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    sub: (p.subcategory || 'handcrafted').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    id: p.id,
  }));
}

export default async function CollectionProductDetailPage({ params }: { params: Promise<{ category: string, sub: string, id: string }> }) {
  const { id } = await params;
  return <CollectionProductDetailClient id={id} />;
}
