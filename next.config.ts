import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow LAN IPs and Cloudflare quick-tunnel hostnames to load dev JS/CSS bundles
  allowedDevOrigins: ["192.168.1.4", "*.trycloudflare.com"],
};

export default nextConfig;
