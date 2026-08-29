"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@superdao/lib/utils";

export interface AvatarImageProps extends AvatarPrimitive.Image.Props {}

/**
 * Renders the avatar image component.
 *
 * @see https://base-ui.com/react/components/avatar
 */
export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  );
}
