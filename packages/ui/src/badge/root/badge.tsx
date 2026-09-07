import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export type BadgeVariant = "default" | "indicator";

export type BadgeColor = "gray" | "lime" | "orange" | "pink" | "purple" | "red" | "yellow";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  /**
   * Sets the badge color.
   */
  color?: BadgeColor;
  /**
   * Sets the badge presentation style.
   */
  variant?: BadgeVariant;
}

/**
 * Renders a color-coded label with an optional leading status indicator.
 */
export function Badge({ className, color = "gray", ref, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="badge"
      data-color={color}
      data-variant={variant}
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-sm px-1.5 py-1 font-sans [font-feature-settings:'liga'_off,'clig'_off] text-[12px] leading-3 font-semibold whitespace-nowrap",
        "data-[color=gray]:bg-muted-foreground/15 data-[color=gray]:text-muted-foreground",
        "data-[color=lime]:bg-lime/15 data-[color=lime]:text-lime",
        "data-[color=orange]:bg-orange/15 data-[color=orange]:text-orange",
        "data-[color=pink]:bg-pink/15 data-[color=pink]:text-pink",
        "data-[color=purple]:bg-purple/15 data-[color=purple]:text-purple",
        "data-[color=red]:bg-red/15 data-[color=red]:text-red",
        "data-[color=yellow]:bg-yellow/15 data-[color=yellow]:text-yellow",
        "data-[variant=indicator]:gap-1.5 data-[variant=indicator]:bg-transparent data-[variant=indicator]:px-0 data-[variant=indicator]:text-foreground data-[variant=indicator]:before:size-1 data-[variant=indicator]:before:shrink-0 data-[variant=indicator]:before:rounded-full",
        "data-[variant=indicator]:data-[color=gray]:before:bg-muted-foreground",
        "data-[variant=indicator]:data-[color=lime]:before:bg-lime",
        "data-[variant=indicator]:data-[color=orange]:before:bg-orange",
        "data-[variant=indicator]:data-[color=pink]:before:bg-pink",
        "data-[variant=indicator]:data-[color=purple]:before:bg-purple",
        "data-[variant=indicator]:data-[color=red]:before:bg-red",
        "data-[variant=indicator]:data-[color=yellow]:before:bg-yellow",
        className
      )}
    />
  );
}
