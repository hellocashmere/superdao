import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface AvatarGroupCountProps extends ComponentProps<"div"> {
	/**
	 * Indicates that the count opens an interactive disclosure.
	 */
	interactive?: boolean;
}

/**
 * Renders the avatar group count component.
 *
 * @see https://base-ui.com/react/components/avatar
 */
export function AvatarGroupCount({ className, interactive = false, ...props }: AvatarGroupCountProps) {
	return (
		<div
			data-slot="avatar-group-count"
			data-interactive={interactive}
			className={cn(
				"relative flex shrink-0 items-center justify-center rounded-full bg-card font-semibold text-muted-foreground ring-2 ring-card group-has-data-[size=l]/avatar-group:size-14 group-has-data-[size=l]/avatar-group:text-base group-has-data-[size=m]/avatar-group:size-10 group-has-data-[size=m]/avatar-group:text-sm group-has-data-[size=s]/avatar-group:size-8 group-has-data-[size=s]/avatar-group:text-xs group-has-data-[size=xl]/avatar-group:size-18 group-has-data-[size=xl]/avatar-group:text-lg group-has-data-[size=xs]/avatar-group:size-6 group-has-data-[size=xs]/avatar-group:text-[13px] group-has-data-[size=xxl]/avatar-group:size-24 group-has-data-[size=xxl]/avatar-group:text-xl data-[interactive=true]:cursor-pointer [&>svg]:size-4 group-has-data-[size=l]/avatar-group:[&>svg]:size-5 group-has-data-[size=s]/avatar-group:[&>svg]:size-3.5 group-has-data-[size=xl]/avatar-group:[&>svg]:size-6 group-has-data-[size=xs]/avatar-group:[&>svg]:size-3 group-has-data-[size=xxl]/avatar-group:[&>svg]:size-8",
				className
			)}
			{...props}
		/>
	);
}
