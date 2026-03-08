import ProductDetailClient from './ProductDetailClient';
import productsDataStatic from "@/lib/products.json";

import { clientNoCache } from '@/sanity/lib/client';

export async function generateStaticParams() {
  const products = await clientNoCache.fetch(`*[_type == "product"] {
    "id": productId,
    "slug": slug.current
  }`);

  // Return both productId and slug as valid IDs for path generation
  const paths = products.flatMap((p: any) => [
    { id: p.id },
    { id: p.slug }
  ].filter(path => path.id));

  return paths;
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
