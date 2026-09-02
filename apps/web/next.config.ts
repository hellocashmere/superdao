import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@superdao/hooks", "@superdao/lib", "@superdao/ui"],
};

export default nextConfig;
