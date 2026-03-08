import dynamic from "next/dynamic";

/**
 * Sanity Studio - loaded only on client to reduce Cloudflare Worker bundle size.
 * ssr: false keeps @sanity/* and next-sanity out of the server/Worker bundle.
 */
const StudioWithConfig = dynamic(
  () => import("@/components/StudioWithConfig"),
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
  return <StudioWithConfig />;
}
