/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**", // Allows all image paths from Clerk
      },
      // 💡 If you use other image hosts (like Unsplash or AWS S3), 
      // just copy the block above and change the hostname!
    ],
  },
};

export default nextConfig;