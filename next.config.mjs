// next.config.mjs
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  pwa: {
    dest: 'public', // Destination folder for the service worker
    disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
  },
});

export default nextConfig;
