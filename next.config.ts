import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

function buildContentSecurityPolicy(): string {
  const scriptSrc = isDev
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com"
    : "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com";

  const connectSrc = isDev
    ? "connect-src 'self' ws: wss: https://challenges.cloudflare.com"
    : "connect-src 'self' https://challenges.cloudflare.com";

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://challenges.cloudflare.com",
    "font-src 'self'",
    connectSrc,
    "frame-src 'self' https://challenges.cloudflare.com",
  ].join("; ");
}

function getSecurityHeaders() {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
  ];
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Allow LAN IPs and Cloudflare quick-tunnel hostnames to load dev JS/CSS bundles
  allowedDevOrigins: ["192.168.1.4", "*.trycloudflare.com"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: getSecurityHeaders(),
      },
    ];
  },
};

export default nextConfig;
