/**
 * Regenerates the raster icons from the logo mark:
 *   src/app/favicon.ico        16/32/48px (PNG-in-ICO)
 *   src/app/apple-icon.png     180px, full-bleed (iOS applies its own mask)
 *   public/icon-192.png        rounded, manifest "any"
 *   public/icon-512.png        rounded, manifest "any"
 *   public/icon-maskable-512.png  full-bleed with safe-zone padding
 *
 * Usage: node scripts/generate-icons.mjs   (uses `sharp`, installed with Next.js)
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GLYPH = "M12 10.5 6.5 16l5.5 5.5M20 10.5l5.5 5.5-5.5 5.5M17.6 8.5l-3.2 15";

function logoSvg({ radius = 8, glyphScale = 1 } = {}) {
  const offset = 16 - 16 * glyphScale;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <defs><linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#5b7cfa"/><stop offset="1" stop-color="#22c3d8"/>
      </linearGradient></defs>
      <rect width="32" height="32" rx="${radius}" fill="url(#g)"/>
      <g transform="translate(${offset} ${offset}) scale(${glyphScale})">
        <path d="${GLYPH}" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>`,
  );
}

const png = (svg, size) => sharp(svg, { density: 1200 }).resize(size, size).png().toBuffer();

function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map(({ data }) => data)]);
}

const rounded = logoSvg();
const fullBleed = logoSvg({ radius: 0, glyphScale: 0.8 });
const maskable = logoSvg({ radius: 0, glyphScale: 0.62 });

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(icoSizes.map(async (size) => ({ size, data: await png(rounded, size) })));

await Promise.all([
  writeFile(path.join(root, "src/app/favicon.ico"), toIco(icoImages)),
  png(fullBleed, 180).then((data) => writeFile(path.join(root, "src/app/apple-icon.png"), data)),
  png(rounded, 192).then((data) => writeFile(path.join(root, "public/icon-192.png"), data)),
  png(rounded, 512).then((data) => writeFile(path.join(root, "public/icon-512.png"), data)),
  png(maskable, 512).then((data) => writeFile(path.join(root, "public/icon-maskable-512.png"), data)),
]);

console.log("Icons generated.");
