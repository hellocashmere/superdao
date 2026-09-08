"use client";

import { useMediaQuery } from "../use-media-query";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

export type UseIsMobileReturn = boolean;

/**
 * Reports whether the viewport is narrower than the mobile breakpoint.
 */
export function useIsMobile(): UseIsMobileReturn {
	return useMediaQuery(MOBILE_MEDIA_QUERY);
}
