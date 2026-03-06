import ProductDetailClient from './ProductDetailClient';
import productsDataStatic from "@/lib/products.json";

export function generateStaticParams() {
  return (productsDataStatic.products as any[]).map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
