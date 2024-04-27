/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mw566h3jtztqoili.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
