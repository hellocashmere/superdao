import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface AvatarBadgeProps extends ComponentProps<"span"> {}

/**
 * Renders the avatar badge component.
 *
 * @see https://base-ui.com/react/components/avatar
 */
export function AvatarBadge({ className, ...props }: AvatarBadgeProps) {
	return (
		<span
			data-slot="avatar-badge"
			className={cn(
				"absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-[3px] ring-card select-none",
				"group-data-[size=xs]/avatar:size-2 group-data-[size=xs]/avatar:[&>svg]:hidden",
				"group-data-[size=s]/avatar:size-3 group-data-[size=s]/avatar:[&>svg]:hidden",
				"group-data-[size=m]/avatar:size-4 group-data-[size=m]/avatar:[&>svg]:size-2.5",
				"group-data-[size=l]/avatar:size-4 group-data-[size=l]/avatar:[&>svg]:size-2.5",
				"group-data-[size=xl]/avatar:size-4.5 group-data-[size=xl]/avatar:[&>svg]:size-3",
				"group-data-[size=xxl]/avatar:size-6 group-data-[size=xxl]/avatar:[&>svg]:size-4",
				className
			)}
			{...props}
		/>
	);
}
