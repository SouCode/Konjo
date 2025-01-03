import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable React Strict Mode
  reactStrictMode: false,

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  webpack: (config, { dev }) => {
    if (dev) {
      // Use inline source maps in development to avoid loading external `.map` files
      config.devtool = "eval-source-map";
    } else {
      // Disable source maps in production
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
