"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@superdao/lib/utils";

export interface AvatarProps extends AvatarPrimitive.Root.Props {
  /**
   * Controls the avatar's visual size.
   * TODO: вынести в type, например: export type AvatarSize
   */
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
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
        "group/avatar relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:mix-blend-darken data-[size=l]:size-14 data-[size=m]:size-10 data-[size=s]:size-8 data-[size=xl]:size-18 data-[size=xs]:size-6 data-[size=xxl]:size-24 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  );
}
