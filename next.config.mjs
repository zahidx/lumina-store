import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public", // Correct usage
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true, // ✅ Keep this OUTSIDE the PWA object
  swcMinify: true,
});

export default nextConfig;
