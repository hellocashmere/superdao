"use client"

import * as React from "react"

import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@superdao/ui/lib/utils"

import { Button } from "@superdao/ui/components/button"

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

export interface InputGroupButtonProps
  extends
    Omit<React.ComponentProps<typeof Button>, "size" | "type">,
    VariantProps<typeof inputGroupButtonVariants> {
  type?: "button" | "submit" | "reset"
}

/**
 * Renders the input group button component.
 *
 * @see https://react.dev/reference/react/Component
 */
export function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}
