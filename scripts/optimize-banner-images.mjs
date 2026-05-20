import { readdir, mkdir, copyFile, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const ASSETS = path.join(
  process.env.USERPROFILE ?? '',
  '.cursor',
  'projects',
  'c-Users-Denys-Chabaniuk-Desktop-cupstory-coffee',
  'assets',
)
const RAW = path.join(ROOT, 'public', 'images', 'banner', '_raw')
const OUT = path.join(ROOT, 'public', 'images', 'banner')
const SIZE = 800

await mkdir(RAW, { recursive: true })
await mkdir(OUT, { recursive: true })

let files = []
try {
  const assetFiles = await readdir(ASSETS)
  for (const f of assetFiles.filter((n) => n.startsWith('banner-') && n.endsWith('.png'))) {
    await copyFile(path.join(ASSETS, f), path.join(RAW, f))
    files.push(f)
  }
} catch {
  files = (await readdir(RAW)).filter((f) => f.endsWith('.png'))
}

for (const file of files) {
  const base = path.parse(file).name
  const input = path.join(RAW, file)
  await sharp(input)
    .rotate()
    .resize(SIZE, SIZE, { fit: 'cover', position: 'centre' })
    .webp({ quality: 84, effort: 6 })
    .toFile(path.join(OUT, `${base}.webp`))
  const { size } = await stat(path.join(OUT, `${base}.webp`))
  console.log(`${base}.webp — ${Math.round(size / 1024)} KB`)
}

console.log('Banner images:', files.length)
