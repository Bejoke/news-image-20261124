// A working news-image-daily entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. A starting point, not a winner: replace the image. The gate takes a
// whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync } from 'node:fs';
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync(new URL('./entry.png', import.meta.url), join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));

// Self-check: read the copied output back and verify it is a PNG within the 1 MiB gate limit.
const outputPath = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
const outputBytes = readFileSync(outputPath);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!outputBytes.subarray(0, 8).equals(pngMagic)) {
  console.error('entry.png failed self-check: missing PNG magic bytes');
  process.exit(1);
}
if (outputBytes.length > 1048576) {
  console.error(`entry.png failed self-check: ${outputBytes.length} bytes exceeds 1048576-byte limit`);
  process.exit(1);
}
console.log(`wrote ${outputPath} (${outputBytes.length} bytes)`);
