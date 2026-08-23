import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow phone/other devices on the local network to load dev JS bundles
  allowedDevOrigins: ["192.168.1.4"],
};

export default nextConfig;
