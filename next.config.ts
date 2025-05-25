import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bauonopzgphppgbxrcri.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // todo dont forget to remove via.placeholder.com protocol
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
