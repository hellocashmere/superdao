import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/**
	 * Allows the browser-based web application to read the public API.
	 */
	async headers() {
		return [
			{
				source: "/api/v1/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type",
					},
				],
			},
		];
	},
	output: "standalone",
};

export default nextConfig;
