
import { getAllCategories } from '@/sanity/lib/queries';
import CategorySection from '@/components/collections/CategorySection';

export const revalidate = 60; // Revalidate every minute

export default async function CollectionsPage() {
  const sanityCategories = await getAllCategories();

  return (
    <div className="min-h-screen pb-24">
      <div className="container-normal mx-auto py-8 lg:py-16 px-4 space-y-12 lg:space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-primary">Curated Selections</p>
          <h1 className="text-3xl lg:text-7xl font-black uppercase tracking-tight text-foreground">Our Collections</h1>
          <p className="text-foreground/50 text-xs lg:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Explore the different realms of artistry at Sumegha Handmades. From royal weddings to soulful home sanctuaries.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16 lg:space-y-24">
          {sanityCategories.map((collection, index) => (
            <CategorySection key={collection.id || index} collection={collection} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
