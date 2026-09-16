import path from "node:path";
import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const appDirectory = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(appDirectory, "../..");
const apiURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
	...(apiURL
		? {
				images: {
					remotePatterns: [new URL(`${apiURL}/avatars/**`), new URL(`${apiURL}/tokens/**`)],
				},
			}
		: {}),
	output: "standalone",
	outputFileTracingRoot: monorepoRoot,
	transpilePackages: ["@superdao/hooks", "@superdao/lib", "@superdao/ui"],
};

export default nextConfig;
