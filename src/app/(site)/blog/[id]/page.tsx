import BlogDetailClient from './BlogDetailClient';

export function generateStaticParams() {
  // Return fallback IDs to ensure static generation
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogDetailClient id={id} />;
}
