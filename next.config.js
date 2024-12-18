/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["m.media-amazon.com", "dietideals24-bucket.s3.amazonaws.com", "www.frosinonecalcio.com"],
  },
  async rewrites() {
    const isProd = process.env.VERCEL_ENV === "production";
    const apiBaseUrl = isProd
      ? "https://dietideals24containerapp.greenmushroom-970193d0.italynorth.azurecontainerapps.io"
      : "http://localhost:8080"

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

module.exports = nextConfig;