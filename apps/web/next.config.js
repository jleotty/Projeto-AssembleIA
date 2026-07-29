/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@assembleia/db"],
};

module.exports = nextConfig;
