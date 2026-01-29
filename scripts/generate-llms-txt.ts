/**
 * Build-time script: generates public/llms.txt from @/lib/llms.
 * Run before `next build` (prebuild script). Writes llms.txt to public/ for AI assistants.
 */

import { writeFileSync } from "fs";
import { join } from "path";
import { buildLlmsTxt } from "@/lib/llms";

const outPath = join(process.cwd(), "public", "llms.txt");
writeFileSync(outPath, buildLlmsTxt(), "utf-8");
console.log("Generated:", outPath);
