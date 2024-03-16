const isProd = process.env.NEXT_ENV === "prod";

const config = {
  apiUrl: isProd
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV,
};

module.exports = config;
