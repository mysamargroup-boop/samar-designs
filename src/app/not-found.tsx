import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { TopBar } from '@/components/TopBar';

export default function NotFound() {
  return (
    <div className="font-display antialiased min-h-screen flex flex-col pb-16 md:pb-0 relative">
      <TopBar />
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center space-y-8 pb-24">
        <div className="relative">
          <h1 className="text-[10rem] lg:text-[14rem] font-black text-primary/15 leading-none select-none">404</h1>
        </div>
        <div className="space-y-4 -mt-12">
          <h2 className="text-2xl lg:text-4xl font-black uppercase tracking-widest text-foreground">Lost in the Gallery?</h2>
          <p className="text-muted-foreground text-sm lg:text-lg max-w-md mx-auto font-light leading-relaxed">
            It seems the masterpiece you're looking for has been moved or doesn't exist yet. Let's get you back to safety.
          </p>
        </div>
        <Link href="/">
          <Button size="lg" className="rounded-full h-14 px-10 text-[10px] font-bold uppercase tracking-widest gradient-primary">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
