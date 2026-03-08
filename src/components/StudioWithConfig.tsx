"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../sanity.config";

/**
 * Client-only Sanity Studio wrapper.
 * Loaded via dynamic import with ssr: false to keep Sanity out of the
 * Cloudflare Worker bundle (reduces size under 3 MiB limit).
 */
export default function StudioWithConfig() {
  return <NextStudio config={config} />;
}
