/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["m.media-amazon.com", "dietideals24-bucket.s3.amazonaws.com", "www.frosinonecalcio.com"],
  },
  async rewrites() {
    const isProd = process.env.VERCEL_ENV === "production";
    const apiBaseUrl = isProd
      // ? "https://server-dietideals24.fly.dev"
      ? "https://server-dietideals24.onrender.com"
      : "https://server-dietideals24-render-dev.onrender.com"
    
    console.log("IS PROD: " + isProd);
    console.log("API BASE URL: " + apiBaseUrl);

    return [
      {
        source: "/api/:path*",
        destination: apiBaseUrl + "/:path*"
      },
      {
        source: "/login/oauth2/:path*",
        destination: apiBaseUrl + "/login/oauth2/:path*"
      },
    ];
  },
};

module.exports = nextConfig;