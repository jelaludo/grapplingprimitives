const createMDX = require('@next/mdx');
const remarkGfm = require('remark-gfm');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration
  output: "export",
  
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

