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
      {
        source: "/login/oauth2/:path*",
        destination: "https://dietideals24-git-dev-graffioh.vercel.app/api/login/oauth2/:path*"
      },
      {
        source: "/login/oauth2/:path*",
        destination: "https://dietideals24.vercel.app/api/login/oauth2/:path*"
      }
    ];
  },
};
