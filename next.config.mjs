/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["i.dummyjson.com", "dummyjson.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
