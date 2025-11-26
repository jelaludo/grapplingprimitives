const createMDX = require('@next/mdx');
const remarkGfm = require('remark-gfm');

// Enable static export for production builds or when explicitly set
// This allows dev server to work locally, but builds will be static-ready for Cloudflare Pages
const isStaticExport = 
  process.env.NEXT_STATIC_EXPORT === 'true' || 
  process.env.NODE_ENV === 'production';

// Log the mode (helpful for debugging)
if (process.env.NODE_ENV !== 'production') {
  console.log(`[Next.js Config] Development mode - static export ${isStaticExport ? 'enabled' : 'disabled'}`);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration - automatically enabled for builds
  ...(isStaticExport && { output: "export" }),
  
  // MDX support
  pageExtensions: ['ts', 'tsx', 'mdx'],
  
  reactStrictMode: true,
  typescript: {
    // We'll handle type errors during development
    ignoreBuildErrors: true, // Temporarily ignore to avoid legacy file errors
  },
  
  // Images - for static export
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);

