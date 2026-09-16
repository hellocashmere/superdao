import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const sfProText = localFont({
	src: [
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-Light.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-LightItalic.ttf",
			weight: "300",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-RegularItalic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-MediumItalic.ttf",
			weight: "500",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-Semibold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-SemiboldItalic.ttf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-BoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-Heavy.ttf",
			weight: "800",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Text/SFProText-HeavyItalic.ttf",
			weight: "800",
			style: "italic",
		},
	],
	variable: "--font-sf-pro-text",
	display: "swap",
	adjustFontFallback: false,
});

export const sfProDisplay = localFont({
	src: [
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Ultralight.otf",
			weight: "100",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-UltralightItalic.otf",
			weight: "100",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Thin.otf",
			weight: "200",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-ThinItalic.otf",
			weight: "200",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Light.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-LightItalic.otf",
			weight: "300",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-RegularItalic.otf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Medium.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-MediumItalic.otf",
			weight: "500",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Semibold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-SemiboldItalic.otf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Bold.otf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-BoldItalic.otf",
			weight: "700",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Heavy.otf",
			weight: "800",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-HeavyItalic.otf",
			weight: "800",
			style: "italic",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-Black.otf",
			weight: "900",
			style: "normal",
		},
		{
			path: "../public/fonts/SF_Pro_Display/SF-Pro-Display-BlackItalic.otf",
			weight: "900",
			style: "italic",
		},
	],
	variable: "--font-sf-pro-display",
	display: "swap",
	adjustFontFallback: false,
});

export const inter = Inter({
	subsets: ["latin", "cyrillic"],
	weight: "variable",
	style: ["normal", "italic"],
	axes: ["opsz"],
	variable: "--font-inter",
	display: "swap",
	preload: true,
	fallback: ["Arial", "sans-serif"],
	adjustFontFallback: true,
});
