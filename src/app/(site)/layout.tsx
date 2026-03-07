import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { TopBar } from '@/components/TopBar';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-display antialiased min-h-screen flex flex-col pb-16 md:pb-0 relative art-bg-shell">


            <TopBar />
            <Header />
            <main className="flex-grow relative z-10">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}