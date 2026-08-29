"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";

export interface AvatarGroupProps extends ComponentProps<"div"> {}

/**
 * Renders the avatar group component.
 *
 * @see https://base-ui.com/react/components/avatar
 */
export function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  );
}
