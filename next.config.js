/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    // Fix for ESLint configuration errors
    ignoreDuringBuilds: true, // Temporarily ignore ESLint during builds
  },
};

module.exports = nextConfig;
