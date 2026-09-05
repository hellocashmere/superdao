"use client";

import type { ComponentPropsWithRef } from "react";

import { cn } from "@superdao/lib/utils";

export interface CardFooterProps extends ComponentPropsWithRef<"div"> {}

/**
 * Renders the card footer component.
 */
export function CardFooter({ className, ref, ...props }: CardFooterProps) {
  return (
    <div
      {...props}
      ref={ref}
      data-slot="card-footer"
      className={cn("mx-(--card-padding-inline) mt-auto flex items-center border-t border-border py-2", className)}
    />
  );
}
