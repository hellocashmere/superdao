import type { MetadataRoute } from "next";

/**
 * Returns the web application's installable manifest.
 */
export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Superdao",
		short_name: "Superdao",
		description: "Explore onchain activity and discover new audiences.",
		start_url: "/",
		scope: "/",
		display: "standalone",
		background_color: "#0B0D12",
		theme_color: "#0B0D12",
		icons: [
			{
				src: "/icons/icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icons/icon-512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/icons/icon-192-maskable.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icons/icon-512-maskable.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
