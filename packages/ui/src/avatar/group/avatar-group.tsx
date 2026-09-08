import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface AvatarGroupProps extends ComponentProps<"div"> {
	/**
	 * Controls how closely grouped avatars overlap.
	 */
	overlap?: "default" | "compact";
}

/**
 * Renders the avatar group component.
 *
 * @see https://base-ui.com/react/components/avatar
 */
export function AvatarGroup({ className, overlap = "default", ...props }: AvatarGroupProps) {
	return (
		<div
			data-slot="avatar-group"
			data-overlap={overlap}
			className={cn(
				"group/avatar-group flex -space-x-2 data-[overlap=compact]:-space-x-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
				className
			)}
			{...props}
		/>
	);
}
