import path from "node:path";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  // If your repository is https://github.com/USERNAME/REPO_NAME
  // change REPO_NAME to your actual repository name.
  basePath: isProd ? "/Tailored" : "",
};

export default nextConfig;