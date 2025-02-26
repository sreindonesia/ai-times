import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/dashboard",
        has: [
          {
            type: "cookie",
            key: "ai_times_token",
          },
        ],
        permanent: true,
      },
      {
        source: "/dashboard/:path*",
        destination: "/login",
        missing: [
          {
            type: "cookie",
            key: "ai_times_token",
          },
        ],
        permanent: true,
      },
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
