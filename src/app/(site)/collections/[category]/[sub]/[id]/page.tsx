import CollectionProductDetailClient from './CollectionProductDetailClient';
import productsDataStatic from "@/lib/products.json";

export function generateStaticParams() {
  return (productsDataStatic.products as any[]).map((p) => ({
    category: p.category || 'all',
    sub: p.sub_category || 'all',
    id: p.slug || p.id,
  }));
}

export default async function CollectionProductDetailPage({ params }: { params: Promise<{ category: string, sub: string, id: string }> }) {
  const { id } = await params;
  return <CollectionProductDetailClient id={id} />;
}
