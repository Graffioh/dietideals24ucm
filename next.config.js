/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["m.media-amazon.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://server-dietideals24.onrender.com/:path*",
      },
    ];
  },
};
