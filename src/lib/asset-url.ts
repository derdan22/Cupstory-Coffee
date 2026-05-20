/** Public assets (public/) with correct base for GitHub Pages and local dev */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  const clean = path.replace(/^\//, '')
  return `${base}${clean}`
}
