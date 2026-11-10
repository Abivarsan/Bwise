/**
 * Resolves static asset paths dynamically according to Vite's `BASE_URL`.
 * Works seamlessly whether hosted on root `/` (local dev, custom domain)
 * or a GitHub Pages subpath like `/Bwise/`.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
