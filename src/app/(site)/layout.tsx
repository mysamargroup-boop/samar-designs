import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { TopBar } from '@/components/TopBar';
import { getAllCategories } from '@/sanity/lib/queries';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
    const sanityCategories = await getAllCategories();

    return (
        <div className="font-display antialiased min-h-screen flex flex-col pb-16 md:pb-0 relative art-bg-shell">


            <TopBar />
            <Header categories={sanityCategories} />
            <main className="flex-grow relative z-10">
                {children}
            </main>
            <Footer categories={sanityCategories} />
            <BottomNav />
        </div>
    );
}