/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
        allowedOrigins: ["web.hello-utils.wiki"],
    },
  },
};

export default nextConfig;
