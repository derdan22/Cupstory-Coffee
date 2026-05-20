import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const RAW_DIR = path.join(ROOT, 'public', 'images', '_raw')
const OUT_DIR = path.join(ROOT, 'public', 'images')
const SIZE = 800
const WEBP_QUALITY = 82

await mkdir(OUT_DIR, { recursive: true })

let files = []
try {
  files = (await readdir(RAW_DIR)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
} catch {
  console.error('No _raw folder or images found:', RAW_DIR)
  process.exit(1)
}

for (const file of files) {
  const base = path.parse(file).name
  const input = path.join(RAW_DIR, file)
  const outWebp = path.join(OUT_DIR, `${base}.webp`)
  const outPng = path.join(OUT_DIR, `${base}.png`)

  const pipeline = sharp(input)
    .rotate()
    .resize(SIZE, SIZE, { fit: 'cover', position: 'centre' })

  await pipeline.clone().webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(outWebp)
  await pipeline.clone().png({ compressionLevel: 9 }).toFile(outPng)

  const { size: webpBytes } = await stat(outWebp)
  console.log(`${base}.webp — ${Math.round(webpBytes / 1024)} KB`)
}

console.log('Done:', files.length, 'images')
