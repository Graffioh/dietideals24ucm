/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["m.media-amazon.com"],
  },
  async rewrites() {
    const isProd = process.env.NODE_ENV === "production";
    const apiBaseUrl = isProd
      ? "https://server-dietideals24.onrender.com"
      : "https://server-dietideals24-render-dev.onrender.com"

    return [
      {
        source: "/api/:path*",
        destination: apiBaseUrl + "/:path*"
      },
      {
        source: "/login/oauth2/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL + "/login/oauth2/:path*"
      },
    ];
  },
};
