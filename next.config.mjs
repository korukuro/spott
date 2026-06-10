/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      },
      // 👇 ADD THE BLOCKED DOMAIN HERE 👇
      {
        protocol: "https",
        hostname: "YOUR_BLOCKED_HOSTNAME_HERE", // e.g., "images.unsplash.com" or your Convex file domain
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;