"use client";

import type { ComponentProps } from "react";

import { cn } from "@superdao/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-2 text-[15px] leading-6 font-normal text-muted-foreground select-none group-has-disabled/input-group:text-field-disabled-foreground [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-4 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end": "order-last pr-4 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start": "order-first w-full justify-start px-4 pt-2 group-has-[>input]/input-group:pt-2",
        "block-end": "order-last w-full justify-start px-4 pb-2 group-has-[>input]/input-group:pb-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

export interface InputGroupAddonProps extends ComponentProps<"div">, VariantProps<typeof inputGroupAddonVariants> {}

/**
 * Renders the input group addon component.
 */
export function InputGroupAddon({ className, align = "inline-start", ...props }: InputGroupAddonProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}
