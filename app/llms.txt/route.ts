/**
 * LLMs.txt Route
 *
 * Serves a standardized llms.txt file that provides AI assistants with
 * structured information about the site, following the llms.txt protocol.
 *
 * @see https://llmstxt.org/
 *
 * Accessible at: /llms.txt
 */

import { buildLlmsTxt } from "@/lib/llms";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

/**
 * GET /llms.txt
 * Returns a plain text file with site information optimized for LLM consumption
 */
export async function GET() {
  const content = buildLlmsTxt();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
