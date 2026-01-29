/**
 * Build-time script: generates public/llms.txt from @/lib/llms.
 * Run before `next build` when using static export (output: 'export').
 * llms.txt is then served as a static asset from public/.
 */

import { writeFileSync } from "fs";
import { join } from "path";
import { buildLlmsTxt } from "@/lib/llms";

const outPath = join(process.cwd(), "public", "llms.txt");
writeFileSync(outPath, buildLlmsTxt(), "utf-8");
console.log("Generated:", outPath);
