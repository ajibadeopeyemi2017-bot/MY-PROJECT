/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,
  ...(isExport ? {
    output: 'export',
    images: { unoptimized: true },
    trailingSlash: true,
  } : {}),
};

module.exports = nextConfig;
