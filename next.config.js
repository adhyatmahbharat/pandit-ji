'use client';
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(__dirname, '')
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com'
      },
      {
        hostname: 'res.cloudinary.com'
      },
      {
        hostname: 'adhyatmah.vercel.app'
      },
      {
        hostname: 'adhyatmah-fe-staging.vercel.app'
      },
      {
        hostname: 'example.com' // Add this line
      },
      { hostname: 'adhyatmah.com' },
      { hostname: 'www.adhyatmah.com' },
      { hostname: 'cdn.shopify.com' },
      { hostname: 'shopify.com' }
    ]
  }
};

module.exports = nextConfig;