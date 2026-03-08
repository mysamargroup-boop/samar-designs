import dynamic from "next/dynamic";

/**
 * Sanity Studio page for /studio route.
 *
 * NOTE: This file is a Server Component. We keep `ssr: false` inside a
 * separate Client Component wrapper to satisfy Next.js 15 rules.
 */

const StudioClient = dynamic(
  () => import("./StudioClient").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading Sanity Studio…</p>
      </div>
    ),
  }
);

export default function StudioPage() {
  return <StudioClient />;
}
