import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface BannerActionsProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the banner's optional action controls.
 */
export function BannerActions({ ref, className, ...props }: BannerActionsProps) {
	return (
		<div
			ref={ref}
			data-slot="banner-actions"
			className={cn(
				"flex shrink-0 items-center gap-2 max-sm:order-3 max-sm:w-full max-sm:*:data-[slot=button]:flex-1",
				className
			)}
			{...props}
		/>
	);
}
