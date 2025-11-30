/**
 * Media URL configuration for local development vs production (R2)
 * 
 * In development: Uses local files from /public/images/gifs/
 * In production: Uses Cloudflare R2 bucket URLs
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const r2BaseUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL || '';
const r2GifsPath = process.env.NEXT_PUBLIC_R2_GIFS_PATH || '/gifs';

/**
 * Get the URL for a GIF file
 * @param filename - The filename of the GIF (e.g., 'technique-name.gif')
 * @returns The full URL to the GIF (local in dev, R2 in production)
 */
export const getGifUrl = (filename: string): string => {
  if (isDevelopment) {
    // Use local files in development
    return `/images/gifs/${filename}`;
  }
  // Use R2 URLs in production
  return `${r2BaseUrl}${r2GifsPath}/${filename}`;
};

/**
 * Get the base path for GIFs (useful for listing/manifest files)
 */
export const getGifsBasePath = (): string => {
  if (isDevelopment) {
    return '/images/gifs';
  }
  return `${r2BaseUrl}${r2GifsPath}`;
};

