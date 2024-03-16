const isProd = process.env.NEXT_ENV === "prod";

console.log("IS PROD? " + isProd)

const config = {
  apiUrl: isProd
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV,
};

console.log("process.env.NEXT_PUBLIC_API_URL_PROD = " + process.env.NEXT_PUBLIC_API_URL_PROD)
console.log("process.env.NEXT_PUBLIC_API_URL_DEV = " + process.env.NEXT_PUBLIC_API_URL_DEV)
console.log("CONFIG API URL: " + config.apiUrl)

module.exports = config;
