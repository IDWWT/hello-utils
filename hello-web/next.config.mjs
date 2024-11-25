/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    serverActions: {
        allowedOrigins: ["web.hello-utils.wiki"],
    },
  },
};

export default nextConfig;
