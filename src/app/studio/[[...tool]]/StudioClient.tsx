"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Client-only Sanity Studio wrapper.
 * This keeps Sanity Studio running fully on the client while allowing the
 * /studio route to remain a Server Component page.
 */
export default function StudioClient() {
  return <NextStudio config={config} />;
}

