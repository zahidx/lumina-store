const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', // Disable in dev mode
  });
  module.exports = withPWA({
    reactStrictMode: true,
  });
  