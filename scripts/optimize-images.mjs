#!/usr/bin/env node
/**
 * Converts all .png and .jpg/.jpeg files under public/images/ to .webp
 * - Skips files that already have a .webp sibling
 * - Skips the memory/ subdirectory (already has webp/avif variants)
 * - Preserves originals (delete manually after verifying)
 * - Reports before/after sizes
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';

const ROOT = 'public/images';
const SKIP_DIRS = ['memory']; // already optimized
const QUALITY = 80;

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let skipped = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.includes(entry.name)) { console.log(`  skip dir: ${full}`); continue; }
      await walk(full);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

      const webpPath = join(dirname(full), basename(entry.name, ext) + '.webp');
      // Skip if webp already exists
      try { await stat(webpPath); skipped++; continue; } catch {}

      const before = (await stat(full)).size;
      totalBefore += before;

      try {
        await sharp(full).webp({ quality: QUALITY }).toFile(webpPath);
        const after = (await stat(webpPath)).size;
        totalAfter += after;
        converted++;
        const pct = ((1 - after / before) * 100).toFixed(0);
        console.log(`  ${full} → .webp  ${fmt(before)} → ${fmt(after)}  (-${pct}%)`);
      } catch (err) {
        console.error(`  ERROR: ${full}: ${err.message}`);
      }
    }
  }
}

function fmt(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'M';
  return (bytes / 1024).toFixed(0) + 'K';
}

console.log('Image optimization: PNG/JPG → WebP');
console.log('===================================');
await walk(ROOT);
console.log('-----------------------------------');
console.log(`Converted: ${converted} files`);
console.log(`Skipped:   ${skipped} (webp already exists)`);
console.log(`Original:  ${fmt(totalBefore)}`);
console.log(`WebP:      ${fmt(totalAfter)}`);
console.log(`Saved:     ${fmt(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
