import { readdir, copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'public', 'images', '_sources')
const OUT = path.join(ROOT, 'public', 'images', '_sources-flat')

await mkdir(OUT, { recursive: true })

const files = await readdir(SRC)
const byPhoto = new Map()

for (const f of files) {
  const m = f.match(/photo_(\d+)_/)
  if (!m) continue
  const n = m[1]
  const prev = byPhoto.get(n)
  if (!prev || f > prev) byPhoto.set(n, f)
}

for (const [n, f] of [...byPhoto.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))) {
  await copyFile(path.join(SRC, f), path.join(OUT, `photo_${n}.png`))
  console.log(`photo_${n}.png <- ${f.slice(0, 60)}...`)
}

console.log('Prepared', byPhoto.size, 'files')
