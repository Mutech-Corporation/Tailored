import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /*
   * There is a second package-lock.json in the parent folder, and Turbopack was
   * inferring that directory as the workspace root. Pinning the root silences
   * the startup warning — whose multi-line lockfile path was the last thing
   * printed, making `next dev` look like it had hung — and keeps module
   * resolution anchored to this project.
   */
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
