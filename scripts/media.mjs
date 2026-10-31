// Genera AVIF/WebP a varios anchos y el vídeo de la intro (MP4 H.264 + WebM VP9).
// Uso: npm run media
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = 'assets/_src';
const OUT = 'public/media';
const WIDTHS = [640, 1280, 1920];
mkdirSync(OUT, { recursive: true });

const manifest = {};
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.jpg'))) {
  const name = parse(file).name;
  const img = sharp(join(SRC, file));
  const { width, height } = await img.metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  for (const w of widths) {
    const resized = sharp(join(SRC, file)).resize({ width: w });
    await resized.clone().avif({ quality: 52, effort: 5 }).toFile(join(OUT, `${name}-${w}.avif`));
    await resized.clone().webp({ quality: 72 }).toFile(join(OUT, `${name}-${w}.webp`));
  }
  manifest[name] = { w: width, h: height, widths };
  console.log(name, width, 'x', height);
}
writeFileSync('src/data/media.json', JSON.stringify(manifest, null, 2));

// Vídeo: 6 s, 1280 px, sin audio.
const video = join(SRC, 'hero-src.mp4');
if (existsSync(video)) {
  const common = ['-y', '-ss', '2', '-t', '6', '-i', video, '-an', '-vf', 'scale=1280:-2,fps=25'];
  execFileSync(ffmpeg, [...common, '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-crf', '21', '-preset', 'slow', '-movflags', '+faststart', join(OUT, 'hero.mp4')], { stdio: 'ignore' });
  execFileSync(ffmpeg, [...common, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '32', '-row-mt', '1', join(OUT, 'hero.webm')], { stdio: 'ignore' });
  execFileSync(ffmpeg, ['-y', '-ss', '2', '-i', video, '-frames:v', '1', '-vf', 'scale=1920:-2', join(SRC, 'hero-poster.png')], { stdio: 'ignore' });
  await sharp(join(SRC, 'hero-poster.png')).resize({ width: 1280 }).avif({ quality: 50 }).toFile(join(OUT, 'hero-poster.avif'));
  await sharp(join(SRC, 'hero-poster.png')).resize({ width: 1280 }).webp({ quality: 70 }).toFile(join(OUT, 'hero-poster.webp'));
  for (const f of ['hero.mp4', 'hero.webm', 'hero-poster.avif', 'hero-poster.webp']) {
    console.log(f, (statSync(join(OUT, f)).size / 1024).toFixed(0), 'KB');
  }
}
