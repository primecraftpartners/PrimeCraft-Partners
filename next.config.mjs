/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/primecraftpartners/PrimeCraft-Partners-Catalogue/**"
      }
    ]
  }
};

export default nextConfig;
