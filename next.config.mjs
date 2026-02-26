/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This lets production builds succeed even if ESLint errors are present
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
