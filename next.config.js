/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["m.media-amazon.com"],
  },
  async rewrites() {
    const isProd = process.env.NEXT_ENV === "prod";
    return [
      {
        source: "/api/:path*",
        destination: isProd
          ? "https://server-dietideals24.onrender.com/:path*"
          : "https://server-dietideals24-render-dev.onrender.com/:path*",
      },
      {
        source: "/login/oauth2/:path*",
        destination: isProd
          ? process.env.NEXT_PUBLIC_API_URL_PROD + "/login/oauth2/:path*"
          : process.env.NEXT_PUBLIC_API_URL_DEV + "/login/oauth2/:path*",
      },
    ];
  },
};
