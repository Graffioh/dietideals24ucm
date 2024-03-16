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
        source: "/dietideals24.vercel.app/api/:path*",
        destination: "https://server-dietideals24.onrender.com/:path*"
      },
      {
        source: "/api/:path*",
        destination: "https://server-dietideals24-render-dev.onrender.com/:path*"
      },
      {
        source: "/login/oauth2/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL + "/login/oauth2/:path*"
      },
    ];
  },
};
