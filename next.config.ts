import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactCompiler: false,
    experimental: {
      // File system caching untuk dev (Beta)
      turbopackFileSystemCacheForDev: true,
      
      // React Compiler (Stable, tapi tidak default)
    },
};

export default nextConfig;
