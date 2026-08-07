import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce-back-gbe4fndmdxfdctab.canadacentral-01.azurewebsites.net/',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
