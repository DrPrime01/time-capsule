/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blush-eligible-cattle-890.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
