/**
 * Absolute base URL used for metadata, Open Graph tags and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL in production; on Vercel the production domain is
 * picked up automatically when it isn't set.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
