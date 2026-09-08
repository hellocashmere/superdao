"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@superdao/lib/utils";

/**
 * Supported visual sizes for the avatar.
 */
export type AvatarSize = "micro" | "xs" | "compact" | "s" | "m" | "l" | "hero" | "xl" | "xxl";

export interface AvatarProps extends AvatarPrimitive.Root.Props {
	/**
	 * Controls the avatar's rendered dimensions.
	 *
	 * @defaultValue `"m"`
	 */
	size?: AvatarSize;
}

/**
 * Renders the avatar component.
 *
 * Composition:
 * ```text
 * Avatar
 * ├── AvatarImage
 * ├── AvatarFallback
 * ├── AvatarGroup
 * ├── AvatarGroupCount
 * └── AvatarBadge
 * ```
 *
 * @see https://base-ui.com/react/components/avatar
 */
export function Avatar({ className, size = "m", ...props }: AvatarProps) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={cn(
				"group/avatar relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:mix-blend-darken data-[size=compact]:size-7 data-[size=hero]:size-16 data-[size=l]:size-14 data-[size=m]:size-10 data-[size=micro]:size-5 data-[size=s]:size-8 data-[size=xl]:size-18 data-[size=xs]:size-6 data-[size=xxl]:size-24 data-[size=xxl]:bg-[#343a46] data-[size=xxl]:after:border-black/4 dark:after:mix-blend-lighten",
				className
			)}
			{...props}
		/>
	);
}
