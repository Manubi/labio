/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@web3auth/web3auth-wagmi-connector"],
};

module.exports = nextConfig;
