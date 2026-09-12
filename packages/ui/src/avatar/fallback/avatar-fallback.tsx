"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@superdao/lib/utils";

export interface AvatarFallbackProps extends AvatarPrimitive.Fallback.Props {
	/**
	 * Controls the fallback's visual variant.
	 */
	variant?: "default" | "inverse";
}

/**
 * Renders the avatar fallback component.
 *
 * @see https://base-ui.com/react/components/avatar
 */
export function AvatarFallback({ className, variant = "default", ...props }: AvatarFallbackProps) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			data-variant={variant}
			className={cn(
				"flex size-full items-center justify-center rounded-full bg-card text-muted-foreground group-data-[size=compact]/avatar:text-xs group-data-[size=hero]/avatar:text-2xl group-data-[size=l]/avatar:text-lg group-data-[size=m]/avatar:text-sm group-data-[size=micro]/avatar:text-[10px] group-data-[size=s]/avatar:text-xs group-data-[size=xl]/avatar:text-xl group-data-[size=xs]/avatar:text-[10px] group-data-[size=xxl]/avatar:text-3xl data-[variant=inverse]:font-bold data-[variant=inverse]:text-white",
				className
			)}
			{...props}
		/>
	);
}
